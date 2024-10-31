import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMovie, IUser } from '@/types/types';
import { clearUser, setUser } from '@/store/reducers/userSlice';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const moviesAPI = createApi({
  reducerPath: 'moviesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    },
  }),
  tagTypes: ['Movies'],
  endpoints: (builder) => ({
    getUserMovies: builder.query<
      { movies: IMovie[]; total: number },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => {
        return `movie/user-movies?page=${+page}&limit=${+limit}`;
      },
      transformResponse: (res: { movies: IMovie[]; total: number }) => res,
      providesTags: ['Movies'],
    }),
    getMovie: builder.query<IMovie, number>({
      query: (movieId) => `movie/${movieId}`,
      transformResponse: (res: IMovie) => res,
    }),
    uploadPoster: builder.mutation<{ message: string; s3Url: string }, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: 'movie/upload-poster',
          method: 'POST',
          body: formData,
        };
      },
    }),
    createMovie: builder.mutation<IMovie, Omit<IMovie, 'id'>>({
      query: (newMovie) => {
        return {
          url: 'movie/create',
          method: 'POST',
          body: newMovie,
        };
      },
      invalidatesTags: ['Movies'],
    }),
  }),
});
export const {
  useGetUserMoviesQuery,
  useLazyGetMovieQuery,
  useUploadPosterMutation,
  useCreateMovieMutation,
} = moviesAPI;
