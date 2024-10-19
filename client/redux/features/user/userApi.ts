import { apiSlice } from "../api/apiSlice"


export  const useApi = apiSlice.injectEndpoints({
    overrideExisting: true,  
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "update-user-avatar",
                method: "PUT",
                body:avatar,
                credentials: "include" as const,
            }),            
        })
    })
 });

 export const {useUpdateAvatarMutation} = useApi;