// export default AddressForm;
import React, { useEffect, useState } from "react";
import AddForm from "./AddForm";
import {
  useGetAllAddressQuery,
  useUpdateStatusAddressMutation,
} from "../../redux/api/addressApi";
import { set } from "date-fns";
import UpdateForm from "./UpdateForm";

export interface AddressProps {
  name: string;
  phoneNumber: string;
  address: string;
  status: string;
}

interface AddressDTO {
  addressId: number;
  province: string;
  district: string;
  ward: string;
  fullAddress: string;
  fullName: string;
  phone: string;
  status: string; // You may want to define a more specific type for status
}

const AddressForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [listAddress, setListAddress] = useState<AddressProps[]>([]);
  const { data, error, isLoading, refetch } = useGetAllAddressQuery();

  const [updateStatusAddress, { isLoading: updateStatusAddressLoading }] =
    useUpdateStatusAddressMutation();

  const [listAddressDTO, setListAddressDTO] = useState<AddressDTO[]>(
    data && data.addressDTOs ? data.addressDTOs : []
  );

  //update address
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  useEffect(() => {
    refetch();
    console.log("data", data);
    if (data && data.addressDTOs) {
      setListAddressDTO(data.addressDTOs);
    }
  }, [data, showForm, updateStatusAddressLoading, showUpdateForm]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return null;
  }

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleUpdateStatus = async ({ addressId }: { addressId: number }) => {
    try {
      const addressIdString = addressId.toString();
      const res = await updateStatusAddress({
        addressId: addressIdString,
        status: "ACTIVE",
      });
      console.log(res.data.message);
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteAddress = (addressId: number) => {
    const newListAddressDTO = listAddressDTO.filter(
      (address) => address.addressId !== addressId
    );
    setListAddressDTO(newListAddressDTO);
  };

  const handleUpdateAddress = (addressId: number) => {
    const addressToUpdate: AddressDTO | undefined = listAddressDTO.find(
      (address) => address.addressId === addressId
    );
    setCurrentAddress(addressToUpdate);
    setShowUpdateForm(true);
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
        {/* Map through listAddressDTO and render Address component for each item */}
        {listAddressDTO.map((addressDTO) => (
          <div className="max-w-full mx-auto">
            <div className="bg-white flex flex-col shadow-md rounded px-8 py-6 mb-4">
              <div className="bg-white flex flex-row ">
                <div className="mb-4 flex items-center">
                  <span className="text-gray-700 text-2xl font-medium mr-2">
                    {addressDTO.fullName}
                  </span>
                  <span className="text-gray-700 text-2xl font-medium ">
                    {" "}
                    |{" "}
                  </span>
                  <span className="text-gray-700 text-2xl font-medium ml-2">
                    {addressDTO.phone}
                  </span>
                </div>
                <div className="flex items-center justify-end flex-grow ">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => handleUpdateAddress(addressDTO.addressId)}
                  >
                    Cập nhật
                  </button>
                  <div className="w-4"></div>
                  {/* <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Xóa
                  </button> */}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => handleDeleteAddress(addressDTO.addressId)}
                  >
                    Xóa
                  </button>
                </div>
                {showUpdateForm && (
                  <UpdateForm
                    address={currentAddress}
                    onClose={() => setShowUpdateForm(false)}
                  />
                )}
              </div>
              <div className="flex flex-row mt-4   ">
                <div className="text-gray-700 text-lg mb-4 items-center justify-end flex-grow ">
                  {addressDTO.fullAddress +
                    ", " +
                    addressDTO.ward +
                    ", " +
                    addressDTO.district +
                    ", " +
                    addressDTO.province}
                </div>
                <div className="flex items-center justify-end">
                  <button
                    className="text-blue-500 hover:text-blue-700 font-medium mr-4"
                    type="button"
                    onClick={() =>
                      handleUpdateStatus({ addressId: addressDTO.addressId })
                    }
                  >
                    Thiết lập mặc định
                  </button>
                </div>
              </div>
              {addressDTO.status === "ACTIVE" ? (
                <div className="inline-block border-2 border-red-300 rounded p-1 max-w-max">
                  <span className="inline-block text-red-500">Mặc định</span>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressForm;
