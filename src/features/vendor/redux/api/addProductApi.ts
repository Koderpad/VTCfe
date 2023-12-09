import { apiSlice } from "../../../../app/api/apiSlice.js";

export const addProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/vendor/product/add",
        method: "POST",
        body: data,
      }),
    }),
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

export const { useAddProductMutation } = addProductApi;
