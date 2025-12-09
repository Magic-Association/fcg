import { Events } from "discord.js";
import client from "@/client/client.js";
import config from "@/config.js";
import increaseErrorCount from "@/lifecycle/increaseErrorCount.js";
import shutdown from "@/lifecycle/shutdown.js";
import interactionCreate from "@/events/interactionCreate.js";
import loadCommandModules from "@/loadModules/loadCommands.js";
import { registerCommands } from "@/scripts/registerCommands.js";

process.on("SIGTERM", () => void shutdown());
process.on("SIGINT", () => void shutdown());
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  increaseErrorCount();
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  increaseErrorCount();
});

try {
  client.once(Events.ClientReady, (c) => {
    void (async () => {
      console.log(`Logged in as ${c.user.displayName}`);

      client.on(Events.InteractionCreate, (interaction) => {
        void interactionCreate(interaction);
      });
      client.commands = await loadCommandModules();

      if (config.autoRegisterCommands) {
        try {
          const registered = await registerCommands(client.commands);
          console.log(
            `Registered commands: ${registered
              .map((cmd) => cmd.name)
              .join(", ")}`,
          );
        } catch (error) {
          console.error("Failed to register commands", error);
        }
      }

      console.log("Bot startup complete");
    })();
  });

  await client.login(config.botToken);
} catch (err) {
  console.error("Error during bot initialization:", err);
  void shutdown();
}
