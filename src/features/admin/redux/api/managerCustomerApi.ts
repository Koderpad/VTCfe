import { apiSlice } from "../../../../app/api/apiSlice.js";

export const managerCustomerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    managerCustomersByStatus: builder.mutation({
      query: ({ status, page, size }) => ({
        url: `/manager/customer/list/by-status/${status}`,
        method: "GET",
        params: { page, size },
      }),
    }),

    managerCustomersSortAndSearch: builder.mutation({
      query: ({ status, page, size, search }) => ({
        url: `/manager/customer/search/status/${status}`,
        method: "GET",
        params: { page, size, search },
      }),
    }),

    managerCustomerDetail: builder.mutation({
      query: (customerId) => ({
        url: `/manager/customer/detail/${customerId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useManagerCustomersByStatusMutation,
  useManagerCustomersSortAndSearchMutation,
  useManagerCustomerDetailMutation,
} = managerCustomerApi;
