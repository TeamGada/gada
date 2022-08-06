import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { pickByKeyword, searchByKeyword } from 'utils/searchScenario';
import { Position, SearchedPlaceInfo, Place } from '.';
import { setPointRelatedOptions } from './plan';
import { changePlanModel2PlanState } from './plan.controller';
import { PlanDetailModel, PlanModel } from './plan.model';

// InitialState
export interface ShareState
    extends Omit<
        PlanModel,
        | 'startDate'
        | 'lastDate'
        | 'planDetails'
        | 'isEdited'
        | 'isShared'
        | 'shareMode'
    > {
    title: string;
    startDate: Date;
    lastDate: Date;
    period: number;
    setDay: number;
    grabPlanId: string | null;
    grabPlaceOptionId: string | null;
    clickPlaceDetailId: string | null;
    planList: PlanDetailModel[][];
    placeOptionList: Place[];
    placeDistance: number[];
    placeDistanceCenter: Position[];
    mapCenterBound: kakao.maps.LatLngBounds | null;
    shareMode: boolean;
}

const initialState: ShareState = {
    title: '부산 바캉스',
    startDate: new Date(20, 11, 3),
    lastDate: new Date(20, 11, 10),
    period: 1,
    setDay: 0,
    grabPlanId: null,
    grabPlaceOptionId: null,
    clickPlaceDetailId: null,
    planList: [],
    placeOptionList: [],
    placeDistance: [],
    placeDistanceCenter: [],
    mapCenterBound: null,
    shareMode: true,
    _id: '',
    userId: '',
    area: '',
    imgUrl: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
};

// Thunk
const getSharedPlanInfoById = createAsyncThunk(
    'GET/plan/getPlan',
    async (
        { headers, planId }: { headers: any; planId: string },
        { rejectWithValue },
    ) => {
        try {
            const result = await axios.get(`/plans/${planId}`, {
                headers,
            });
            return result;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

const shareSlice = createSlice({
    name: 'share',
    initialState,
    reducers: {
        setUpSharedDay(state: ShareState, action) {
            const { selectedDay } = action.payload;
            state.setDay = selectedDay;
            setPointRelatedOptions(state);
        },
        sortSharedPlanList(state: ShareState, action) {
            const { list } = action.payload;
            state.planList[state.setDay] = [...list];
            // calc distance
            setPointRelatedOptions(state);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getSharedPlanInfoById.fulfilled, (state, action) => {
            changePlanModel2PlanState(state, action.payload.data as PlanModel);
        });
    },
});

// Reducer & Action
const { reducer, actions } = shareSlice;

export const { setUpSharedDay, sortSharedPlanList } = actions;
export { getSharedPlanInfoById };
export default reducer;
