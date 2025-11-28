import TelegramBot from "node-telegram-bot-api";
import express from "express";

const app = express();
app.get("/", (req, res) => res.send("Bot is running"));
app.listen(10000);

// =========================
// 🔑 ВСТАВ СВІЙ TOKEN ТУТ
// =========================
const TOKEN = process.env.BOT_TOKEN;

// створюємо бота
const bot = new TelegramBot(TOKEN, { polling: true });


// =========================
//      КОМАНДИ
// =========================

// /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Привіт! Бот працює 😊\n(Пізніше я додам 3-тижневий цикл і контент)"
  );
});

// /help
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Список команд:\n/start – почати\n/help – допомога"
  );
});

console.log("Bot is running…");
