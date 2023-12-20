import React, { useState } from "react";
import Sidebar from "./sidebar";
import AddVoucherForm from "./AddVoucherForm";
import {
  useGetAllVoucherQuery,
  useAddNewVoucherMutation,
} from "./redux/api/voucherAdminApi";

interface Voucher {
  code: string;
  name: string;
  description: string;
  discount: number;
  minPrice: number;
  maxPrice: number;
  maxDiscount: number;
  quantity: number;
  startDate: string;
  endDate: string;
  type: string;
}

const VoucherAdmin: React.FC = () => {
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [voucherData, setVoucherData] = useState<Voucher[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading, refetch } = useGetAllVoucherQuery("voucher");

  const [addNewVoucher, { data: newVoucher, error: addNewVoucherError }] =
    useAddNewVoucherMutation();

  const itemsPerPage = 10;
  const totalPages = Math.ceil(voucherData.length / itemsPerPage);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return voucherData.slice(startIndex, endIndex);
  };

  //
  const handleAddVoucher = (newVoucher: Voucher) => {
    const handleAddNew = async () => {
      try {
        const params = {
          code: newVoucher.code,
          name: newVoucher.name,
          description: newVoucher.description,
          discount: newVoucher.discount,
          minPrice: newVoucher.minPrice,
          maxPrice: newVoucher.maxPrice,
          maxDiscount: newVoucher.maxDiscount,
          quantity: newVoucher.quantity,
          startDate: newVoucher.startDate,
          endDate: newVoucher.endDate,
          type: newVoucher.type,
        };
        const resultAction = await addNewVoucher(params).unwrap();
        setVoucherData((prevData) => [...prevData, resultAction]);

        console.log(resultAction);
      } catch (error) {
        console.log(error);
      }
    };

    handleAddNew();
  };

  const handleDeleteVoucher = (code: string) => {
    // Thực hiện logic để xóa voucher khỏi danh sách
    // (ví dụ: gọi API, cập nhật state, ...)
    const deletedVoucherIndex = voucherData.findIndex(
      (voucher) => voucher.code === code
    );

    if (deletedVoucherIndex !== -1) {
      const updatedVoucherData = [...voucherData];
      updatedVoucherData.splice(deletedVoucherIndex, 1);
      setVoucherData(updatedVoucherData);
    }
  };

  React.useEffect(() => {
    if (!isLoading && data) {
      refetch();
      console.log("data: ", data);
      setVoucherData(data.voucherDTOs);
    }
  }, [data, isLoading]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[1000px] m-auto mt-20">
        <h1>Voucher</h1>

        <button
          onClick={() => setAddFormVisible(true)}
          className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Thêm Voucher
        </button>

        {isAddFormVisible && (
          <AddVoucherForm
            onAddVoucher={handleAddVoucher}
            onClose={() => setAddFormVisible(false)}
          />
        )}

        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 drop-shadow-4xl">
          <div></div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Code
              </th>
              <th scope="col" className="px-6 py-3">
                Tên Voucher
              </th>
              <th scope="col" className="px-6 py-3">
                Mô tả
              </th>
              <th scope="col" className="px-6 py-3">
                Giảm giá
              </th>
              {/* Thêm các cột khác nếu cần */}
              <th scope="col" className="px-6 py-3">
                Ngày bắt đầu
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày kết thúc
              </th>
              <th scope="col" className="px-6 py-3">
                Loại
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageItems().map((voucher) => (
              <tr
                key={voucher.code}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{voucher.code}</td>
                <td className="px-6 py-4">{voucher.name}</td>
                <td className="px-6 py-4">{voucher.description}</td>
                <td className="px-6 py-4">{voucher.discount}</td>
                {/* Hiển thị các trường khác nếu cần */}
                <td className="px-6 py-4">{voucher.startDate}</td>
                <td className="px-6 py-4">{voucher.endDate}</td>
                <td className="px-6 py-4">{voucher.type}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDeleteVoucher(voucher.code)}
                      className="text-red-500 hover:underline"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Prev
              </button>
            </div>

            <div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Next
              </button>
            </div>
          </div>
        </table>
      </div>
    </div>
  );
};

export default VoucherAdmin;
