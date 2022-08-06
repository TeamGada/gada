import { Schema } from "mongoose";

import { IUser } from "../../types";

const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    way: {
      type: String,
      required: true,
      default: "basic",
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    emailAuth: {
      type: Boolean,
      required: true,
      default: false,
    },
    refreshToken: {
      type: String,
      required: false,
    },
    likes: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export { UserSchema };
