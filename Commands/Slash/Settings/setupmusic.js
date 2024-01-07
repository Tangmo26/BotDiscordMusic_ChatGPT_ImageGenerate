const {
  CommandInteraction,
  ChannelType,
  PermissionFlagsBits,
  ApplicationCommandType,
} = require("discord.js");
const ANYA = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "setupmusic",
  description: `สร้างช่องสำหรับเปิดเพลงกันเถอะ`,
  userPermissions: PermissionFlagsBits.ManageChannels,
  botPermissions: PermissionFlagsBits.ManageChannels,
  category: "Settings",
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
    let channel = await client.music.get(
      `${interaction.guild.id}.music.channel`
    );
    let oldChannel = interaction.guild.channels.cache.get(channel);
    console.log('id music : '+channel);
    if (oldChannel) {
      return client.embed(
        interaction,
        `** ${client.config.emoji.ERROR} Music Request Channel ติดตั้งเรียบร้อยแล้ว ${oldChannel} ลบก่อนและติดตั้งอีกครั้งนะคะ **`
      );
    } else {
      interaction.guild.channels
        .create({
          name: `${client.user.username}-คอนเสิร์ต🎤`,
          type: ChannelType.GuildText,
          rateLimitPerUser: 3,
          reason: `for music bot`,
          topic: `ใครอยากฟัง ${client.user.username} ร้องเพลงบ้าง พิมพ์ชื่อเพลงหรือลิ้งค์เพลงมานะคะ :heart:`,
        })
        .then(async (ch) => {
          await ch
            .send({ embeds: [client.queueembed(interaction.guild)] })
            .then(async (queuemsg) => {
              await ch
                .send({
                  embeds: [client.playembed(interaction.guild)],
                  components: [client.buttons(true)],
                })
                .then(async (playmsg) => {
                  await client.music.set(`${interaction.guild.id}.music`, {
                    channel: ch.id,
                    pmsg: playmsg.id,
                    qmsg: queuemsg.id,
                  });
                  client.embed(
                    interaction,
                    `${client.config.emoji.SUCCESS} ติดตั้งระบบเพลงสำเร็จใน ${ch}`
                  );
                });
            });
        });
    }
  },
};
