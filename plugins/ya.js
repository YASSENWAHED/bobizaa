import { ttSearch } from '../lib/tiktoksearch.js'; // استيراد الوحدة النمطية اللازمة

const {
  smd,
  prefix,
  smdBuffer,
} = require("../lib");

smd({
  pattern: "ya", // نمط الرسالة لتنشيط الأمر
  desc: "search for TikTok videos",
  type: "user",
  use: "<text>",
  filename: __filename,
},
async (message, match) => {
  try {
    if (!message.reply_message) return message.reply('*_Reply to a message!_*');
    let jids = match.match(/[0-9]+(-[0-9]+|)(@g.us|@s.whatsapp.net)/g) || [];
    if (!jids || !jids[0]) return await message.send(`*Provide jid to forward message*\n*use _${prefix}jid_, to get jid of gc/user!*`);

    const options = {};

    if (message.reply_message.audio) {
      var duration = [200001355, 3999600, 359996400];
      options.seconds = duration[Math.floor(Math.random() * duration.length)];
      options.ptt = true;
    }

    let thmb = await smdBuffer("https://telegra.ph/file/c0b869e0b5e1f82dd2f6c.jpg");

    options.quoted = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        id: message.bot.messageId()
      },
      message: {
        extendedTextMessage: {
          "text": "IT'S SUHAIL MD♡"
        }
      }
    };

    options.contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
      externalAdReply: {
        title: "𝑇𝛩𝑈𝐶𝛨 𝛭𝛯 💥 " || "Suhail Tech Info♡",
        body: "⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ⇆",
        thumbnail: thmb,
        mediaType: 1,
        renderLargerThumbnail: true,
        mediaUrl: "",
        sourceUrl: "https://wa.me/923184474176?text=*Hey,+Big+Fan+Suhail+Ser* 🫦🫦",
      },
    };

    for (let i = 0; i < jids.length; i++) {
      message.bot.forwardOrBroadCast(jids[i], message.reply_message, options);
    }
  } catch (e) {
    message.error(`${e}\n\ncommand : ya`, e);
  }
});

// تعليمات لاستخدام المعالج
handler.help = ['ya'];
// العلامات المرتبطة بالمعالج
handler.tags = ['search'];
// نمط الأمر لتنشيط المعالج
handler.command = /^(ya)$/i;

// تصدير المعالج كافتراضي
export default handler;
