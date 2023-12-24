import { apiSlice } from "../../../../app/api/apiSlice.js";

export const reviewApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviewsByProductId: builder.mutation({
            query: (id) => ({
                url: `/review/${id}`,
                method: "POST",
            }),
        }),

        getReviewsByProductIdAndRating: builder.mutation({
            query: ({ productId, rating }) => ({
                url: `/review/product/${productId}/rating/${rating}`,
                method: "GET",
            }),
        }),

        getReviewsByProductIdAndImageNotNull: builder.mutation({
            query: (id) => ({
                url: `/review/product/${id}/image`,
                method: "GET",
            }),
        }),

        getReviewDetailById: builder.mutation({
            query: (id) => ({
                url: `/review/detail/${id}`,
                method: "GET",
            }),
        }),

        countReviewByProductId: builder.mutation({
            query: (id) => ({
                url: `/review/count/${id}`,
                method: "GET",
            }),
        }),

        getAvgRatingByProductId: builder.mutation({
            query: (id) => ({
                url: `/review/avg-rating/${id}`,
                method: "GET",
            }),
        }),


        addNewReview: builder.mutation({
            query: (reviewRequest) => ({
                url: `/customer/review/add`,
                method: "POST",
                body: reviewRequest,
            }),
        }),

        // deleteReview: builder.mutation({
        //     query: (reviewId) => ({
        //         url: `/customer/review/delete/${reviewId}`,
        //         method: "PATCH",
        //     }),
        // }),

        checkReviewExist: builder.mutation({
            query: (orderItemId) => ({
                url: `/customer/review/exist/${orderItemId}`,
                method: "GET",
            }),
        }),

        getReviewDetailByOrderItemId: builder.mutation({
            query: (reviewId) => ({
                url: `/customer/review/detail/by-order-item/${reviewId}`,
                method: "GET",
            }),
        }),




    }),
});

export const {
    useGetReviewsByProductIdMutation,
    useGetReviewsByProductIdAndRatingMutation,
    useGetReviewsByProductIdAndImageNotNullMutation,
    useGetReviewDetailByIdMutation,
    useCountReviewByProductIdMutation,
    useGetAvgRatingByProductIdMutation,
    useAddNewReviewMutation,
    // useDeleteReviewMutation,
    useCheckReviewExistMutation,
    useGetReviewDetailByOrderItemIdMutation,
} = reviewApi;