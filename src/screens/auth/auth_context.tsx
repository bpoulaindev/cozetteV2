import React, { createContext, ReactNode, useState } from 'react';
import { CztUser } from '../../../types/users';

interface AuthContextData {
  user: CztUser | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  isLoggedIn: false,
  login: () => {
    console.log('no login function provided');
  },
  logout: () => {
    console.log('no logout function provided');
  }
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<CztUser | null>(null);
  const [userId, setUserId] = useState({});
  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
  );
};
