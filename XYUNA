export default {
  async fetch(request) {
    const url = new URL(request.url);
    // Перенаправляем на официальный API Telegram, сохраняя путь и параметры
    const telegramUrl = `https://api.telegram.org${url.pathname}${url.search}`;

    return fetch(telegramUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== "GET" && request.method !== "HEAD" ? request.body : undefined,
    });
  },
};
