import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
interface InitialState {
    modalIsOpen: boolean;
    modalName: string;
    confirmState: boolean;
    confirmWidth: number;
    confirmHeight: number;
    confirmMessage: string;
    confirmType: string;
    deletePlan: boolean;
}

// InitialState
const initialState: InitialState = {
    modalIsOpen: false,
    modalName: '',
    confirmState: false,
    confirmWidth: 400,
    confirmHeight: 310,
    confirmMessage: 'this is default message',
    confirmType: '',
    deletePlan: false // 계획 삭제시 리렌더링을 위해 생성. useEffect에 사용됨
};

// Reducer Slice
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        changeOpenState(state, action: PayloadAction<boolean>) {
            state.modalIsOpen = action.payload;
        },
        changeModalName(state, action:PayloadAction<string>) {
            state.modalName = action.payload;
        },
        changeConfirmState(state, action:PayloadAction<boolean>) {
            state.confirmState = action.payload;
        },
        changeConfirmProps(state, action:PayloadAction<any>) {
            state.confirmWidth = action.payload.width;
            state.confirmHeight = action.payload.height;
            state.confirmMessage = action.payload.message;
            state.confirmType = action.payload.type;
        },
        changeDeletePlan(state, action:PayloadAction<boolean>) {
            state.deletePlan = action.payload;
        }
    },
});

export const {
    changeOpenState,
    changeModalName,
    changeConfirmState,
    changeConfirmProps,
    changeDeletePlan
} = modalSlice.actions;

export default modalSlice.reducer
