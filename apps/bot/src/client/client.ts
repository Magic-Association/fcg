import { GatewayIntentBits } from "discord.js";
import FcgClient from "./FcgClient.js";

const client = new FcgClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

export default client;
