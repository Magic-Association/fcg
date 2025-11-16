process.loadEnvFile("../../.env");

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const config = {
  botToken: requireEnv("BOT_TOKEN"),
  clientId: requireEnv("CLIENT_ID"),
  guildId: requireEnv("GUILD_ID"),
  fcgChannelId: requireEnv("FCG_CHANNEL_ID"),
  autoRegisterCommands: process.env.AUTO_REGISTER_COMMANDS !== "false",
};

export default config;
export { requireEnv };
