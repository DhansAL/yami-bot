/**
 * Root level function for loading all of the event listeners. Attaches
 * all of the Discord.js event listeners to Yami's custom handlers.
 *
 * @param {Yamishi} Yami Yami's Client instance.
 */
import { Yamishi } from "../interfaces/Yamishi";
import { ready } from "./clientEvents/ready";
import { messageCreate } from "./messageEvents/messageCreate";
import { shardError } from "./shardEvents/shardError";
import { shardReady } from "./shardEvents/shardReady";

export const handleEvents = (Yami: Yamishi): void => {
  Yami.on("shardReady", async (shard) => {
    await shardReady(Yami, shard);
  });
  Yami.on("shardError", async (error, shard) => {
    await shardError(Yami, error, shard);
  });
  Yami.on("messageCreate", async (message) => {
    await messageCreate(Yami, message);
  });
  Yami.on("ready", async () => {
    await ready(Yami);
  });
};
