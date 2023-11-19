import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BASE_URL_VTC } from "../../../constants/urls";
import { ProductResponse } from "../../../utils/Response";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_VTC }),
  endpoints: (build) => ({
    getProductById: build.query<ProductResponse, number>({
      query: (id) => ({ url: `product/detail/${id}` }),
      // transformResponse: (response: {
      //   data: {
      //     status: string;
      //     message: string;
      //     code: number;
      //     productDTO: IProduct;
      // } }
      // ) => {
      //   console.log("response.data.productDTO: ", response.data.productDTO);
      //   return response.data.productDTO;

      // },
      // transformResponse: (response:ProductResponse) => {
      //   console.log("response.data.productDTO: ", response.productDTO);
      //   return response.productDTO;
      // },
    }),
  }),
});

export const { useGetProductByIdQuery } = productApi;