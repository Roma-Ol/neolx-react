export interface IUserEntity {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  role: string;
}

export interface IUserResponseEntity extends IUserEntity {
  created_at: string;
  password: string;
  updatedAt: string;
}

export interface IUserProps {
  user: IUserEntity;
  refreshUsers: () => void;
}

export interface IUserEditFields {
  name: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
}
