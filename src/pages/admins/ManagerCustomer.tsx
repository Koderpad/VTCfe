import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useManagerCustomersByStatusMutation, useManagerCustomersSortAndSearchMutation } from '../../features/admin/redux/api/managerCustomerApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface ListCustomerManagerResponse {
  status: string;
  message: string;
  code: number;
  count: number;
  size: number;
  page: number;
  totalPage: number;
  customerDTOs: CustomerDTO[];
}

interface CustomerDTO {
  customerId: number;
  username: string;
  email: string;
  gender: boolean;
  fullName: string;
  birthday: string;
  status: string;
  roles: string[];
}

function ManagerCustomer() {
  const defaultSize = 50;
  const defaultStatus = 'active';

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(defaultStatus);
  const [search, setSearch] = useState('');
  const [listCustomerManagerResponse, setListCustomerManagerResponse] = useState<ListCustomerManagerResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDTO | null>(null);

  const [callManagerCustomersByStatus] = useManagerCustomersByStatusMutation();
  const [callManagerCustomersSortAndSearch] = useManagerCustomersSortAndSearchMutation();

  const fetchData = async () => {
    try {
      const response = await callManagerCustomersSortAndSearch({ status: mapStatus(status), page, size: defaultSize, search });
      setListCustomerManagerResponse(response.data || null);
      toast.success(response?.data.message);
    } catch (error) {
      console.error('Error fetching data:', error.data?.message);
      toast.error(error.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [callManagerCustomersByStatus, callManagerCustomersSortAndSearch, page, status, search]);

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleStatusChange = (selectedStatus: string) => {
    setPage(1);
    setStatus(selectedStatus);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleViewDetails = (customer: CustomerDTO) => {
    setSelectedCustomer(customer);
  };

  const handleCloseDetails = () => {
    setSelectedCustomer(null);
  };

  const formatDate = (dateString: string) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('vi-VN', options);
    return formattedDate;
  };

  const mapStatus = (displayStatus: string) => {
    switch (displayStatus) {
      case 'active':
        return 'ACTIVE';
      case 'inactive':
        return 'INACTIVE';
      case 'locked':
        return 'LOCKED';
      case 'deleted':
        return 'DELETED';
      default:
        return displayStatus;
    }
  };

const renderPageButtons = () => {
  if (!listCustomerManagerResponse) {
    return null;
  }

  const totalPage = listCustomerManagerResponse.totalPage;
  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);

  return (
    <div className="flex space-x-2 justify-center"> {/* Updated to center the buttons */}
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`px-3 py-2 ${
            pageNumber === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
          } rounded-md`}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

  return (
   <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Quản lý Khách hàng</h1>
    <div className="mb-4">
        <label htmlFor="statusSelect" className="mr-2">
          Chọn Trạng thái:
        </label>
        <select
          id="statusSelect"
          className="p-2 border rounded"
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="active">Hoạt động</option>
          <option value="inactive">Không hoạt động</option>
          <option value="locked">Đã khóa</option>
          <option value="deleted">Đã xóa</option>
        </select>

        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="p-2 ml-2 border rounded"
          value={search}
          onChange={handleSearchChange}
        />
        <button className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2" onClick={fetchData}>
          Tìm kiếm
        </button>
      </div>

      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border p-2">STT</th>
            <th className="border p-2">Mã khách hàng</th>
            <th className="border p-2">Tên đăng nhập</th>
            <th className="border p-2">Họ và tên</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {listCustomerManagerResponse?.customerDTOs.map((customer, index) => (
            <tr key={customer.customerId} className="group">
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2 text-center">{customer.customerId}</td>
              <td className="border p-2">{customer.username}</td>
              <td className="border p-2">{customer.fullName}</td>
              <td className="border p-2">{customer.email}</td>
              <td className="border p-2 text-center">
                <button
                  className="text-blue-500 group-hover:text-blue-700"
                  onClick={() => handleViewDetails(customer)}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCustomer && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-2xl font-bold mb-2">Chi tiết Khách hàng</h2>
            <p>ID: {selectedCustomer.customerId}</p>
            <p>Tên đăng nhập: {selectedCustomer.username}</p>
            <p>Email: {selectedCustomer.email}</p>
            <p>Họ và tên: {selectedCustomer.fullName}</p>
            <p>Ngày sinh: {formatDate(selectedCustomer.birthday)}</p>
            <button className="bg-blue-500 text-white px-2 py-1 rounded-md" onClick={handleCloseDetails}>
              Đóng
            </button>
          </div>
        </div>
      )}

     <br/>

     <div className='text-center'>
       {renderPageButtons()}
     </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default ManagerCustomer;
