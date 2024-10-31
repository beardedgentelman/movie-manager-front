import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuthState, ILogin, IRegistration } from '@/types/types';
import { setUser } from '@/store/reducers/userSlice';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    registration: builder.mutation<IAuthState, IRegistration>({
      query: (body) => ({
        url: 'auth/registration',
        method: 'POST',
        body: body,
      }),
      transformResponse: (res: IAuthState) => res,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken, user } = data;
          localStorage.setItem('accessToken', accessToken);
          dispatch(setUser(user));
        } catch (error: any) {
          localStorage.clear();
        }
      },
    }),
    login: builder.mutation<IAuthState, ILogin>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: IAuthState) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken, user } = data;
          localStorage.setItem('accessToken', accessToken);
          dispatch(setUser(user));
        } catch (error: any) {
          localStorage.clear();
        }
      },
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation } = authAPI;
