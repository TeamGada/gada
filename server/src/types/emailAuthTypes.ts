export interface EmailAuth {
  email: string;
  authToken: string;
  createdAt?: Date;
}

export interface IEmailAuth {
  _id: string;
  email: string;
  authToken: string;
  createdAt: Date;
}

export interface IEmailAuthModel {
  create: (emailAuthInfo: EmailAuth) => Promise<IEmailAuth | null>;
  findByEmailAndToken: (emailAuthInfo: EmailAuth) => Promise<IEmailAuth | null>;
}

export interface IEmailService {
  sendLink: (email: string) => void;
  sendResettedPassword: (email: string, newPassword: string) => void;
}
