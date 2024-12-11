import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "get-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getStripePublishablekey: builder.query({
      query: () => ({
        url: "payment/stripepublishablekey",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: "payment",
        method: "POST",
        body: {
          amount,
        },
        credentials: "include" as const,
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: "/create-order",
        method: "POST",
        body: {
          courseId,
          payment_info,
        },
        credentials: "include" as const,
      }),
    }),
    createCartOrder: builder.mutation({
      query: ({ courseIds, payment_info }) => ({
        url: "/create-cart-order",
        method: "POST",
        body: {
          courseIds,
          payment_info,
        },
        credentials: "include" as const,
      }),
    }),
    getCart: builder.query({
      query: () => ({
        url: "/get-cart",
        method: "GET",
      }),
    }),
    addToCart: builder.mutation({
      query: ({ courseId, name, thumbnail, price, estimatedPrice }) => ({
        url: "/add-cart",
        method: "POST",
        body: { courseId, name, thumbnail, price, estimatedPrice },
      }),
    }),
    deleteFromCart: builder.mutation({
      query: (id) => ({
        url: `/delete-cart/${id}`,
        method: "DELETE",
      }),
    }),
    getUserCart: builder.query({
      query: () => ({
        url: "/get-user-cart",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addToUserCart: builder.mutation({
      query: ({ courseId, name, thumbnail, price, estimatedPrice }) => ({
        url: "/add-user-cart",
        method: "POST",
        body: { courseId, name, thumbnail, price, estimatedPrice },
        credentials: "include" as const,
      }),
    }),
    deleteFromUserCart: builder.mutation({
      query: (id) => ({
        url: `/delete-user-cart/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    clearUserCart: builder.mutation({
      query: (id) => ({
        url: `/clear-user-cart/`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetStripePublishablekeyQuery,
  useCreatePaymentIntentMutation,
  useCreateOrderMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useDeleteFromCartMutation,
  useGetUserCartQuery,
  useAddToUserCartMutation,
  useDeleteFromUserCartMutation,
  useCreateCartOrderMutation,
  useClearUserCartMutation,
} = orderApi;
