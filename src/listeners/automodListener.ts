/**
 * Checks if the message content includes a link, and confirms that link
 * has not been set as allowed and the user does not have a link-permitted role.
 *
 * If the message fails these conditions, Becca deletes it. Requires that this listener
 * be enabled in the server AND channel.
 */

import { Listener } from "../interfaces/listeners/Listener";

export const automodListener: Listener = {
  name: "Automod",
  description: "Handles the automod logic",
  run: async (Yami, message, config) => {
    try {
    } catch (error) {}
  },
};
