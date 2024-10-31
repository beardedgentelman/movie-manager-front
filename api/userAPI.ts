import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '@/types/types';
import { clearUser, setUser } from '@/store/reducers/userSlice';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const userAPI = createApi({
  reducerPath: 'userAPI',
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
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => 'user/get-user',
      transformResponse: (res: IUser) => res,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const user = data as IUser;
          dispatch(setUser(user));
        } catch (err) {
          localStorage.clear();
          dispatch(clearUser());
        }
      },
    }),
  }),
});
export const { useGetUserQuery } = userAPI;
