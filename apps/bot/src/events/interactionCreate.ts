import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  Interaction,
  MessageFlags,
} from "discord.js";
import { inspect } from "util";
import client from "@/client/client.js";

export default async function interactionCreate(interaction: Interaction) {
  try {
    await handleInteraction(interaction);
  } catch (err) {
    const name = getInteractionIdentifier(interaction);
    const errMsg = `Error handling interaction ${name}:\n${err}`;
    console.error(errMsg);

    try {
      await replyWithError(interaction, errMsg);
    } catch (replyErr) {
      console.error(
        `Also failed to send error reply for interaction ${name}:\n${replyErr}`,
      );
    }
  }
}

async function handleInteraction(interaction: Interaction) {
  if (interaction.isChatInputCommand()) {
    await handleChatInputCommand(interaction);
  } else if (interaction.isAutocomplete()) {
    await handleAutocomplete(interaction);
  } else {
    await handleUnknownInteraction(interaction);
  }
}

async function handleChatInputCommand(
  interaction: ChatInputCommandInteraction,
) {
  const command = getCommand(interaction);
  if (!command) return;
  await command.execute(interaction);
}

async function handleAutocomplete(interaction: AutocompleteInteraction) {
  const command = getCommand(interaction);
  if (!command || !command.autocomplete) return;
  await command.autocomplete(interaction);
}

async function handleUnknownInteraction(interaction: Interaction) {
  console.error(`Unknown interaction: ${inspect(interaction, { depth: 2 })}`);
  if (interaction.isRepliable()) {
    await interaction.reply({
      content: "Unknown interaction.",
      flags: MessageFlags.Ephemeral,
    });
  }
}

function getCommand(
  interaction: ChatInputCommandInteraction | AutocompleteInteraction,
) {
  const command = client.commands.get(interaction.commandName);

  if (command) {
    if (interaction.isAutocomplete()) {
      if (!command.autocomplete) {
        console.error(`No autocomplete handler for ${interaction.commandName}`);
        void interaction.respond([]);
        return;
      }
    }
    return command;
  }

  const handlerNotFound = `No command handler found for ${interaction.commandName}`;

  console.error(handlerNotFound);

  if (interaction.isRepliable()) {
    void interaction.reply({
      content: handlerNotFound,
      flags: MessageFlags.Ephemeral,
    });
  }
}

function getInteractionIdentifier(interaction: Interaction) {
  if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
    return interaction.commandName;
  }
  if (
    interaction.isButton() ||
    interaction.isStringSelectMenu() ||
    interaction.isModalSubmit()
  ) {
    return interaction.customId;
  }
  // fallback
  return interaction.type;
}

async function replyWithError(interaction: Interaction, errMsg: string) {
  if (!interaction.isRepliable()) return;

  if (interaction.replied || interaction.deferred) {
    await interaction.editReply({
      content: errMsg,
      components: [],
      flags: [],
    });
  } else {
    await interaction.reply({
      content: errMsg,
    });
  }
}
