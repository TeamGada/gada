import { Schema } from "mongoose";
import { IEmailAuth } from "../../types";

const EmailAuthSchema: Schema<IEmailAuth> = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    authToken: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      expires: 3600,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "emailauths",
  }
);

export { EmailAuthSchema };
