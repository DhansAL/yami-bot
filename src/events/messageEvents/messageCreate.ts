import { Yamishi } from "../../interfaces/Yamishi";
import { Message } from "discord.js";
import { getSettings } from "../../modules/settings/getSettings";
import { heartsListener } from "../../listeners/heartsListener";
import { automodListener } from "../../listeners/automodListener";
import { yamiErrorHandler } from "../../utils/yamiErrorHandler";
import { registerCommands } from "../../utils/registerCommands";

/**
 * Handles the onMessage event. Validates that the message did not come from
 * another bot, then passes the message through to the listeners and command handler.
 *
 * @param {Yamishi} Becca Becca's Discord instance.
 * @param {Messsage} message The message object received in the gateway event. \
 */

export const messageCreate = async (
  Yami: Yamishi,
  message: Message
): Promise<void> => {
  try {
    const { author, channel, guild } = message;

    //edge cases
    if (author.bot) return;
    if (!guild || channel.type === "DM") return;

    const serverConfig = await getSettings(Yami, guild.id, guild.name);
    if (!serverConfig) {
      throw new Error("Could not get server Configuration");
    }
    await heartsListener.run(Yami, message, serverConfig);
    await automodListener.run(Yami, message, serverConfig);

    if (
      message.author.id === Yami.configs.ownerId &&
      message.content === "emergency reload"
    ) {
      await registerCommands(Yami);
      await message.reply("Reloaded all commands.");
    }
  } catch (err) {
    await yamiErrorHandler(
      Yami,
      "message send event",
      err,
      message.guild?.name,
      message
    );
  }
};
