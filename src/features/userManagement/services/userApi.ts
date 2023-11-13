import { apiSlice } from "../../../app/api/apiSlice.js";

interface UserProfile {
  email: string;
  fullName: string;
  birthday: string;
  gender: boolean;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/customer/profile",
    }),
    updateUser: builder.mutation<UserProfile, UserProfile>({
      query: (userProfile) => ({
        url: "/customer/profile",
        method: "PUT",
        body: userProfile,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
