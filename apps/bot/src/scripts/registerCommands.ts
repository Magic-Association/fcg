import config from "@/config.js";
import loadCommandModules from "@/loadModules/loadCommands.js";
import { Routes, REST } from "discord.js";
import { SlashCommandCollection } from "@/client/FcgClient.js";

export async function registerCommands(
  commands?: SlashCommandCollection,
): Promise<Array<{ name: string }>> {
  const commandCollection = commands ?? (await loadCommandModules());
  const data = commandCollection.map((cmd) => cmd.data.toJSON());

  const rest = new REST().setToken(config.botToken);

  await rest.put(Routes.applicationCommands(config.clientId), {
    body: data,
  });

  return data.map((cmd) => ({ name: cmd.name }));
}

function invokedDirectly() {
  const entry = process.argv[1];
  return typeof entry === "string" && entry.includes("registerCommands");
}

if (invokedDirectly()) {
  registerCommands()
    .then((registered) => {
      console.log(
        `Registered commands: ${registered.map((cmd) => cmd.name).join(", ")}`,
      );
    })
    .catch((error) => {
      console.error("Failed to register commands", error);
      process.exitCode = 1;
    });
}
