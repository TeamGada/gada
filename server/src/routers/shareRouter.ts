import { NextFunction, Request, Response, Router } from "express";

import { shareService } from "../services";
import { ShareInfoDto, ShareStateDto } from "../types";
import { paging } from "../utils/paging";

const shareRouter = Router();

shareRouter.get(
  "/:tag/:area",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("세션이 만료되어 유저정보를 가져올 수 없습니다.");
      }

      const user = req.user;
      const tag: string = req.params.tag;
      const area: string = req.params.area;

      const page = req.query.page as string;
      const nPage = parseInt(page);

      const totalCount = await shareService.getSharedCount(tag, area);

      const { limit, totalPage, currentPage, startPage, endPage } = paging(
        nPage,
        totalCount
      );

      const sharedPlans = await shareService.getSharedPlans(
        tag,
        area,
        currentPage,
        limit
      );

      return res.status(200).json({
        result: "success",
        data: {
          sharedPlans,
          myLikes: user.likes,
          pagingInfo: { currentPage, startPage, endPage, totalPage },
        },
      });
    } catch (err) {
      next(err);
      return;
    }
  }
);

shareRouter.get(
  "/my-share/:tag/:area",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("세션이 만료되어 유저 정보를 가져올 수 없습니다.");
      }

      const user = req.user;
      const userId = user._id;
      const tag: string = req.params.tag;
      const area: string = req.params.area;

      const page = req.query.page as string;
      const nPage = parseInt(page);

      const totalCount = await shareService.getMySharedCount(userId, tag, area);

      const { limit, totalPage, currentPage, startPage, endPage } = paging(
        nPage,
        totalCount
      );

      const sharedMyPlans = await shareService.getSharedMyPlans(
        userId,
        tag,
        area,
        currentPage,
        limit
      );

      return res.status(200).json({
        result: "success",
        data: {
          sharedPlans: sharedMyPlans,
          myLikes: user.likes,
          pagingInfo: { currentPage, startPage, endPage, totalPage },
        },
      });
    } catch (err) {
      next(err);
      return;
    }
  }
);

shareRouter.post(
  "/:planId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const planId = req.params.planId;
      const shareTitle: string = req.body.shareTitle;
      const tag: string = req.body.tag;
      const toggle: boolean = req.body.toggle;

      const shareState: ShareStateDto = {
        planId,
        shareTitle,
        tag,
        toggle,
      };

      const sharedPlan = await shareService.changeShareState(shareState);

      return res.status(201).json({ result: "success", data: { sharedPlan } });
    } catch (err) {
      next(err);
      return;
    }
  }
);

shareRouter.post(
  "/:planId/bring",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("세션이 만료되어 유저 정보를 가져올 수 없습니다.");
      }

      const userId = req.user._id;
      const planId = req.params.planId;

      const shareInfo: ShareInfoDto = {
        userId,
        planId,
      };

      const broughtPlan = await shareService.bringSharedPlan(shareInfo);

      return res.status(200).json({ result: "success", data: { broughtPlan } });
    } catch (err) {
      next(err);
      return;
    }
  }
);

export { shareRouter };
