import React, { useState } from 'react';
import { useStatisticalBasicMutation } from '../../features/vendor/redux/api/statisticalApi';
import { Line } from 'react-chartjs-2';

// Import Tailwind CSS styles
import 'tailwindcss/tailwind.css';

interface StatisticsRequest {
  startDate: Date | undefined;
  endDate: Date | undefined;
  username?: string;
}

interface StatisticsResponse {
  status: string;
  message: string;
  code: number;
  count: number;
  totalOrder: number;
  username: string;
  dateStart: Date;
  dateEnd: Date;
  statisticsDTOs: StatisticsDTO[];
}

interface StatisticsDTO {
  totalMoney: number | null;
  totalOrder: number;
  totalProduct: number;
  date: Date;
}

const Statistical: React.FC = () => {
  const [callStatisticsByDate] = useStatisticalBasicMutation();
  const [statisticsRequest, setStatisticsRequest] = useState<StatisticsRequest | null>(null);
  const [statisticsResponse, setStatisticsResponse] = useState<StatisticsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchData = async () => {
    try {
      console.log('aaaaaaaaaaa');
      if (statisticsRequest) {
        setLoading(true);
        const response = await callStatisticsByDate(statisticsRequest).unwrap();
        setStatisticsResponse(response);
      } else {
        console.log('BBBBBBBBBB');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStatisticsRequest((prevData) => ({
      ...prevData,
      startDate: value ? new Date(value) : undefined,
    }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStatisticsRequest((prevData) => ({
      ...prevData,
      endDate: value ? new Date(value) : undefined,
    }));
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const usernameValue = event.target.value;
    setStatisticsRequest((prev) => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        username: usernameValue,
      };
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Statistical</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Start Date:</label>
        <input
          type="date"
          className="mt-1 p-2 border rounded"
          onChange={handleStartDateChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">End Date:</label>
        <input
          type="date"
          className="mt-1 p-2 border rounded"
          onChange={handleEndDateChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Username:</label>
        <input
          type="text"
          className="mt-1 p-2 border rounded"
          onChange={handleUsernameChange}
        />
      </div>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={handleFetchData}
      >
        Fetch Data
      </button>
      {loading && <p className="mt-4">Loading...</p>}
      {statisticsResponse && (
        <div>
          <h2 className="text-xl font-semibold mt-4">Statistics Result</h2>
          <Line
            data={{
              labels: statisticsResponse.statisticsDTOs.map((dto) => dto.date.toISOString()),
              datasets: [
                {
                  label: 'Total Money',
                  data: statisticsResponse.statisticsDTOs.map((dto) => dto.totalMoney ?? 0),
                  borderColor: 'blue',
                  fill: false,
                },
                {
                  label: 'Total Order',
                  data: statisticsResponse.statisticsDTOs.map((dto) => dto.totalOrder),
                  borderColor: 'green',
                  fill: false,
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Statistical;
