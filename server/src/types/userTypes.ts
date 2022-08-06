import { EmailAuth, IEmailAuth } from "./emailAuthTypes";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  way: string;
  role: string;
  emailAuth: boolean;
  refreshToken: string;
  likes: string[];
}

export interface UserDocument {
  username: string;
  email: string;
  password: string;
  way?: string;
  role?: string;
  emailAuth?: boolean;
  refreshToken?: string;
}

export interface UpdateDto {
  username?: string;
  password?: string;
}

export interface IUserModel {
  create: (userInfo: UserDocument) => Promise<IUser>;
  findByUsername: (username: string) => Promise<IUser | null>;
  findByUserId: (userId: string) => Promise<IUser | null>;
  findByEmail: (email: string) => Promise<IUser | null>;
  findByEmailAndWay: (email: string, way: string) => Promise<IUser | null>;
  findAll: () => Promise<IUser[]>;
  findAllByEmail: (email: string) => Promise<IUser[]>;
  update: (userId: string, updateInfo: UpdateDto) => Promise<IUser | null>;
  delete: (userId: string) => Promise<IUser | null>;
  reset: (email: string, password: string) => Promise<IUser | null>;
  auth: (email: string) => Promise<IUser | null>;
  updateRefreshToken: (
    userId: string,
    refreshToken: string
  ) => Promise<IUser | null>;
  deleteRefreshToken: (userId: string) => Promise<IUser | null>;
}

export interface IUserService {
  addUser: (userInfo: UserDocument) => Promise<IUser | null>;
  getUser: (userId: string) => Promise<IUser | null>;
  getUsers: () => Promise<IUser[]>;
  updateUser: (userId: string, updateInfo: UpdateDto) => Promise<IUser | null>;
  deleteUser: (userId: string, email: string) => Promise<IUser | null>;
  findPassword: (email: string) => Promise<string>;
  checkDuplicateEmail: (email: string, way: string) => Promise<IUser | null>;
  sendRegisterLink: (email: string) => void;
  verifyRegisterLink: (emailAuthInfo: EmailAuth) => Promise<IEmailAuth | null>;
  saveRefreshToken: (userId: string) => Promise<IUser | null>;
  clearRefreshToken: (userId: string) => Promise<IUser | null>;
  getAccessToken: (userId: string, way: string) => Promise<string>;
  checkPassword: (userId: string, currentPassword: string) => Promise<boolean>;
  encodePassword: (newPassword: string) => Promise<string>;
}
