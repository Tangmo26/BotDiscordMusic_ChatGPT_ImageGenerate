require("dotenv").config();
const ANYA = require("./handlers/Client");
const { TOKEN } = require("./settings/config");

const client = new ANYA();

module.exports = client;

try{
  client.start(TOKEN);
}catch (error) {
  console.log(`ERR: ${error}`);
};


process.on("unhandledRejection", (reason, p) => {
  console.log(" [Error_Handling] :: Unhandled Rejection/Catch");
  console.log(reason, p);
});

process.on("uncaughtException", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch");
  console.log(err, origin);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
});
