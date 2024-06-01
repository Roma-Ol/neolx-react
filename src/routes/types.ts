import { ICurrentUser } from '../services/auth/types.ts';
import { ReactNode } from 'react';

export interface IProtectedRouteProps {
  user: ICurrentUser | null;
  children: ReactNode;
  adminOnly?: boolean;
}
