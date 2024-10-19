import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const audioApi = createApi({
  reducerPath: "audioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
  }),
  endpoints: (builder) => ({
    playAudio: builder.query({
      // Adjust the URL to match the endpoint structure
      query: ({ bookId, chapterId, shlokaId }) => 
        `books/${bookId}/chapters/${chapterId}/shlokas/${shlokaId}/play-audio/`,
      // Set responseType to 'blob' to correctly fetch audio files
      transformResponse: (response) => response,
    }),
  }),
});

// Export the hook to use in components
export const { usePlayAudioQuery } = audioApi;
