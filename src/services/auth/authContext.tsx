import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from './authService.ts';
import { IAuthContext, IAuthProviderProps, ICurrentUser } from './types.ts';
import { toast } from 'react-toastify';

const defaultAuthContext: IAuthContext = {
  currentUser: null,
  login: async () => {
    throw new Error('login function not implemented');
  },
  logout: () => {
    throw new Error('logout function not implemented');
  },
};

const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) setCurrentUser(user);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password);
      setCurrentUser(user);
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
