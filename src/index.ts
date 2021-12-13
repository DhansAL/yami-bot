import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import { Yamishi } from "./interfaces/Yamishi";
import { yamiLogHandler } from "./utils/yamiLogHandler";
/**
 * This is the entry point for Yami's process. This will log the boot process,
 * call the necessary helpers to prepare Yami, and then log in to Discord.
 */

(async () => {
  yamiLogHandler.log("debug", "starting process...");
  const Yami = new Client({
    intents: IntentOptions,
    shards: "auto",
  }) as Yamishi; // this is tyype assertion

  yamiLogHandler.log("debug", "validating environment variables...");
})();
