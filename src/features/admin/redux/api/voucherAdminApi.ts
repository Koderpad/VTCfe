import { apiSlice } from "../../../../app/api/apiSlice.js";

export const voucherAdminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVoucher: builder.query({
      query: () => `/admin/voucher/get-all/system`,
    }),
    addNewVoucher: builder.mutation({
      query: (data) => ({
        url: `/admin/voucher/add`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllVoucherQuery, useAddNewVoucherMutation } =
  voucherAdminApi;
