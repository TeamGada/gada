import { Schema } from "mongoose";

const LikeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  planId: {
    type: Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
  },
});

export { LikeSchema };
