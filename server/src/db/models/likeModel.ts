import { model } from "mongoose";

import { Like, ILikeModel, ILike } from "../../types";
import { LikeSchema } from "../schemas/likeSchema";
import { User } from "./userModel";
import { plan } from "./planModel";
import { likeServie } from "../../services";

const Like = model<ILike>("Like", LikeSchema);

class LikeModel implements ILikeModel {
  async create(likeInfo: Like) {
    const like = await Like.create(likeInfo);

    const { userId, planId } = likeInfo;

    await User.findOneAndUpdate({ _id: userId }, { $push: { likes: planId } });

    await plan.findOneAndUpdate({ _id: planId }, { $push: { likes: userId } });

    return like;
  }

  async delete(likeInfo: Like) {
    const { userId, planId } = likeInfo;

    const deletedLike = await Like.findOneAndDelete({
      userId,
      planId,
    });

    await User.findOneAndUpdate({ _id: userId }, { $pull: { likes: planId } });

    await plan.findOneAndUpdate({ _id: planId }, { $pull: { likes: userId } });

    return deletedLike;
  }

  async deleteAll(userId: string, likedPlans: string[]) {
    await Like.deleteMany({ userId });

    for (let i = 0; i < likedPlans.length; i++) {
      await plan.findOneAndUpdate(
        { _id: likedPlans[i] },
        { $pull: { likes: userId } }
      );
    }
  }
}

const likeModel = new LikeModel();

export { likeModel };
