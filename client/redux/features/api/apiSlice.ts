// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
//Link explain error: https://stackoverflow.com/questions/76411747/rtk-query-createapi-endpoints-not-showing-up-as-hooks-in-typescript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,

    }),
    endpoints: (builder) => ({}),
});

export const {} = apiSlice;