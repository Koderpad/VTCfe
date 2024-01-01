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

interface UpdateAddressRequestBody {
  addressId: number;
  province: string;
  district: string;
  ward: string;
  fullAddress: string;
  fullName: string;
  phone: string;
  status: string;
}

interface UpdateStatusAddressRequestBody {
  addressId: string;
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
    updateStatusAddress: builder.mutation({
      query: (data: UpdateStatusAddressRequestBody) => ({
        url: `/customer/address/update/status`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateAddress: builder.mutation({
      query: (data: UpdateAddressRequestBody) => ({
        url: `/customer/address/update`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllAddressQuery,
  useAddAddressMutation,
  useUpdateStatusAddressMutation,
  useUpdateAddressMutation,
} = addressApi;
