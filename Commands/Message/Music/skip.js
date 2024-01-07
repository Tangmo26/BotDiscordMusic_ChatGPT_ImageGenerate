const { Message, PermissionFlagsBits } = require("discord.js");
const ANYA = require("../../../handlers/Client");
const { Queue } = require("distube");
const { skip } = require("../../../handlers/functions");

module.exports = {
  name: "skip",
  aliases: ["s", "skp"],
  description: `ข้ามเพลงที่อยู่ใน Queue มั้ยคะ`,
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
    await skip(queue);
    client.embed(message, `${client.config.emoji.SUCCESS}  Song Skipped !!`);
  },
};
