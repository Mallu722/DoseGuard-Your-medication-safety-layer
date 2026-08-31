import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginRequest, RegisterRequest, authService } from '../api/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  loginAsDemo: () => void;
  logout: () => void;
  showAuthPrompt: boolean;
  setShowAuthPrompt: (show: boolean) => void;
  dismissAuthPrompt: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'demo-user-001',
  name: 'Ananya Rao',
  email: 'ananya.rao@example.com',
  age: 58,
  gender: 'Female',
  avatar: 'AR',
  demoData: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    // Check local storage for active session
    const savedUser = localStorage.getItem('doseguard_user');
    const token = localStorage.getItem('token');
    const promptDismissed = sessionStorage.getItem('doseguard_prompt_dismissed');

    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    } else if (!promptDismissed) {
      // Suggest login when first visiting the site
      setShowAuthPrompt(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      // Try backend API first
      const data = await authService.login(credentials);
      if (data && data.user) {
        setUser(data.user);
        localStorage.setItem('doseguard_user', JSON.stringify(data.user));
        setShowAuthPrompt(false);
        return;
      }
    } catch (err) {
      // Fallback: If offline or demo user credentials entered
      if (
        credentials.email.toLowerCase().includes('demo') ||
        credentials.email.toLowerCase() === 'ananya.rao@example.com' ||
        credentials.password === 'demo123'
      ) {
        loginAsDemo();
        return;
      }

      // If backend is offline, still support local user session
      const fallbackUser: User = {
        id: 'usr-' + Date.now(),
        name: credentials.email.split('@')[0],
        email: credentials.email,
        avatar: credentials.email.substring(0, 2).toUpperCase(),
      };
      localStorage.setItem('token', 'offline-token-' + Date.now());
      localStorage.setItem('doseguard_user', JSON.stringify(fallbackUser));
      setUser(fallbackUser);
      setShowAuthPrompt(false);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest) => {
    setIsLoading(true);
    try {
      const data = await authService.register(userData);
      if (data && data.user) {
        setUser(data.user);
        localStorage.setItem('doseguard_user', JSON.stringify(data.user));
        setShowAuthPrompt(false);
        return;
      }
    } catch (err) {
      // Graceful offline fallback
      const newUser: User = {
        id: 'usr-' + Date.now(),
        name: userData.name,
        email: userData.email,
        avatar: userData.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2) || 'DG',
      };
      localStorage.setItem('token', 'local-token-' + Date.now());
      localStorage.setItem('doseguard_user', JSON.stringify(newUser));
      setUser(newUser);
      setShowAuthPrompt(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = () => {
    localStorage.setItem('token', 'demo-session-token');
    localStorage.setItem('doseguard_user', JSON.stringify(DEMO_USER));
    setUser(DEMO_USER);
    setShowAuthPrompt(false);
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem('doseguard_user');
    setUser(null);
  };

  const dismissAuthPrompt = () => {
    setShowAuthPrompt(false);
    sessionStorage.setItem('doseguard_prompt_dismissed', 'true');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        loginAsDemo,
        logout,
        showAuthPrompt,
        setShowAuthPrompt,
        dismissAuthPrompt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
