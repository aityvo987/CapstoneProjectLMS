import { apiSlice } from "../api/apiSlice"


export const useApi = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "update-user-avatar",
                method: "PUT",
                body: {avatar},
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
        updatePassword: builder.mutation({
            // query: ({name,email}) => ({
            query: ({ oldPassword, newPassword }) => ({
                url: "update-user-password",
                method: "PUT",
                body: {
                    oldPassword,
                    newPassword,
                },
                credentials: "include" as const,
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "get-users",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        updateUserRole: builder.mutation({
            query: ({id,email,role}) => ({
                url: "update-user-role",    
                method: "PUT",
                body:{id,email,role},
                credentials: "include" as const,
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
            url: `delete-user/${id}`,
            method: "DELETE",
            credentials: "include" as const,
            }),
        }),
    }),

    
});

export const { useUpdateAvatarMutation, useEditProfileMutation, useUpdatePasswordMutation,useGetAllUsersQuery,useUpdateUserRoleMutation,useDeleteUserMutation  } = useApi;