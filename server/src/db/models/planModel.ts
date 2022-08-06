import loggor from "jet-logger";
import { model, Types } from "mongoose";
import { ShareStateDto } from "../../types";

import { PlanDocument, IPlan, IPlanModel } from "../../types/planTypes";
import planScheam from "../schemas/planSchema";

export const plan = model<IPlan>("Plan", planScheam);

class PlanModel implements IPlanModel {
  private option;

  constructor() {
    this.option = { returnOriginal: false };
  }

  async create(planInfo: PlanDocument, arrays: string[][]): Promise<IPlan> {
    const createPlan = await plan.create({ ...planInfo, planDetails: arrays });
    return createPlan;
  }

  async findByUserId(userId: string): Promise<IPlan[] | null> {
    const findPlans = await plan.find({ userId: userId });
    return findPlans;
  }

  async findByPlanId(planId: string): Promise<IPlan | null> {
    const findPlan = await plan
      .findOne({ _id: planId })
      .populate("planDetails.planDetail");
    return findPlan;
  }

  async update(planId: string, planInfo: PlanDocument): Promise<IPlan | null> {
    const filter = { _id: planId };

    const updatePlan = await plan.findByIdAndUpdate(
      filter,
      planInfo,
      this.option
    );
    return updatePlan;
  }

  async delete(planId: string): Promise<IPlan | null> {
    const filter = { _id: planId };

    const deletePlan = await plan.findByIdAndDelete(filter);
    return deletePlan;
  }

  async updateDetail(
    planId: string,
    index: number,
    planDetailId: string
  ): Promise<IPlan | null> {
    const filter = { _id: planId };
    const option = { ...this.option, upsert: true };
    const findPlan = await plan.findOne(filter);
    if (!findPlan) {
      throw new Error(
        "존재하지 않는 여행 계획입니다. 확인 후 다시 부탁드립니다."
      );
    }
    findPlan.planDetails[index].push({ planDetail: planDetailId });

    const updatePlan = await plan.findOneAndUpdate(filter, findPlan, option);
    return updatePlan;
  }

  async updateDetailOrder(
    planId: string,
    index: number,
    planDetails: object[]
  ): Promise<IPlan | null> {
    const filter = { _id: planId };

    const findPlan = await plan.findOne(filter);
    if (!findPlan) {
      throw new Error(
        "존재하지 않는 여행 계획입니다. 확인 후 다시 부탁드립니다."
      );
    }

    findPlan.planDetails.splice(
      index,
      1,
      planDetails as unknown as Types.Array<Types.ObjectId>
    );

    const query = { planDetails: findPlan.planDetails };
    const updatePlan = await plan.findOneAndUpdate(filter, query, this.option);

    return updatePlan;
  }

  async deleteDetail(
    planId: string,
    row: number,
    col: number
  ): Promise<IPlan | null> {
    const filter = { _id: planId };
    const findPlan = await plan.findOne(filter);
    if (!findPlan) {
      throw new Error(
        "존재하지 않는 여행 계획입니다. 확인 후 다시 부탁드립니다."
      );
    }

    findPlan.planDetails[row].splice(col, 1);

    const updatePlan = await plan.findOneAndUpdate(
      filter,
      findPlan,
      this.option
    );

    return updatePlan;
  }

  async setState(shareState: ShareStateDto) {
    const { planId, toggle } = shareState;

    if (toggle) {
      const updatedState = await plan.findOneAndUpdate(
        { _id: planId },
        {
          $set: {
            isShared: true,
            isEdited: false,
            shareTitle: shareState.shareTitle,
            tag: shareState.tag,
          },
        },
        {
          returnOriginal: false,
        }
      );

      return updatedState;
    } else {
      const updatedState = await plan.findOneAndUpdate(
        { _id: planId },
        {
          $set: {
            isShared: false,
            isEdited: true,
            shareTitle: "",
            tag: "",
          },
        },
        {
          returnOriginal: false,
        }
      );

      return updatedState;
    }
  }

  async getSharedPlansCount(tag: string, area: string) {
    if (tag === "전체" && area !== "전체") {
      const count = await plan.countDocuments({ isShared: true, area });
      return count;
    }

    if (area === "전체" && tag !== "전체") {
      const count = await plan.countDocuments({ isShared: true, tag });
      return count;
    }

    if (tag === "전체" && area === "전체") {
      const count = await plan.countDocuments({ isShared: true });
      return count;
    }

    const count = await plan.countDocuments({ isShared: true, tag, area });
    return count;
  }

