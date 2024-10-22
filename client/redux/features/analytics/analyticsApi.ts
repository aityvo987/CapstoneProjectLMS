<<<<<<< HEAD:client/redux/features/analytics/analyticsApi.ts
import { apiSlice } from "../api/apiSlice";
=======
import { apiSlice } from "@/redux/features/api/apiSlice";
>>>>>>> origin/fix_bug_FE:client/app/redux/features/analytics/analyticsApi.ts




export const analyticsApi = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        getCoursesAnalytics:builder.query({
            query:()=>({
                url:`get-courses-analytics`,
                method:"GET",
                credentials:"include" as const,
            }),
        }),
        getUsersAnalytics:builder.query({
            query:()=>({
                url:`get-users-analytics`,
                method:"GET",
                credentials:"include" as const,
            }),
        }),
        getOrdersAnalytics:builder.query({
            query:()=>({
                url:`get-orders-analytics`,
                method:"GET",
                credentials:"include" as const,
            }),
        }),
    })
})

export const {useGetCoursesAnalyticsQuery,useGetUsersAnalyticsQuery,useGetOrdersAnalyticsQuery} = analyticsApi;