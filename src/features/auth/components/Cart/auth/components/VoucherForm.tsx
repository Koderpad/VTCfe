// // import React, { useState } from 'react';

// // const VoucherForm = () => {
// //   const [voucherCode, setVoucherCode] = useState('');

// //   const handleVoucherChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
// //     setVoucherCode(e.target.value);
// //   };

// //   const handleApplyVoucher = () => {
// //     // Xử lý logic khi áp dụng voucher
// //     console.log(`Applying voucher code: ${voucherCode}`);
// //     // Thêm logic xử lý voucher ở đây
// //   };

// //   return (
// //     <div className="tw-flex tw-items-center tw-justify-center">
// //       <div className="tw-flex-shrink-0 tw-mr-2">
// //         {/* Hình ảnh voucher (thay thế đường dẫn bằng đường dẫn hình ảnh của bạn) */}
// //         <img
// //           src="./public/voucher.png"
// //           alt="Voucher Icon"
// //           className="tw-w-5 tw-h-5"
// //         />
// //       </div>
// //       <div className="tw-flex-grow">
// //         {/* Ô nhập mã giảm giá */}
// //         <input
// //           type="text"
// //           placeholder="Enter voucher code"
// //           value={voucherCode}
// //           onChange={handleVoucherChange}
// //           className="tw-py-2 tw-px-3 tw-w-full tw-border tw-rounded tw-outline-none"
// //         />
// //       </div>
// //       <div className="tw-ml-2">
// //         {/* Nút áp dụng voucher */}
// //         <button
// //           onClick={handleApplyVoucher}
// //           className="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded-lg"
// //         >
// //           Apply
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VoucherForm;




import React, { useState } from 'react';

const VoucherForm = () => {
  const [voucherCode, setVoucherCode] = useState('');
  const [showVoucherForm, setShowVoucherForm] = useState(false);

  const handleVoucherChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
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
    <div className="tw-flex ">
      <div className="tw-flex-shrink-0 tw-mr-2">
        <div className="tw-flex items-center">
          {/* Hình ảnh voucher (thay thế đường dẫn bằng đường dẫn hình ảnh của bạn) */}
          <img
            src="./public/voucher.png"
            alt="Voucher Icon"
            className="tw-w-5 tw-h-5 tw-mr-1"
          />
          <span
            onClick={handleToggleVoucherForm}
            className="tw-cursor-pointer tw-text-blue-500"
          >
            Xem voucher
          </span>
        </div>
      </div>
      {showVoucherForm && (
        <div className="tw-flex-grow tw-ml-0"> {/* Thêm class `tw-ml-0` để canh lề trái */}
          <VoucherFormCart/>
          {/* Hiển thị danh sách item voucher dưới đây */}
        </div>
      )}
    </div>
  );
};


const VoucherFormCart = () => {
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
    <div className="tw-border tw-border-solid tw-border-2 tw-bg-orange-200 ">
      {/* <div className="tw-max-h-80 tw-overflow-y-auto"> */}

     
      {/* Form nhập voucher */}
      <div className='tw-flex tw-flex-col'>

      <div className=" tw-p-4 tw-rounded-md tw-mb-4 tw-mt-2">
        <div className="tw-flex tw-flex-row tw-items-center tw-mb-2">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            value={voucherCode}
            onChange={handleVoucherChange}
            className="tw-py-2 tw-px-3 tw-border tw-rounded tw-outline-none tw-mr-2"
          />
          <button
            onClick={handleApplyVoucher}
            className="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded-lg"
          >
            Apply
          </button>
        </div>
      </div>
      <div className='tw-border tw-border-solid tw-max-h-60 tw-overflow-y-auto'>
          {/* Các khung chứa hình ảnh và chữ voucher */}
        <div className="tw-flex tw-flex-row  tw-h-auto tw-ml-4">
        <img
          src="https://via.placeholder.com/150"
          alt="Voucher Image 2"
          className="tw-w-24 tw-h-24 tw-rounded-full tw-mb-2"
        />
        <p className="tw-justify-center tw-mt-8 tw-ml-4">Voucher 1</p>
        <div className='tw-h-4 tw-w-4 tw-mt-8 tw-ml-'>
            <input type="checkbox" className="tw-ml-36 tw-h-4 tw-w-4" />
        </div>
        
      </div>

        {/* Khung 2 */}
        <div className="tw-flex tw-flex-row  tw-h-auto tw-ml-4">
        <img
          src="https://via.placeholder.com/150"
          alt="Voucher Image 2"
          className="tw-w-24 tw-h-24 tw-rounded-full tw-mb-2"
        />
        <p className="tw-justify-center tw-mt-8 tw-ml-4">Voucher 2</p>
        <div className='tw-h-4 tw-w-4 tw-mt-8 tw-ml-'>
            <input type="checkbox" className="tw-ml-36 tw-h-4 tw-w-4" />
        </div>
        
      </div>

        {/* Khung 3 */}
        <div className="tw-flex tw-flex-row  tw-h-auto tw-ml-4">
        <img
          src="https://via.placeholder.com/150"
          alt="Voucher Image 2"
          className="tw-w-24 tw-h-24 tw-rounded-full tw-mb-2"
        />
        <p className="tw-justify-center tw-mt-8 tw-ml-4">Voucher 3</p>
        <div className='tw-h-4 tw-w-4 tw-mt-8 tw-ml-'>
            <input type="checkbox" className="tw-ml-36 tw-h-4 tw-w-4" />
        </div>  
      </div>
      
        
      </div>
      </div>
    </div>
    // </div>

  );
};

export default VoucherForm;


