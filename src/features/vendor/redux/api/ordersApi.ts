import { apiSlice } from "../../../../app/api/apiSlice.js";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/vendor/order/list",
      }),
    }),
    getOrdersByStatus: builder.query({
      query: (status: string) => ({
        url: `/vendor/order/list/status/${status}`,
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrdersByStatusQuery } = ordersApi;
