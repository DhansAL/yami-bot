import { IntentsString } from "discord.js";

/**
 * This contains the list of Intent options the BOT requests on identify.
 * can perform these tasks , make sure you enabled intent option in discord's
 * developer section
 */
export const IntentOptions: IntentsString[] = ["GUILDS", "GUILD_MESSAGES"];