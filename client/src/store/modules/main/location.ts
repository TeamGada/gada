import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    isClickedLocation: boolean;
    imageUrl: string;
    locationName: string;
}

const initialState: InitialState = {
    isClickedLocation: false,
    imageUrl: '',
    locationName: '',
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        changeLocationState(state, action: PayloadAction<InitialState>) {
            state.isClickedLocation = action.payload.isClickedLocation;
            state.imageUrl = action.payload.imageUrl;
            state.locationName = action.payload.locationName;
        }
    },
})

export const {
    changeLocationState,
} = locationSlice.actions;

export default locationSlice.reducer;