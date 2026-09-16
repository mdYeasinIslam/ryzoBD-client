import { config } from "@/config";

export const TelegramService = {
  async sentMsg(message: string) {
    try {
      const apiUrl = `https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: config.telegramChatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error("Telegram message send error:", error);
      return error;
    }
  },
};
