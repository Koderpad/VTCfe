import React, { useEffect, useState } from "react";
import VoucherComponent from "./VoucherComponent";
import { Link, createSearchParams } from "react-router-dom";
import classNames from "classnames";
import axios from "axios";

const purchaseTabs = [
  { status: "0", name: "Tất cả" },
  { status: "1", name: "Hệ thống" },
  { status: "2", name: "Shop" },
];

const VoucherList: React.FC = () => {
  const [activeTab, setActiveTab] = useState("0");
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    handleTabClick("0");
  }, []);

  const handleTabClick = async (status: string) => {
    setActiveTab(status);

    if (status === "0") {
      try {
        const response = await axios.get(
          "http://localhost:8181/api/voucher/list-all"
        );
        setVouchers(response.data.voucherDTOs); // Store the response data in the state
      } catch (error) {
        console.error(error);
      }
    }

    if (status === "1") {
      try {
        const response = await axios.get(
          "http://localhost:8181/api/voucher/list-on-system"
        );
        setVouchers(response.data.voucherDTOs); // Store the response data in the state
      } catch (error) {
        console.error(error);
      }
    }
    if (status === "2") {
      try {
        const response1 = await axios.get(
          "http://localhost:8181/api/voucher/list-by-type/PERCENTAGE_SHOP"
        );
        const response2 = await axios.get(
          "http://localhost:8181/api/voucher/list-by-type/AMOUNT_SHOP"
        );

        // Combine the two arrays into one
        const combinedVouchers = [
          ...response1.data.voucherDTOs,
          ...response2.data.voucherDTOs,
        ];

        setVouchers(combinedVouchers); // Store the combined response data in the state
      } catch (error) {
        console.error(error);
      }
    }
  };

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: "",
        search: createSearchParams({
          status: String(tab.status),
        }).toString(),
      }}
      onClick={() => handleTabClick(tab.status)}
      className={classNames(
        "flex",
        "flex-1",
        "items-center",
        "justify-center",
        "border-b-2",
        "bg-white",
        "py-4",
        "text-center",
        {
          "border-b-orange-500 text-orange-500": activeTab === tab.status,
          "border-b-black/10 text-gray-900": activeTab !== tab.status,
        },
        "mb-4"
      )}
    >
      {tab.name}
    </Link>
  ));

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4">Kho Voucher</h2>
      <div className="sticky top-0 flex rounded-t-sm shadow-sm">
        {purchaseTabsLink}
      </div>
      <div className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 overflow-y-scroll">
        {vouchers.map((voucher, index) => (
          <VoucherComponent key={index} data={voucher} />
        ))}
      </div>
    </div>
  );
};

export default VoucherList;
