/**
 * Checks the server settings to see if the user that sent the message
 * is configured to receive a heart reaction. If so, reacts.
 *
 * Also validates against the defaultHearts config.
 */

import { defaultHearts } from "../config/listeners/defaultHearts";
import { Listener } from "../interfaces/listeners/Listener";
import { yamiErrorHandler } from "../utils/yamiErrorHandler";

export const heartsListener: Listener = {
  name: "Hearts Listener",
  description: "Adds heart reactions to specified users.",
  run: async (Yami, message, config) => {
    try {
      const { author } = message;
      const usersToHeart = defaultHearts.concat(config.hearts);
      if (usersToHeart.includes(author.id) && !message.deleted) {
        await message.react(Yami.configs.love);
      }
    } catch (err) {
      await yamiErrorHandler(
        Yami,
        "hearts listener",
        err,
        message.guild?.name,
        message
      );
    }
  },
};
