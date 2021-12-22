/**
 * This utility fetches the server settings for the given ID from the
 * database. If the server does not have a record, it creates one with the
 * default values.
 *
 * @param {Yamishi} Yami Yami's Discord instance.
 * @param {string} serverID Discord ID of the server to get the settings for.
 * @param {string} serverName Name of the server.
 * @returns {ServerConfig | null} The server settings object, or null on error.
 */
import { defaultServer } from "../../config/database/defaultServer";
import { ServerConfig } from "../../interfaces/database/ServerConfig";
import { Yamishi } from "../../interfaces/Yamishi";
import ServerModel from "../../database/models/ServerConfigModel";
import { yamiErrorHandler } from "../../utils/yamiErrorHandler";

export const getSettings = async (
  Yami: Yamishi,
  serverID: string,
  serverName: string
): Promise<ServerConfig | null> => {
  try {
    return (
      (await ServerModel.findOne({ serverID })) ||
      (await ServerModel.create({
        serverID,
        serverName,
        ...defaultServer,
      }))
    );
  } catch (error) {
    await yamiErrorHandler(Yami, "get Settings Module", error, serverName);
    return null;
  }
};
