import React, {useEffect, useState} from "react";
import {useGetReviewsByProductIdMutation} from "../../features/common/redux/api/reviewApi.ts";
import {format} from 'date-fns';

interface ListReviewResponse {
    status: string;
    message: string;
    code: number;
    count: number;
    productId: number;
    averageRating: number;
    reviewDTOs: ReviewDTO[];
}

interface ReviewDTO {
    reviewId: number;
    content: string;
    rating: number;
    image: string;
    status: string;
    username: string;
    orderItemId: number;
    createdAt: string;
    countComment: number;
    commentDTOs: CommentDTO[];
}

interface CommentDTO {
    commentId: number;
    content: string;
    status: string;
    username: string;
    shopName: string;
    createdAt: string;
}


interface ViewReviewProps {
    reviewId: string | undefined;
}

const Reviews: React.FC<ViewReviewProps> = ({reviewId}) => {
    const [reviews, setReviews] = useState<ReviewDTO[]>([]);
    const [listReviewResponse, setListReviewResponse] = useState<ListReviewResponse>(null);
    const [callReviews] = useGetReviewsByProductIdMutation();

    const callApi = async () => {
        try {
            const response = await callReviews(parseInt(reviewId!));
            console.log("responseresponseresponse", response.data);
            setReviews(response.data.reviewDTOs);
            setListReviewResponse(response.data);
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        callApi();
    }, []);


    return (
        <div>

            {reviews && reviews.length === 0 ? (
                <div className="container rounded p-4">
                    <div className="mb-8 rounded overflow-hidden bg-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <div className="mr-2 font-bold">
                                    Chưa có đánh giá nào cho sản phẩm này
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ): (

                    <div className="flex items-center mt-2">
                        <p className="font-bold">Số lượng đánh giá:</p>
                        <p className="ml-4">{listReviewResponse.count}</p>
                    </div>

            )}


            {reviews && reviews.map((review) => (

                <div className="container rounded p-4">


                    <div key={review.reviewId} className="mb-8 rounded overflow-hidden bg-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <div className="mr-2 font-bold">
                                    Tài khoản:
                                </div>
                                <div>{review.username}</div>
                            </div>
                            <div>
                                {/* Đây là một ví dụ về cách render rating bằng icon ngôi sao màu vàng */}
                                {Array.from({length: review.rating}, (_, index) => (
                                    // Thêm classes Tailwind cho icon màu vàng
                                    <span key={index} className="text-2xl text-yellow-500">&#9733;</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center mt-2">
                            <p className="font-bold">Nội dung đánh giá:</p>
                            <p className="ml-4">
                                {review.content}
                            </p>
                        </div>

                        <div className="flex items-center mt-2">
                            <p className="font-bold">Ngày đánh giá:</p>
                            {/* Sử dụng format để định dạng ngày */}
                            <p className="ml-4">
                                {format(new Date(review.createdAt), 'dd/MM/yyyy')}
                            </p>
                        </div>

                        {review.image && (
                            <div className="flex items-center mt-4">
                                <p className="font-bold">Hình ảnh đánh giá:</p>
                                <img src={review.image} alt="Review" className="ml-4  w-24 h-24"/>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <br/>
        </div>
    );
};
export default Reviews;