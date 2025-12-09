import { SlashCommand, SlashCommandCollection } from "@/client/FcgClient.js";
import { Collection } from "discord.js";
import { readdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const dir = dirname(fileURLToPath(import.meta.url));
const commandsDir = join(dir, "../commands");

function isSlashCommand(value: unknown): value is SlashCommand {
  if (!value || typeof value !== "object") return false;
  const cmd = value as Partial<SlashCommand>;
  return (
    !!cmd.data &&
    typeof (cmd.data as { name?: unknown }).name === "string" &&
    typeof cmd.execute === "function"
  );
}

export default async function loadCommandModules(): Promise<SlashCommandCollection> {
  const files = await readdir(commandsDir);
  const commands: SlashCommandCollection = new Collection();

  for (const file of files) {
    try {
      const commandPath = join(commandsDir, file);
      const commandModule = (await import(pathToFileURL(commandPath).href)) as {
        default: unknown;
      };
      const command = commandModule.default;
      if (!isSlashCommand(command)) {
        console.error(`Command module ${file} is not a valid SlashCommand`);
        continue;
      }
      commands.set(command.data.name, command);
    } catch (error) {
      console.error(`Error loading command ${file}:`, error);
    }
  }
  return commands;
}
