import { apiSlice } from "../../../../app/api/apiSlice.js";

export const managerProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    lockProductByProductId: builder.mutation({
      query: ({ productId, note }) => ({
        url: `/manager/product/lock/productId/${productId}`,
        method: "POST",
        data: { note },
      }),
    }),

    unlockProductByProductId: builder.mutation({
      query: ({ productId, note }) => ({
        url: `/manager/product/unlock/productId/${productId}`,
        method: "POST",
        data: { note },
      }),
    }),

    getListManagerProduct: builder.query({
      query: ({ page, size }) => ({
        url: `/manager/product/list`,
        method: "GET",
        params: { page, size },
      }),
    }),

    getListManagerProductByProductName: builder.query({
      query: ({ page, size, productName }) => ({
        url: `/manager/product/list/productName/${productName}`,
        method: "GET",
        params: { page, size },
      }),
    }),
  }),
});

export const {
  useLockProductByProductIdMutation,
  useUnlockProductByProductIdMutation,
  useGetListManagerProductQuery,
  useGetListManagerProductByProductNameQuery,
} = managerProductApi;
