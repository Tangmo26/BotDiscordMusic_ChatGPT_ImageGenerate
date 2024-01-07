const { ActivityType } = require("discord.js");
const client = require("../index");

client.on("ready", async () => {
  console.log('The bot is online!');

  const activities = [
    {
      name : 'Official髭男dism - Mixed Nuts',
      type : ActivityType.Listening,
    },
    {
      name : 'BUMP OF CHICKEN「SOUVENIR」。',
      type : ActivityType.Listening,
    },
    {
      name : 'YOASOBI「アイドル」',
      type : ActivityType.Listening,
    },
    {
      name : 'yama『色彩』',
      type : ActivityType.Listening,
    },
    {
      name : 'Waku Waku',
      type : ActivityType.Playing,

    },
    {
      name : 'kawaii',
      type : ActivityType.Watching,
    },
    {
      name : 'Rov',
      type : ActivityType.Playing,
    },
    {
      name : 'Valorant',
      type : ActivityType.Playing,
    },
    {
      name : 'เหงาอ่ะ ;-;',
      type : ActivityType.Watching,
    },
    {
      name : 'เสียใจT-T',
      type : ActivityType.Watching,
    },
    {
      name : 'วันนี้มีเรื่อง Waku Waku ด้วยแหละ💓',
      type : ActivityType.Watching,
    },
    {
      name : 'one piece น่ะมีอยู่จริง',
      type : ActivityType.Listening,
    },
    {
      name : 'มีถั่วมั้ย!!',
      type : ActivityType.Playing,
    },
    {
      name : 'จะเป็นราชาโจรสลัดให้ได้เลย',
      type : ActivityType.Playing,
    },
    {
      name : 'Anime',
      type : ActivityType.Watching,
    },
    {
      name : 'おはよう!',
      type : ActivityType.Playing,
    },
    {
      name : 'หาของกิน',
      type : ActivityType.Playing,
    },
    {
      name : 'มีความรัก',
      type : ActivityType.Watching,
    },
    {
      name : 'ดวง!!',
      type : ActivityType.Watching,
    },
  ];

  setInterval(() => {
    const status = activities[Math.floor(Math.random() * activities.length)]
    client.user.setActivity(status);
  }, 300000);

  // loading database
  await require("../handlers/Database")(client);

  // loading dashboard
  require("../server");

  client.guilds.cache.forEach(async (guild) => {
    await client.updateembed(client, guild);
  });
});
