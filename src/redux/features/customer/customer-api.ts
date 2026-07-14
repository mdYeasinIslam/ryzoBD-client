import { apiSlice } from "../../api-slice";

const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({ url: "/customers/me" }),
      providesTags: ["profile"],
      // keepUnusedDataFor: 60,
      // refetchOnMountOrArgChange: true,
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/customers/me",
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["profile"],
    }),
    getAddresses: builder.query({
      query: () => ({ url: "/customers/addresses" }),
      providesTags: ["addresses"],
    }),
    addAddress: builder.mutation({
      query: (body) => ({
        url: "/customers/addresses",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["addresses"],
    }),
    updateAddress: builder.mutation({
      query: ({ body, id }) => ({
        url: `/customers/addresses/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["addresses"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/customers/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["addresses"],
    }),
    setDefaultAddress: builder.mutation({
      query: (id) => ({
        url: `/customers/addresses/${id}/set-default`,
        method: "PATCH",
      }),
      invalidatesTags: ["addresses"],
    }),
  }),
});

export default customerApi;

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} = customerApi;
