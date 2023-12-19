import { apiSlice } from "../../../../app/api/apiSlice.js";

export const statisticalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    statisticalBasic: builder.mutation({
      query: ( data ) => ({
        url: `/vendor/shop/revenue/statistics`,
        method: "POST",
         body: data,
      }),
    }),
  }),
});

export const { useStatisticalBasicMutation } = statisticalApi;
