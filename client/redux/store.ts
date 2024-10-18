'use client';

import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";

//Redux-Predictable State Management Tool
// Init redux store
export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
    },
    devTools:false, //avoid hacker use Redux dev tool to unauthorized modifications
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})