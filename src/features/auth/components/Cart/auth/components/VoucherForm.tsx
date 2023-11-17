import React, { useState } from 'react';

const VoucherForm = () => {
  const [voucherCode, setVoucherCode] = useState('');

  const handleVoucherChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setVoucherCode(e.target.value);
  };

  const handleApplyVoucher = () => {
    // Xử lý logic khi áp dụng voucher
    console.log(`Applying voucher code: ${voucherCode}`);
    // Thêm logic xử lý voucher ở đây
  };

  return (
    <div className="tw-flex tw-items-center tw-justify-center">
      <div className="tw-flex-shrink-0 tw-mr-2">
        {/* Hình ảnh voucher (thay thế đường dẫn bằng đường dẫn hình ảnh của bạn) */}
        <img
          src="./public/voucher.png"
          alt="Voucher Icon"
          className="tw-w-5 tw-h-5"
        />
      </div>
      <div className="tw-flex-grow">
        {/* Ô nhập mã giảm giá */}
        <input
          type="text"
          placeholder="Enter voucher code"
          value={voucherCode}
          onChange={handleVoucherChange}
          className="tw-py-2 tw-px-3 tw-w-full tw-border tw-rounded tw-outline-none"
        />
      </div>
      <div className="tw-ml-2">
        {/* Nút áp dụng voucher */}
        <button
          onClick={handleApplyVoucher}
          className="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded-lg"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default VoucherForm;