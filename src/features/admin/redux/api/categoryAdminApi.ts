import { apiSlice } from "../../../../app/api/apiSlice.js";

export const categoryAdminApi = apiSlice.injectEndpoints({
  // endpoints: (builder) => ({
  //   getAllCategory: builder.query({
  //     query: () => `/admin/category/all-parent`,
  //   }),
  //   // addNewVoucher: builder.mutation({
  //   //   query: (data) => ({
  //   //     url: `/admin/voucher/add`,
  //   //     method: "POST",
  //   //     body: data,
  //   //   }),
  //   // }),
  // }),
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => `/admin/category/all-parent`,
    }),

    getCategoryParent: builder.mutation({
      query: () => ({
        url: `/admin/category/all-parent`,
        method: "GET",
      }),
    }),

    addNewCategoryByAdmin: builder.mutation({
      query: (data) => ({
        url: `/admin/category/add`,
        method: "POST",
        body: data,
      }),
    }),

    updateCategoryParentByAdmin: builder.mutation({
      query: (data) => ({
        url: `/admin/category/update`,
        method: "PUT",
        body: data,
      }),
    }),

    getCategoryParentById: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/category/parent/detail/${id}`,
        method: "GET",
      }),
    }),
  }),
});

// export const { useGetAllCategoryQuery } = categoryAdminApi;
export const {
  useGetAllCategoryQuery,
  useAddNewCategoryByAdminMutation,
  useGetCategoryParentByIdMutation,
  useUpdateCategoryParentByAdminMutation,
  useGetCategoryParentMutation,
} = categoryAdminApi;
