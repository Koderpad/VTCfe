import React, { useState } from "react";
import AddForm from "./AddForm";

export interface AddressProps {
  name: string;
  phoneNumber: string;
  address: string;
}

const Address: React.FC<AddressProps> = ({ name, phoneNumber, address }) => {
  return (
    <div className="max-w-full mx-auto">
      <div className="bg-white flex flex-col shadow-md rounded px-8 py-6 mb-4">
        <div className="bg-white flex flex-row ">
          <div className="mb-4 flex items-center">
            <span className="text-gray-700 text-2xl font-medium mr-2">
              {name}
            </span>
            <span className="text-gray-700 text-2xl font-medium "> | </span>
            <span className="text-gray-700 text-2xl font-medium ml-2">
              {phoneNumber}
            </span>
          </div>
          <div className="flex items-center justify-end flex-grow ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Cập nhật
            </button>
            <div className="w-4"></div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Xóa
            </button>
          </div>
        </div>
        <div className="flex flex-row mt-4   ">
          <div className="text-gray-700 text-lg mb-4 items-center justify-end flex-grow ">
            {address}
          </div>
          <div className="flex items-center justify-end">
            <button
              className="text-blue-500 hover:text-blue-700 font-medium mr-4"
              type="button"
            >
              Thiết lập mặc định
            </button>
          </div>
        </div>
        <div className="inline-block border-2 border-red-300 rounded p-1 max-w-max">
          <span className="inline-block text-red-500">Mặc định</span>
        </div>
      </div>
    </div>
  );
};
const AddressForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [listAddress, setListAddress] = useState<AddressProps[]>([]);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="relative h-300">
      <div className="bg-gray-600  w-full h-700">
        <div className="flex flex-row justify-between items-center py-4 bg-orange-300">
          <h2 className="text-2xl text-black-500 font-bold mb-4 fontsize mx-6 mt-4">
            Địa chỉ của tôi
          </h2>
          {!showForm ? (
            <button
              className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleShowForm}
            >
              Thêm địa chỉ
            </button>
          ) : null}
        </div>
        {showForm && (
          <AddForm
            handleCloseForm={handleCloseForm}
            showForm={showForm}
            listAddress={listAddress}
            setListAddress={setListAddress}
          />
        )}
      </div>
      <div className="mt-4">
        <Address
          name="Nguyễn Văn A"
          phoneNumber="0987374523"
          address="Phường Linh Chiều, Thành phố Thủ Đức, Thành phố Hồ Chí Minh"
        />
        <Address
          name="Nguyễn Văn A"
          phoneNumber="0987374523"
          address="Phường Linh Chiều, Thành phố Thủ Đức, Thành phố Hồ Chí Minh"
        />
        <Address
          name="Nguyễn Văn A"
          phoneNumber="0987374523"
          address="Phường Linh Chiều, Thành phố Thủ Đức, Thành phố Hồ Chí Minh"
        />
        <Address
          name="Nguyễn Văn A"
          phoneNumber="0987374523"
          address="Phường Linh Chiều, Thành phố Thủ Đức, Thành phố Hồ Chí Minh"
        />
      </div>
    </div>
  );
};

export default AddressForm;
