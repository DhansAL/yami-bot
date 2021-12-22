import * as child from "child_process";

/* child_process allows you to spawn a separate process within your app - which grants access to things like OS commands.
In this case, it's used to access the git CLI and grab the last commit hash, which is used in the about command to confirm versioning.
 */

import { YamiColours, YamiPhrases, YamiSass } from "../config/YamiResponses";
import { Yamishi } from "../interfaces/Yamishi";
import { yamiLogHandler } from "../utils/yamiLogHandler";

/**
 * Validates that all expected environment variables are set with *some* value.
 * typescript cant access .env directly so it will throw error
 * Does not validate that the values are valid. Constructs a config object and
 * attaches it to Yami's instance. Also constructs the colours and responses objects
 * and attaches them.
 *
 * @param {Yamishi} Yami Yami's Discord instance.
 * @returns {Object} Object containing a valid property as boolean, and a message as string.
 */
export const validateEnv = (
  Yami: Yamishi
): { valid: boolean; message: string } => {
  try {
    if (!process.env.DISCORD_TOKEN) {
      return { valid: false, message: "Missing Discord token!" };
    }

    if (!process.env.MONGODB) {
      return { valid: false, message: "Missing database connection string" };
    }

    if (!process.env.OWNER_ID) {
      return { valid: false, message: "Missing Discord ID for owner account" };
    }

    if (!process.env.CLIENT_ID) {
      return { valid: false, message: "Missing Bot's Client ID" };
    }

    if (!process.env.HOME_GUILD_ID) {
      return { valid: false, message: "Missing Bot's Home Guild ID" };
    }

    if (!process.env.WH_URL) {
      return { valid: false, message: "Missing Discord webhook URL" };
    }

    // if (!process.env.CURRENCY_WH) {
    //   return { valid: false, message: "Missing Discord Currency webhook URL" };
    // }

    // if (!process.env.NASA_API) {
    //   beccaLogHandler.log("warn", "Missing NASA API key");
    // }

    // if (!process.env.TOPGG_PASSWORD) {
    //   return { valid: false, message: "Missing Top.gg password" };
    // }

    // if (!process.env.VOTE_CHANNEL_ID) {
    //   return { valid: false, message: "Missing Bot's Vote Channel ID" };
    // }

    // if (!process.env.HABITICA_KEY) {
    //   return { valid: false, message: "Missing Habitica API key" };
    // }

    // if (!process.env.ORBIT_KEY) {
    //   return { valid: false, message: "Missing Orbit API key" };
    // }

    // Becca.commitHash = child.execSync("git rev-parse HEAD").toString().trim();

    const configs: Yamishi["configs"] = {
      token: process.env.DISCORD_TOKEN,
      dbToken: process.env.MONGODB,
      whUrl: process.env.WH_URL,
      //   currencyUrl: process.env.CURRENCY_WH,
      //   nasaKey: process.env.NASA_API || "",
      ownerId: process.env.OWNER_ID,
      love: process.env.BECCA_LOVE || "💜",
      yes: process.env.BECCA_YES || "✅",
      no: process.env.BECCA_NO || "❌",
      think: process.env.BECCA_THINK || "🤔",
      version: process.env.npm_package_version || "null",
      id: process.env.CLIENT_ID,
      homeGuild: process.env.HOME_GUILD_ID,
      //   topGG: process.env.TOPGG_PASSWORD,
      //   voteChannel: process.env.VOTE_CHANNEL_ID,
      //   habiticaKey: process.env.HABITICA_KEY,
      //   orbitKey: process.env.ORBIT_KEY,
    };

    Yami.configs = configs;
    Yami.colours = YamiColours;
    Yami.responses = YamiPhrases;
    Yami.sass = YamiSass;

    return { valid: true, message: "Environment variables validated!" };
  } catch (err) {
    yamiLogHandler.log("error", err);
    return {
      valid: false,
      message: "Unknown error when validating environment",
    };
  }
};
