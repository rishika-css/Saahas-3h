'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, DisabilityProfile, DisabilityType } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, disabilityProfile: DisabilityProfile) => Promise<void>;
  signup: (email: string, password: string, name: string, disabilityProfile: DisabilityProfile) => Promise<void>;
  logout: () => void;
  updateDisabilityProfile: (profile: DisabilityProfile) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string, disabilityProfile: DisabilityProfile) => {
    setIsLoading(true);
    try {
      // Mock authentication - replace with actual API call
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        disabilityProfile,
        createdAt: new Date(),
        preferences: {
          brightnessLevel: 100,
          fontSize: 'default',
          dyslexicFont: false,
          adhd_focusMode: false,
          voiceNavigationEnabled: false,
          hapticsEnabled: true,
          reduceAnimations: false,
          highContrast: false,
          screenReaderMode: false,
        },
      };
      setUser(mockUser);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string, disabilityProfile: DisabilityProfile) => {
    setIsLoading(true);
    try {
      // Mock authentication - replace with actual API call
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        disabilityProfile,
        createdAt: new Date(),
        preferences: {
          brightnessLevel: 100,
          fontSize: 'default',
          dyslexicFont: false,
          adhd_focusMode: false,
          voiceNavigationEnabled: false,
          hapticsEnabled: true,
          reduceAnimations: false,
          highContrast: false,
          screenReaderMode: false,
        },
      };
      setUser(mockUser);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('auth_user');
  }, []);

  const updateDisabilityProfile = useCallback(async (profile: DisabilityProfile) => {
    if (user) {
      const updatedUser = { ...user, disabilityProfile: profile };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateDisabilityProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
