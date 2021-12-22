import { MessageEmbed } from "discord.js";
import { Yamishi } from "../../interfaces/Yamishi";
/**
 * Handles the shardReady event - sends a message to the debug hook when
 * a shard comes online.
 *
 * @param {Yamishi} Yami Yami's Discord instance.
 * @param {number} shard The number of the shard that has come online.
 */

export const shardReady = async (
  Yami: Yamishi,
  shard: number
): Promise<void> => {
  const shardEmbed = new MessageEmbed();
  shardEmbed.setTitle("Shard Online!");
  shardEmbed.setDescription("Yami has brought a new shard Online!");
  shardEmbed.addField("Shard", shard.toString());
  shardEmbed.setColor(Yami.colours.success);

  await Yami.debugHook.send({ embeds: [shardEmbed] });
};
