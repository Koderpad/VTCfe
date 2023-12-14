import { apiSlice } from "../../../../app/api/apiSlice.js";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategoryFromAdmin: builder.query({
      query: () => `http://localhost:8181/api/admin/category/all-parent`,
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

export const { useGetAllCategoryFromAdminQuery } = categoryApi;