  async getMySharedPlansCount(userId: string, tag: string, area: string) {
    if (tag === "전체" && area !== "전체") {
      const count = await plan.countDocuments({ userId, isShared: true, area });
      return count;
    }

    if (area === "전체" && tag !== "전체") {
      const count = await plan.countDocuments({ userId, isShared: true, tag });
      return count;
    }

    if (tag === "전체" && area === "전체") {
      const count = await plan.countDocuments({ userId, isShared: true });
      return count;
    }

    const count = await plan.countDocuments({
      userId,
      isShared: true,
      tag,
      area,
    });
    return count;
  }

  async findAllByIsShared(
    tag: string,
    area: string,
    nOffset: number,
    nLimit: number
  ) {
    if (tag === "전체" && area !== "전체") {
      const sharedPlan = await plan.aggregate([
        { $addFields: { likesCount: { $size: "$likes" } } },
        { $sort: { likesCount: -1 } },
        { $match: { isShared: true, area } },
        { $skip: (nOffset - 1) * nLimit },
        { $limit: nLimit },
      ]);

      return sharedPlan;
    }

    if (area === "전체" && tag !== "전체") {
      const sharedPlan = await plan.aggregate([
        { $addFields: { likesCount: { $size: "$likes" } } },
        { $sort: { likesCount: -1 } },
        { $match: { isShared: true, tag } },
        { $skip: (nOffset - 1) * nLimit },
        { $limit: nLimit },
      ]);

      return sharedPlan;
    }

    if (tag === "전체" && area === "전체") {
      const sharedPlan = await plan.aggregate([
        { $addFields: { likesCount: { $size: "$likes" } } },
        { $sort: { likesCount: -1 } },
        { $match: { isShared: true } },
        { $skip: (nOffset - 1) * nLimit },
        { $limit: nLimit },
      ]);

      return sharedPlan;
    }

    const sharedPlan = await plan.aggregate([
      { $addFields: { likesCount: { $size: "$likes" } } },
      { $sort: { likesCount: -1 } },
      { $match: { isShared: true, tag, area } },
      { $skip: (nOffset - 1) * nLimit },
      { $limit: nLimit },
    ]);

    return sharedPlan;
  }

  async findAllSharedPlanByUserId(
    userId: string,
    tag: string,
    area: string,
    nOffset: number,
    nLimit: number
  ) {
    if (tag === "전체" && area !== "전체") {
      const sharedMyPlans = await plan.aggregate([
        { $addFields: { likesCount: { $size: "$likes" } } },
        { $sort: { likesCount: -1 } },
        { $match: { userId, isShared: true, area } },
        { $skip: (nOffset - 1) * nLimit },
        { $limit: nLimit },
      ]);

      return sharedMyPlans;
    }

    if (area === "전체" && tag !== "전체") {
      const sharedMyPlans = await plan.aggregate([
        { $addFields: { likesCount: { $size: "$likes" } } },
        { $sort: { likesCount: -1 } },
        { $match: { userId, isShared: true, tag } },
        { $skip: (nOffset - 1) * nLimit },
        { $limit: nLimit },
      ]);

      return sharedMyPlans;
    }

    if (tag === "전체" && area === "전체") {
      const sharedMyPlans = await plan.aggregate([
        { $addFields: { likesCount: { $size: "$likes" } } },
        { $sort: { likesCount: -1 } },
        { $match: { userId, isShared: true } },
        { $skip: (nOffset - 1) * nLimit },
        { $limit: nLimit },
      ]);

      return sharedMyPlans;
    }

    const sharedMyPlans = await plan.aggregate([
      { $addFields: { likesCount: { $size: "$likes" } } },
      { $sort: { likesCount: -1 } },
      { $match: { userId, isShared: true, tag, area } },
      { $skip: (nOffset - 1) * nLimit },
      { $limit: nLimit },
    ]);

    return sharedMyPlans;
  }

  async createByBringPlan(
    planInfo: PlanDocument,
    arrays: unknown[][]
  ): Promise<IPlan> {
    const createPlan = await plan.create({ ...planInfo, planDetails: arrays });
    return createPlan;
  }

  async deleteAll(userId: string) {
    const deletedPlans = await plan.deleteMany({ userId });
    return deletedPlans;
  }
}

const planModel = new PlanModel();

export { planModel };
