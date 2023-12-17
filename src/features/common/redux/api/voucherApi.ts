import { apiSlice } from "../../../../app/api/apiSlice.js";

export const voucherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVoucherByShopId: builder.query({
      query: (id) => `/voucher/list-on-shop/${id}`,
    }),
    getVoucherSystem: builder.query({
      query: () => `/voucher/list-on-system`,
    }),
    // login: builder.mutation({
    //   query: (data) => ({
    //     url: "/auth/login",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // register: builder.mutation({
    //   query: (data) => ({
    //     url: `/auth/register`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // getUser: builder.query({ query: () => "/customer/profile" }),
    // login22: builder.mutation({
    //   query: () => ({
    //     url: "/customer/profile",
    //     method: "GET",
    //     // body: data
    //   }),
    // }),
  }),
});

export const { useGetVoucherByShopIdQuery, useGetVoucherSystemQuery } =
  voucherApi;
