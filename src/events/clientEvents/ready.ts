import { MessageEmbed } from "discord.js";
import { Yamishi } from "../../interfaces/Yamishi";
import { getCounts } from "../../modules/yami/getCounts";
import { yamiLogHandler } from "../../utils/yamiLogHandler";

/**
 * Sends a notification to the debug hook when Becca has connected to
 * Discord and is ready to receive events.
 *
 * @param {Yamishi} Yami Yami's Client instance.
 */
export const ready = async (Yami: Yamishi): Promise<void> => {
  const readyEmbed = new MessageEmbed();
  readyEmbed.setTitle("Becca is online");
  readyEmbed.setDescription(
    `${Yami.user?.username || "Becca Lyria"} has come online.`
  );
  readyEmbed.setTimestamp();
  readyEmbed.setColor(Yami.colours.success);
  readyEmbed.setFooter(`Version ${Yami.configs.version}`);

  await Yami.debugHook.send({ embeds: [readyEmbed] });
  yamiLogHandler.log("debug", "Discord ready!");

  // const counts = getCounts(Yami);
  // yamiLogHandler.log("info", counts.commands);
  // yamiLogHandler.log("info", counts.members);
  // yamiLogHandler.log("info", counts.guilds);
};
