import { Router, Request, Response, NextFunction } from "express";

import { planService } from "../services";
import Multer from "multer";
import { upload } from "../middlewares";

const planRouter: Router = Router();

// multer 초기화
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 2mb, you can change as needed.
  },
});

planRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new Error("세션이 만료되어 유저 정보를 가져올 수 없습니다.");
    }

    const userId = req.user._id;
    const plans = await planService.getPlans(userId);

    res.status(200).json({ username: req.user.username, plans });
  } catch (err) {
    next(err);
  }
});

planRouter.get(
  "/locations",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const locations = await planService.getLocations();

      res.status(200).json(locations);
    } catch (err) {
      next(err);
    }
  }
);

planRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const planId = req.params.id;
      const plan = await planService.getPlan(planId);

      res.status(200).json(plan);
    } catch (err) {
      next(err);
    }
  }
);

planRouter.post(
  "/",
  multer.single("image"),
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id as string;
      const area: string = req.body.area;
      const title: string = req.body.title;
      const imgUrl: string = req.body.imgUrl || "";
      const startDate: Date = req.body.startDate;
      const lastDate: Date = req.body.lastDate;

      const planInfo = { userId, area, title, imgUrl, startDate, lastDate };
      const plan = await planService.addPlan(planInfo);

      res.status(201).json(plan);
    } catch (err) {
      next(err);
    }
  }
);

planRouter.patch(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id as string;
      const planId = req.body._id;
      const { area, title, imgUrl, startDate, lastDate } = req.body;
      const planInfo = { userId, area, title, imgUrl, startDate, lastDate };
      const plan = await planService.updatePlan(planId, planInfo);

      res.status(200).json(plan);
    } catch (err) {
      next(err);
    }
  }
);

planRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const planId = req.params.id;
      const plan = await planService.deletePlan(planId);

      res.status(200).json(plan);
    } catch (err) {
      next(err);
    }
  }
);

export { planRouter };
