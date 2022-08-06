import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { pickByKeyword, searchByKeyword } from 'utils/searchScenario';
import { Position, SearchedPlaceInfo, Place } from '.';
// Types

export interface SearchInputs {
    bySearch: string;
    byPick: string;
}

export interface searchState {
    state: boolean;
    selectedPlaces: Place[];
    placeList: SearchedPlaceInfo[];
    center: Position;
    moving?: Position;
}

// InitialState
const initialState: searchState = {
    state: true,
    selectedPlaces: [],
    placeList: [],
    center: { lat: 33.450701, lng: 126.570667 },
};
// Thunk
const searchPlaces = createAsyncThunk(
    'place/searchPlacesBySearch',
    async (keyword: string, { rejectWithValue }) => {
        try {
            const response = await searchByKeyword(keyword);
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

const searchForCoord = createAsyncThunk(
    'place/searchCoordByPick',
    async (keyword: string, { rejectWithValue }) => {
        try {
            const response = await pickByKeyword(keyword);
            return response;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

// Reducer Slice
const userSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        changeState(state: searchState) {
            state.state = !state.state;
        },
        setPlaceList(
            state: searchState,
            action: PayloadAction<SearchedPlaceInfo[]>,
        ) {
            state.placeList = action.payload;
        },
        insertSelectedPlaces(
            state: searchState,
            action: PayloadAction<SearchedPlaceInfo>,
        ) {
            const place: Place = { ...action.payload, id: nanoid() };
            state.selectedPlaces = [...state.selectedPlaces, place];
        },
        deleteSelectedPlaces(
            state: searchState,
            action: PayloadAction<string>,
        ) {
            const id: string = action.payload;
            state.selectedPlaces = state.selectedPlaces.filter(
                (place) => place.id !== id,
            );
        },
        dropAllSelectedPlaces(state: searchState) {
            state.selectedPlaces = [];
        },

        setCenter(state: searchState, action: PayloadAction<Position>) {
            state.center = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(searchPlaces.fulfilled, (state, action) => {
            state.placeList = action.payload;
        });
        builder.addCase(searchForCoord.fulfilled, (state, action) => {
            state.moving = action.payload;
        });
    },
});

// Reducer & Action
const { reducer, actions } = userSlice;

export const {
    changeState,
    setPlaceList,
    insertSelectedPlaces,
    deleteSelectedPlaces,
    dropAllSelectedPlaces,
    setCenter,
} = actions;
export { searchPlaces, searchForCoord };
export default reducer;
