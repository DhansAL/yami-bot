import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { handleEvents } from "./events/handleEvents";
import { Yamishi } from "./interfaces/Yamishi";
import { validateEnv } from "./modules/validateENV";
import { loadCommands } from "./utils/loadCommands";
import { loadContexts } from "./utils/loadContexts";
import { registerCommands } from "./utils/registerCommands";
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
  const validatedEnv = validateEnv(Yami);
  if (!validatedEnv.valid) {
    yamiLogHandler.log("error", validatedEnv.message);
    return;
  }
  // yamiLogHandler.log("debug", "Initializing web server...");
  // const server = await createServer(Yami);

  yamiLogHandler.debug("debug", "Importing commands...");
  // const commands = await loadCommands(Yami);
  // const contexts = await loadContexts(Yami);
  // Yami.commands = commands;
  // Yami.contexts = contexts;
  // if (!commands.length || !contexts.length) {
  //   yamiLogHandler.log("error", "failed to import commands.");
  //   return;
  // }

  if (process.env.NODE_ENV !== "production") {
    yamiLogHandler.log("debug", "Registering commands in development");
    // const success = await registerCommands;
    // if (!success) {
    //   yamiLogHandler.log("error", "failed to register commands.");
    // }
  }

  yamiLogHandler.log("debug", "Initializing database...");
  const databaseConnection = await connectDatabase(Yami);
  if (!databaseConnection) {
    yamiLogHandler.log("error", "failed to connect to database.");
    return;
  }

  yamiLogHandler.log("debug", "Attaching event listeners...");
  handleEvents(Yami);

  yamiLogHandler.log("debug", "Connecting to Discord...");
  await Yami.login(Yami.configs.token);
})();
