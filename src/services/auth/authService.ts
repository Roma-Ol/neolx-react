import { useApi } from '../API';
import { ICurrentUser, ILoginResponse } from './types.ts';
import { toast } from 'react-toastify';

export const login = async (email: string, password: string): Promise<ICurrentUser | null> => {
  const response = await useApi<ILoginResponse>('post', '/login', { email, password });

  if (response.userData) {
    localStorage.setItem('userData', JSON.stringify(response.userData));
    toast.success('Successfully logged in!');
    return response.userData;
  } else {
    return null;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  toast.success('Successfully logged out!');
};

const getCurrentUser = () => {
  const LSUserData: string | null = localStorage.getItem('userData');

  if (LSUserData) return JSON.parse(LSUserData);
};

export default {
  login,
  logout,
  getCurrentUser,
};
