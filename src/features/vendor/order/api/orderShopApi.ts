import { apiSlice } from "../../../../app/api/apiSlice.js";

export const orderShopApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getPageOrder: builder.mutation({
      query: ({ page, size }) => ({
        url: `/vendor/order/list/page`,
        method: "GET",
        params: { page, size },
      }),
    }),

     getPageOrderByStatus: builder.mutation({
      query: ({ status, page, size }) => ({
        url: `/vendor/order/list/page/status/${status}`,
        method: "GET",
        params: { page, size },
      }),
    }),
    


  }),
});

export const { useGetPageOrderMutation, useGetPageOrderByStatusMutation} = orderShopApi;
