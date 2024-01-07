const {
  ContextMenuInteraction,
  ApplicationCommandType,
} = require("discord.js");
const ANYA = require("../../../handlers/Client");

module.exports = {
  name: "addtoqueue",
  type: ApplicationCommandType.Message,

  /**
   *
   * @param {ANYA} client
   * @param {ContextMenuInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
    let msg = await interaction.channel.messages.fetch(interaction.targetId);
    let song =
      msg.cleanContent || msg.embeds[0].description || msg.embeds[0].title;
    let voiceChannel = interaction.member.voice.channel;
    let botChannel = interaction.guild.members.me.voice.channel;
    if (!msg || !song) {
      return client.embed(
        interaction,
        `${client.config.emoji.ERROR} หาเพลงไม่เจออ่ะ`
      );
    } else if (!voiceChannel) {
      return client.embed(
        interaction,
        `${client.config.emoji.ERROR} คุณต้อง Join Voice Channel นะ `
      );
    } else if (botChannel && !botChannel?.equals(voiceChannel)) {
      return client.embed(
        interaction,
        `${client.config.emoji.ERROR} คุณต้อง Join ${botChannel} Voice Channel นะ`
      );
    } else {
      client.distube.play(voiceChannel, song, {
        member: interaction.member,
        textChannel: interaction.channel,
      });
      return client.embed(
        interaction,
        `${client.config.emoji.SUCCESS} กำลังค้นหา \`${song}\` เพลงบนโลกใบนี้`
      );
    }
  },
};
