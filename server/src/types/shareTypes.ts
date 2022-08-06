import { IPlan } from "./planTypes";

export interface ShareInfoDto {
  userId: string;
  planId: string;
}

export interface ShareStateDto {
  planId: string;
  shareTitle?: string;
  tag?: string;
  toggle: boolean;
}

export interface SharedPlanDto {
  planId: string;
  username: string;
  area: string;
  shareTitle?: string;
  tag?: string;
  likes?: string[];
}

export interface IShareService {
  getSharedPlans: (
    tag: string,
    area: string,
    nOffset: number,
    nLimit: number
  ) => Promise<SharedPlanDto[] | null>;
  getSharedMyPlans: (
    userId: string,
    tag: string,
    area: string,
    nOffset: number,
    nLimit: number
  ) => Promise<SharedPlanDto[] | null>;
  changeShareState: (shareState: ShareStateDto) => Promise<IPlan | null>;
  bringSharedPlan: (shareInfo: ShareInfoDto) => Promise<IPlan | null>;
  getSharedCount: (tag: string, area: string) => Promise<number>;
  getMySharedCount: (
    userId: string,
    tag: string,
    area: string
  ) => Promise<number>;
}
