import React, {useEffect, useRef, useState} from "react";
import {useAddNewReviewMutation} from "../../features/common/redux/api/reviewApi.ts";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {useGetOrderItemByOrderItemIdMutation} from "../../features/common/redux/api/orderApi.ts";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../constants/firebaseConfig.ts";

interface ReviewRequest {
    content: string;
    rating: number;
    orderItemId: number;
    image: string;
}


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


export class OrderItemResponse {
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

const metadata = {
    contentType: "image/jpeg",
};

const AddReview = () => {
    const [callApiAddReview] = useAddNewReviewMutation();
    const [reviewRequest, setReviewRequest] = useState<ReviewRequest>({
        content: "",
        rating: 1,
        orderItemId: 0,
        image: "",
    });
    const {id} = useParams();

    console.log("iddddddd" , id);


    const [callApiGetOrderItem] = useGetOrderItemByOrderItemIdMutation();
    const [orderItemResponse, setOrderItemResponse] = useState<OrderItemResponse | null>(null);
    const navigate = useNavigate();

    const [imageData, setImageData] = useState<string | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [url, setUrl] = useState<string | undefined>(undefined);
    useEffect(() => {
        uploadImageToFirebase();
    }, [imageData]);

    const uploadImageToFirebase = async () => {
        if (imageData) {
            const storageRef = ref(
                storage,
                `images/${Date.now()}-${fileInputRef.current?.files?.[0]?.name}`
            );
            const uploadTask = uploadBytesResumable(
                storageRef,
                dataURLtoBlob(imageData),
                metadata
            );

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Your existing code to track upload progress
                },
                (error) => {
                    console.error("Error uploading image:", error);
                },
                async () => {
                    // Image uploaded successfully
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log("Uploaded image URL:", downloadURL);
                    setUrl(downloadURL);
                    setReviewRequest((prev) => ({...prev, image: downloadURL}));
                    console.log("up thanh cong: ", downloadURL);
                }
            );
        }
    };

    const dataURLtoBlob = (dataURL: string): Blob => {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };


    const handleOrderItem = async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const response = await callApiGetOrderItem(id).unwrap();
            toast.success(response.message);
            setOrderItemResponse(response);
            setReviewRequest((prev) => ({...prev, orderItemId: response.orderItemId}));

        } catch (error) {
            toast.error(error?.data?.message);
        }
    }

    useEffect(() => {

        handleOrderItem();

    }, []);

    const handleFileChange = () => {
        if (fileInputRef.current && fileInputRef.current.files) {
            const file = fileInputRef.current.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImageData(reader.result as string);
            });
            reader.readAsDataURL(file);
            setImageData(reader.result as string);
        }
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if(url){
            setReviewRequest((prev) => ({...prev, image: url}));
        }

        try {
            const response = await callApiAddReview(reviewRequest).unwrap();
            toast.success(response.message);


            navigate(`/user/account/checkout/review/order-item/${id}`);
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setReviewRequest((prev) => ({...prev, [name]: value}));
    };


    // @ts-ignore
    return (
        <>
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

            <div className="container mx-auto mt-4">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="flex flex-col space-y-4 max-w-md mx-auto">
                        <div className="flex flex-col">
                            <label className="text-xl mb-2">Đánh giá của bạn</label>
                            <input
                                name="content"
                                id="content"
                                cols={30}
                                rows={5}
                                className="border-2 p-2"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xl mb-2">Xếp hạng của bạn</label>
                            <select
                                className="border-2 p-2"
                                name="rating"
                                id="rating"
                                onChange={handleChange}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div>
                        <div className="flex flex-col bg-gray-400 p-4 rounded">
                            <input
                                ref={fileInputRef}
                                id="vtc-upload__input"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <div className="flex flex-col mt-4">
                                <img src={url ? url : ""} className="w-[200px] h-[200px] rounded" alt="review-image" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Thêm đánh giá
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <ToastContainer position="bottom-right"/>



        </>
    );

}

export default AddReview;

