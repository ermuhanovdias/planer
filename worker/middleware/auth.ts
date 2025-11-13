import { Context, Next } from 'hono';
import { 
  verifyFirebaseAuth, 
  getFirebaseToken, 
  VerifyFirebaseAuthEnv 
} from '@hono/firebase-auth';

// Create auth middleware instance
export function createAuthMiddleware() {
  return verifyFirebaseAuth({
    projectId: 'dias-f4f3d',
    // Optional: customize authorization header key
    authorizationHeaderKey: 'Authorization',
    // Optional: disable error logging if needed
    disableErrorLog: false,
  });
}

// Helper to get authenticated user from context
export function getAuthUser(c: Context) {
  try {
    const token = getFirebaseToken(c);
    return token;
  } catch (error) {
    console.error('Failed to get auth user:', error);
    return null;
  }
}

// Middleware to require authentication
export async function requireAuth(c: Context, next: Next) {
  const token = getAuthUser(c);
  
  if (!token) {
    return c.json({
      success: false,
      error: 'Unauthorized: No valid authentication token provided'
    }, 401);
  }
  
  await next();
}

export type { VerifyFirebaseAuthEnv };

