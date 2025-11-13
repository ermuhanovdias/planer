import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Sign up new user
  async function signup(email: string, password: string, displayName?: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name if provided
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }

      // Send email verification
      await sendEmailVerification(userCredential.user);

      // Do NOT store token yet - user needs to verify email first
      // The user will be signed out and redirected to verify email page
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  // Log in existing user
  async function login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        // Sign out the user if email is not verified
        await signOut(auth);
        throw new Error('EMAIL_NOT_VERIFIED');
      }
      
      // Get and store token
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Log out user
  async function logout() {
    try {
      await signOut(auth);
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // Get current user ID token
  async function getIdToken(): Promise<string | null> {
    try {
      if (!currentUser) {
        return null;
      }
      
      // Force refresh token to ensure it's not expired
      const token = await currentUser.getIdToken(true);
      localStorage.setItem('authToken', token);
      return token;
    } catch (error) {
      console.error('Get token error:', error);
      return null;
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Only set user if email is verified
      if (user && user.emailVerified) {
        setCurrentUser(user);
        
        // Update token in localStorage when user state changes
        try {
          const token = await user.getIdToken();
          localStorage.setItem('authToken', token);
        } catch (error) {
          console.error('Token refresh error:', error);
        }
      } else {
        setCurrentUser(null);
        localStorage.removeItem('authToken');
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Refresh token periodically (every 50 minutes, tokens expire after 1 hour)
  useEffect(() => {
    if (!currentUser) return;

    const interval = setInterval(async () => {
      try {
        const token = await currentUser.getIdToken(true);
        localStorage.setItem('authToken', token);
      } catch (error) {
        console.error('Token refresh error:', error);
      }
    }, 50 * 60 * 1000); // 50 minutes

    return () => clearInterval(interval);
  }, [currentUser]);

  const value: AuthContextType = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    getIdToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

