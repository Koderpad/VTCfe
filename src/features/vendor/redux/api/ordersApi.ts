import { apiSlice } from "../../../../app/api/apiSlice.js";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/vendor/order/list",
      }),
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
