import { Schema } from "mongoose";
import { IPlan } from "../../types/planTypes";

const planScheam: Schema<IPlan> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    lastDate: {
      type: Date,
      required: true,
    },
    planDetails: [
      [
        {
          planDetail: {
            type: Schema.Types.ObjectId,
            ref: "plandetails",
          },
        },
      ],
    ],
    isEdited: {
      type: Boolean,
      required: true,
      default: true,
    },
    isShared: {
      type: Boolean,
      required: true,
      default: false,
    },
    shareTitle: {
      type: String,
      required: false,
      default: "",
    },
    tag: {
      type: String,
      required: false,
      default: "",
    },
    likes: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    collection: "plans",
    timestamps: true,
  }
);

export default planScheam;
