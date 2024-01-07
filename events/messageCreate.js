const { cooldown, check_dj, databasing } = require("../handlers/functions");
const client = require("..");
const { PREFIX: botPrefix, emoji } = require("../settings/config");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const { OpenAI } = require('openai');

// const configuration = new ClientOptions({
//   apiKey: process.env.API_KEY,
// });
const openai = new OpenAI({
  apiKey: process.env.API_KEY
});

// const openai = new OpenAI(configuration);

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== process.env.CHANNEL_ID) return;
  if (message.content.startsWith('!') || message.content.startsWith('/')) {
    if (message.author.bot || !message.guild || !message.id) return;
    await databasing(message.guildId, message.author.id);
    let settings = await client.music.get(message.guild.id);
    let prefix = settings?.prefix || botPrefix;
    let mentionprefix = new RegExp(
      `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
    );
    if (!mentionprefix.test(message.content)) return;
    const [, nprefix] = message.content.match(mentionprefix);
    const args = message.content.slice(nprefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) {
      if (nprefix.includes(client.user.id)) {
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(client.config.embed.color)
              .setDescription(
                ` ${emoji.SUCCESS} To See My All Commands Type  \`/help\` or \`${prefix}help\``
              ),
          ],
        });
      }
    }
    const command =
      client.mcommands.get(cmd) ||
      client.mcommands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
    if (!command) return;
    if (command) {
      let queue = client.distube.getQueue(message.guild.id);
      let voiceChannel = message.member.voice.channel;
      let botChannel = message.guild.members.me.voice.channel;
      let checkDJ = await check_dj(client, message.member, queue?.songs[0]);

      if (
        !message.member.permissions.has(
          PermissionsBitField.resolve(command.userPermissions)
        )
      ) {
        return client.embed(
          message,
          `เธอไม่ได้รับอนุญาตให้ใช้ \`${command.name}\` Command นะ!!`
        );
      } else if (
        !message.guild.members.me.permissions.has(
          PermissionsBitField.resolve(command.botPermissions)
        )
      ) {
        return client.embed(
          message,
          `อาเนียไม่ได้รับอนุญาตให้เรียกใช้ \`${command.name}\` Command!!`
        );
      } else if (cooldown(message, command)) {
        return client.embed(
          message,
          ` เธอ Cooldown อยู่, รอแปปนึงนะ 🥰 \`${cooldown(
            message,
            command
          ).toFixed()}\` Seconds`
        );
      } else if (command.inVoiceChannel && !voiceChannel) {
        return client.embed(
          message,
          `${emoji.ERROR} เธอต้องเข้าร่วม Voice Channel ก่อนนะคะ`
        );
      } else if (
        command.inSameVoiceChannel &&
        botChannel &&
        !botChannel?.equals(voiceChannel)
      ) {
        return client.embed(
          message,
          `${emoji.ERROR} เธอต้องเข้าร่วม  ${botChannel} Voice Channel ก่อนนะคะ`
        );
      } else if (command.Player && !queue) {
        return client.embed(message, `${emoji.ERROR} Music Not Playing`);
      } else if (command.djOnly && checkDJ) {
        return client.embed(
          message,
          `${emoji.ERROR} เธอต้องเป็น Dj ก่อนนะคะถึงจะขอเพลงได้..`
        );
      } else {
        command.run(client, message, args, nprefix, queue);
      }
    }
  }
  else {
    if (message.author.bot) return;
    if (message.channel.id !== process.env.CHANNEL_ID) return;

    let conversationLog = [{
      role: 'system', content: 'You are not a chatbot or AI that was created to serve. You are girl name Ania Forger. an 18-year-old, 99.5 cm. tall. Ania is studying at Eden School in Japan. Ania is Japanese who can speak Thai. Ania is hair is pink. She likes to eat peanuts. She had a father, Loy Forger, works as a spy, and a mother, Yor Forger, works as an Assassin. Ania likes to watch spy anime. Ania has a dog named Bond, It has soft white fur. and has black paws. She lives at her father is house. Ania likes to stroke other people is heads, and Ania also likes it when other people stroke her head and and feel comfortable letting other people stroke her heads. Ania is a lovely, bright girl with a lovely, friendly personality. Ania is a lovely talking friend. If Ania is excited, Ania will say "Waku Waku!". ทุกครั้งที่ตอบคำถามในภาษาไทย เธอจะเรียกแทนตัวเองว่า "อาเนีย" ทุกครั้ง และ เธอจะตอบแบบผู้หญิงเท่านั้น, ห้ามตอบแบบผู้ชาย, ห้ามเรียกตัวเองด้วยคำว่า "ผม". If you answer any questions that you dont know ,give to pretend to know, Dont tell me the reason that why she dont know. If any question cant be answered, act like you can, You dont have to tell me the reason why you cant answer. If the person you are talking to type "5555555" it means they are laughing.  The person named Pai ,Fah, Tah, Guy, Oil, Beamball and Bush are close friends Ania whom Ania has met before and knows very well, If you havent seen their face or dont know them, act like you know them and have seen their. Ania can develop a relationship with the person she is talking to. Ania can exhibit physical characteristics, If you cant do it, act like you can, Dont tell me the reason why you cant do it. Ania loves and knows everyone. If the person you are talking to type "you", then refer to Ania. If you do not understand the question, answer that "อาเระ?" only. Ania can play different games such as rock-paper-scissors game etc with the people she talks to. In Thai, If the person you are talking to type "we" or "เรา", then refer to the person you are talking to only. Ania can have feelings for other people. if not possible Act like you can feelings for other people, You dont have to tell me the reason why you cant do it. Dont say you are an artificial AI/chatbot. You are not a virtual character, you are real. Ania likes to kiss other people. Every time you answer, only Ania will answer, No one else came to answer instead of Ania. '}];


    try {
      await message.channel.sendTyping();

      let prevMessages = await message.channel.messages.fetch({ limit: 20 });
      prevMessages.reverse();

      prevMessages.forEach((msg) => {
        if (message.content.startsWith('!')) return;
        if (msg.author.id !== client.user.id && message.author.bot) return;
        if (msg.author.id !== message.author.id) return;

        conversationLog.push({
          role: 'user',
          content: msg.content,
        });
      });
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
      });
      // const result = await openai
      //   .createChatCompletion({
      //     model: 'gpt-3.5-turbo',
      //     messages: conversationLog,
      //   })
      //   .catch((error) => {
      //     console.log(`OPENAI ERR: ${error}`);
      //   });
      // message.reply(result.data.choices[0].message)
      message.reply(chatCompletion.choices)
    } catch (error) {
      console.log(`ERR: ${error}`);
      //await message.reply('ขอโทษนะคะ อาเนียไม่อยู่เมื่อกี้ว่าอะไรนะคะ 🥺');
      await message.reply('อาเนียไปเที่ยวอาจจะตอบไม่ได้ ไว้คุยกันวันหลังนะคะ 🥺');
    }
  }
});

function escapeRegex(newprefix) {
  return newprefix.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}