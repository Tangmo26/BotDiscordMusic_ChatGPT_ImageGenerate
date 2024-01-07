const {
  CommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} = require("discord.js");
const ANYA = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "seek",
  description: `seek then current song`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 5,
  type: ApplicationCommandType.ChatInput,
  inVoiceChannel: true,
  inSameVoiceChannel: true,
  Player: true,
  djOnly: true,
  options: [
    {
      name: "amount",
      description: `ต้องการฟังเพลงวินาทีที่เท่าไหร่ดีคะ`,
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],

  /**
   *
   * @param {ANYA} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   * @param {Queue} queue
   */
  run: async (client, interaction, args, queue) => {
    // Code
    let seek = interaction.options.getNumber("amount");
    await queue.seek(seek);
    client.embed(
      interaction,
      `${client.config.emoji.SUCCESS} Seeked \`${seek}\` Seconds !!`
    );
  },
};
