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
  }),
});

export const { useAddProductMutation } = addProductApi;
