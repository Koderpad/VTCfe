import {
    useAddNewVoucherShopMutation,
    useGetVoucherShopByVoucherIdMutation,
    useUpdateVoucherShopMutation,
} from "../../features/vendor/redux/api/voucherShopApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import React, {useEffect, useState} from "react";

interface VoucherShopRequest {
    voucherId: number;
    code: string;
    name: string;
    description: string;
    discount: number;
    minPrice: number;
    maxPrice: number;
    maxDiscount: number;
    quantity: number;
    startDate: string;
    endDate: string;
    type: string;
    username: string;
}

const UpdateVoucherShop = () => {
    const {id} = useParams();
    const [callGetVoucherShopByVoucherId] =
        useGetVoucherShopByVoucherIdMutation();
    const [callApiUpdateVoucherShop] = useUpdateVoucherShopMutation();
    const navigate = useNavigate();
    const [voucherShopRequest, setVoucherShopRequest] =
        useState<VoucherShopRequest>({
            voucherId: 0,
            code: "",
            name: "",
            description: "",
            discount: 0,
            minPrice: 0,
            maxPrice: 0,
            maxDiscount: 0,
            quantity: 0,
            startDate: "",
            endDate: "",
            type: "",
            username: "",
        });

    const handleGetVoucherShopByVoucherId = async (
        e: { preventDefault: () => void } | undefined
    ) => {
        try {
            const res = await callGetVoucherShopByVoucherId(id).unwrap();
            const response = res.voucherDTO;
            const dataRequest: VoucherShopRequest = {
                voucherId: response.voucherId,
                code: response.code,
                name: response.name,
                description: response.description,
                discount: response.discount,
                minPrice: response.minPrice,
                maxPrice: response.maxPrice,
                maxDiscount: response.maxDiscount,
                quantity: response.quantity,
                startDate: response.startDate,
                endDate: response.endDate,
                type: response.type === "Giảm theo phần trăm" ? "percent" : "money",
                username: response.username,
            };

            setVoucherShopRequest(dataRequest);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // @ts-ignore
        handleGetVoucherShopByVoucherId().then((r) => console.log(r));
    }, []);

    const handleChange = (e: any) => {
        setVoucherShopRequest({
            ...voucherShopRequest,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setVoucherShopRequest({
            ...voucherShopRequest,
            maxDiscount: voucherShopRequest.discount,
        });

        await callApiUpdateVoucherShop(voucherShopRequest)
            .unwrap()
            .then((res) => {
                console.log(res);
                navigate("/vendor/shop/vouchers");
            })
            .catch((err) => toast.error(err.data.message));
    };


    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">Cập Nhật Voucher</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">

                <div className="mb-4">
                    <label
                        htmlFor="type"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Loại voucher:
                    </label>
                    <select
                        name="type"
                        id="type"
                        onChange={handleChange}
                        value={voucherShopRequest.type}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option
                            value={voucherShopRequest.type}>{voucherShopRequest.type === "money" ? "Theo tiền" : " Theo phần trăng"}
                        </option>

                        <option value="money">Số tiền</option>
                        <option value="percent">Phần trăm</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="code"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Code:
                    </label>
                    <input
                        type="text"
                        name="code"
                        id="code"
                        onChange={handleChange}
                        value={voucherShopRequest.code}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Tên voucher:
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        required
                        value={voucherShopRequest.name}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Mô tả:
                    </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        onChange={handleChange}
                        required
                        value={voucherShopRequest.description}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="discount"
                        className="block text-sm font-medium text-gray-700"
                    >
                        {voucherShopRequest.type === "percent" ? "Phần trăm giảm giá" : "Số tiền giảm giá"}
                    </label>
                    <input
                        type="number"
                        name="discount"
                        id="discount"
                        onChange={handleChange}
                        value={voucherShopRequest.discount}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Số lượng voucher:
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        onChange={handleChange}
                        required
                        value={voucherShopRequest.quantity}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="startDate"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Ngày bắt đầu áp dụng:
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        onChange={handleChange}
                        required
                        value={voucherShopRequest.startDate}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="endDate"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Ngày kết thúc áp dụng:
                    </label>
                    <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        onChange={handleChange}
                        value={voucherShopRequest.endDate}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cập Nhật Mã Giảm Giá
                </button>
            </form>

            <div className="mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate("/vendor/shop/vouchers")}
                >
                    Quay lại
                </button>
            </div>

            <br/>
            <div>
                <button
                    className={"justify-center"}
                    onClick={() => navigate("/vendor/shop/vouchers")}
                >
                    Quay lại
                </button>
            </div>

            <ToastContainer position="bottom-right"/>
        </div>
    );


};


export default UpdateVoucherShop;

