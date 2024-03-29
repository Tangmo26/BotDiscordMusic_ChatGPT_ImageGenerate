const {
  CommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandType,
} = require("discord.js");
const ANYA = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "playprevious",
  description: `เล่นเพลงก่อนหน้าใน Queue มั้ยคะ`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 5,
  type: ApplicationCommandType.ChatInput,
  inVoiceChannel: true,
  inSameVoiceChannel: true,
  Player: true,
  djOnly: true,

  /**
   *
   * @param {ANYA} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   * @param {Queue} queue
   */
  run: async (client, interaction, args, queue) => {
    // Code
    if (!queue.previousSongs.length) {
      return client.embed(
        interaction,
        `${client.config.emoji.ERROR} Previous Song Not Found !!`
      );
    } else {
      await queue.previous().then((m) => {
        client.embed(
          interaction,
          `${client.config.emoji.SUCCESS} Playing Previous Track !!`
        );
      });
    }
  },
};
