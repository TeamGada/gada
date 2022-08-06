import { combineReducers } from '@reduxjs/toolkit';

import user from './user';
import plan from './plan/plan';
import share from './plan/share';
import modal from './modal';
import search from './plan/search';
import location from './main/location';

const rootReducer = combineReducers({
    user,
    plan,
    modal,
    search,
    location,
    share,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
