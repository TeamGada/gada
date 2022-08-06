import { Router, Request, Response, NextFunction } from "express";

import { likeServie } from "../services";
import { Like } from "../types";

const likeRouter = Router();

likeRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("세션이 만료되어 유저 정보를 가져올 수 없습니다.");
      }

      const userId: string = req.user._id;
      const planId: string = req.body.planId;
      const toggle: boolean = req.body.toggle;

      const likeInfo: Like = {
        userId,
        planId,
      };

      if (toggle) {
        const like = await likeServie.addLike(likeInfo);

        if (!like) {
          throw new Error("좋아요를 누르는데 에러가 발생했습니다.");
        }

        return res.status(201).json({
          result: "success",
          data: {
            planId: like.planId,
          },
        });
      }

      const deletedLike = await likeServie.deleteLike(likeInfo);

      if (!deletedLike) {
        throw new Error("좋아요를 누르는데 에러가 발생했습니다.");
      }

      return res.status(201).json({
        result: "success",
        data: {
          planId: deletedLike.planId,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

export { likeRouter };
