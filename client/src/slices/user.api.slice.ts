import { apiSlice } from "./api.slice";

const USER_URL = "/api/user";
const AUTH_URL = "/api/auth";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    getProfile: builder.mutation({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: 'GET',
      }),
    }),
    getAllUsers: builder.mutation({
      query: () => ({
        url: `${USER_URL}/getall`,
        method: 'GET',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
      })
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileMutation, useGetAllUsersMutation, useLogoutMutation } = userApiSlice;
