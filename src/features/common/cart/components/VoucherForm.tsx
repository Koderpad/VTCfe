import React, { useState } from "react";

const VoucherForm = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [showVoucherForm, setShowVoucherForm] = useState(false);

  const handleVoucherChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setVoucherCode(e.target.value);
  };

  const handleApplyVoucher = () => {
    // Xử lý logic khi áp dụng voucher
    console.log(`Applying voucher code: ${voucherCode}`);
    // Thêm logic xử lý voucher ở đây
  };

  const handleToggleVoucherForm = () => {
    setShowVoucherForm(!showVoucherForm);
  };

  return (
    <div className="flex ">
      <div className="flex-shrink-0 mr-2">
        <div className="flex items-center">
          {/* Hình ảnh voucher (thay thế đường dẫn bằng đường dẫn hình ảnh của bạn) */}
          <img
            src="/public/pngtree-vector-voucher-icon-png-image_4046528.jpg"
            alt="Voucher Icon"
            className="w-5 h-5 mr-1"
          />
          <span
            onClick={handleToggleVoucherForm}
            className="cursor-pointer text-blue-500"
          >
            Xem voucher
          </span>
        </div>
      </div>
      {showVoucherForm && (
        <div className="flex-grow ml-0">
          {" "}
          {/* Thêm class `ml-0` để canh lề trái */}
          <VoucherFormCart />
          {/* Hiển thị danh sách item voucher dưới đây */}
        </div>
      )}
    </div>
  );
};

const VoucherFormCart = () => {
  const [voucherCode, setVoucherCode] = useState("");

  const handleVoucherChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setVoucherCode(e.target.value);
  };

  const handleApplyVoucher = () => {
    // Xử lý logic khi áp dụng voucher
    console.log(`Applying voucher code: ${voucherCode}`);
    // Thêm logic xử lý voucher ở đây
  };

  return (
    <div className="border border-solid border-2 bg-orange-200 ">
      {/* <div className="max-h-80 overflow-y-auto"> */}

      {/* Form nhập voucher */}
      <div className="flex flex-col">
        <div className=" p-4 rounded-md mb-4 mt-2">
          <div className="flex flex-row items-center mb-2">
            <input
              type="text"
              placeholder="Nhập mã giảm giá"
              value={voucherCode}
              onChange={handleVoucherChange}
              className="py-2 px-3 border rounded outline-none mr-2"
            />
            <button
              onClick={handleApplyVoucher}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Apply
            </button>
          </div>
        </div>
        <div className="border border-solid max-h-60 overflow-y-auto">
          {/* Các khung chứa hình ảnh và chữ voucher */}
          <div className="flex flex-row  h-auto ml-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Voucher Image 2"
              className="w-24 h-24 rounded-full mb-2"
            />
            <p className="justify-center mt-8 ml-4">Voucher 1</p>
            <div className="h-4 w-4 mt-8 ml-">
              <input type="checkbox" className="ml-36 h-4 w-4" />
            </div>
          </div>

          {/* Khung 2 */}
          <div className="flex flex-row  h-auto ml-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Voucher Image 2"
              className="w-24 h-24 rounded-full mb-2"
            />
            <p className="justify-center mt-8 ml-4">Voucher 2</p>
            <div className="h-4 w-4 mt-8 ml-">
              <input type="checkbox" className="ml-36 h-4 w-4" />
            </div>
          </div>

          {/* Khung 3 */}
          <div className="flex flex-row  h-auto ml-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Voucher Image 2"
              className="w-24 h-24 rounded-full mb-2"
            />
            <p className="justify-center mt-8 ml-4">Voucher 3</p>
            <div className="h-4 w-4 mt-8 ml-">
              <input type="checkbox" className="ml-36 h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default VoucherForm;
