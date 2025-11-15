import config from "@/config.js";
import client from "@/client/client.js";

export async function getOrFetchMember(userId: string) {
  let guild = client.guilds.cache.get(config.guildId);
  if (!guild) {
    guild = await client.guilds.fetch(config.guildId);
  }
  let member = guild.members.cache.get(userId);
  if (!member) {
    member = await guild.members.fetch(userId);
  }
  return member;
}
