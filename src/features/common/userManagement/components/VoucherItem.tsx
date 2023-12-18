// VoucherComponent.tsx

import React from "react";

const VoucherItem: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-bold text-gray-800">Mã giảm giá:</span>
          <span className="ml-2 text-green-500 font-bold">XYZ123</span>
        </div>
        <div className="flex items-center">
          <span className="text-xl font-bold text-gray-800">Giảm giá:</span>
          <span className="ml-2 text-red-500 font-bold">10%</span>
        </div>
      </div>
      <div className="mt-4">
        <span className="text-gray-600">Hạn sử dụng:</span>
        <span className="ml-2 text-gray-800">30/12/2023</span>
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
        Sử dụng ngay
      </button>
    </div>
  );
};

export default VoucherItem;
