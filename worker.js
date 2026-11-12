export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Проверяем, что запрос идет к нашему боту (можно не проверять, но так безопаснее)
    if (!url.pathname.startsWith('/bot')) {
      return new Response('Not a Telegram API request', { status: 404 });
    }

    // Формируем URL для Telegram API
    const telegramUrl = `https://api.telegram.org${url.pathname}${url.search}`;

    // Клонируем запрос и меняем хост
    const newRequest = new Request(telegramUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow',
    });

    try {
      // Отправляем запрос в Telegram и возвращаем ответ
      const response = await fetch(newRequest);
      
      // Возвращаем ответ с CORS-заголовками (на всякий случай)
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      
      return newResponse;
    } catch (e) {
      return new Response(`Worker Error: ${e.message}`, { status: 500 });
    }
  },
};
