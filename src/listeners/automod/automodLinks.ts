/* eslint-disable jsdoc/require-param */
import { MessageEmbed } from "discord.js";

import { defaultServer } from "../../config/database/defaultServer";
import { allowedTLDs, deniedTLDs } from "../../config/listeners/linkRegEx";
import { ListenerHandler } from "../../interfaces/listeners/ListenerHandler";
import { yamiErrorHandler } from "../../utils/yamiErrorHandler";

/**
 * Detects links in a message and responds accordingly.
 */
export const automodLinks: ListenerHandler = async (Becca, message, config) => {
  try {
    let blockedLinks = 0;
    let allowedLinks = 0;

    if (config.allowed_links.length) {
      for (const str of config.allowed_links) {
        const regex = new RegExp(str, "ig");
        allowedLinks += (message.content.match(regex) || []).length;
      }
    }

    if (config.automod_roles.length) {
      for (const role of config.automod_roles) {
        if (message.member?.roles.cache.find((r) => r.id === role)) {
          return;
        }
      }
    }

    const linkRegex = new RegExp(
      `(^|\\s+)(([a-z]+:\\/\\/)?(([a-z0-9-]+\\.)+((?!${allowedTLDs.join(
        "|"
      )})[a-z]{3,4}|${deniedTLDs.join("|")})))(:[0-9]{1,5})?(.*\\s+|\\/|$)`,
      "gi"
    );

    blockedLinks += (message.content.match(linkRegex) || []).length;
    if (blockedLinks > 0 && blockedLinks !== allowedLinks) {
      if (message.deletable) {
        await message.delete();
      }
      const linkEmbed = new MessageEmbed();
      linkEmbed.setTitle("Invalid Link Detected!");
      linkEmbed.setDescription(
        (config.link_message || defaultServer.link_message).replace(
          /\{@username\}/g,
          `<@!${message.author.id}>`
        )
      );
      linkEmbed.setColor(Becca.colours.error);
      linkEmbed.setAuthor(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.displayAvatarURL()
      );
      linkEmbed.setFooter("Like the bot? Donate: to yamikun!");
      const warning = await message.channel.send({ embeds: [linkEmbed] });

      const dmEmbed = new MessageEmbed();
      dmEmbed.setTitle("Your message has been deleted...");
      dmEmbed.setURL(warning.url);
      dmEmbed.setDescription(
        "Here's the contents of the deleted message: \n```\n" +
          message.content +
          "```"
      );
      dmEmbed.setColor(Becca.colours.error);
      dmEmbed.addField("Server", message.guild?.name || "unknown");
      dmEmbed.addField("Channel", message.channel.toString());
      dmEmbed.addField("Reason", "Blocked Link detected");

      await message.author.send({ embeds: [dmEmbed] }).catch(() => null);
    }
  } catch (err) {
    await yamiErrorHandler(
      Becca,
      "links automodder",
      err,
      message.guild?.name,
      message
    );
  }
};
