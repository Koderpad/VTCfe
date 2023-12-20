import classNames from "classnames";
import { NavLink, Link, createSearchParams } from "react-router-dom";
import useQueryParams from "../../features/common/userManagement/hooks/useQueryParams";
// import { useGetOrderByStatusMuMutation } from "../../redux/api/orderApi";
import {
  useGetOrdersQuery,
  useGetOrdersByStatusQuery,
} from "../../features/vendor/redux/api/ordersApi";
import { useEffect, useState } from "react";
import {
  OrderDTO,
  OrderItemDTO,
} from "../../features/vendor/orders/interface/ResponseOfGetOrders";

const purchasesStatus = {
  inCart: -1,
  ALL: 0,
  PENDING: 1,
  PROCESSING: 2,
  SHIPPING: 3,
  COMPLETED: 4,
  CANCEL: 5,
} as const;

const purchaseStatusString = [
  "ALL",
  "PENDING",
  "PROCESSING",
  "SHIPPING",
  "COMPLETED",
  "CANCEL",
];

const purchaseTabs = [
  { status: purchasesStatus.ALL, name: "Tất cả" },
  { status: purchasesStatus.PENDING, name: "Đang chờ xử lý" },
  { status: purchasesStatus.PROCESSING, name: "Đang xử lý" },
  { status: purchasesStatus.SHIPPING, name: "Đang giao" },
  { status: purchasesStatus.COMPLETED, name: "Đã giao" },
  { status: purchasesStatus.CANCEL, name: "Đã hủy" },
];

export const Orders = () => {
  const queryParams: { status?: string } = useQueryParams();
  const status: number = Number(queryParams.status) || purchasesStatus.PENDING;
  console.log("status", status);

  const statusString = purchaseStatusString[status];
  //   const [orderDTOs, setOrderDTOs] = useState<OrderDTO[]>([]);
  console.log("statusString", statusString);
  console.log("queryParams", queryParams);

  //   const { data: orders, isLoading, isError, refetch } = useGetOrdersQuery();
  const {
    data: orders,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
    refetch: refetchOrders,
  } = useGetOrdersQuery("ALL");

  const {
    data: otherData,
    isLoading: isLoadingOther,
    isError: isErrorOther,
    refetch: refetchOther,
  } = useGetOrdersByStatusQuery(statusString);

  useEffect(() => {
    if (status === 0) {
      refetchOrders();
    } else {
      refetchOther();
    }
  }, [status]);

  if (isLoadingOrders || isLoadingOther) {
    return <div>Loading...</div>;
  }

  if (isErrorOrders || isErrorOther) {
    return <div>Error loading data</div>;
  }

  const data = status === 0 ? orders : otherData;

  const orderDTOs: OrderDTO[] = data?.orderDTOs || [];
  console.log("orderDTOs", orderDTOs);

  //   const response = await callStatisticsByDate(statisticsRequest).unwrap();

  //   const orderDTOs: OrderDTO[] = getOrderByStatusMu(statusString).unwrap();
  //   console.log("orderDTOs", orderDTOs);
  //   const fetchData = async () => {
  //     const data: GetOrderByStatusApiResponse = await getOrderByStatusMu(
  //       statusString
  //     ).unwrap();
  //     console.log("data", data);
  //     setOrderDTOs(data.orderDTOs);
  //   };

  //   useEffect(() => {
  //     // const statusString = purch
  //     fetchData();
  //   }, [statusString]);

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: "/vendor/shop/orders",
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
    <div className="overflow-x-auto">
      <div className="min-w-[700px]">
        <div className="sticky top-0 flex rounded-t-sm shadow-sm">
          {purchaseTabsLink}
        </div>
        <div>
          {orderDTOs?.map((purchase) => (
            <div
              key={purchase.orderId}
              className="mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm"
            >
              {purchase.orderItemDTOs.map((item: OrderItemDTO) => (
                <NavLink
                  to={`/checkout/${purchase.orderId}`}
                  className="flex"
                  key={item.cartId}
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-20 w-20 object-cover"
                      src={item.productVariantDTO.productImage}
                      alt={item.productVariantDTO.productName}
                    />
                  </div>
                  <div className="ml-3 flex-grow overflow-hidden">
                    <div className="truncate">
                      {item.productVariantDTO.productName}
                    </div>
                    <div className="mt-3">x{item.quantity}</div>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    {/* <span className="truncate text-gray-500 line-through">
                      ₫{item.quantity * item.price}
                    </span> */}
                    <span className="ml-2 truncate text-orange">
                      {/* ₫{formatCurrency(purchase.product.price)}₫ */}
                      {item.quantity * item.price}₫
                    </span>
                  </div>
                </NavLink>
              ))}
              <div className="flex justify-end">
                <div className="mr-4">
                  <span>Tổng khuyến mãi</span>
                  <span className="ml-4 text-xl text-orange">
                    {purchase.discount}₫
                  </span>
                </div>
                <div>
                  <span>Tổng giá tiền</span>
                  <span className="ml-4 text-xl text-orange">
                    {purchase.paymentTotal}₫
                  </span>
                </div>
              </div>
              <div className="h-[50px] bg-gray-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
