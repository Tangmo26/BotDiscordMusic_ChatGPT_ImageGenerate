const client = require("../index");
const { cooldown, check_dj, databasing } = require("../handlers/functions");
const { emoji } = require("../settings/config");
const {
  ApplicationCommandOptionType,
  PermissionsBitField,
} = require("discord.js");

client.on("interactionCreate", async (interaction) => {
  // Slash Command Handling
  if (interaction.isCommand()) {
    await interaction.deferReply().catch((e) => {});
    await databasing(interaction.guildId, interaction.user.id);
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd)
      return client.embed(
        interaction,
        `${emoji.ERROR} \`${interaction.commandName}\` Command Not Found `
      );
    const args = [];
    for (let option of interaction.options.data) {
      if (option.type === ApplicationCommandOptionType.Subcommand) {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    if (cmd) {
      // checking user perms
      let queue = client.distube.getQueue(interaction.guild.id);
      let voiceChannel = interaction.member.voice.channel;
      let botChannel = interaction.guild.members.me.voice.channel;
      let checkDJ = await check_dj(client, interaction.member, queue?.songs[0]);
      if (
        !interaction.member.permissions.has(
          PermissionsBitField.resolve(cmd.userPermissions)
        )
      ) {
        return client.embed(
          interaction,
          `เธอไม่ได้รับอนุญาตให้ใช้ \`${cmd.name}\` Command นะ!!`
        );
      } else if (
        !interaction.guild.members.me.permissions.has(
          PermissionsBitField.resolve(cmd.botPermissions)
        )
      ) {
        return client.embed(
          interaction,
          `อาเนียไม่ได้รับอนุญาตให้เรียกใช้ \`${cmd.name}\` Command!!`
        );
      } else if (cooldown(interaction, cmd)) {
        return client.embed(
          interaction,
          ` เธอ Cooldown อยู่นะ, รอแปปนึง 🥰 \`${cooldown(
            interaction,
            cmd
          ).toFixed()}\` Seconds`
        );
      } else if (cmd.inVoiceChannel && !voiceChannel) {
        return client.embed(
          interaction,
          `${emoji.ERROR} เธอต้องเข้าร่วม Voice Channel ก่อนนะคะ`
        );
      } else if (
        cmd.inSameVoiceChannel &&
        botChannel &&
        !botChannel?.equals(voiceChannel)
      ) {
        return client.embed(
          interaction,
          `${emoji.ERROR} เธอต้องเข้าร่วม ${botChannel} Voice Channel ก่อนนะคะ`
        );
      } else if (cmd.Player && !queue) {
        return client.embed(interaction, `${emoji.ERROR} Music Not Playing`);
      } else if (cmd.djOnly && checkDJ) {
        return client.embed(
          interaction,
          `${emoji.ERROR} เธอต้องเป็น Dj ก่อนนะคะถึงจะขอเพลงได้..`
        );
      } else {
        cmd.run(client, interaction, args, queue);
      }
    }
  }

  // Context Menu Handling
  if (interaction.isContextMenuCommand()) {
    await interaction.deferReply({ ephemeral: true }).catch((e) => {});
    const command = client.commands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }

  // button handling
  if (interaction.isButton()) {
    await interaction.deferUpdate().catch((e) => {});
  }
  // menu handling
  if (interaction.isAnySelectMenu()) {
    await interaction.deferUpdate().catch((e) => {});
  }
});