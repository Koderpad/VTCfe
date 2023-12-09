import React, { useState } from "react";
import styled from "styled-components";

const OuterDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(220, 220, 220, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 999;
`;

const InnerDiv = styled.div`
  background-color: #ffffff;
  padding: 20px;
  position: relative; /* Add relative positioning for the close button */
`;

const VoucherItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;

const VoucherImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const VoucherCheckbox = styled.input`
  margin-left: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
`;

interface VouchersProps {
  onClose: () => void;
}

const Vouchers: React.FC<VouchersProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleOnClose = () => {
    setIsVisible(false);
    onClose();
  };
  const voucherData = [
    { id: 1, name: "Voucher 1", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Voucher 2", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Voucher 3", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Voucher 3", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Voucher 3", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Voucher 3", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Voucher 3", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Voucher 3", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Voucher 3", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Voucher 3", image: "https://via.placeholder.com/150" },
    // Add more voucher data as needed
  ];

  return (
    <>
      {isVisible && (
        <OuterDiv>
          <InnerDiv>
            <CloseButton onClick={handleOnClose}>x</CloseButton>
            <div className="border border-solid  z-50">
              {/* Form nhập voucher */}
              <div className="flex flex-col">
                <div className=" p-4 rounded-md mb-4 mt-2">
                  <div className="flex flex-row items-center mb-2">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá"
                      className="py-2 px-3 border rounded outline-none mr-2"
                    />
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                      Apply
                    </button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {/* Duyệt và hiển thị các khung voucher */}
                  {voucherData.map((voucher) => (
                    <VoucherItem key={voucher.id}>
                      <VoucherImage
                        src={voucher.image}
                        alt={`Voucher ${voucher.id}`}
                      />
                      <p className="justify-center mt-8 ml-4">{voucher.name}</p>
                      <VoucherCheckbox
                        type="checkbox"
                        className="ml-36 h-4 w-4"
                      />
                    </VoucherItem>
                  ))}
                </div>
              </div>
            </div>
          </InnerDiv>
        </OuterDiv>
      )}
    </>
  );
};

export default Vouchers;
