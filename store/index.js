import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";

import authSlice from "./Slice/auth.slice";
import storage from "./storage";

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const reducer = combineReducers({
    auth:authSlice,
});

const rootReducer = (state,action)=>{
    if(action.type === "USER_LOGOUT"){
        state = undefined;
    }
    return reducer(state,action)
};

export const persistConfig = {
    key:'auto-fill-table',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
    reducer:persistedReducer,
    middleware:getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
})