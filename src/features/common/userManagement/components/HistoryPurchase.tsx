import classNames from "classnames";
import { Link, createSearchParams } from "react-router-dom";
import useQueryParams from "../hooks/useQueryParams";

const purchasesStatus = {
  inCart: -1,
  ALL: 0,
  WAITING: 1,
  PENDING: 2,
  PROCESSING: 3,
  DELIVERED: 4,
  CANCEL: 5,
} as const;

const purchaseTabs = [
  { status: purchasesStatus.ALL, name: "Tất cả" },
  { status: purchasesStatus.WAITING, name: "Chờ xác nhận" },
  { status: purchasesStatus.PENDING, name: "Xác nhận" },
  { status: purchasesStatus.PROCESSING, name: "Đang giao" },
  { status: purchasesStatus.DELIVERED, name: "Đã giao" },
  { status: purchasesStatus.CANCEL, name: "Đã hủy" },
];

export const HistoryPurchase = () => {
  const queryParams: { status?: string } = useQueryParams();
  const status: number = Number(queryParams.status) || purchasesStatus.ALL;

  let data: string = "data";

  if (status === purchasesStatus.ALL) {
    data = "ALL";
  } else if (status === purchasesStatus.WAITING) {
    data = "WAITING";
  } else if (status === purchasesStatus.PENDING) {
    data = "PENDING";
  } else if (status === purchasesStatus.PROCESSING) {
    data = "PROCESSING";
  } else if (status === purchasesStatus.DELIVERED) {
    data = "DELIVERED";
  } else if (status === purchasesStatus.CANCEL) {
    data = "CANCEL";
  }

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: "/user/account/history-purchase",
        search: createSearchParams({
          status: String(tab.status),
        }).toString(),
      }}
      className={classNames(
        "flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center",
        {
          "border-orange-600 text-orange-600": status === tab.status,
          "border-b-black/10 text-gray-900": status !== tab.status,
        }
      )}
    >
      {tab.name}
    </Link>
  ));

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="sticky top-0 flex rounded-t-sm shadow-sm">
            {purchaseTabsLink}
          </div>
          <div>{data}</div>
        </div>
      </div>
    </div>
  );
};
