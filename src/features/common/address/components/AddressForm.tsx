import React, { useState } from "react";

interface AddressProps {
  name: string;
  phoneNumber: string;
  address: string;
}

const Address: React.FC<AddressProps> = ({ name, phoneNumber, address }) => {
  return (
    <div className="tw-max-w-full tw-mx-auto">
      <div className="tw-bg-white tw-flex tw-flex-col tw-shadow-md tw-rounded tw-px-8 tw-py-6 tw-mb-4">
        <div className="tw-bg-white tw-flex tw-flex-row ">
          <div className="tw-mb-4 tw-flex tw-items-center">
            <span className="tw-text-gray-700 tw-text-2xl font-medium tw-mr-2">{name}</span>
            <span className="tw-text-gray-700 tw-text-2xl font-medium "> | </span>
            <span className="tw-text-gray-700 tw-text-2xl font-medium tw-ml-2">{phoneNumber}</span>
          </div>
          <div className="tw-flex tw-items-center tw-justify-end tw-flex-grow ">
            <button className="tw-bg-blue-500 tw-hover:bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded focus:tw-outline-none focus:tw-shadow-outline" type="button">
              Cập nhật
            </button>
            <div className="tw-w-4"></div>
            <button className="tw-bg-red-500 hover:tw-bg-red-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded focus:tw-outline-none focus:tw-shadow-outline" type="button">
              Xóa
            </button>
          </div>
        </div>
        <div className="tw-flex tw-flex-row tw-mt-4   ">
          <div className="tw-text-gray-700 tw-text-lg tw-mb-4 tw-items-center tw-justify-end tw-flex-grow ">
            {address}
          </div>
          <div className="tw-flex tw-items-center tw-justify-end">
            <button className="tw-text-blue-500 hover:tw-text-blue-700 tw-font-medium tw-mr-4" type="button">
              Thiết lập mặc định
            </button>
          </div>
        </div>
        <div className="tw-inline-block tw-border-2 tw-border-red-300 tw-rounded tw-p-1 tw-max-w-max">
          <span className="tw-inline-block tw-text-red-500">
            Mặc định
          </span>
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

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    // Do something with the form data
    console.log({
      province,
      district,
      address,
      fullName,
      phoneNumber
    });

    // Reset form fields
    setProvince("");
    setDistrict("");
    setAddress("");
    setFullName("");
    setPhoneNumber("");
  };

  return (
    <div className="tw-relative tw-h-300">
        <div className="tw-bg-gray-600  tw-w-full tw-h-700">
        <div className="tw-flex tw-flex-row tw-justify-between tw-items-center tw-py-4 tw-bg-orange-300">
        <h2 className="tw-text-2xl tw-text-black-500 tw-font-bold tw-mb-4 tw-fontsize tw-mx-6 tw-mt-4">Địa chỉ của tôi</h2>
        {!showForm ? (
            <button
            className="tw-mx-4 tw-bg-blue-500 tw-hover:bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded tw-focus:outline-none tw-focus:shadow-outline"
            onClick={handleShowForm}
            >
            Thêm địa chỉ
            </button>
        ) : null}
        </div>
      {showForm && (
        
        <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center">

        <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4 tw-border-2 tw-border-gray-400">
          <form onSubmit={handleSubmit} className="tw-mg-2 ">
            {/* Form fields */}
            <div className="tw-mb-4">
              <label className="tw-block tw-mb-2 tw-font-bold tw-text-gray-700" htmlFor="province">
              Tỉnh:
                </label>
                <input
                type="text"
                id="province"
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded tw-focus:outline-none tw-focus:border-blue-500"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                />
                </div>
                <div className="tw-mb-4">
                <label className="tw-block tw-mb-2 tw-font-bold tw-text-gray-700" htmlFor="district">
                Huyện:
                </label>
                <input
                type="text"
                id="district"
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded focus:tw-outline-none focus:tw-border-blue-500"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                />
                </div>
                <div className="tw-mb-4">
                <label className="tw-block tw-mb-2 tw-font-bold tw-text-gray-700" htmlFor="address">
                Địa chỉ nhà:
                </label>
                <input
                type="text"
                id="address"
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded focus:tw-outline-none focus:tw-border-blue-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
                </div>
                <div className="tw-mb-4">
                <label className="tw-block tw-mb-2 tw-font-bold tw-text-gray-700" htmlFor="fullName">
                Họ và Tên:
                </label>
                <input
                type="text"
                id="fullName"
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded focus:tw-outline-none focus:tw-border-blue-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                />
                </div>
                <div className="tw-mb-4">
                <label className="tw-block tw-mb-2 tw-font-bold tw-text-gray-700" htmlFor="phoneNumber">
                Số điện thoại:
                </label>
                <input
                type="text"
                id="phoneNumber"
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded focus:tw-outline-none focus:tw-border-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                />
                </div>
            {/* Other form fields */}
            <div className="tw-flex tw-justify-end">
              <button
                type="submit"
                className="tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-6 tw-rounded focus:tw-outline-none focus:tw-shadow-outline"
              >
                Submit
              </button>
              <button
                type="button"
                className="tw-text-gray-500 tw-hover:text-gray-700 tw-font-bold tw-py-2 tw-px-4 tw-rounded tw-focus:outline-none tw-focus:shadow-outline tw-ml-2"
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
        <div className="tw-mt-4">
          
            <Address name="Nguyễn Văn A" phoneNumber="0987374523" address="Phường Linh Chiều, Thành phố Thủ Đức, Thành phố Hồ Chí Minh" />
            <Address name="Nguyễn Văn A" phoneNumber="0987374523" address="Phường Linh Chiều, Thành phố Thủ Đức, Thành phố Hồ Chí Minh" />
            <Address name="Nguyễn Văn A" phoneNumber="0987374523" address="Phường Linh Chiều, Thành phố Thủ Đức, Thành phố Hồ Chí Minh" />
            <Address name="Nguyễn Văn A" phoneNumber="0987374523" address="Phường Linh Chiều, Thành phố Thủ Đức, Thành phố Hồ Chí Minh" />
        </div>
    
    </div>
  );
};

export default AddressForm;