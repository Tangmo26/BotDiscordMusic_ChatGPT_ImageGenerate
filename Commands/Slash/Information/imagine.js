const {
  ApplicationCommandOptionType,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  PermissionFlagsBits,
  CommandInteraction
} = require('discord.js');
const models = require('../../../models');
const ANYA = require("../../../handlers/Client");

module.exports = {
  name: 'imagine',
  description: 'วาดรูปจาก prompt ที่คุณให้',
  userPermissions: [],
  botPermissions: [],
  category: "Information",
  cooldown: 5,
  inVoiceChannel: false,
  inSameVoiceChannel: false,
  Player: false,
  djOnly: false,
  options: [
    {
      name: 'prompt',
      description: 'Enter your prompt',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'model',
      description: 'The image model',
      type: ApplicationCommandOptionType.String,
      choices: models,
      required: false,
    },
  ],
  /**
   *
   * @param {ANYA} client
   */
  run: async (client, interaction) => {
    try {
      const { default: Replicate } = await import('replicate');

      const replicate = new Replicate({
        auth: process.env.REPLICATE_API_KEY,
      });

      const prompt = interaction.options.getString('prompt');
      const model = interaction.options.getString('model') || models[0].value;

      const output = await replicate.run(model, { input: { prompt } });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel(`Download`)
          .setStyle(ButtonStyle.Link)
          .setURL(`${output[0]}`)
          .setEmoji('1101133529607327764')
      );

      const resultEmbed = new EmbedBuilder()
        .setTitle('อาเนียวาดรูปให้นะคะ')
        .addFields({ name: 'Prompt', value: prompt })
        .setImage(output[0])
        .setColor('#F59D99')
        .setFooter({
          text: `Requested by ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        });

      await interaction.editReply({
        embeds: [resultEmbed],
        components: [row],
      });
    } catch (error) {
      const errEmbed = new EmbedBuilder()
        .setTitle('เกิดข้อผิดพลาด')
        .setDescription('```' + error + '```')
        .setColor(0xe32424);

      interaction.editReply({ embeds: [errEmbed] });
    }
  },

  data: {
    name: 'imagine',
    description: 'Generate an image using a prompt.',
    options: [
      {
        name: 'prompt',
        description: 'Enter your prompt',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'model',
        description: 'The image model',
        type: ApplicationCommandOptionType.String,
        choices: models,
        required: false,
      },
    ],
  },
};