// Import các module và component cần thiết

import Footer_v1 from "../../layouts/footers/Footer_v1";
import Sidebar from "./sidebar";
import React, { useState } from 'react';


interface Store {
  id: number;
  name: string;
  registrationDate: string;
}
// Dữ liệu mẫu cửa hàng (thay thế cho việc tải từ API hoặc database)
const storeData = [
  { id: 1, name: 'Apple MacBook Pro 17"', registrationDate: '2023-01-01' },
  { id: 2, name: 'Apple "', registrationDate: '2023-01-01' },
  { id: 3, name: 'Apple MacBook Pro 17"', registrationDate: '2023-01-01' },
  { id: 4, name: 'Apple  17"', registrationDate: '2023-01-01' },
  { id: 5, name: 'Apple MacBook Pro 17"', registrationDate: '2023-01-01' },
  { id: 6, name: ' Pro 17"', registrationDate: '2023-01-01' },
  { id: 7, name: 'Apple MacBook Pro 17"', registrationDate: '2023-01-01' },
  { id: 8, name: 'Apple MacBook Pro 17"', registrationDate: '2023-01-01' },
  { id: 9, name: ' Pro 17"', registrationDate: '2023-01-01' },
  { id: 10, name: 'Apple MacBook Pro 17"', registrationDate: '2023-01-01' },
  { id: 11, name: 'Apple MacBook Pro 17"', registrationDate: '2023-01-01' },
  { id: 12, name: 'Apple "', registrationDate: '2023-01-01' },
  { id: 13, name: 'Apple MacBook Pro 17"', registrationDate: '2023-01-01' },
  { id: 14, name: 'Apple  17"', registrationDate: '2023-01-01' },
  { id: 15, name: 'sssss"', registrationDate: '2023-01-01' },
  { id: 16, name: ' Pro 17"', registrationDate: '2023-01-01' },
  { id: 17, name: 'Agggggggg Pro 17"', registrationDate: '2023-01-01' },
  { id: 18, name: 'Apple MacBook Pro 17"', registrationDate: '2023-01-01' },
  { id: 19, name: ' Pro 17"', registrationDate: '2023-01-01' },
  { id: 20, name: 'Apple MacBook Pro 17"', registrationDate: '2023-01-01' },
  // Thêm các dữ liệu cửa hàng khác nếu cần
];

const ITEMS_PER_PAGE = 10;

const StoreAdmin: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = storeData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(storeData.length / ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="flex">
      {/* Sử dụng Sidebar component */}
      <Sidebar />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[1000px] m-auto mt-48 ">
        <h1>CỬA HÀNG</h1>
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 drop-shadow-4xl">
            <div>
            
            </div>
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            </div>
            <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
            </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-xl">
                Tên cửa hàng
              </th>
              <th scope="col" className="px-6 py-3 text-xl">
                Ngày Đăng ký
              </th>
              <th scope="col" className="px-6 py-3 text-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((store) => (
              <tr
                key={store.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center text-xl">
                    <input
                      id={`checkbox-table-search-${store.id}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor={`checkbox-table-search-${store.id}`} className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {store.name}
                </td>
                <td className="px-6 py-4">{store.registrationDate}</td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Cấm
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-start items-center mt-4">
        <div>
            <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 ${currentPage === 1 ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
            >
            Prev
            </button>
        </div>
        <div>
            <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 ${currentPage === totalPages ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
            >
            Next
            </button>
        </div>
        </div>

        
      </div>
    </div>

       
  );
};

export default StoreAdmin;
