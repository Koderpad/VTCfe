import React, { useState } from "react";

interface AddressProps {
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
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Do something with the form data
    console.log({
      province,
      district,
      address,
      fullName,
      phoneNumber,
    });

    // Reset form fields
    setProvince("");
    setDistrict("");
    setAddress("");
    setFullName("");
    setPhoneNumber("");
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
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 border-2 border-gray-400">
              <form onSubmit={handleSubmit} className="mg-2 ">
                {/* Form fields */}
                <div className="mb-4">
                  <label
                    className="block mb-2 font-bold text-gray-700"
                    htmlFor="province"
                  >
                    Tỉnh:
                  </label>
                  <input
                    type="text"
                    id="province"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 font-bold text-gray-700"
                    htmlFor="district"
                  >
                    Huyện:
                  </label>
                  <input
                    type="text"
                    id="district"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 font-bold text-gray-700"
                    htmlFor="address"
                  >
                    Địa chỉ nhà:
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 font-bold text-gray-700"
                    htmlFor="fullName"
                  >
                    Họ và Tên:
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 font-bold text-gray-700"
                    htmlFor="phoneNumber"
                  >
                    Số điện thoại:
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                {/* Other form fields */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                    onClick={handleCloseForm}
                  >
                    Đóng
                  </button>
                </div>
              </form>
            </div>
          </div>
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
