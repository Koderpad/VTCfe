import { apiSlice } from "../../../../app/api/apiSlice.js";

export const categoryAdminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => `/admin/category/all-parent`,
    }),
    // addNewVoucher: builder.mutation({
    //   query: (data) => ({
    //     url: `/admin/voucher/add`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
  }),
});

export const { useGetAllCategoryQuery } = categoryAdminApi;
