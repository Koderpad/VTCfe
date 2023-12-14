import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import Vouchers from "./vouchers";
import Header_v1 from "../../../../layouts/headers/Header_v1";
import Footer_v1 from "../../../../layouts/footers/Footer_v1";

function PayMentForm() {
  const navigate = useNavigate();
  const navigate1 = useNavigate();
  const [showVoucherForm, setShowVoucherForm] = useState(false);

  const handleToggleVoucherForm = () => {
    setShowVoucherForm(!showVoucherForm);
  };
  const handleNavigateToVouchers = () => {
    navigate("src/features/auth/components/vouchers.tsx");
  };
  return (
    <>
      <div className="bg-gray">
        <Header_v1 />
        <div className="flex bg-white h-full w-full py-8 mt-44 items-center">
          {/* Image */}
          <img
            src="/logo_border.png"
            alt="Description of the image"
            className="mr-8 ml-4"
            style={{ width: "50px", height: "50px" }}
          />

          <div className="flex items-center">
            <span className="whitespace-nowrap">VTC</span>

            <div className="h-10 w-1 bg-black ml-4"></div>
            <span className="whitespace-nowrap ml-4">Thanh Toán</span>
          </div>
        </div>

        {/* Additional Information Section */}
        <div
          className="w-4/5 mx-auto mt-4 bg-white flex flex-col h-36"
          style={{ borderTop: "4px solid red" }}
        >
          <div className="bg-white flex flex-col shadow-md rounded px-8 py-6 mb-4">
            <div className="bg-white flex flex-row ">
              <div className="mb-4 flex items-center">
                <span className="text-gray-700 text-2xl font-medium mr-2">
                  Thành công
                </span>
                <span className="text-gray-700 text-2xl font-medium "> | </span>
                <span className="text-gray-700 text-2xl font-medium ml-2">
                  09238823
                </span>
                <span className="text-gray-700 text-2xl font-medium ml-16">
                  số 1 võ văn ngân tỉnh lâm đồng{" "}
                </span>
              </div>
              <div className="flex items-center justify-end flex-grow ">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Thay đổi
                </button>
              </div>
            </div>
            <div className="flex flex-row mt-4 "></div>
            <div className="inline-block border-2 border-red-300 rounded p-1 max-w-max">
              <span className="inline-block text-red-500">Mặc định</span>
            </div>
          </div>
        </div>

        <div
          className="w-4/5 mx-auto mt-12 bg-white flex flex-col h-auto rounded-md"
          style={{
            borderTop: "4px solid red",
            border: "none",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <table className="w-full border-collapse mt-4">
            <thead>
              <tr>
                <th className="px-4">Product</th>
                <th className="px-4">Price</th>
                <th className="px-4">Quantity</th>
                <th className="px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Product Name 1</td>
                <td className="px-4 py-2">$10.00</td>
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">$20.00</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Product Name 2</td>
                <td className="px-4 py-2">$15.00</td>
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">$15.00</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
          <div className="border-t my-4 border-black-200"></div>

          {/* Voucher Section */}

          <div className="flex justify-between px-4 items-center mb-4">
            <div className="flex items-center">
              {/* Placeholder icon, replace the src with the actual path to your icon */}
              <img
                src="public\discount-voucher-outline-icon-thin-line-black-discount-voucher-icon-vector.jpg"
                alt="Voucher Icon"
                className="mr-2"
                style={{ width: "30px", height: "28px" }}
              />
              <span className="text-red-500">Voucher của shop</span>
            </div>
            <button
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => {
                handleToggleVoucherForm();
                // handleNavigateToVouchers();
              }}
            >
              Chọn voucher
            </button>
          </div>

          {showVoucherForm && (
            <Vouchers
              onClose={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
          <div className="flex justify-between px-4 items-center mb-4">
            <div className="flex items-center">
              {/* Placeholder icon, replace the src with the actual path to your icon */}
              <img
                src="public\discount-voucher-outline-icon-thin-line-black-discount-voucher-icon-vector.jpg"
                alt="Voucher Icon"
                className="mr-2"
                style={{ width: "30px", height: "28px" }}
              />
              <span className="text-red-500">Voucher VTC</span>
            </div>
            <button
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => {
                handleToggleVoucherForm();
                // handleNavigateToVouchers();
              }}
            >
              Chọn voucher
            </button>
          </div>
        </div>

        <div className="w-4/5 mx-auto mt-4 bg-white flex flex-col">
          <div className="bg-white flex flex-col shadow-md rounded px-8 py-6 mb-4">
            <div className="bg-white flex justify-between mb-4">
              <span className="text-gray-700 text-2xl font-medium">
                Phương thức thanh toán
              </span>
              <span className="text-gray-700 text-2xl font-medium ml-auto">
                Thanh Toán khi nhận hàng
              </span>
            </div>
            <div className="border-t my-4 border-black-200"></div>

            <div className="flex flex-col  rounded px-8 py-6 mb-4">
              {/* Existing content */}
              <div className="bg-white flex justify-between mb-4">
                <span className="text-gray-700 text-2xl font-medium">
                  Tổng tiền hàng
                </span>
                <span className="text-gray-700 text-2xl font-medium">
                  $60,000
                </span>
              </div>
              {/* Tiền vận chuyển Section */}
              <div className="bg-white flex justify-between mb-4">
                <span className="text-gray-700 text-2xl font-medium">
                  Tiền vận chuyển
                </span>
                <span className="text-gray-700 text-2xl font-medium">
                  $10,000
                </span>
              </div>
              <div className="border-t my-4 border-black-200"></div>
              {/* Tổng tiền Section */}
              <div className="bg-white flex justify-between mb-4">
                <span className="text-gray-700 text-2xl font-medium">
                  Tổng tiền
                </span>
                <span className="text-gray-700 text-2xl font-medium">
                  $70,000
                </span>
              </div>
            </div>
            <div className="border-t my-4 border-black-200"></div>
            <div className="w-4/5 mx-auto mb-8 flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-800 focus:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
        <Footer_v1 />
      </div>
    </>
  );
}

export default PayMentForm;
