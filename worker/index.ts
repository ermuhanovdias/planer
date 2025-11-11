export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API для получения текущей версии приложения
    if (url.pathname === "/api/version") {
      try {
        const result = await env.DB.prepare(
          "SELECT version, release_date, description FROM app_version WHERE is_current = 1"
        ).first();
        
        return Response.json({
          success: true,
          data: result
        });
      } catch (error) {
        return Response.json({
          success: false,
          error: error.message
        }, { status: 500 });
      }
    }

    // API для получения всех версий
    if (url.pathname === "/api/versions") {
      try {
        const { results } = await env.DB.prepare(
          "SELECT * FROM app_version ORDER BY created_at DESC"
        ).all();
        
        return Response.json({
          success: true,
          data: results
        });
      } catch (error) {
        return Response.json({
          success: false,
          error: error.message
        }, { status: 500 });
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return Response.json({
        name: "Cloudflare",
        message: "API endpoint не найден"
      }, { status: 404 });
    }

    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
