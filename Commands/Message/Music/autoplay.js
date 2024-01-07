const { Message, PermissionFlagsBits } = require("discord.js");
const ANYA = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "autoplay",
  aliases: ["ap", "atp"],
  description: `สลับเปิด/ปิดการเล่นอัตโนมัติมั้ยคะ`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 5,
  inVoiceChannel: true,
  inSameVoiceChannel: true,
  Player: true,
  djOnly: true,

  /**
   *
   * @param {ANYA} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   * @param {Queue} queue
   */
  run: async (client, message, args, prefix, queue) => {
    // Code
    let autoplay = queue.toggleAutoplay();

    client.embed(
      message,
      `${client.config.emoji.SUCCESS} AutoPlay: \`${autoplay ? "On" : "Off"}\``
    );
  },
};
