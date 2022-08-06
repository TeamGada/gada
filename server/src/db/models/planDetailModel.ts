import { model } from "mongoose";
import {
  Place,
  IPlanDetail,
  IPlanDetailModel,
} from "../../types/planDetailTypes";
import planDetailSchema from "../schemas/planDetailSchema";

const planDetail = model<IPlanDetail>("plandetails", planDetailSchema);

class PlanDetailModel implements IPlanDetailModel {
  async create(placeInfo: Place): Promise<IPlanDetail | null> {
    const createPlanDetail = await planDetail.create(placeInfo);

    return createPlanDetail;
  }

  async findByPlaceId(placeId: string): Promise<IPlanDetail | null> {
    const filter = { id: placeId };
    const findPlanDetail = await planDetail.findOne(filter);

    return findPlanDetail;
  }

  async update(planDetailInfo: IPlanDetail): Promise<IPlanDetail | null> {
    const filter = { id: planDetailInfo.id };
    const option = { returnOriginal: false };

    const updatePlanDetail = await planDetail.findOneAndUpdate(
      filter,
      planDetailInfo,
      option
    );

    return updatePlanDetail;
  }

  async delete(placeId: string): Promise<IPlanDetail | null> {
    const filter = { id: placeId };
    const deletePlanDetail = await planDetail.findOneAndDelete(filter);

    return deletePlanDetail;
  }

  async findByPlanDetailId(planDetailId: string) {
    const foundPlanDetail = await planDetail.findOne({ _id: planDetailId });
    return foundPlanDetail;
  }

  async deleteAll(userId: string) {
    const filter = { userId };
    const deletePlanDetail = await planDetail.deleteMany(filter);

    return deletePlanDetail;
  }
}

const planDetailModel = new PlanDetailModel();

export { planDetailModel };
