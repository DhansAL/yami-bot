import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

import { Yamishi } from "../Yamishi";
import { ServerConfig } from "../database/ServerConfig";

export interface Command {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  /**
   * Handles the logic for running a given command.
   *
   * @param {Yamishi} Yami Yami's Discord instance.
   * @param {CommandInteraction} interaction -The interaction payload from Discord.  {interaction->discord->payload}
   * @param {ServerConfig} config The server configuration from the database.
   */
  run: (
    Yami: Yamishi,
    interaction: CommandInteraction,
    config: ServerConfig
  ) => Promise<void>;
}
