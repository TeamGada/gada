import { likeModel } from "../db";
import { ILikeModel, ILikeService, Like } from "../types";

class LikeService implements ILikeService {
  private likekModel;

  constructor(likekModel: ILikeModel) {
    this.likekModel = likekModel;
  }

  async addLike(likeInfo: Like) {
    const addedBookmark = await this.likekModel.create(likeInfo);
    return addedBookmark;
  }

  async deleteLike(likeInfo: Like) {
    const deletedBookmark = await this.likekModel.delete(likeInfo);
    return deletedBookmark;
  }

  async deleteAll(userId: string, likedPlans: string[]) {
    await this.likekModel.deleteAll(userId, likedPlans);
  }
}

const likeServie = new LikeService(likeModel);

export { likeServie };
