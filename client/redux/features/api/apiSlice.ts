// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
//Link explain error: https://stackoverflow.com/questions/76411747/rtk-query-createapi-endpoints-not-showing-up-as-hooks-in-typescript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
        credentials: "include", // Đảm bảo cookie được gửi kèm với mỗi yêu cầu
    }),
    endpoints: (builder) => ({
        //automatically refresh the access token 
        refreshToken: builder.query({
            query: (data) => ({
                url: "refresh",
                method: "GET",
                credentials: "include" as const,
            }),
        }),

        //get infor user api
        loadUser: builder.query({
            query: (data) => ({
                url: "user",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (e: any) {
                    console.log(e);
                }
            },
        })
    }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;