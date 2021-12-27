import { YamiCounts } from "../../interfaces/yami/yamiCounts";
import { Yamishi } from "../../interfaces/Yamishi";

/**
 * Aggregates Yami's guild count, member counts, and
 * command counts.
 *
 * @param {Yamishi} Becca Becca's Discord instance.
 * @returns {YamiCounts} An object representing the aggregated counts.
 */
export const getCounts = (Yami: Yamishi): YamiCounts => {
  const guildCount = Yami.guilds.cache.size;
  let memberCount = 0;
  let commandCount = 0;

  Yami.guilds.cache.forEach((guild) => {
    memberCount += guild.memberCount;
  });

  Yami.commands.forEach((command) => {
    const parsed = command.data.toJSON().options;
    if (!parsed) {
      return;
    }
    parsed.forEach((option) => {
      // subcommands are type 1
      if (option.type === 1) {
        commandCount++;
      }
    });
  });

  commandCount += Yami.contexts.length;

  return {
    commands: commandCount,
    guilds: guildCount,
    members: memberCount,
  };
};
