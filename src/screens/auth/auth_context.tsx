import React, { createContext, ReactNode, useState } from 'react';
import { CztUser } from '../../../types/users';

interface AuthContextData {
  user: CztUser | null;
  changeUser: (user: CztUser | null) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  changeUser: () => {
    console.log('no set user function provided');
  },
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
  console.log('ok lesgo', isLoggedIn, user, userId);
  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const changeUser = (user: CztUser | null) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, changeUser }}>
      {children}
    </AuthContext.Provider>
  );
};
