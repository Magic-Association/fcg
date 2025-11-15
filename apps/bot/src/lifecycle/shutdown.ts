import client from "@/client/client.js";

let isShuttingDown = false;

export default async function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log("Shutting down...");

  const promises: Promise<unknown>[] = [];

  if (client.isReady()) {
    promises.push(client.destroy());
  } else {
    console.log("Discord client was not ready, skipping shutdown.");
  }

  await Promise.allSettled(promises);

  process.exit(1);
}
