import { readdir } from "fs/promises";
import { join } from "path";

import { Context } from "../interfaces/contexts/Context";
import { Yamishi } from "../interfaces/Yamishi";

import { yamiErrorHandler } from "./yamiErrorHandler";

/**
 * Reads the `/contexts` directory and dynamically imports the files,
 * then pushes the imported data to an array.
 *
 * @param {Yamishi} Yami Yami's Discord instance.
 * @returns {Context[]} Array of Context objects representing the imported commands.
 */
export const loadContexts = async (Yami: Yamishi): Promise<Context[]> => {
  try {
    const result: Context[] = [];
    const files = await readdir(
      join(process.cwd() + "/prod/contexts"),
      "utf-8"
    );
    for (const file of files) {
      const name = file.split(".")[0];
      const mod = await import(join(process.cwd() + `/prod/contexts/${file}`));
      result.push(mod[name] as Context);
    }
    return result;
  } catch (err) {
    await yamiErrorHandler(Yami, "slash command loader", err);
    return [];
  }
};
