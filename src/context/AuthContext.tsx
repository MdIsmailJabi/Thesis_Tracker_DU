"use client";

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User, UserRole } from '@/lib/types';
import { users } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Try to load user from localStorage on initial load
    try {
        const storedUser = localStorage.getItem('thesis-flow-user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    } catch (error) {
        console.error("Could not parse user from localStorage", error);
        localStorage.removeItem('thesis-flow-user');
    }
  }, []);

  const login = (role: UserRole) => {
    const mockUser = users.find(u => u.role === role);
    if (mockUser) {
      setUser(mockUser);
      localStorage.setItem('thesis-flow-user', JSON.stringify(mockUser));
      router.push('/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('thesis-flow-user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
