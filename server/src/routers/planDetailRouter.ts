import { Router, Request, Response, NextFunction } from "express";
import { planDetailService } from "../services";

const planDetailRouter: Router = Router();

planDetailRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const planDetailId = req.params.id;

        const planDetail = await planDetailService.getPlanDetail(planDetailId);

        res.status(200).json(planDetail);
    }catch(err) {
        next(err);
    }
});

planDetailRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.user?._id as string;
        const { planId, index, id, name, latitude, longitude, address, imgUrl } = req.body;
        const placeInfo = { userId, id, name, latitude, longitude, address, imgUrl };

        const plan = await planDetailService.addPlanDetail(planId, index, placeInfo);

        res.status(201).json(plan);
    }catch(err) {
        next(err);
    }
});

planDetailRouter.patch("/", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const planDetail = req.body.planDetail;

        const updatePlanDetail = await planDetailService.updatePlanDetail(planDetail);

        res.status(200).json(updatePlanDetail);
    }catch(err) {
        next(err);
    }
});

planDetailRouter.patch("/order", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { planId, index, planDetails } = req.body;

        const plan = await planDetailService.updateOrder(planId, index, planDetails);
        
        res.status(200).json(plan);
    }catch(err) {
        next(err);
    }
});

planDetailRouter.delete("/", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { planId, row, col, id } = req.body;

        const plan = await planDetailService.deletePlanDetail(planId, row, col, id);

        res.status(200).json(plan);
    }catch(err) {
        next(err);
    }
});

export { planDetailRouter };
