import { IPlan } from "./planTypes";

export interface Place {
  userId?: string;
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  imgUrl: string;
}

export interface IPlanDetail extends Place {
  _id: string;
  description: string;
  time: string;
  cost: string;
}

export interface IPlanDetailModel {
  create: (placeInfo: Place) => Promise<IPlanDetail | null>;
  findByPlaceId: (placeId: string) => Promise<IPlanDetail | null>;
  update: (planDetailInfo: IPlanDetail) => Promise<IPlanDetail | null>;
  delete: (placeId: string) => Promise<IPlanDetail | null>;
  findByPlanDetailId: (planDetailId: string) => Promise<IPlanDetail | null>;
  deleteAll: (userId: string) => Promise<any>;
}

export interface IPlaceDetailService {
  addPlanDetail: (
    planId: string,
    index: number,
    placeInfo: Place
  ) => Promise<IPlan | null>;
  getPlanDetail: (placeId: string) => Promise<IPlanDetail | null>;
  updatePlanDetail: (
    planDetailInfo: IPlanDetail
  ) => Promise<IPlanDetail | null>;
  updateOrder: (
    plandId: string,
    index: number,
    planDetails: object[]
  ) => Promise<IPlan | null>;
  deletePlanDetail: (
    planId: string,
    row: number,
    col: number,
    placeId: string
  ) => Promise<IPlan | null>;
}
