import { readdir } from "fs/promises";
import { join } from "path";

import { Yamishi } from "../interfaces/Yamishi";
import { Command } from "../interfaces/commands/Command";

import { yamiErrorHandler } from "./yamiErrorHandler";

/**
 * Reads the `/commands` directory and dynamically imports the files,
 * then pushes the imported data to an array.
 *
 * @param {Yamishi} Yami Yami's Discord instance.
 * @returns {Command[]} Array of Command objects representing the imported commands.
 */
export const loadCommands = async (Yami: Yamishi): Promise<Command[]> => {
  try {
    const result: Command[] = [];
    const files = await readdir(
      join(process.cwd() + "/prod/commands"),
      "utf-8"
    ); //cwd - c/path/to/prod
    for (const file of files) {
      const name = file.split(".")[0]; //spicy :)
      const mod = await import(join(process.cwd() + `/prod/commands/${file}`));
      result.push(mod[name] as Command); //very spicy
    }
    return result;
  } catch (err) {
    await yamiErrorHandler(Yami, "Slash Command Loader", err);
    return [];
  }
};
