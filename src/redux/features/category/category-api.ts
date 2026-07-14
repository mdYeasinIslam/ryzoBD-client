import { getQueryString } from "@/lib/utils";
import { apiSlice } from "../../api-slice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (query) => ({
        url: `/categories?${getQueryString(query)}`,
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
  }),
});

export default categoryApi;

export const { useGetCategoriesQuery } = categoryApi;
