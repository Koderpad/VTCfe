import classNames from "classnames";
import {NavLink, Link, createSearchParams} from "react-router-dom";
import useQueryParams from "../hooks/useQueryParams";
import {
    useGetOrderByStatusMuMutation,
    useCancelOrderMutation,
    useGetOrdersByStatusVer2Query,
} from "../../redux/api/orderApi";
import {
    GetOrderByStatusApiResponse,
    OrderDTO,
    OrderItemDTO,
} from "./interface/GetOrderByStatusResponses";
import {useEffect, useState} from "react";
import {format} from "date-fns";

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
    {status: purchasesStatus.ALL, name: "Tất cả"},
    {status: purchasesStatus.PENDING, name: "Đang chờ xử lý"},
    {status: purchasesStatus.PROCESSING, name: "Đang xử lý"},
    {status: purchasesStatus.SHIPPING, name: "Đang giao"},
    {status: purchasesStatus.COMPLETED, name: "Đã giao"},
    {status: purchasesStatus.CANCEL, name: "Đã hủy"},
];

export const HistoryPurchase = () => {
    const queryParams: { status?: string } = useQueryParams();
    const status: number = Number(queryParams.status) || purchasesStatus.ALL;

    const [isUpdate, setIsUpdate] = useState(false);
    const statusString = purchaseStatusString[status];
    // const [orderDTOs, setOrderDTOs] = useState<OrderDTO[]>([]);
    //   console.log("statusString", statusString);
    //   const statusString = "PENDING";
    const [getOrderByStatusMu] = useGetOrderByStatusMuMutation();

    const {
        data: otherData,
        isLoading: isLoadingOther,
        isError: isErrorOther,
        refetch: refetchOther,
    } = useGetOrdersByStatusVer2Query(statusString);

    const [cancelOrder, {isLoading, isError}] = useCancelOrderMutation();

    const refetchData = async () => {
        await refetchOther();
    };

    useEffect(() => {
        refetchData();
        // const data: GetOrderByStatusApiResponse = otherData;
        // setOrderDTOs(data.orderDTOs);
    }, [isUpdate, status]);

    if (isLoadingOther) {
        return <div>Loading...</div>;
    }

    if (isErrorOther) {
        return <div>Error loading data</div>;
    }

    const data = otherData;

    const orderDTOs: OrderDTO[] = data?.orderDTOs || [];

    const handleCancelOrder = async (orderId: number) => {
        try {
            await cancelOrder(orderId);
            alert("Hủy đơn hàng thành công");
            setIsUpdate(!isUpdate);
        } catch (error) {
            alert("Hủy đơn hàng thất bại");
        }
    };

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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

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
                                    </>
                                )}
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

                                <div className="ml-4">

                  <span> Trạng thái: {purchase?.status === "PENDING" ? "Đang chờ xử lý" : purchase?.status === "SHIPPING" ? "Đang giao hàng" : purchase?.status === "COMPLETED" ? "Đã giao hàng" : "Đã hủy"}

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
