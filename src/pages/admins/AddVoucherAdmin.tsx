import { useAddNewVoucherShopMutation } from "../../features/vendor/redux/api/voucherShopApi.ts";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import React, { useState } from "react";
import { useAddNewVoucherMutation } from "../../features/admin/redux/api/voucherAdminApi.ts";

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

const AddVoucherAdmin = () => {
  const [callApiAddNewVoucherShop] = useAddNewVoucherMutation();
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

  const handleChange = (e: any) => {
    setVoucherShopRequest({
      ...voucherShopRequest,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await callApiAddNewVoucherShop(voucherShopRequest)
      .unwrap()
      .then((res) => {
        console.log(res);
        navigate("/admin/vouchers");
      })
      .catch((err) => toast.error(err.data.message));
  };

  const handleChangeAndCheck = (e: any) => {
    setVoucherShopRequest({
      ...voucherShopRequest,
      [e.target.name]: e.target.value,
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
      <h1 className="text-3xl font-bold mb-4">Thêm Voucher Mới</h1>
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
          Thêm
        </button>
      </form>

      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/admin/vouchers")}
        >
          Quay lại
        </button>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default AddVoucherAdmin;
