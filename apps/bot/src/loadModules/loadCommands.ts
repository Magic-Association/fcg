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
      const commandModule = (await import(
        pathToFileURL(commandPath).href,
      )) as { default: unknown };
      const command = commandModule.default;
      if (!command || typeof command !== "object") {
        console.error(`Command module ${file} has no default export object`);
        continue;
      }
      const slashCommand = command as { data?: { name?: string } };
      if (!slashCommand.data?.name) {
        console.error(`Command module ${file} missing data.name`);
        continue;
      }
      commands.set(slashCommand.data.name, command);
    } catch (error) {
      console.error(`Error loading command ${file}:`, error);
    }
  }
  return commands;
}
