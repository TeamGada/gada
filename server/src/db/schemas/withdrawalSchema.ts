import { Schema } from "mongoose";
import { IWithdrawal } from "../../types";

const WithdrawalSchema: Schema<IWithdrawal> = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      expires: 60 * 60 * 24 * 14,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "withdrawals",
  }
);

export { WithdrawalSchema };
