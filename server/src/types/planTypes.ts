import { Types } from "mongoose";
import { IPlanDetail } from "./planDetailTypes";
import { ShareStateDto } from "./shareTypes";

export interface PlanDocument {
  userId: string | Types.ObjectId;
  area: string;
  title: string;
  imgUrl: string;
  startDate: Date;
  lastDate: Date;
  isEdited?: boolean;
  isShared?: boolean;
  shareTitle?: string;
  tag?: string;
  likes?: string[];
}

export interface IPlan extends PlanDocument {
  _id: string;
  planDetails:
    | [
        [
          {
            _id: Types.ObjectId;
            planDetail: IPlanDetail;
          }
        ]
      ] &
        Types.Array<Types.Array<Types.ObjectId>>;
}

export interface IPlanModel {
  create: (planInfo: PlanDocument, arrays: string[][]) => Promise<IPlan>;
  findByUserId: (userId: string) => Promise<IPlan[] | null>;
  findByPlanId: (planId: string) => Promise<IPlan | null>;
  update: (planId: string, planInfo: PlanDocument) => Promise<IPlan | null>;
  delete: (planId: string) => Promise<IPlan | null>;
  updateDetail: (
    planId: string,
    index: number,
    planDetailId: string
  ) => Promise<IPlan | null>;
  updateDetailOrder: (
    planId: string,
    index: number,
    planDetailIds: object[]
  ) => Promise<IPlan | null>;
  deleteDetail: (
    planId: string,
    row: number,
    col: number
  ) => Promise<IPlan | null>;

  setState: (shareState: ShareStateDto) => Promise<IPlan | null>;
  findAllByIsShared: (
    tag: string,
    area: string,
    nOffset: number,
    nLimit: number
  ) => Promise<IPlan[] | null>;
  findAllSharedPlanByUserId: (
    userId: string,
    tag: string,
    area: string,
    nOffset: number,
    nLimit: number
  ) => Promise<IPlan[] | null>;
  createByBringPlan: (
    planInfo: PlanDocument,
    arrays: unknown[][]
  ) => Promise<IPlan>;
  getSharedPlansCount: (tag: string, area: string) => Promise<number>;
  getMySharedPlansCount: (
    userId: string,
    tag: string,
    area: string
  ) => Promise<number>;
  deleteAll: (userId: string) => Promise<any>;
}

export interface IPlanService {
  addPlan: (planInfo: PlanDocument) => Promise<IPlan>;
  getPlans: (userId: string) => Promise<IPlan[] | null>;
  getLocations: () => Promise<object>;
  getPlan: (planId: string) => Promise<IPlan | null>;
  updatePlan: (planId: string, planInfo: PlanDocument) => Promise<IPlan | null>;
  deletePlan: (planId: string) => Promise<IPlan | null>;
}
