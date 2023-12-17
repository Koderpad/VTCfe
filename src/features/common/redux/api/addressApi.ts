import { apiSlice } from "../../../../app/api/apiSlice.js";

export const addressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAddress: builder.query({
      query: () => `/customer/address/all`,
    }),
    addAddress: builder.mutation({
      query: (body) => ({
        url: `/customer/address/add`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetAllAddressQuery, useAddAddressMutation } = addressApi;
