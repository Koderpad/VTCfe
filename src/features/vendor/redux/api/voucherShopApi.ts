import { apiSlice } from "../../../../app/api/apiSlice.js";

// @ts-ignore
export const voucherShopApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addNewVoucherShop: builder.mutation({
            query: ( data ) => ({
                url: `/vendor/shop/voucher/add`,
                method: "POST",
                body: data,
            }),
        }),

        getVoucherShopByVoucherId: builder.mutation({
            query: (voucherId: number ) => ({
                url: `/vendor/shop/voucher/detail/${voucherId}`,
                method: "GET",
            }),
        }),

        getAllVoucherShop: builder.mutation({
            query: () => ({
                url: `/vendor/shop/voucher/get-all-shop`,
                method: "GET",
            }),
        }),

        updateVoucherShop: builder.mutation({
            query: ( data ) => ({
                url: `/vendor/shop/voucher/update`,
                method: "PUT",
                body: data,
            }),
        }),




    }),
});

export const { useAddNewVoucherShopMutation,
useUpdateVoucherShopMutation,
useGetAllVoucherShopMutation,
useGetVoucherShopByVoucherIdMutation} = voucherShopApi;
