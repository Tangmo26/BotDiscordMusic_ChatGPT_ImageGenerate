const {
  CommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandType,
} = require("discord.js");
const ANYA = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "help",
  description: `ต้องการความช่วยเหลือจากอาเนียอะป่าว?`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.EmbedLinks,
  category: "Information",
  cooldown: 5,
  type: ApplicationCommandType.ChatInput,
  inVoiceChannel: false,
  inSameVoiceChannel: false,
  Player: false,
  djOnly: false,

  /**
   *
   * @param {ANYA} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   * @param {Queue} queue
   */
  run: async (client, interaction, args, queue) => {
    // Code
    // await client.handleHelpSystem(interaction);
    await client.HelpCommand(interaction);
  },
};
