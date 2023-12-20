import {useEffect, useState} from "react";
import {useGetAllVoucherShopMutation} from "../../features/vendor/redux/api/voucherShopApi.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import { useGetAllVoucherAdminByUsernameMutation } from "../../features/admin/redux/api/voucherAdminApi.ts";

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

interface VoucherDTO {
    voucherId: number;
    status: string;
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
    quantityUsed: number;
    type: string;
}

interface VoucherShopResponse {
    status: string;
    message: string;
    code: number;
    shopId: number;
    shopName: string;
    voucherDTO: VoucherDTO;
}

interface ListVoucherShopResponse {
    status: string;
    message: string;
    code: number;
    shopId: number;
    shopName: string;
    count: number;
    voucherDTOs: VoucherDTO[];
}




const VouchersAdmin = () => {

    const [callGetListVoucherShop] = useGetAllVoucherAdminByUsernameMutation();
    const [listVoucherShop, setListVoucherShop] = useState<VoucherDTO[]>([]);
    const navigation = useNavigate();
    const handleGetListVoucherShop = async () => {
        try {
            const response = await callGetListVoucherShop("").unwrap();
            console.log(response);
            setListVoucherShop(response.voucherDTOs)
            toast.success(response.message);
        }catch (err) {
            console.log(err);
            toast.error(err?.data?.message);
        }

    }

    useEffect(() => {
        handleGetListVoucherShop();
    }, []);

    const handleAddNewVoucherShop =  (e) => {
        e.preventDefault();
        navigation("/admin/voucher/add");
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB'); // 'en-GB' represents the British English locale
    };



    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">Quản Lý Voucher Của Hệ Thống</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={handleAddNewVoucherShop}
            >
                Thêm voucher mới
            </button>
            <table className="min-w-full border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="p-2">Id</th>
                    <th className="p-2">Trạng thái</th>
                    <th className="p-2">Mã</th>
                    <th className="p-2">Tên</th>
                    <th className="p-2">Mô tả</th>
                    <th className="p-2">Giảm giá</th>
                    <th className="p-2">Giá tối thiểu</th>
                    <th className="p-2">Giá tối đa</th>
                    <th className="p-2">Giảm giá tối đa</th>
                    <th className="p-2">Số lượng</th>
                    <th className="p-2">Ngày bắt đầu</th>
                    <th className="p-2">Ngày kết thúc</th>
                    <th className="p-2">Số lượng đã sử dụng</th>
                    <th className="p-2">Loại</th>
                    <th className="p-2">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {listVoucherShop.map((voucher, index) => (
                    <tr key={index}>
                        <td className="p-2">{voucher.voucherId}</td>
                        <td className="p-2">{voucher.status}</td>
                        <td className="p-2">{voucher.code}</td>
                        <td className="p-2">{voucher.name}</td>
                        <td className="p-2">{voucher.description}</td>
                        <td className="p-2">{voucher.discount}</td>
                        <td className="p-2">{voucher.minPrice}</td>
                        <td className="p-2">{voucher.maxPrice}</td>
                        <td className="p-2">{voucher.maxDiscount}</td>
                        <td className="p-2">{voucher.quantity}</td>
                        <td className="p-2">{formatDate(voucher.startDate)}</td>
                        <td className="p-2">{formatDate(voucher.endDate)}</td>
                        <td className="p-2">{voucher.quantityUsed}</td>
                        <td className="p-2">{voucher.type}</td>
                        <td className="p-2">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => navigation(`/admin/voucher/edit/${voucher.voucherId}`)}
                            >
                                Cập nhật
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default VouchersAdmin
