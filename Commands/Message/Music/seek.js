const { Message, PermissionFlagsBits } = require("discord.js");
const ANYA = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "seek",
  aliases: ["sk"],
  description: `ต้องการฟังเพลงวินาทีที่เท่าไหร่ดีคะ`,
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
    let seek = Number(args[0]);
    if (!seek) {
      return client.embed(message, `Please Provide Seek Duration in Seconds`);
    } else {
      queue.seek(seek);
      client.embed(
        message,
        `${client.config.emoji.SUCCESS} Seeked \`${seek}\` Seconds !!`
      );
    }
  },
};