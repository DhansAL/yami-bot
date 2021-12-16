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
      const name = file.split(".")[0];
      const mod = await import(join(process.cwd() + `/prod/commands/${file}`));
      result.push(mod[name] as Command); // spicy
      /**
       * nhcarrigan — Yesterday at 17:37
That's dynamic importing. The code is written to import each command file that is found, grab the exported variable with the same name as the file, and push that exported variable to an array (the variable is the command object in the file).
The type coercion, which I'm not sure why you changed it lol, is used to tell TypeScript that it's a command object, because it can't infer the type from the dynamic import.
/**
 * what i understood from this is,
 * 
 * name = automod.ts=> automod (for eg.)
 * mod = path/to/prod/commands/automod.ts
 * then we're pushing the grabbed exported variable (which is a command interface object) to
 *  result[] and while pushing we set the type again = Command interface.
 * 
 * i still cant get these 2 things,
 * 1.
     mod[name] here is ==  path/to/prod/commands/automod.ts[automod]
 * what does this mean? 

    2. if mod[name] gives us the exported automod object which is already 
    a Command interface obj, why are we type coerciing it again to 
    Command interface obj?

 * 
 */

      // nhcarrigan — Yesterday at 22:19
      // 1. mod is the entire file. But the file doesn't have a default export, it has a specific named export (export const automod). That happens to be named the same as the file, which is how mod[name] grabs that exported object.
      // 2. TypeScript doesn't know that mod[name] comes from the command directory, only that it's some dynamically imported code.
    }
    return result;
  } catch (err) {
    await yamiErrorHandler(Yami, "Slash Command Loader", err);
    return [];
  }
};
