const TelegramBot = require("node-telegram-bot-api");
const { TTraffic } = require("./utils");
const { TrafficCommandEnums } = require("./types");
const { getVnstatByType } = require("./vnstat");
// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const token = "YOUR_BOT_TOKEN";
const bot = new TelegramBot(token, { polling: true });

// Define the menu buttons
const menuOptions = {
  topLevelMenusOptions: {
    reply_markup: {
      keyboard: [["/traffic", "/account"]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  },
  trafficMenuOptions: {
    reply_markup: {
      keyboard: [
        [
          TrafficCommandEnums.BACK,
          TrafficCommandEnums.HOURLY,
          TrafficCommandEnums.DAILY,
          TrafficCommandEnums.MONTHLY,
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  },
};
/* Business Logics */

/* BOT Logics */
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome! Use the menu below:",
    menuOptions.topLevelMenusOptions
  );
});

// Start listening to the bot
bot.onText(/\/traffic/, (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  console.log("DEBUG:: command text is: ", text);
  const type = TTraffic.getTrafficTypeFromCommandText(text);
  console.log("DEBUG:: command type is: ", type);
  getVnstatByType(type, (message) => {
    console.log("DEBUG:: the Vnstat message is: ", message);
    bot.sendMessage(chatId, message, menuOptions.trafficMenuOptions);
  });

});

bot.on("polling_error", (error) => {
  console.error(`Polling error: ${JSON.stringify(error)}`);
});
