import {
  CommandInteraction,
  ContextMenuInteraction,
  Message,
  MessageEmbed,
} from "discord.js";
import { Types } from "mongoose";

import { Yamishi } from "../interfaces/Yamishi";

import { yamiLogHandler } from "./yamiLogHandler";
// import { customSubstring } from "./customSubstring";

/**
 * Takes the error object generated within the code andlogs the
 * information in the console. Then, generates an error ID, builds an error embed, and sends
 * that to the debug hook. Finally, returns the error ID to be passed to the user if applicable.
 *
 * @param {Yamishi} Yami Yami's Discord instance.
 * @param {string} context The string explaining where this error was thrown.
 * @param {unknown} err The standard error object (generated in a catch statement).
 * @param {string | undefined} guild The name of the guild that triggered the issue.
 * @param {Message | undefined} message Optional message that triggered the issue.
 * @param { CommandInteraction | ContextMenuInteraction | undefined } interaction Optional interaction that triggered the issue.
 * @returns {Types.ObjectId} A unique ID for the error.
 */

export const yamiErrorHandler = async (
  Yami: Yamishi,
  context: string,
  err: unknown,
  guild?: string,
  message?: Message,
  interaction?: CommandInteraction | ContextMenuInteraction
): Promise<Types.ObjectId> => {
  //grapfana code to be added
  const error = err as Error;
  yamiLogHandler.log("error", `there was an error in the ${context}`);
  yamiLogHandler.log(
    "error",
    JSON.stringify({ errorMesage: error.message, errorStack: error.stack })
  );

  const errorId = new Types.ObjectId();
  const errorEmbed = new MessageEmbed();

  errorEmbed.setTitle(
    `${context} error ${guild ? "in " + guild : "from an unknown source"}`
  );
};
