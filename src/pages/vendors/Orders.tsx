import classNames from "classnames";
import { NavLink, Link, createSearchParams } from "react-router-dom";
import useQueryParams from "../../features/common/userManagement/hooks/useQueryParams";
// import { useGetOrderByStatusMuMutation } from "../../redux/api/orderApi";
import {
  useGetOrdersByStatusQuery,
  useUpdateOrderStatusMutation,
} from "../../features/vendor/redux/api/ordersApi";
import { useEffect, useState } from "react";
import {
  OrderDTO,
  OrderItemDTO,
} from "../../features/vendor/orders/interface/ResponseOfGetOrders";

const purchasesStatus = {
  // inCart: -1,
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
  const status: number = Number(queryParams.status) || purchasesStatus.ALL;
  console.log("status", status);

  const [isUpdate, setIsUpdate] = useState(false);
  const statusString = purchaseStatusString[status];
  console.log("statusString", statusString);
  console.log("queryParams", queryParams);

  const [updateOrderStatus, { isLoading, isError }] =
    useUpdateOrderStatusMutation();

  const {
    data: otherData,
    isLoading: isLoadingOther,
    isError: isErrorOther,
    refetch: refetchOther,
  } = useGetOrdersByStatusQuery(statusString);

  // useEffect(() => {
  //   refetchOther();
  // }, [refetchOther]);

  const refetchData = async () => {
    await refetchOther();
  };

  useEffect(() => {
    refetchData();
  }, [isUpdate, status]);

  // useEffect(() => {
  //   refetchData();
  // }, []);

  if (isLoadingOther) {
    return <div>Loading...</div>;
  }

  if (isErrorOther) {
    return <div>Error loading data</div>;
  }

  const data = otherData;

  const orderDTOs: OrderDTO[] = data?.orderDTOs || [];
  console.log("orderDTOs", orderDTOs);

  const handleCancelOrder = async (orderId: number) => {
    console.log("handleCancelOrder");
    try {
      await updateOrderStatus({ orderId, status: "CANCEL" });
      alert("Cancel order successfully");
      setIsUpdate(!isUpdate);
    } catch (error) {
      alert("Cancel order failed");
      // Handle error case here...
    }
  };

  const handleNextStatus = async (orderId: number, status: string) => {
    console.log("handleNextStatus");
    try {
      await updateOrderStatus({ orderId, status });
      alert("Update order status successfully");
      setIsUpdate(!isUpdate);
      // Handle success case here...
    } catch (error) {
      alert("Update order status failed");
      // Handle error case here...
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

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
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1200px]">
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
                  to={`/vendor/shop/checkout/${purchase.orderId}`}
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
                <span className="mr-4">
                  Ngày đặt hàng: {formatDate(purchase.orderDate)}
                </span>
                {status === purchasesStatus.PENDING && (
                  <>
                    <button
                      onClick={() => handleCancelOrder(purchase.orderId)}
                      type="button"
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold rounded-lg border border-transparent text-yellow-500 hover:bg-yellow-100 hover:text-yellow-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-yellow-800/30 dark:hover:text-yellow-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() =>
                        handleNextStatus(purchase.orderId, "PROCESSING")
                      }
                      type="button"
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold rounded-lg border border-transparent text-red-600 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-white/10 dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      PROCESSING
                    </button>
                  </>
                )}

                {status === purchasesStatus.PROCESSING && (
                  <>
                    <button
                      onClick={() => handleCancelOrder(purchase.orderId)}
                      type="button"
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold rounded-lg border border-transparent text-yellow-500 hover:bg-yellow-100 hover:text-yellow-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-yellow-800/30 dark:hover:text-yellow-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() =>
                        handleNextStatus(purchase.orderId, "SHIPPING")
                      }
                      type="button"
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold rounded-lg border border-transparent text-red-600 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-white/10 dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      SHIPPING
                    </button>
                  </>
                )}

                {status === purchasesStatus.SHIPPING && (
                  <>
                    <button
                      onClick={() => handleCancelOrder(purchase.orderId)}
                      type="button"
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold rounded-lg border border-transparent text-yellow-500 hover:bg-yellow-100 hover:text-yellow-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-yellow-800/30 dark:hover:text-yellow-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() =>
                        handleNextStatus(purchase.orderId, "COMPLETED")
                      }
                      type="button"
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold rounded-lg border border-transparent text-red-600 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-white/10 dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      COMPLETED
                    </button>
                  </>
                )}
                {status === purchasesStatus.COMPLETED && (
                  <>
                    <span className="mr-14 text-2xl text-orange-500">
                      Hoàn thành
                    </span>
                  </>
                )}
                {status === purchasesStatus.CANCEL && (
                  <>
                    <span className="mr-14 text-2xl text-red-500">ĐÃ HỦY</span>
                  </>
                )}
                {/* <button
                  type="button"
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold rounded-lg border border-transparent text-yellow-500 hover:bg-yellow-100 hover:text-yellow-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-yellow-800/30 dark:hover:text-yellow-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold rounded-lg border border-transparent text-red-600 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-white/10 dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Trạng thái tiếp theo
                </button> */}
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
