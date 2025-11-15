import { MessageFlags, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "@/client/FcgClient.js";

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test command"),

  async execute(interaction) {
    await interaction.reply({
      content: "Pong!",
      flags: MessageFlags.Ephemeral,
    });
  },
};

export default command;
