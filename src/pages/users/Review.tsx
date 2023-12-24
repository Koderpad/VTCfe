import {useNavigate, useParams} from "react-router-dom";
import {useGetOrderItemByOrderItemIdMutation} from "../../features/common/redux/api/orderApi.ts";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useGetReviewDetailByOrderItemIdMutation} from "../../features/common/redux/api/reviewApi.ts";


interface ReviewResponse {
    status: string;
    message: string;
    code: number;
    username: string;
    productId: number;
    reviewDTO: ReviewDTO;
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


interface OrderItemResponse {
    status: string;
    message: string;
    code: number;
    orderItemId: number;
    orderId: number;
    cartId: number;
    productVariantId: number;
    sku: string;
    productVariantImage: string;
    price: number;
    quantity: number;
    productId: number;
    productName: string;
    productImage: string;
    shopId: number;
    shopName: string;
}


const Review = () => {

    const {id} = useParams();

    console.log("iddddddd", id);

    const [reviewResponse, setReviewResponse] = useState<ReviewResponse | null>(null);
    const [callApiGetReview] = useGetReviewDetailByOrderItemIdMutation();
    const [callApiGetOrderItem] = useGetOrderItemByOrderItemIdMutation();
    const [orderItemResponse, setOrderItemResponse] = useState<OrderItemResponse | null>(null);
    const navigate = useNavigate();

    const handleOrderItem = async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const response = await callApiGetOrderItem(id).unwrap();
            toast.success(response.message);
            setOrderItemResponse(response);
            const response2 = await callApiGetReview(id).unwrap();
            setReviewResponse(response2);

            console.log("response2", response2);

        } catch (error) {
            toast.error(error?.data?.message);
        }
    }




    useEffect(() => {

        handleOrderItem();
        // handleReview();

    }, []);


    return (<>

        <div className="container">
            <table className="w-full border-collapse mt-4">
                <thead>
                <tr>
                    <th className="px-4">Tên Sản phẩm</th>
                    <th className="px-4">Ảnh Sản phẩm</th>
                    <th className="px-4">Phân loại</th>
                    <th className="px-4">Gía</th>
                    <th className="px-4">Số lượng</th>
                    <th className="px-4">Tổng</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="border px-4 py-2"> {orderItemResponse?.productName}</td>
                    <td className="border px-4 py-2"><img src={orderItemResponse?.productImage} alt="product"
                                                          className="w-20 h-20"/></td>
                    <td className="border px-4 py-2"> {orderItemResponse?.sku}</td>
                    <td className="border px-4 py-2"> {orderItemResponse?.price}</td>
                    <td className="border px-4 py-2"> {orderItemResponse?.quantity}</td>
                    <td className="border px-4 py-2"> {orderItemResponse?.price * orderItemResponse?.quantity}</td>
                </tr>
                </tbody>
            </table>
        </div>

        <div className="container">
            <table className="w-full border-collapse mt-4">
                <thead>
                <tr>
                    <th className="px-4">Nội dung đánh giá</th>
                    <th className="px-4">Đánh giá</th>
                    <th className="px-4">Ảnh</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="border px-4 py-2"> {reviewResponse?.reviewDTO.content}</td>
                    <td className="border px-4 py-2"> {reviewResponse?.reviewDTO.rating}</td>
                    <td className="border px-4 py-2">{reviewResponse?.reviewDTO.image !== "" ?
                        <img src={reviewResponse?.reviewDTO.image} alt="product"
                             className="w-20 h-20"/>
                        : ""}</td>
                </tr>
                </tbody>
            </table>
        </div>


    </>)

}

export default Review