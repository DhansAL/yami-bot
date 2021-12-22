import { Message } from "discord.js";
import { ServerConfig } from "../database/ServerConfig";
import { Yamishi } from "../Yamishi";

export interface Listener {
  name: string;
  description: string;
  /**
   * Handles the logic for a given listener.
   *
   * @param {Yamishi} Yami Yami's Discord instance.
   * @param {Message} message The message that triggered the listener.
   * @param {ServerConfig} config The server settings from the database.
   */
  run: (Yami: Yamishi, message: Message, config: ServerConfig) => Promise<void>;
}
