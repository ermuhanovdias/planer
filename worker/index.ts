import { Hono } from 'hono';
import { cors } from 'hono/cors';
import versionRouter from './routes/version';
import { createAuthMiddleware, getAuthUser } from './middleware/auth';
import type { VerifyFirebaseAuthEnv } from './middleware/auth';

type Bindings = {
  DB: D1Database;
} & VerifyFirebaseAuthEnv;

const app = new Hono<{ Bindings: Bindings }>();

// CORS middleware - allow frontend to make requests
app.use('/api/*', cors({
  origin: '*', // In production, replace with your actual frontend domain
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Public routes (no auth required)
app.get('/api/health', (c) => {
  return c.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

// Apply Firebase Auth middleware to all /api/* routes except public ones
const authMiddleware = createAuthMiddleware();

// Protected routes - require authentication
app.use('/api/version/*', authMiddleware);
app.use('/api/versions', authMiddleware);

// Mount version routes (protected)
app.route('/api/version', versionRouter);

// For backward compatibility (protected)
app.get('/api/versions', async (c) => {
  try {
    const user = getAuthUser(c);
    
    // Optional: Log which user is accessing the API
    console.log('User accessing versions:', {
      uid: user?.uid,
      email: user?.email,
    });
    
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

// Get current authenticated user info
app.get('/api/auth/me', authMiddleware, (c) => {
  const user = getAuthUser(c);
  
  if (!user) {
    return c.json({
      success: false,
      error: 'Not authenticated'
    }, 401);
  }
  
  return c.json({
    success: true,
    data: {
      uid: user.uid,
      email: user.email,
      name: user.name,
      email_verified: user.email_verified,
    }
  });
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

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  
  // Handle Firebase Auth errors
  if (err.message.includes('Firebase') || err.message.includes('JWT')) {
    return c.json({
      success: false,
      error: 'Authentication failed: Invalid or expired token'
    }, 401);
  }
  
  return c.json({
    success: false,
    error: 'Internal server error'
  }, 500);
});

export default app;
