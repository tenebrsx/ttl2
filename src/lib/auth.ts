import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

// Authorized email addresses for admin access
const AUTHORIZED_ADMIN_EMAILS = [
  'laura@lauraalba.com',
  'admin@lauraalba.com',
  'info@lauraalba.com',
  // Add more authorized emails here
];

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    avatar_url?: string;
    role: string;
  };
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: string;
}

// Check if user email is authorized for admin access
export function isAuthorizedAdmin(email: string): boolean {
  return AUTHORIZED_ADMIN_EMAILS.includes(email.toLowerCase());
}

// Convert Supabase user to our AuthUser format
export function convertSupabaseUser(user: User): AuthUser | null {
  if (!user.email) return null;
  
  const isAdmin = isAuthorizedAdmin(user.email);
  
  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
    avatar_url: user.user_metadata?.avatar_url,
    role: isAdmin ? 'admin' : 'user'
  };
}

// Sign in with Google
export async function signInWithGoogle(): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin/dashboard`
      }
    });

    if (error) {
      return {
        success: false,
        error: error.message
      };
    }

    return {
      success: true
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed'
    };
  }
}

// Sign out
export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

// Get current user
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    return convertSupabaseUser(user);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Check if current user is admin
export async function isCurrentUserAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === 'admin';
}

// Listen to auth state changes
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const authUser = convertSupabaseUser(session.user);
      callback(authUser);
    } else {
      callback(null);
    }
  });
}

// Security report for admin dashboard
export interface SecurityReport {
  googleOAuthEnabled: boolean;
  emailWhitelistEnabled: boolean;
  authorizedEmails: string[];
  secureRedirects: boolean;
  recommendations: string[];
}

export function getSecurityReport(): SecurityReport {
  return {
    googleOAuthEnabled: true,
    emailWhitelistEnabled: true,
    authorizedEmails: AUTHORIZED_ADMIN_EMAILS,
    secureRedirects: true,
    recommendations: [
      'Google OAuth provides secure authentication',
      'Email whitelist ensures only authorized users can access admin features',
      'Consider adding multi-factor authentication for additional security',
      'Regular review of authorized email list is recommended'
    ]
  };
}

// Legacy functions for backward compatibility (deprecated)
export function validateSession(): boolean {
  console.warn('validateSession is deprecated - use getCurrentUser instead');
  return false;
}

export async function authenticateLocal(): Promise<AuthResult> {
  console.warn('authenticateLocal is deprecated - use Google OAuth instead');
  return { success: false, error: 'Local authentication disabled' };
}

export async function logout(): Promise<void> {
  console.warn('logout is deprecated - use signOut instead');
  await signOut();
}
