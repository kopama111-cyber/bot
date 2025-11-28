import TelegramBot from "node-telegram-bot-api";
import express from "express";

const TOKEN = process.env.BOT_TOKEN;
const URL = process.env.RENDER_EXTERNAL_URL; // Render сам підставляє твій домен
const PORT = process.env.PORT || 10000;

const app = express();
app.use(express.json());

// Створюємо бота без polling
const bot = new TelegramBot(TOKEN, { polling: false });

// Webhook endpoint — Telegram буде сюди присилати повідомлення
app.post("/webhook", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Установлюємо webhook при запуску
bot.setWebHook(`${URL}/webhook`);

app.get("/", (req, res) => res.send("Bot is running (webhook mode)"));

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// =========================
//      КОМАНДИ
// =========================

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Привіт! Бот працює 😊\n(Пізніше я додам 3-тижневий цикл і контент)"
  );
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Список команд:\n/start – почати\n/help – допомога"
  );
});

console.log("Bot is running in WEBHOOK mode…");
