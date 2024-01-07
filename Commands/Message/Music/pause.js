const { Message, PermissionFlagsBits } = require("discord.js");
const ANYA = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "pause",
  aliases: ["pu", "pj"],
  description: `หยุดเพลงใน Queue ชั่วคราวมั้ยคะ`,
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
    if (!queue.paused) {
      queue.pause();
      client.embed(message, `${client.config.emoji.SUCCESS} Queue Paused !!`);
    } else {
      client.embed(
        message,
        `${client.config.emoji.ERROR} Queue already Paused !!`
      );
    }
  },
};
