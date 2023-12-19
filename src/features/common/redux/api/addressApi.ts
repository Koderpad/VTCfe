import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../../../../app/api/apiSlice.js";
// import { EndpointBuilder } from "@reduxjs/toolkit/query";

interface AddressRequestBody {
  province: string;
  district: string;
  ward: string;
  fullAddress: string;
  fullName: string;
  phone: string;
  status: string;
}

export const addressApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder) => ({
    getAllAddress: builder.query({
      query: () => `/customer/address/all`,
    }),
    addAddress: builder.mutation({
      query: (data: AddressRequestBody) => ({
        url: `/customer/address/add`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllAddressQuery, useAddAddressMutation } = addressApi;
