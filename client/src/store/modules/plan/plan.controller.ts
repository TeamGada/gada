import { isProxy } from 'util/types';
import {
    changePosition2DistanceArray,
    changePosition2DistanceCenter,
    getPosition2bound,
} from 'utils/mapPointHelper';
import { getPeriod } from 'utils/planUtils';
import { Place } from '.';
import { PlanState, setPointRelatedOptions } from './plan';
import { PlanDetailModel, PlanModel } from './plan.model';

export const changePlanModel2PlanState = (
    state: PlanState,
    data: PlanModel,
) => {
    const infoByAPI = (state: PlanState): void => {
        state.title = data.title;
        state.startDate = new Date(data.startDate);
        state.lastDate = new Date(data.lastDate);
        state.period = getPeriod(
            new Date(data.startDate),
            new Date(data.lastDate),
        );
        state.setDay = 0;
        state.planList = data.planDetails;
        state.placeDistance = changePosition2DistanceArray(data.planDetails[0]);
        state.placeDistanceCenter = changePosition2DistanceCenter(
            data.planDetails[0],
        );
        state.mapCenterBound = getPosition2bound(data.planDetails[0]);
        state.shareMode = false;
        // eslint-disable-next-line no-underscore-dangle
        state._id = data._id;
        state.userId = data.userId;
        state.area = data.area;
        state.imgUrl = data.imgUrl;
        state.createdAt = data.createdAt;
        state.updatedAt = data.updatedAt;
        state.grabPlanId = null;
        state.grabPlaceOptionId = null;
        state.clickPlaceDetailId = null;
        state.placeOptionList = [];
        state.shareMode = data.isShared;
    };

    infoByAPI(state);
};

export const movePlaceOptionToPlanFulfilledController = (
    state: PlanState,
    action: any,
) => {
    const { data } = action.payload;
    const lasted = data.planDetails[state.setDay].length - 1;
    const placeObjId = data.planDetails[state.setDay][lasted].planDetail;
    const droppedPlaceOption = state.placeOptionList.find(
        (option) => option.id === state.grabPlaceOptionId,
    ) as Place;

    const tempDetailPlace: PlanDetailModel = {
        ...droppedPlaceOption,
        _id: placeObjId,
        userId: state.userId,
    };
    const idx = state.placeOptionList.indexOf(droppedPlaceOption);
    state.placeOptionList.splice(idx, 1);

    state.planList[state.setDay].push(tempDetailPlace);
    setPointRelatedOptions(state);
};

export const movePlanToPlaceOptionFulfilledController = (
    state: PlanState,
    action: any,
) => {
    const { data } = action.payload;
    // 성공적으로 지워졌는지 확인
    data.planDetails[state.setDay].indexOf(state.grabPlanId);

    const droppedPlan = state.planList[state.setDay].find(
        (plan) => plan.id === state.grabPlanId,
    ) as PlanDetailModel;

    const idx = state.planList[state.setDay].indexOf(droppedPlan);
    state.planList[state.setDay].splice(idx, 1);
    state.placeOptionList.push(droppedPlan);
};
export const memoPlanDetailFulfilledController = (
    state: PlanState,
    action: any,
) => {
    const data = action.payload as PlanDetailModel;
    const col = state.planList[state.setDay].map((p) => p.id).indexOf(data.id);
    state.planList[state.setDay][col] = {
        ...state.planList[state.setDay][col],
        ...data,
    };
};

/**
 * sortPlanListController 사용 처
 * 1. Pending 이전에 ReduxStore 값변경
 * 2. Api Call reject 시 변경 값 취소 (롤백)
 */
export const sortPlanListController = (
    state: PlanState,
    data: PlanDetailModel[],
) => {
    state.planList[state.setDay] = [...data];
    setPointRelatedOptions(state);
};
