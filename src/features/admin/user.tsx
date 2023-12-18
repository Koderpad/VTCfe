import { useState } from "react";
import Sidebar from "./sidebar";



interface Users {
    id: number;
    name: string;
    birthDate: string; // Thay đổi tên trường thành "birthDate"
    email: string; // Thêm trường email
  }
  // Dữ liệu mẫu cửa hàng (thay thế cho việc tải từ API hoặc database)
  const userData: Users[] = [
    { id: 1, name: 'Apple MacBook Pro 17"', birthDate: '2023-01-01', email: 'example1@example.com' },
    { id: 2, name: 'Apple "', birthDate: '2023-01-01', email: 'example2@example.com' },
    { id: 3, name: 'Apple MacBook Pro 17"', birthDate: '2023-01-01', email: 'example3@example.com' },
    { id: 4, name: 'Apple  17"', birthDate: '2023-01-01', email: 'example4@example.com' },
    { id: 5, name: 'Apple MacBook Pro 17"', birthDate: '2023-01-01', email: 'example5@example.com' },
    { id: 6, name: ' Pro 17"', birthDate: '2023-01-01', email: 'example6@example.com' },
    { id: 7, name: 'Apple MacBook Pro 17"', birthDate: '2023-01-01', email: 'example7@example.com' },
    { id: 8, name: 'Apple MacBook Pro 17"', birthDate: '2023-01-01', email: 'example8@example.com' },
    { id: 9, name: ' Pro 17"', birthDate: '2023-01-01', email: 'example9@example.com' },
    { id: 10, name: 'Apple MacBook Pro 17"', birthDate: '2023-01-01', email: 'example10@example.com' },
    { id: 11, name: 'Apple MacBook Pro 17"', birthDate: '2023-01-01', email: 'example11@example.com' },
    { id: 12, name: 'Apple "', birthDate: '2023-01-01', email: 'example12@example.com' },
    { id: 13, name: 'Apple MacBook Pro 17"', birthDate: '2023-01-01', email: 'example13@example.com' },
    { id: 14, name: 'Apple  17"', birthDate: '2023-01-01', email: 'example14@example.com' },
    { id: 15, name: 'sssss"', birthDate: '2023-01-01', email: 'example15@example.com' },
    { id: 16, name: ' Pro 17"', birthDate: '2023-01-01', email: 'example16@example.com' },
    { id: 17, name: 'Agggggggg Pro 17"', birthDate: '2023-01-01', email: 'example17@example.com' },
    { id: 18, name: 'Apple MacBook Pro 17"', birthDate: '2023-01-01', email: 'example18@example.com' },
    { id: 19, name: ' Pro 17"', birthDate: '2023-01-01', email: 'example19@example.com' },
    { id: 20, name: 'Apple MacBook Pro 17"', birthDate: '2023-01-01', email: 'example20@example.com' },
    // Thêm các dữ liệu cửa hàng khác nếu cần
  ];
  


  const ITEMS_PER_PAGE = 10;

  const UserAdmin: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
  
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(userData.length / ITEMS_PER_PAGE);
  
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
        <Sidebar />
  
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[1000px] m-auto mt-48 ">
          <h1 className="text-3xl font-bold mb-4">Người dùng</h1>
  
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
                  Tên người dùng
                </th>
                <th scope="col" className="px-6 py-3 text-xl">
                  Ngày Sinh
                </th>
                <th scope="col" className="px-6 py-3 text-xl">
                  Email
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
                  <td className="px-6 py-4">{store.birthDate}</td>
                  <td className="px-6 py-4">{store.email}</td>
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
  
  export default UserAdmin;