import { apiSlice } from "../../../../app/api/apiSlice.js";

export const attributeVendorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAttribute: builder.mutation({
      query: ({ name, value }) => ({
        url: `/vendor/attribute/add?name=${encodeURIComponent(
          name
        )}&value=${encodeURIComponent(value)}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useAddAttributeMutation } = attributeVendorApi;
