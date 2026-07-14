import { apiSlice } from "@/redux/api-slice";

const mediaUploadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFiles: builder.mutation({
      query: (body) => ({
        url: "/upload",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export default mediaUploadApi;

export const { useUploadFilesMutation } = mediaUploadApi;
