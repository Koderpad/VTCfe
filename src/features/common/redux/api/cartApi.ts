import { apiSlice } from "../../../../app/api/apiSlice.js";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListCartByUsername: builder.query({
      query: () => `/customer/cart/get-list`,
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/customer/cart/delete/${id}`,
        method: "DELETE",
      }),
    }),
    addNewCart: builder.mutation({
      query: (data) => ({
        url: `/customer/cart/add`,
        method: "POST",
        body: data,
      }),
    }),
    // login: builder.mutation({
    //   query: (data) => ({
    //     url: "/auth/login",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // register: builder.mutation({
    //   query: (data) => ({
    //     url: `/auth/register`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // getUser: builder.query({ query: () => "/customer/profile" }),
    // login22: builder.mutation({
    //   query: () => ({
    //     url: "/customer/profile",
    //     method: "GET",
    //     // body: data
    //   }),
    // }),
  }),
});

export const {
  useGetListCartByUsernameQuery,
  useDeleteCartMutation,
  useAddNewCartMutation,
} = cartApi;
