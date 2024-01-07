const {
  CommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandType,
} = require("discord.js");
const ANYA = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "replay",
  description: `เล่นเพลงปัจจุบันของ Queue ซ้ำมั้ยคะ`,
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
    queue.seek(0);
    client.embed(
      interaction,
      `${client.config.emoji.SUCCESS} Replaying Track !!`
    );
  },
};
