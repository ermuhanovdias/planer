import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
};

const versionRouter = new Hono<{ Bindings: Bindings }>();

// Get current version
versionRouter.get('/', async (c) => {
  try {
    const result = await c.env.DB.prepare(
      "SELECT version, release_date, description FROM app_version WHERE is_current = 1"
    ).first();
    
    return c.json({
      success: true,
      data: result
    });
  } catch (error) {
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Get all versions
versionRouter.get('/all', async (c) => {
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

export default versionRouter;

