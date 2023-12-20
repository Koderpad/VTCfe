import {
  useAddNewVoucherShopMutation,
  useGetVoucherShopByVoucherIdMutation,
  useUpdateVoucherShopMutation,
} from "../../features/vendor/redux/api/voucherShopApi.ts";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

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
  const id = useParams();
  console.log("idididid", id);

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
      const res = await callGetVoucherShopByVoucherId(parseInt(id.id)).unwrap();
      console.log("response", res);

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
        type: response.type,
        username: response.username,
      };

      setVoucherShopRequest(dataRequest);

      console.log(
        "voucherShopRequestvoucherShopRequestvoucherShopRequest",
        voucherShopRequest
      );
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

    await callApiUpdateVoucherShop(voucherShopRequest)
      .unwrap()
      .then((res) => {
        console.log(res);
        navigate("/vendor/shop/vouchers");
      })
      .catch((err) => toast.error(err.data.message));
  };

  const handleChangeAndCheck = (e: any) => {
    setVoucherShopRequest({
      ...voucherShopRequest,
      type: e.target.value,
    });

    const maxDiscountInput = document.getElementById("maxDiscount")!;
    if (e.target.value === "percent") {
      maxDiscountInput.style.display = "block";
      setVoucherShopRequest({
        ...voucherShopRequest,
        maxDiscount: 0,
      });
    } else {
      maxDiscountInput.style.display = "none";
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Cập Nhật Voucher</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            Code
          </label>
          <input
            type="text"
            name="code"
            id="code"
            value={voucherShopRequest.code}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Tên
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={voucherShopRequest.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Mô tả
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={voucherShopRequest.description}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="discount"
            className="block text-sm font-medium text-gray-700"
          >
            Giảm giá
          </label>
          <input
            type="number"
            name="discount"
            id="discount"
            value={voucherShopRequest.discount}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="minPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Giá tối thiểu
          </label>
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            value={voucherShopRequest.minPrice}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Giá tối đa
          </label>
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            value={voucherShopRequest.maxPrice}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="maxDiscount"
            className="block text-sm font-medium text-gray-700"
          >
            Giảm giá tối đa
          </label>
          <input
            type="number"
            name="maxDiscount"
            id="maxDiscount"
            value={voucherShopRequest.maxDiscount}
            onChange={handleChange}
            required={voucherShopRequest.type === "percent"}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Số lượng
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={voucherShopRequest.quantity}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Ngày bắt đầu
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={voucherShopRequest.startDate}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            Ngày kết thúc
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={voucherShopRequest.endDate}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Loại
          </label>
          <select
            name="type"
            id="type"
            value={
              voucherShopRequest.type === "Giảm theo tiền" ? "money" : "percent"
            }
            onChange={handleChangeAndCheck}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="none">Không</option>
            <option value="percent">Phần trăm</option>
            <option value="money">Số tiền</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Cập Nhật Mã Giảm Giá
        </button>
      </form>
      <ToastContainer position="bottom-right" />

      <br />
      <div>
        <button
          className={"justify-center"}
          onClick={() => navigate("/vendor/shop/vouchers")}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default UpdateVoucherShop;
