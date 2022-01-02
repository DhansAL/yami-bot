import { MessageEmbed } from "discord.js";
import { Yamishi } from "../../interfaces/Yamishi";

/**
 * Sends a message to the debug hook when Becca disconnects.
 *
 * @param {Yamishi} Yami Yami's Discord instance.
 */
export const disconnect = async (Yami: Yamishi): Promise<void> => {
  const disconnectEmbed = new MessageEmbed();
  disconnectEmbed.setTitle("Yami has disconnected");
  disconnectEmbed.setDescription(
    `${Yami.user?.username || "Yami "} is no longer connected to Discord.`
  );
  disconnectEmbed.setTimestamp();
  disconnectEmbed.setColor(Yami.colours.error);

  await Yami.debugHook.send({ embeds: [disconnectEmbed] });
};
