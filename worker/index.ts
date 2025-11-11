import { Hono } from 'hono';
import versionRouter from './routes/version';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Mount version routes
app.route('/api/version', versionRouter);

// For backward compatibility
app.get('/api/versions', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT * FROM app_version ORDER BY created_at DESC"
    ).all();
    
    return c.json({
      success: true,
      data: results
    });
  } catch (error) {
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// 404 handler for non-existent API endpoints
app.notFound((c) => {
  if (c.req.path.startsWith('/api/')) {
    return c.json({
      name: "Cloudflare",
      message: "API endpoint not found"
    }, 404);
  }
  return c.text('Not Found', 404);
});

export default app;
