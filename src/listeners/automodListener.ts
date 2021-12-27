/**
 * Checks if the message content includes a link, and confirms that link
 * has not been set as allowed and the user does not have a link-permitted role.
 *
 * If the message fails these conditions, Becca deletes it. Requires that this listener
 * be enabled in the server AND channel.
 */

import { Listener } from "../interfaces/listeners/Listener";
import { automodLinks } from "./automod/automodLinks";

export const automodListener: Listener = {
  name: "Automod",
  description: "Handles the automod logic",
  run: async (Yami, message, config) => {
    try {
      if (
        !config.automod_channels.includes(message.channel.id) &&
        !config.automod_channels.includes("all")
      ) {
        return;
      }

      if (config.no_automod_channels.includes(message.channel.id)) {
        return;
      }

      if (
        config.no_automod_channels.includes("all") &&
        !config.automod_channels.includes(message.channel.id)
      ) {
        return;
      }

      if (message.member?.permissions.has("MANAGE_MESSAGES")) {
        return;
      }
      if (message.member?.permissions.has("MANAGE_MESSAGES")) {
        return;
      }

      if (config.links === "on") {
        await automodLinks(Yami, message, config);
      }
      //TODO: what is profanity??

      // if (config.profanity === "on") {
      //   await automodProfanity(Yami, message, config);
      // }
    } catch (error) {}
  },
};
