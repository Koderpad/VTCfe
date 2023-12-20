import { apiSlice } from "../../../../app/api/apiSlice.js";
import { EndpointBuilder } from "@reduxjs/toolkit/query/react";

export const voucherApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder) => ({
    getVoucherByShopId: builder.query({
      query: (id: number) => `/voucher/list-on-shop/${id}`,
    }),
    getVoucherSystem: builder.query({
      query: () => `/voucher/list-on-system`,
    }),
  }),
});

export const { useGetVoucherByShopIdQuery, useGetVoucherSystemQuery } =
  voucherApi;
