import { model } from "mongoose";
import { IWithdrawal, IWithdrawalModel } from "../../types/";
import { WithdrawalSchema } from "../schemas/withdrawalSchema";

const Withdrawal = model<IWithdrawal>("Withdraw", WithdrawalSchema);

class WithdrawalModel implements IWithdrawalModel {
  async createWithdrawalInfo(email: string) {
    const withdrawalInfo = await Withdrawal.create({ email });
    return withdrawalInfo;
  }
}

const withdrawalModel = new WithdrawalModel();

export { withdrawalModel };
