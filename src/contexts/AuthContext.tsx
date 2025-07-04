import React, { createContext, useState } from 'react';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => { error: string | null };
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials (for development only)
const ADMIN_CREDENTIALS = {
  email: 'admin@lauraalba.com',
  password: 'admin123' // In a real app, never hardcode passwords in the source code
};



export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user is logged in from localStorage on initial load
    const storedUser = localStorage.getItem('adminUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const signIn = (email: string, password: string) => {
    setLoading(true);

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const userData = { id: '1', email };
      setUser(userData);
      localStorage.setItem('adminUser', JSON.stringify(userData));
      setLoading(false);
      return { error: null };
    } else {
      setLoading(false);
      return { error: 'Invalid email or password' };
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};