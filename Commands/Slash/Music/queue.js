const {
  CommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandType,
} = require("discord.js");
const ANYA = require("../../../handlers/Client");
const { Queue } = require("distube");
const { swap_pages } = require("../../../handlers/functions");

module.exports = {
  name: "queue",
  description: `ดู Queue ปัจจุบันพร้อมเลขหน้าเลยนะคะ`,
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
    if (!queue.songs.length) {
      return client.embed(
        interaction,
        `${client.config.emoji.ERROR} Nothing in Queue`
      );
    } else {
      let embeds = await client.getQueueEmbeds(queue);
      await swap_pages(interaction, embeds);
    }
  },
};
