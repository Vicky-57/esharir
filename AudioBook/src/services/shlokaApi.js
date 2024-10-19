import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shlokaApi = createApi({
  reducerPath: "shlokaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
  }),
  endpoints: (builder) => ({
    getShlokas: builder.query({
      query: ({ bookId, chapterId }) => `/books/${bookId}/chapters/${chapterId}/shlokas/`,
    }),
  }),
});

export const { useGetShlokasQuery } = shlokaApi;
