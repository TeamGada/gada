import { Place, 
        IPlanDetail, 
        IPlanDetailModel, 
        IPlaceDetailService } from "../types/planDetailTypes";
import { IPlan, IPlanModel } from "../types/planTypes";
import { planDetailModel, planModel } from "../db";

class PlanDetailService implements IPlaceDetailService {
    private planDetailModel;
    private planModel;

    constructor(planDetailModel: IPlanDetailModel, planModel: IPlanModel ){
        this.planDetailModel = planDetailModel;
        this.planModel = planModel;
    }

    async addPlanDetail(planId: string, index: number, placeInfo: Place): Promise<IPlan | null> {
        
        const planDetail = await planDetailModel.create(placeInfo);

        if(!planDetail) {
            throw new Error("요청 데이터를 처리할 수 없습니다. 입력 데이터를 확인해주세요.");
        }

        const plan = await planModel.updateDetail(planId, index, planDetail._id);

        return plan;
    }

    async getPlanDetail(placeId: string): Promise<IPlanDetail | null> {
        const plandDetail = await planDetailModel.findByPlaceId(placeId);

        return plandDetail;
    }

    async updatePlanDetail(planDetailInfo: IPlanDetail): Promise<IPlanDetail | null> {
        const planDetail = await planDetailModel.update(planDetailInfo);

        return planDetail;
    }

    async updateOrder(planId: string, index: number, planDetails: object[]): Promise<IPlan | null> {
        const plan = await planModel.updateDetailOrder(planId, index, planDetails);

        return plan;
    }

    async deletePlanDetail(planId: string, row: number, col: number, placeId: string): 
        Promise<IPlan | null> {

        const planDetail = await planDetailModel.delete(placeId);

        if(!planDetail) {
            throw new Error("해당 세부 계획 일정을 찾을 수 없습니다. 확인 후 다시 부탁드립니다.");
        }
        const plan = await planModel.deleteDetail(planId, row, col);

        return plan;
    }
}

const planDetailService = new PlanDetailService(planDetailModel, planModel);

export { planDetailService };