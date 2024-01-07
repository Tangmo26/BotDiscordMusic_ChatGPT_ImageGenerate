const { Message, ChannelType, PermissionFlagsBits } = require("discord.js");
const ANYA = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "setupmusic",
  aliases: ["setmusic", "setup"],
  description: `สร้างช่องสำหรับเปิดเพลงกันเถอะ`,
  userPermissions: PermissionFlagsBits.ManageGuild,
  botPermissions: PermissionFlagsBits.ManageChannels,
  category: "Settings",
  cooldown: 5,
  inVoiceChannel: false,
  inSameVoiceChannel: false,
  Player: false,
  djOnly: false,

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
    let channel = await client.music.get(`${message.guild.id}.music.channel`);
    let oldChannel = message.guild.channels.cache.get(channel);
    if (oldChannel) {
      return client.embed(
        message,
        `** ${client.config.emoji.ERROR} Music Request Channel ติดตั้งเรียบร้อยแล้ว ${oldChannel} ลบก่อนและติดตั้งอีกครั้งนะคะ **`
      );
    } else {
      message.guild.channels
        .create({
          name: `${client.user.username}-คอนเสิร์ต🎤`,
          type: ChannelType.GuildText,
          rateLimitPerUser: 3,
          reason: `for music bot`,
          topic: `ใครอยากฟัง ${client.user.username} ร้องเพลงบ้าง พิมพ์ชื่อเพลงหรือลิ้งค์เพลงมานะคะ :heart:`,
        })
        .then(async (ch) => {
          await ch
            .send({ embeds: [client.queueembed(message.guild)] })
            .then(async (queuemsg) => {
              await ch
                .send({
                  embeds: [client.playembed(message.guild)],
                  components: [client.buttons(true)],
                })
                .then(async (playmsg) => {
                  await client.music.set(`${message.guild.id}.music`, {
                    channel: ch.id,
                    pmsg: playmsg.id,
                    qmsg: queuemsg.id,
                  });
                  client.embed(
                    message,
                    `${client.config.emoji.SUCCESS} ติดตั้งระบบเพลงสำเร็จใน ${ch}`
                  );
                });
            });
        });
    }
  },
};
