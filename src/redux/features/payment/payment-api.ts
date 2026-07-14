import { apiSlice } from "../../api-slice";

const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStripeCheckoutSession: builder.mutation({
      query: (body) => ({
        url: "/payment/stripe/create-checkout-session",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export default paymentApi;

export const { useCreateStripeCheckoutSessionMutation } = paymentApi;
