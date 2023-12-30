import { apiSlice } from "../../../../app/api/apiSlice.js";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/vendor/order/list",
      }),
    }),
    getOrdersByStatus: builder.query({
      query: (status: string) => {
        const base = "/vendor/order/list";
        return status === "ALL" ? base : `${base}/status/${status}`;
      },
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/vendor/order/update/status/${orderId}?status=${status}`,
        method: "PATCH",
      }),
    }),

    getShopOrderById: builder.query({
        query: (id) => `/vendor/order/detail/${id}`,
        }),





  }),
});

export const {
  useGetOrdersQuery,
  useGetOrdersByStatusQuery,
  useUpdateOrderStatusMutation,
    useGetShopOrderByIdQuery,
} = ordersApi;
