import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
/**
 * This is the entry point for Yami's process. This will log the boot process,
 * call the necessary helpers to prepare Yami, and then log in to Discord.
 */

(async () => {
  const Yami = new Client({
    intents: IntentOptions,
    shards: "auto",
  }) as Yamishi; // this is tyype assertion
})();
