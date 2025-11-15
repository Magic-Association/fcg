import shutdown from "./shutdown.js";
let errorCount = 0;
const MAX_ERRORS = 6;
const ERROR_RESET_TIME = 5 * 60 * 1000;
const DECAY_INTERVAL = Math.floor(ERROR_RESET_TIME / MAX_ERRORS);
let errorDecayInterval: NodeJS.Timeout | null = null;

export default function increaseErrorCount() {
  errorCount++;
  if (errorCount >= MAX_ERRORS) {
    console.error("Max error limit reached. Shutting down...");
    shutdown();
    return;
  }
  if (!errorDecayInterval) {
    errorDecayInterval = setInterval(() => {
      if (errorCount > 0) {
        errorCount--;
      }
      if (errorCount === 0 && errorDecayInterval) {
        clearInterval(errorDecayInterval);
        errorDecayInterval = null;
      }
    }, DECAY_INTERVAL);
  }
}
