import React, { useState } from "react";

interface AddVoucherFormProps {
  onClose: () => void;
  onAddVoucher: (newVoucher: Voucher) => void;
}

interface Voucher {
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
}

const AddVoucherForm: React.FC<AddVoucherFormProps> = ({
  onClose,
  onAddVoucher,
}) => {
  const [voucherForm, setVoucherForm] = useState<Voucher>({
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
    type: "money",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setVoucherForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleCreateVoucher = () => {
    console.log(voucherForm);
    onAddVoucher(voucherForm);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded w-120 ">
        <h2 className="text-xl font-semibold mb-4">Thêm Voucher Mới</h2>
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Mã Voucher
            </label>
            <input
              type="text"
              name="code"
              value={voucherForm.code}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Tên Voucher
            </label>
            <input
              type="text"
              name="name"
              value={voucherForm.name}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <input
            type="text"
            name="description"
            value={voucherForm.description}
            onChange={handleInputChange}
            placeholder="Mô tả"
            className="p-2 border border-gray-300 rounded"
          />
          <div>
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700"
            >
              Giảm giá
            </label>
            <input
              type="number"
              name="discount"
              value={voucherForm.discount}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>
            <label
              htmlFor="minPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Giá tối thiểu
            </label>
            <input
              type="number"
              name="minPrice"
              value={voucherForm.minPrice}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Giá tối đa
            </label>
            <input
              type="number"
              name="maxPrice"
              value={voucherForm.maxPrice}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>
            <label
              htmlFor="maxDiscount"
              className="block text-sm font-medium text-gray-700"
            >
              Giảm giá tối đa
            </label>
            <input
              type="number"
              name="maxDiscount"
              value={voucherForm.maxDiscount}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Số lượng
            </label>
            <input
              type="number"
              name="quantity"
              value={voucherForm.quantity}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Ngày bắt đầu
            </label>
            <input
              type="date"
              name="startDate"
              value={voucherForm.startDate}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              Ngày kết thúc
            </label>
            <input
              type="date"
              name="endDate"
              value={voucherForm.endDate}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Loại
            </label>
            <select
              name="type"
              value={voucherForm.type}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="money">Money</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleCreateVoucher}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Tạo Voucher
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVoucherForm;
