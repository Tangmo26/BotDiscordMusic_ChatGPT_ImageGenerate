const { ChannelType, PermissionFlagsBits } = require("discord.js");
const client = require("../index");
timeThreshold = 20*(60*1000)
// timeThreshold = 10000

client.on("voiceStateUpdate", async (os, ns) => {
  if (!ns.guild || ns.member.user.bot) return;

  // auto speak in stage channel
  if (
    ns.channelId &&
    ns.channel.type === ChannelType.GuildStageVoice &&
    ns.guild.members.me.voice?.suppress
  ) {
    if (
      ns.guild.members.me.permissions.has(PermissionFlagsBits.Speak) ||
      (ns.channel &&
        ns.channel
          .permissionsFor(ns.guild.members.me)
          .has(PermissionFlagsBits.Speak))
    ) {
      ns.guild.members.me.voice.setSuppressed(false).catch((e) => {});
    }
  }
  const botVoiceChannel = ns.guild.members.me.voice?.channel;
  // check if the user left the voice channel
  if (botVoiceChannel) {
    // console.log("Original channel:", os.channelId);
    // console.log("New channel:", ns.channelId);
    // console.log("Bot's voice channel:", botVoiceChannel ? botVoiceChannel.id : "None");
    if(botVoiceChannel.members.size === 1) {
      setTimeout(() => {
        if (botVoiceChannel.members.size === 1) {
          ns.guild.members.me.voice.disconnect()
        }
      }, timeThreshold);
    }
  }
});
