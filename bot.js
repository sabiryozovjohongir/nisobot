const { Telegraf } = require('telegraf');
const cron = require('node-cron');
const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// SOZLAMALAR
const BOT_TOKEN = "8715988693:AAGEWxHC0OCssvV5FxD9JFUq1fYJDu9IZZY";
const VIDEO_LINK = "https://youtu.be/wHSXNSadEdM";
const VIDEO_NOTE_FILE = ""; // Fayl manzili to'g'riligini tekshiring

const bot = new Telegraf(BOT_TOKEN);
let users = new Set(); // Foydalanuvchilar ID lari (bazaga ulamaguncha vaqtinchalik)

// Web server (Render/Heroku kabi servislar uchun)
app.get('/', (req, res) => res.send('Bot ishlayapti...'));
app.listen(PORT, () => console.log(`Server ${PORT}-portda yondi`));

// BOT START KOMANDASI
bot.start(async (ctx) => {
    const chatId = ctx.chat.id;
    const firstName = ctx.from.first_name;
    users.add(chatId); 

    try {
        // await ctx.reply(`Assalomu alaykum ${firstName}! Loyihaga xush kelibsiz. 👋`);
        await ctx.reply(`Assalamu aleykum Xush kelibsiz!  
Stress va depressiyadan qutulish uchun birinchi qadamni tashladingiz.  

Va'da qilingan 'Stressdan chiqish:  videosini quyidagi tugma orqali ko'rishingiz mumkin:  

                👉 ${VIDEO_LINK}`);

        console.log("5 daqiqalik kutish boshlandi...");

        // 5 daqiqadan keyin dumaloq video yuborish
        // setTimeout(async () => {
        //     try {
        //         if (fs.existsSync(VIDEO_NOTE_FILE)) {
        //             await ctx.sendVideoNote({ source: VIDEO_NOTE_FILE });
        //             console.log(`${chatId} ga dumaloq video yuborildi.`);
        //         } else {
        //             console.error("Xato: Dumaloq video fayli topilmadi!");
        //         }
        //     } catch (err) {
        //         console.error("Video yuborishda xatolik:", err.message);
        //         // Muammo bo'lsa, oddiy video sifatida yuborib ko'rish
        //         try {
        //             await ctx.sendVideo({ source: VIDEO_NOTE_FILE });
        //         } catch (e) {
        //             console.error("Hatto oddiy video ham ketmadi.");
        //         }
        //     }
        // }, 5 * 60 * 1000); 

    } catch (error) {
        console.error("Start xatosi:", error.message);
    }
});

// HAR KUNI TOSHКENT VAQTI BILAN 10:00 DA (UTC +5)
// cron.schedule('0 5 * * *', () => {
//     users.forEach(async (chatId) => {
//         try {
//             await bot.telegram.sendMessage(chatId, "Xayrli tong! Bugungi video: https://youtube.com/link_daily");
//         } catch (err) {
//             console.error(`Xabarni ${chatId} ga yuborib bo'lmadi:`, err.message);
//         }
//     });
//     console.log("Kundalik xabarlar yuborish jarayoni yakunlandi.");
// });

// Botni ishga tushirish
bot.launch()
    .then(() => console.log("Bot muvaffaqiyatli ishga tushdi ✅"))
    .catch((err) => console.error("Botni ishga tushirishda xato:", err));

// Xavfsiz o'chirish
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
