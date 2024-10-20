import { apiSlice } from "../api/apiSlice"


export const useApi = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "update-user-avatar",
                method: "PUT",
                body: avatar,
                credentials: "include" as const,
            }),

        }),
        EditProfile: builder.mutation({
            // query: ({name,email}) => ({
            query: ({ name }) => ({
                url: "update-user-info",
                method: "PUT",
                body: {
                    name,
                    // email
                },
                credentials: "include" as const,
            }),
        }),
    }),
});

export const { useUpdateAvatarMutation, useEditProfileMutation } = useApi;