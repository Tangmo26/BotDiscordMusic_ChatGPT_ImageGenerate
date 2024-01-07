const {
  CommandInteraction,
  EmbedBuilder,
  version,
  PermissionFlagsBits,
  ApplicationCommandType,
} = require("discord.js");
const ANYA = require("../../../handlers/Client");
const { Queue } = require("distube");
const os = require("systeminformation");
const { msToDuration, formatBytes } = require("../../../handlers/functions");

module.exports = {
  name: "stats",
  description: `ดูสถานะ`,
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
    let memory = await os.mem();
    let cpu = await os.cpu();
    let cpuUsage = await (await os.currentLoad()).currentLoad;
    let osInfo = await os.osInfo();
    let TotalRam = formatBytes(memory.total);
    let UsageRam = formatBytes(memory.used);

    interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.embed.color)
          .setTitle("สถานะ")
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(
            `> ** Made by [\` Anya Forger \`](https://www.instagram.com/spyfamily_en/) **`
          )
          .addFields([
            {
              name: `⏳ Memory Usage`,
              value: `\`${UsageRam}\` / \`${TotalRam}\``,
            },
            {
              name: `⌚️ Uptime`,
              value: `\`${msToDuration(client.uptime)}\``,
            },
            {
              name: `📁 Users`,
              value: `\`${client.guilds.cache.size} \``,
              inline: true,
            },
            {
              name: `📁 Servers`,
              value: `\`${client.guilds.cache.size}\``,
              inline: true,
            },
            {
              name: `📁 Channels`,
              value: `\`${client.channels.cache.size}\``,
              inline: true,
            },
            {
              name: `📇 Discord.JS`,
              value: `\`v${version}\``,
              inline: true,
            },
            {
              name: `💘 Node`,
              value: `\`${process.version}\``,
              inline: true,
            },
            {
              name: `💞 Ping`,
              value: `\`${client.ws.ping}ms\``,
              inline: true,
            },
            {
              name: `💕 CPU usage`,
              value: `\`${Math.floor(cpuUsage)}%\``,
              inline: true,
            },
            {
              name: `💝 Arch`,
              value: `\`${osInfo.arch}\``,
              inline: true,
            },
            {
              name: `💜 Platform`,
              value: `\`\`${osInfo.platform}\`\``,
              inline: true,
            },
            {
              name: `💘 CPU`,
              value: `\`\`\`fix\n${cpu.brand}\`\`\``,
            },
          ])
          .setFooter(client.getFooter(interaction.user)),
      ],
    });
  },
};
