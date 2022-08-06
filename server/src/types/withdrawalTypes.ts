export interface Withdrawal {
  email: string;
  createdAt?: Date;
}

export interface IWithdrawal {
  _id: string;
  email: string;
  createdAt: Date;
}

export interface IWithdrawalModel {
  createWithdrawalInfo: (email: string) => Promise<IWithdrawal | null>;
}
