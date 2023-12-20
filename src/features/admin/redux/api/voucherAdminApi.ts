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

    updateVoucherAdmin: builder.mutation({
      query: (data) => ({
        url: `/admin/voucher/update`,
        method: "PUT",
        body: data,
      }),
    }),

    getVoucherAdminByVoucherId: builder.mutation({
      query: (id: number) => ({
        url: `/admin/voucher/detail/system/${id}`,
        method: "GET",
      }),
    }),

    getAllVoucherAdminByUsername: builder.mutation({
      query: () => ({
        url: `/admin/voucher/get-all/system/by-username`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllVoucherQuery,
  useAddNewVoucherMutation,
  useGetAllVoucherAdminByUsernameMutation,
  useUpdateVoucherAdminMutation,
  useGetVoucherAdminByVoucherIdMutation,
} = voucherAdminApi;
