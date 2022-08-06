import {
  PlanDocument,
  IPlan,
  IPlanModel,
  IPlanService,
} from "../types/planTypes";
import { planModel } from "../db";
import { koreanChange, getLocationList } from "../utils/areas";

class PlanService implements IPlanService {
  private planModel;

  constructor(planModel: IPlanModel) {
    this.planModel = planModel;
  }

  async addPlan(planInfo: PlanDocument): Promise<IPlan> {
    const size = (
      (new Date(planInfo.lastDate).getTime() -
        new Date(planInfo.startDate).getTime()) /
      (1000 * 60 * 60 * 24));
    const arrays = [];
    for (let i = 0; i <= size; i++) {
      arrays.push([]);
    }

    if (planInfo.imgUrl == "") {
      planInfo.imgUrl =
        process.env.IMAGE_URL + `${koreanChange(planInfo.area)}.jpg`;
    }
    const plan = await this.planModel.create(planInfo, arrays);
    return plan;
  }

  async getPlans(userId: string): Promise<IPlan[] | null> {
    const plans = await this.planModel.findByUserId(userId);
    return plans;
  }

  async getLocations(): Promise<object> {
    const locations: Promise<object> = new Promise((resolve) => {
      resolve(getLocationList());
    });
    return locations;
  }

  async getPlan(planId: string): Promise<IPlan | null> {
    const plan = await this.planModel.findByPlanId(planId);
    const arrays: any = [];

    if (!plan) {
      throw new Error("계획을 가져올 수 없습니다.");
    }

    plan.planDetails.map((dayPlans) => {
      const array: any = [];
      dayPlans.map((obj) => {
        array.push(obj.planDetail);
      });

      arrays.push(array);
    });

    const newObj: IPlan = {
      _id: plan._id,
      userId: plan.userId,
      area: plan.area,
      title: plan.title,
      imgUrl: plan.imgUrl,
      startDate: plan.startDate,
      lastDate: plan.lastDate,
      planDetails: arrays,
      isShared: plan.isShared,
      isEdited: plan.isEdited,
    };

    return newObj;
  }

  async updatePlan(
    planId: string,
    planInfo: PlanDocument
  ): Promise<IPlan | null> {
    const plan = await this.planModel.update(planId, planInfo);
    return plan;
  }

  async deletePlan(planId: string): Promise<IPlan | null> {
    const plan = await this.planModel.delete(planId);
    return plan;
  }
}

const planService = new PlanService(planModel);

export { planService };
