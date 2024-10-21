

export const orderApi = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        getAllOrders:builder.query({
            query:()=>({
                url:"get-orders",
                method:"GET",
                credentials:"include" as const,
            }),
        }),
    })
})

export const {useGetAllOrdersQuery} = orderApi;