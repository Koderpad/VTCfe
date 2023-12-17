import React, { useEffect, useState } from "react";
import { useStatisticalBasicMutation } from "../../features/vendor/redux/api/statisticalApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format, addMonths } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
  BarChart,
} from "recharts";

interface StatisticsRequest {
  startDate?: string;
  endDate?: string;
  username?: string;
}

interface StatisticsResponse {
  status: string;
  message: string;
  code: number;
  count: number;
  totalOrder: number;
  username: string;
  dateStart: string;
  dateEnd: string;
  statisticsDTOs: StatisticsDTO[];
}

interface StatisticsDTO {
  totalMoney: number | null;
  totalOrder: number;
  totalProduct: number;
  date: string;
}

const Statistical: React.FC = () => {
  const [callStatisticsByDate] = useStatisticalBasicMutation();
  const [statisticsRequest, setStatisticsRequest] = useState<StatisticsRequest>({
    startDate: getDefaultStartDate(),
    endDate: getCurrentDate(),
  });
  const [statisticsResponse, setStatisticsResponse] = useState<StatisticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedFilterType, setSelectedFilterType] = useState<string>("month-year");

  function getDefaultStartDate(): string {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-01`;
  }

  function getCurrentDate(): string {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate()}`;
  }

  const handleFetchData = async () => {
    try {
      if (statisticsRequest) {
        setLoading(true);
        const response = await callStatisticsByDate(statisticsRequest).unwrap();

        if (response) {
          setStatisticsResponse(response);
          toast.success("Đã lấy dữ liệu thành công!");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      console.error("Error fetching data:", error.data?.message);
      toast.error(error.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStatisticsRequest((prevData) => ({
      ...prevData,
      startDate: value,
    }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStatisticsRequest((prevData) => ({
      ...prevData,
      endDate: value,
    }));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(e.target.value, 10);
    setSelectedYear(selectedYear);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = parseInt(e.target.value, 10);
    setSelectedMonth(selectedMonth);
  };

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFilterType = e.target.value;
    setSelectedFilterType(selectedFilterType);
  };

  useEffect(() => {
    // Update start and end dates based on selected year and month
    if (selectedFilterType === "month-year") {
      const startDate = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-01`;
      const endDate = format(addMonths(new Date(startDate), 1), "yyyy-MM-dd");

      setStatisticsRequest({
        startDate,
        endDate,
      });
    }
  }, [selectedYear, selectedMonth, selectedFilterType]);

  useEffect(() => {
    // Fetch data when the component mounts
    handleFetchData();
  }, [statisticsRequest]); // Fetch data when statisticsRequest changes

  const getTotalDaysWithOrders = (): number => {
    if (!statisticsResponse?.statisticsDTOs) {
      return 0;
    }
    return statisticsResponse.statisticsDTOs.filter(statistic => statistic.totalOrder > 0).length;
  };

  const getTotalDaysWithoutOrders = (): number => {
    if (!statisticsResponse?.statisticsDTOs) {
      return 0;
    }
    return statisticsResponse.statisticsDTOs.filter(statistic => statistic.totalOrder === 0).length;
  };

  const getMaxTotalMoneyOrder = (): number => {
    if (!statisticsResponse?.statisticsDTOs) {
      return 0;
    }
    const maxTotalMoney = Math.max(...statisticsResponse.statisticsDTOs.map(statistic => statistic.totalMoney || 0));
    return maxTotalMoney > 0 ? statisticsResponse.statisticsDTOs.filter(statistic => statistic.totalMoney === maxTotalMoney).length : 0;
  };


 const chartData = statisticsResponse?.statisticsDTOs.map((data) => ({
    ...data,
    totalMoney: data.totalMoney || 0,
    totalProducts: data.totalProduct || 0,
  }));

return (
  <div className="container mx-auto mt-8 p-8 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6">Thống kê dữ liệu</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="text-sm font-medium text-gray-700">
          Tnống kê theo:
        </label>
        <div className="ml-2">
          <label className="block">
            <input
              type="radio"
              value="month-year"
              checked={selectedFilterType === "month-year"}
              onChange={handleFilterTypeChange}
            />
            <span className="ml-2">Tháng và Năm</span>
          </label>
          <label className="block mt-2">
            <input
              type="radio"
              value="day"
              checked={selectedFilterType === "day"}
              onChange={handleFilterTypeChange}
            />
            <span className="ml-2">Ngày</span>
          </label>
        </div>
      </div>
      {selectedFilterType === "month-year" && (
        <div>
          <label className="text-sm font-medium text-gray-700">
            Chọn tháng:
          </label>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="mt-1 p-2 border rounded w-full"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                Tháng {month}
              </option>
            ))}
          </select>
          <label className="text-sm font-medium text-gray-700 mt-2">
            Chọn năm:
          </label>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="mt-1 p-2 border rounded w-full"
          >
            {Array.from({ length: 10 }, (_, i) => selectedYear - 5 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedFilterType === "day" && (
        <div>
          <label className="text-sm font-medium text-gray-700">
            Ngày bắt đầu:
          </label>
          <input
            type="date"
            className="mt-1 p-2 border rounded w-full"
            onChange={handleStartDateChange}
          />
          <label className="text-sm font-medium text-gray-700 mt-2">
            Ngày kết thúc:
          </label>
          <input
            type="date"
            className="mt-1 p-2 border rounded w-full"
            onChange={handleEndDateChange}
          />
        </div>
      )}
    </div>
    <button
      className="mt-4 px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600"
      onClick={handleFetchData}
    >
      Lấy Dữ Liệu
    </button>
    {loading && <p className="mt-4">Đang tải...</p>}

      {statisticsResponse?.statisticsDTOs &&  (
  <>   
    <div className="mt-8 flex flex-wrap space-x-4">
          {/* Biểu đồ Tổng Đơn Hàng */}
          <div className="flex-1">        
          

            <h2 className="text-xl font-bold mb-4">Tổng Đơn Hàng</h2>
                        <p className="text-sm mt-2 justify-end">Đơn vị: Đơn Hàng</p>

            <LineChart
              width={400}
              height={300}
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "dd/MM/yyyy")} />
              <YAxis />
              <Tooltip formatter={(value) => value} />
              <Legend />
              <Line type="monotone" dataKey="totalOrder" stroke="#FF0000" name="Tổng Đơn Hàng" />
            </LineChart>
          </div>

          {/* Biểu đồ Tổng Tiền */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">Tổng Tiền</h2>
                <p className="text-sm mt-2">Đơn vị: VNĐ</p>
            <LineChart
              width={400}
              height={300}
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "dd/MM/yyyy")} />
              <YAxis />
              <Tooltip formatter={(value) => `${value} VNĐ`} />
              <Legend />
              <Line type="monotone" dataKey="totalMoney" stroke="#00FF00" name="Tổng Tiền" />
            </LineChart>
        
          </div>

          {/* Biểu đồ Tổng Sản Phẩm */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">Tổng Sản Phẩm</h2>
            <p className="text-sm mt-2">Đơn vị: Sản Phẩm</p>
            <BarChart
              width={400}
              height={300}
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "dd/MM/yyyy")} />
              <YAxis />
              <Tooltip formatter={(value) => value} />
              <Legend />
              <Bar dataKey="totalProduct" fill="#000000" name="Tổng Sản Phẩm" />
            </BarChart>
          </div>
        </div>


        <div className="mt-8">


          <h2 className="text-xl font-bold mb-4">Dữ Liệu Thống Kê</h2>
          <div className="flex space-x-4 mb-4 justify-end">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 mr-2"></div>
              <span>Tổng Ngày Có Đơn Hàng: {getTotalDaysWithOrders()}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-100 mr-2"></div>
              <span>Tổng Ngày Không Có Đơn: {getTotalDaysWithoutOrders()}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-200 mr-2"></div>
              <span>Tổng Tiền Cao Nhất: {getMaxTotalMoneyOrder()}</span>
            </div>
          </div>

          <p className="mt-4">
            Tổng số ngày: {statisticsResponse.statisticsDTOs.length}
          </p>

          <table className="min-w-full border divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng Tiền</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng Đơn Hàng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng Sản Phẩm</th>
              </tr>
            </thead>
            <tbody>
              {statisticsResponse.statisticsDTOs.map((statistic) => {
                const isMaxTotalOrder = statistic.totalOrder > 0;
                const hasOrders = statistic.totalOrder > 0;
                const isZeroOrder = statistic.totalOrder === 0;

                return (
                  <tr key={statistic.date} className={`${hasOrders ? (isMaxTotalOrder ? "bg-red-200" : "bg-green-100") : (isZeroOrder ? "bg-gray-100" : "")}`}>
                    <td className={`px-6 py-4 whitespace-nowrap ${isMaxTotalOrder ? "text-red-500 font-bold" : ""}`}>{format(new Date(statistic.date), "dd/MM/yyyy")}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{statistic.totalMoney}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{statistic.totalOrder}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{statistic.totalProduct}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div></>

  
   
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Statistical;
