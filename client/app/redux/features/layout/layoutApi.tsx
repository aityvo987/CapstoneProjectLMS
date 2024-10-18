



export const layoutApi = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        getHeroData:builder.query({
            query:(type)=>({
                url:`get-layout/${type}`,
                method:"GET",
                body:type,
                credentials:"include" as const,
            }),
        }),
        editHeroData:builder.mutation({
            query:({type,image,title,subTitle,faq,categories})=>({
                url:`edit-layout/${type}`,
                method:"PUT",
                body:{
                    type,
                    image,
                    title,
                    subTitle,
                    faq,
                    categories
                },
                credentials:"include" as const,
            }),
        }),
    })
})

export const {useGetHeroDataQuery,useEditLayoutMutation} = layoutApi;