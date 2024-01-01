import React, { useState } from "react";
import VoucherComponent from "./VoucherComponent";
import { Link, createSearchParams } from "react-router-dom";
import classNames from "classnames";
import { useGetVouchersQuery } from "../services/userApi";

const purchaseTabs = [
  { status: "0", name: "Tất cả" },
  { status: "1", name: "Hệ thống" },
  { status: "2", name: "Shop" },
];

const VoucherList: React.FC = () => {
  const [activeTab, setActiveTab] = useState("0");

  const handleTabClick = (status: string) => {
    setActiveTab(status);
  };

  const { data: voucherData, error, isLoading } = useGetVouchersQuery();

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
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {voucherData &&
          voucherData.voucherDTOs.map((voucher, index) => (
            <VoucherComponent key={index} data={voucher} />
          ))}
      </div>
    </div>
  );
};

export default VoucherList;
