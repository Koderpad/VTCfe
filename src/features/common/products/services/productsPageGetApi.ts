import { apiSlice } from "../../../../app/api/apiSlice.js";

export const productsPageGetApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewFavoriteProduct: builder.mutation({
      query: ({ productId }) => ({
        url: `/customer/favorite-product/add`,
        method: "POST",
        params: { productId },
      }),
    }),
    getProductPageList: builder.query({
      query: ({ page, size }) => ({
        url: `/product/page/list`,
        method: "GET",
        params: { page, size },
      }),
    }),
  }),
});

export const { useAddNewFavoriteProductMutation, useGetProductPageListQuery } =
  productsPageGetApi;
