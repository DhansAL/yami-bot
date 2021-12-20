import { MessageEmbed } from "discord.js";
import { connect } from "mongoose";

import { Yamishi } from "../interfaces/Yamishi";
import { yamiErrorHandler } from "../utils/yamiErrorHandler";

/**
 * Instantiates the database connection.
 *
 * @param {Yamishi} Yami Yami's Discord instance.
 * @returns {boolean} True if the connection was successful.
 */

export const connectDatabase = async (Yami: Yamishi): Promise<boolean> => {
  try {
    await connect(Yami.configs.dbToken);

    const databaseEmbed = new MessageEmbed();
    databaseEmbed.setTitle("database connected!");
    databaseEmbed.setDescription(
      `${Yami.user?.username || "Yamishi"} has found his record room.`
    );
    databaseEmbed.setTimestamp();
    databaseEmbed.setColor(Yami.colours.success);
    // await Yami.debugHook.send({ embeds: [databaseEmbed] });

    return true;
  } catch (err) {
    await yamiErrorHandler(Yami, "database connection", err);
    return false;
  }
};
