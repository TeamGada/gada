import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
export type UserState = {
    isLoggedIn: boolean;
    userData: any;
};

export type LoginPayload = {
    id: string;
    password: string;
};

// InitialState
const initialState: UserState = {
    isLoggedIn: false,
    userData: null,
};

// Reducer Slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state: UserState, action: PayloadAction<LoginPayload>) {
            state.isLoggedIn = true;
            state.userData = action.payload;
        },
        logout(state: UserState) {
            state.isLoggedIn = false;
            state.userData = null;
        },
    },
});

// Reducer & Action
const { reducer, actions } = userSlice;

export const { login, logout } = actions;
export default reducer;
