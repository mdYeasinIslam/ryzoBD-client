export const config = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,

  telegramChatId: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
  telegramBotToken: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN,
};
