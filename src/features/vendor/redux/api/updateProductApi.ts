import { apiSlice } from "../../../../app/api/apiSlice.js";

export const updateProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/vendor/product/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getProductDetail: builder.query({
      query: (id) => `/vendor/product/detail/${id}`,
    }),
  }),
});

export const { useUpdateProductMutation, useGetProductDetailQuery } =
  updateProductApi;
