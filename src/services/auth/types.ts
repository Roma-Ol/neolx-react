import { ReactNode } from 'react';

export interface IAuthProviderProps {
  children: ReactNode;
}

export interface ICurrentUser {
  token: string;
  role: string;
}

export interface ILoginResponse {
  userData: ICurrentUser;
  status: string;
}

export interface IAuthContext {
  currentUser: ICurrentUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
