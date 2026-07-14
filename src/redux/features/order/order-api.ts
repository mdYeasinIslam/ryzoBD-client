import { getQueryString } from "@/lib/utils";
import { apiSlice } from "../../api-slice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["orders"],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, { id }) => [{ type: "orders", id }],
    }),
    getCustomerOrders: builder.query({
      query: (query) => ({
        url: `/orders/me?${getQueryString(query)}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "orders",
        { type: "orders", id },
      ],
    }),
  }),
});

export default orderApi;

export const {
  useCreateOrderMutation,
  useGetCustomerOrdersQuery,
  useGetSingleOrderQuery,
  useCancelOrderMutation,
} = orderApi;
