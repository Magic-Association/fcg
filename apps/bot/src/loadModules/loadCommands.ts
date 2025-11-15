import { SlashCommandCollection } from "@/client/FcgClient.js";
import { Collection } from "discord.js";
import { readdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const dir = dirname(fileURLToPath(import.meta.url));
const commandsDir = join(dir, "../commands");

export default async function loadCommandModules(): Promise<SlashCommandCollection> {
  const files = await readdir(commandsDir);
  const commands: SlashCommandCollection = new Collection();

  for (const file of files) {
    try {
      const commandPath = join(commandsDir, file);
      const commandModule = await import(pathToFileURL(commandPath).href);
      const command = commandModule.default;
      commands.set(command.data.name, command);
    } catch (error) {
      console.error(`Error loading command ${file}:`, error);
    }
  }
  return commands;
}
