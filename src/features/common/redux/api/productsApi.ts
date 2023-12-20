import { apiSlice } from "../../../../app/api/apiSlice.js";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsByCategory: builder.query({
      query: (id) => `/product/category/${id}`,
    }),
    getFavoriteProducts: builder.query({
      query: () => `/customer/favorite-product/list`,
    }),
  }),
});

export const { useGetProductsByCategoryQuery, useGetFavoriteProductsQuery } =
  productsApi;
