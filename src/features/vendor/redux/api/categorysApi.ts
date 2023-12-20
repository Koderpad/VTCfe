import { apiSlice } from "../../../../app/api/apiSlice.js";

export const categorysApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: `/vendor/shop/category/add`,
        method: "POST",
        body: data,
      }),
    }),
    getAllParentCategories: builder.query({
      query: () => `/vendor/shop/category/all-parent`,
    }),

    getParentCategories: builder.mutation({
      query: () => ({
        url: `/vendor/shop/category/all-parent`,
        method: "GET",
      }),
    }),

    getShopCategories: builder.mutation({
      query: () => ({
        url: `/vendor/shop/category/all`,
        method: "GET",
      }),
    }),

    getCategories: builder.mutation({
      query: ({ type }) => ({
        url: `/vendor/shop/category/${type}`,
        method: "GET",
      }),
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
  useGetParentCategoriesMutation,
  useGetShopCategoriesMutation,
  useGetCategoriesMutation,
} = categorysApi;

// import { apiSlice } from "../../../../app/api/apiSlice.js";

// export const addProductApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     addCategory: builder.mutation({
//       query: ({ name, description, image, parentId }) => ({
//         url: `/vendor/shop/category/add?name=${name}&description=${description}&image=${image}&parentId=${parentId}`,
//         method: "POST",
//       }),
//     }),
//     getAllParentCategories: builder.query({
//       query: () => `/vendor/shop/category/all-parent`,
//     }),
//     getAllCategories: builder.query({
//       query: () => `/vendor/shop/category/all`,
//     }),
//   }),
// });

// export const {
//   useAddCategoryMutation,
//   useGetAllParentCategoriesQuery,
//   useGetAllCategoriesQuery,
// } = addProductApi;
