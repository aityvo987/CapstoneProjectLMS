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

//call the refresh token function on every time page load

const initializeApp = async()=>{
    //comment this line
    // await store.dispatch(apiSlice.endpoints.refreshToken.initiate({},{forceRefetch:true}));


    try {
        // Load user data after refreshing token
        await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, {forceRefetch: true}));
    } catch (error) {
        console.error("Failed to load user:", error);
        // Handle error (e.g., notify user)
    }
};

initializeApp();