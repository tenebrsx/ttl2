import { createContext, useContext, useState, useEffect } from "react";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const authStatus = localStorage.getItem("adminAuthenticated") === "true";
    const loginTime = localStorage.getItem("adminLoginTime");

    if (authStatus && loginTime) {
      const currentTime = Date.now();
      const timeDiff = currentTime - parseInt(loginTime);
      const hoursElapsed = timeDiff / (1000 * 60 * 60);

      if (hoursElapsed > 24) {
        // Session expired
        localStorage.removeItem("adminAuthenticated");
        localStorage.removeItem("adminLoginTime");
        setIsAuthenticated(false);
        setUser(null);
      } else {
        // Session is valid
        setIsAuthenticated(true);
        setUser({
          id: "admin",
          email: "admin@example.com",
          name: "Administrador",
          role: "admin",
        });
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      checkAuthStatus();
    } catch (error) {
      console.error("Error refreshing user:", error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("adminAuthenticated");
      localStorage.removeItem("adminLoginTime");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signOut: handleSignOut,
    refreshUser,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
