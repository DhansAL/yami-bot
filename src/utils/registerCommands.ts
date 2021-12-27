import { REST } from "@discordjs/rest";
import {
  RESTPostAPIApplicationCommandsJSONBody,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord-api-types/v9";

import { Yamishi } from "../interfaces/Yamishi";

import { yamiErrorHandler } from "./yamiErrorHandler";
import { yamiLogHandler } from "./yamiLogHandler";

/**
 * Takes both the commands and contexts, parses the `data` properties as needed,
 * and builds an array of all command data. Then, posts the data to the Discord endpoint
 * for registering commands.
 *
 * Will register commands globally if in a production environment, otherwise defaults to the
 * home guild only.
 *
 * @param {Yamishi} Yami Yami's Discord instance.
 * @returns {boolean} True if the commands were registered, false on error.
 */

export const registerCommands = async (Yami: Yamishi): Promise<boolean> => {
  try {
    const rest = new REST({ version: "9" }).setToken(Yami.configs.token);

    const commandData: (
      | RESTPostAPIApplicationCommandsJSONBody
      | RESTPostAPIChatInputApplicationCommandsJSONBody
    )[] = [];

    Yami.commands.forEach((command) =>
      commandData.push(
        command.data.toJSON() as RESTPostAPIApplicationCommandsJSONBody
      )
    );
    Yami.contexts.forEach((context) => commandData.push(context.data));
    if (process.env.NODE_ENV === "production") {
      yamiLogHandler.log("debug", "registering commands globally!");
      await rest.put(Routes.applicationCommands(Yami.configs.id), {
        body: commandData,
      });
    } else {
      yamiLogHandler.log("debug", "registering to home guild only");
      await rest.put(
        Routes.applicationGuildCommands(
          Yami.configs.id,
          Yami.configs.homeGuild
        ),
        { body: commandData }
      );
    }
    return true;
  } catch (err) {
    await yamiErrorHandler(Yami, "slash command register", err);
    return false;
  }
};
