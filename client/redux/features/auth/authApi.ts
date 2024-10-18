import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";

type RegistratoinResponse = {
    message: string,
    activationToken: string,
};

type RegistrationData = {

};


//injectEndpoints() to inject endpoints into apiSlice
export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints here
        //mutation use for other http methods except GET
        register: builder.mutation<RegistratoinResponse, RegistrationData>(
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

                        dispatch(userRegistration({
                            token: result.data.activationToken,
                        }));
                    } catch (e: any) {
                        console.log(e);
                    }
                }
            }
        ),
        activation: builder.mutation({
            query:({activation_token,activation_code})=>({
                url:"activate-user",
                method:"POST",
                body:{
                    activation_token,
                    activation_code,
                },

            }),
        }),
    }),
}
);

// Export hooks for usage in functional components 
export const {useRegisterMutation,useActivationMutation} = authApi;