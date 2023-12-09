import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer_v1 from '../../../layouts/footers/Footer_v1';
import Header_v1 from '../../../layouts/headers/Header_v1';
import Vouchers from './vouchers';
import AddressForm from './AddressForm';

function PayMentForm() {
  const navigate = useNavigate();
  const navigate1 = useNavigate();
  const [showVoucherForm, setShowVoucherForm] = useState(false);
 
  const handleToggleVoucherForm = () => {
    setShowVoucherForm(!showVoucherForm);
  };
  const handleNavigateToVouchers = () => {
    navigate('src/features/auth/components/vouchers.tsx');
  };
  return (
    <>
      <div className="tw-bg-gray">
        <Header_v1 />
        <div className="tw-flex tw-bg-white tw-h-full tw-w-full tw-py-8 tw-mt-44 tw-items-center">
          {/* Image */}
          <img
            src="/logo_border.png"
            alt="Description of the image"
            className="tw-mr-8 tw-ml-4"
            style={{ width: "50px", height: "50px" }}
          />

          <div className="tw-flex items-center">
            <span className="tw-whitespace-nowrap">VTC</span>

            <div className="tw-h-10 tw-w-1 tw-bg-black tw-ml-4"></div>
            <span className="tw-whitespace-nowrap tw-ml-4">Thanh Toán</span>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="tw-w-4/5 tw-mx-auto tw-mt-4 tw-bg-white tw-flex tw-flex-col tw-h-36" style={{ borderTop: '4px solid red' }}>
            <div className="tw-bg-white tw-flex tw-flex-col tw-shadow-md tw-rounded tw-px-8 tw-py-6 tw-mb-4">
                <div className="tw-bg-white tw-flex tw-flex-row ">
                    <div className="tw-mb-4 tw-flex tw-items-center">
                        <span className="tw-text-gray-700 tw-text-2xl font-medium tw-mr-2">Thành công</span>
                        <span className="tw-text-gray-700 tw-text-2xl font-medium "> | </span>
                        <span className="tw-text-gray-700 tw-text-2xl font-medium tw-ml-2">09238823</span>
                        <span className="tw-text-gray-700 tw-text-2xl font-medium tw-ml-16">số 1 võ văn ngân tỉnh lâm đồng </span>
                    </div>
                    <div className="tw-flex tw-items-center tw-justify-end tw-flex-grow ">
                        <button
                            className="tw-bg-blue-500 tw-hover:bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded focus:tw-outline-none focus:tw-shadow-outline"
                            type="button"

                        >
                            Thay đổi
                        </button>
                    </div>
                </div>
                    <div className="tw-flex tw-flex-row tw-mt-4 "></div>
                    <div className="tw-inline-block tw-border-2 tw-border-red-300 tw-rounded tw-p-1 tw-max-w-max">
                    <span className="tw-inline-block tw-text-red-500">
                     Mặc định
                    </span>
                </div>
            </div>
        </div>



        <div className="tw-w-4/5 tw-mx-auto tw-mt-12 tw-bg-white tw-flex tw-flex-col tw-h-auto tw-rounded-md" style={{ borderTop: '4px solid red', border: 'none', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
            <table className="tw-w-full tw-border-collapse tw-mt-4">
                <thead>
                <tr>
                    <th className="tw-px-4">Product</th>
                    <th className="tw-px-4">Price</th>
                    <th className="tw-px-4">Quantity</th>
                    <th className="tw-px-4">Total</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="tw-px-4 tw-py-2">Product Name 1</td>
                    <td className="tw-px-4 tw-py-2">$10.00</td>
                    <td className="tw-px-4 tw-py-2">2</td>
                    <td className="tw-px-4 tw-py-2">$20.00</td>
                </tr>
                <tr>
                    <td className="tw-px-4 tw-py-2">Product Name 2</td>
                    <td className="tw-px-4 tw-py-2">$15.00</td>
                    <td className="tw-px-4 tw-py-2">1</td>
                    <td className="tw-px-4 tw-py-2">$15.00</td>
                </tr>
                {/* Add more rows as needed */}
                </tbody>
            </table>
            <div className="tw-border-t tw-my-4 tw-border-black-200"></div>

              {/* Voucher Section */}

              <div className="tw-flex tw-justify-between tw-px-4 tw-items-center tw-mb-4">
                    <div className="tw-flex items-center">
                    {/* Placeholder icon, replace the src with the actual path to your icon */}
                    <img
                        src="public\discount-voucher-outline-icon-thin-line-black-discount-voucher-icon-vector.jpg"
                        alt="Voucher Icon"
                        className="tw-mr-2"
                        style={{ width: '30px', height: '28px' }}
                    />
                    <span className="tw-text-red-500">Voucher của shop</span>
                    </div>
                    <button
                    className="tw-text-blue-500 hover:tw-underline cursor-pointer"
                    onClick={() => {
                        handleToggleVoucherForm();
                        // handleNavigateToVouchers(); 
                    }}
                    >
                    Chọn voucher
                    </button>
                </div>

                {showVoucherForm && <Vouchers onClose={function (): void {
                      throw new Error('Function not implemented.');
                  } } />}
                <div className="tw-flex tw-justify-between tw-px-4 tw-items-center tw-mb-4">
                            <div className="tw-flex items-center">
                            {/* Placeholder icon, replace the src with the actual path to your icon */}
                            <img
                                src="public\discount-voucher-outline-icon-thin-line-black-discount-voucher-icon-vector.jpg"
                                alt="Voucher Icon"
                                className="tw-mr-2"
                                style={{ width: '30px', height: '28px' }}
                            />
                            <span className="tw-text-red-500">Voucher VTC</span>
                            </div>
                            <button
                            className="tw-text-blue-500 hover:tw-underline cursor-pointer"
                            onClick={() => {
                                handleToggleVoucherForm();
                                // handleNavigateToVouchers(); 
                            }}
                            >
                            Chọn voucher
                            </button>
                        </div>
        </div>
        

        <div className="tw-w-4/5 tw-mx-auto tw-mt-4 tw-bg-white tw-flex tw-flex-col">
            <div className="tw-bg-white tw-flex tw-flex-col tw-shadow-md tw-rounded tw-px-8 tw-py-6 tw-mb-4">
                <div className="tw-bg-white tw-flex tw-justify-between tw-mb-4">
                    <span className="tw-text-gray-700 tw-text-2xl font-medium">Phương thức thanh toán</span>
                    <span className="tw-text-gray-700 tw-text-2xl font-medium tw-ml-auto">Thanh Toán khi nhận hàng</span>
                   
                </div>
                <div className="tw-border-t tw-my-4 tw-border-black-200"></div>
                
                    <div className="tw-flex tw-flex-col  tw-rounded tw-px-8 tw-py-6 tw-mb-4">
                        {/* Existing content */}
                        <div className="tw-bg-white tw-flex tw-justify-between tw-mb-4">
                            <span className="tw-text-gray-700 tw-text-2xl font-medium">Tổng tiền hàng</span>
                            <span className="tw-text-gray-700 tw-text-2xl font-medium">$60,000</span>
                        </div>
                        {/* Tiền vận chuyển Section */}
                        <div className="tw-bg-white tw-flex tw-justify-between tw-mb-4">
                            <span className="tw-text-gray-700 tw-text-2xl font-medium">Tiền vận chuyển</span>
                            <span className="tw-text-gray-700 tw-text-2xl font-medium">$10,000</span>
                        </div>
                        <div className="tw-border-t tw-my-4 tw-border-black-200"></div>
                        {/* Tổng tiền Section */}
                        <div className="tw-bg-white tw-flex tw-justify-between tw-mb-4">
                            <span className="tw-text-gray-700 tw-text-2xl font-medium">Tổng tiền</span>
                            <span className="tw-text-gray-700 tw-text-2xl font-medium">$70,000</span>
                        </div>
                    </div>
                    <div className="tw-border-t tw-my-4 tw-border-black-200"></div>
                    <div className="tw-w-4/5 tw-mx-auto tw-mb-8 tw-flex tw-justify-end">
                        <button className="tw-bg-blue-500 hover:tw-bg-blue-800 focus:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded focus:tw-outline-none focus:tw-shadow-outline" type="button">
                            Đặt hàng
                        </button>
                    </div>
                </div>
                    
            </div>
            <Footer_v1/>
        </div>
    </>
  );
}

export default PayMentForm;