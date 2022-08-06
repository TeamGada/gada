import { nanoid } from "nanoid";

import { planDetailModel, planModel, userModel } from "../db";
import {
  IShareService,
  ShareInfoDto,
  ShareStateDto,
  IUserModel,
} from "../types";
import { IPlanDetailModel } from "../types/planDetailTypes";
import { IPlanModel } from "../types/planTypes";
import { koreanChange } from "../utils/areas";

class ShareService implements IShareService {
  private planModel;
  private planDetailModel;
  private userModel;

  constructor(
    planModel: IPlanModel,
    planDetailModel: IPlanDetailModel,
    userModel: IUserModel
  ) {
    this.planModel = planModel;
    this.planDetailModel = planDetailModel;
    this.userModel = userModel;
  }

  async getSharedCount(tag: string, area: string) {
    const count = await this.planModel.getSharedPlansCount(tag, area);
    return count;
  }

  async getMySharedCount(userId: string, tag: string, area: string) {
    const count = await this.planModel.getMySharedPlansCount(userId, tag, area);
    return count;
  }

  async getSharedPlans(
    tag: string,
    area: string,
    nOffset: number,
    nLimit: number
  ) {
    const sharedPlans = await this.planModel.findAllByIsShared(
      tag,
      area,
      nOffset,
      nLimit
    );

    if (!sharedPlans) {
      throw new Error("공유된 계획을 가져올 수 없습니다.");
    }

    const arrays = [];

    for (let i = 0; i < sharedPlans.length; i++) {
      const user = await userModel.findByUserId(
        sharedPlans[i].userId.toString()
      );

      if (!user) {
        //console.log(sharedPlans[i].userId);
        throw new Error("유저 정보가 존재하지 않습니다.");
      }

      const newObj = {
        planId: sharedPlans[i]._id,
        username: user.username,
        area: sharedPlans[i].area,
        shareTitle: sharedPlans[i].shareTitle,
        tag: sharedPlans[i].tag,
        likes: sharedPlans[i].likes,
      };

      arrays.push(newObj);
    }

    return arrays;
  }

  async getSharedMyPlans(
    userId: string,
    tag: string,
    area: string,
    nOffset: number,
    nLimit: number
  ) {
    const sharedMyPlans = await this.planModel.findAllSharedPlanByUserId(
      userId,
      tag,
      area,
      nOffset,
      nLimit
    );

    if (!sharedMyPlans) {
      throw new Error("공유된 계획을 가져올 수 없습니다.");
    }

    const user = await userModel.findByUserId(userId.toString());

    if (!user) {
      throw new Error("유저 정보가 존재하지 않습니다.");
    }

    const arrays = [];

    for (let i = 0; i < sharedMyPlans.length; i++) {
      const newObj = {
        planId: sharedMyPlans[i]._id,
        username: user.username,
        area: sharedMyPlans[i].area,
        shareTitle: sharedMyPlans[i].shareTitle,
        tag: sharedMyPlans[i].tag,
        likes: sharedMyPlans[i].likes,
      };

      arrays.push(newObj);
    }

    return arrays;
  }

  async changeShareState(shareState: ShareStateDto) {
    const sharedPlan = await this.planModel.setState(shareState);
    return sharedPlan;
  }

  async bringSharedPlan(shareInfo: ShareInfoDto) {
    const { planId, userId } = shareInfo;

    const broughtPlan = await this.planModel.findByPlanId(planId);

    if (!broughtPlan) {
      throw new Error("공유된 계획을 가져올 수 없습니다.");
    }

    //전체 여행 계획중 planDetail을 새로 등록하고 가져와야 함
    //planDetail의 objectId로 반환된 새로운 이중 배열인 planDetails를 얻는다.
    const planDetails = broughtPlan.planDetails;
    const newPlanDetails = [];

    for (let i = 0; i < planDetails.length; i++) {
      const dayPlans = [];

      for (let j = 0; j < planDetails[i].length; j++) {
        const detail = planDetails[i][j].planDetail;

        // 새로운 planDetail을 만들기 위한 객체에 값을 할당
        const placeInfo = {
          userId,
          id: nanoid(15),
          name: detail.name,
          latitude: detail.latitude,
          longitude: detail.longitude,
          address: detail.address,
          imgUrl: detail.imgUrl,
        };

        //새로운 planDetail 생성
        const newPlanDetail = await this.planDetailModel.create(placeInfo);

        if (!newPlanDetail) {
          throw new Error(
            "가져온 계획을 새로 구성하는데 문제가 발생했습니다. 다시 시도해 주십시오."
          );
        }

        const obj = {
          planDetail: newPlanDetail._id,
        };

        dayPlans.push(obj);
      }

      newPlanDetails.push(dayPlans);
    }

    const newPlanfo = {
      userId,
      area: broughtPlan.area,
      title: "가져온 공유 계획",
      imgUrl: process.env.IMAGE_URL + `${koreanChange(broughtPlan.area)}.jpg`,
      startDate: broughtPlan.startDate,
      lastDate: broughtPlan.lastDate,
    };

    const newPlan = await this.planModel.createByBringPlan(
      newPlanfo,
      newPlanDetails
    );

    const newPlanId = newPlan._id;

    const populatedNewPlan = await this.planModel.findByPlanId(newPlanId);

    return populatedNewPlan;
  }
}

const shareService = new ShareService(planModel, planDetailModel, userModel);

export { shareService };
