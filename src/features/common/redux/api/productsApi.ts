import { apiSlice } from "../../../../app/api/apiSlice.js";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsByCategory: builder.query({
      query: (id) => `/product/category/${id}?isParent=false`,
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
  useGetProductsByCategoryQuery,
} = productsApi;
