import React from "react";
import { format } from "date-fns";
interface VoucherProps {
  data: {
    image: string;
    name: string;
    description: string;
    code: string;
    startDate: string;
    endDate: string;
  };
}

const VoucherComponent: React.FC<VoucherProps> = ({ data }) => {
  const {
    image = "https://png.pngtree.com/png-vector/20190227/ourmid/pngtree-vector-voucher-icon-png-image_708692.jpg",
    name,
    description,
    code,
    startDate,
    endDate,
  } = data;

  // Định dạng ngày tháng
  const formattedStartDate = format(new Date(startDate), "dd/MM/yyyy");
  const formattedEndDate = format(new Date(endDate), "dd/MM/yyyy");

  return (
    <div className="container mx-auto">
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-center py-8 px-16 rounded-lg shadow-md relative">
        <img
          src={image}
          className="w-16 mx-auto mb-2 rounded-lg"
          alt="Voucher Image"
        />
        <h3 className="text-xl font-semibold mb-2">
          {name}
          <br />
          <span className="text-xl font-normal">{description}</span>
        </h3>
        <div className="flex items-center space-x-2 mb-4">
          <span className="border-dashed border text-white px-3 py-1 rounded-l">
            {code}
          </span>
          <span className="border border-white bg-white text-purple-600 px-3 py-1 rounded-r cursor-pointer">
            Dùng ngay
          </span>
        </div>
        <p className="text-xl">Hạn sử dụng: {formattedEndDate}</p>

        <div className="w-8 h-8 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-4"></div>
        <div className="w-8 h-8 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-4"></div>
      </div>
    </div>
  );
};

export default VoucherComponent;
