import { apiSlice } from "../../../../app/api/apiSlice.js";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveOrder: builder.mutation({
      query: (body) => ({
        url: `/customer/order/save`,
        method: "POST",
        body,
      }),
    }),
    createOrder: builder.mutation({
      query: (cartIds: number[]) => ({
        url: `/customer/order/create?${cartIds
          .map((id) => `cartIds=${id}`)
          .join("&")}`,
        method: "GET",
      }),
    }),
    getOrderByOrderId: builder.query({
      query: (orderId: number) => `customer/order/detail/${orderId}`,
    }),
    getOrderByOrderIdMu: builder.mutation({
      query: (orderId: number) => ({
        url: `customer/order/detail/${orderId}`,
        method: "GET",
      }),
    }),

    getOrderByStatus: builder.query({
      query: (status: string) => `customer/order/list/status/${status}`,
    }),
    getOrderByStatusMu: builder.mutation({
      query: (status: string) => ({
        url: `customer/order/list/status/${status}`,
        method: "GET",
      }),
    }),

    createUpdateOrder: builder.mutation({
      query: ({
        cartIds,
        addressId,
        voucherSystemId,
        voucherShopId,
        note,
        paymentMethod,
        shippingMethod,
      }) => {
        let url = `/customer/order/create-update?cartIds=${cartIds}&addressId=${addressId}&note=${note}&paymentMethod=${paymentMethod}&shippingMethod=${shippingMethod}`;

        if (voucherSystemId != null) {
          url += `&voucherSystemId=${voucherSystemId}`;
        }

        if (voucherShopId != null) {
          url += `&voucherShopId=${voucherShopId}`;
        }

        return {
          url,
          method: "GET",
        };
      },
    }),

    cancelOrder: builder.mutation({
      query: (orderId: number) => ({
        url: `/customer/order/cancel/${orderId}`,
        method: "POST",
      }),
    }),
    getOrdersByCus: builder.query({
      query: () => `/customer/order/list`,
    }),

    getOrdersByStatusVer2: builder.query({
      query: (status: string) => {
        const base = "/customer/order/list";
        return status === "ALL" ? base : `${base}/status/${status}`;
      },
    }),

    getOrderItemByOrderItemId: builder.mutation({
        query: (orderItemId: number) => ({
            url: `/customer/order/order-item/detail/${orderItemId}`,
            method: "GET",
        }),
        }),







  }),
});

export const {
  useCreateOrderMutation,
  useCreateUpdateOrderMutation,
  useSaveOrderMutation,
  useGetOrderByOrderIdQuery,
  useGetOrderByStatusQuery,
  useGetOrderByStatusMuMutation,
  useLazyGetOrderByOrderIdQuery,
  useGetOrderByOrderIdMuMutation,
  useCancelOrderMutation,
  useGetOrdersByCusQuery,
    useGetOrderItemByOrderItemIdMutation,
  useGetOrdersByStatusVer2Query,
} = orderApi;
