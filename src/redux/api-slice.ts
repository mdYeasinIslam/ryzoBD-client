import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base-query";

export const apiSlice = createApi({
  baseQuery: baseQuery,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  // keepUnusedDataFor: 0,
  tagTypes: ["profile", "addresses", "orders", "categories", "my-packages"],
  endpoints: () => ({}),
});
