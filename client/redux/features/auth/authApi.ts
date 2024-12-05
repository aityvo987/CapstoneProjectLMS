import { apiSlice } from "../api/apiSlice";
import { userRegistration, userLoggedIn, userLoggedOut } from "./authSlice";

type RegistrationResponse = {
    message: string,
    activationToken: string,
};

type RegistrationData = {

};

type RecoveryResponse = {
    message: string,
    tokenCode: string,  // Mã OTP được gửi tới email
};

type RecoveryData = {
    email: string,
};

//injectEndpoints() to inject endpoints into apiSlice
export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints here
        //mutation use for other http methods except GET

        //sign up
        register: builder.mutation<RegistrationResponse, RegistrationData>(
            {
                query: (data) => ({
                    url: "registration",
                    method: "POST",
                    body: data,
                    credentials: "include" as const,
                }),
                async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                    try {
                        const result = await queryFulfilled;

                        dispatch(
                            userRegistration({
                                token: result.data.activationToken,
                            })
                        );
                    } catch (e: any) {
                        console.log(e);
                    }
                }
            }
        ),
        // activation account
        activation: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
                url: "activate-user",
                method: "POST",
                body: {
                    activation_token,
                    activation_code,
                },

            }),
        }),

        //Sign in
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "login",
                method: "POST",
                body: {
                    email,
                    password,
                },
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

        }
        ),
        // social auth
        socialAuth: builder.mutation({
            query: ({ email, password, avatar }) => ({
                url: "social-auth",
                method: "POST",
                body: {
                    email,
                    password,
                    avatar,
                },
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

        }
        ),
        //logout
        logOut: builder.query({
            query: () => ({
                url: "logout",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    dispatch(
                        userLoggedOut(),
                    );
                } catch (e: any) {
                    console.log(e);
                }
            },

        }
        ),
        //forget password
        forgetPassword: builder.mutation<RegistrationResponse, RegistrationData>(
            {
                query: (data) => ({
                    url: "forget-password",
                    method: "POST",
                    body: data,
                    credentials: "include" as const,
                }),
                async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                    try {
                        const result = await queryFulfilled;

                        dispatch(
                            userRegistration({
                                token: result.data.activationToken,
                            })
                        );
                    } catch (e: any) {
                        console.log(e);
                    }
                }
            }
        ),
        //recovery
        recoveryPassword: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
                url: "recovery-password",
                method: "POST",
                body: {
                    activation_token,
                    activation_code,
                },

            }),
        }),
    }),
}
);

// Export hooks for usage in functional components 
export const {
    useRegisterMutation,
    useActivationMutation,
    useLoginMutation,
    useSocialAuthMutation,
    useLogOutQuery,
    useForgetPasswordMutation,
    useRecoveryPasswordMutation,
} = authApi;