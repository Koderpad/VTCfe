import { apiSlice } from "../../../../app/api/apiSlice.js";

export const addProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: ({ name, description, image, parentId }) => ({
        url: `/vendor/shop/category/add?name=${name}&description=${description}&image=${image}&parentId=${parentId}`,
        method: "POST",
      }),
    }),
    getAllParentCategories: builder.query({
      query: () => `/vendor/shop/category/all-parent`,
    }),
    getAllCategories: builder.query({
      query: () => `/vendor/shop/category/all`,
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetAllParentCategoriesQuery,
  useGetAllCategoriesQuery,
} = addProductApi;
