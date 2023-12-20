import { useParams } from "react-router-dom";
import Footer_v1 from "../../../../layouts/footers/Footer_v1";
import Header_v1 from "../../../../layouts/headers/Header_v1";

import { FaTruck } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetOrderByOrderIdQuery,
  useLazyGetOrderByOrderIdQuery,
  useGetOrderByOrderIdMuMutation,
} from "../../redux/api/orderApi";
import { useEffect, useState } from "react";
import { set } from "date-fns";
import axios from "axios";
interface AttributeDTO {
  attributeId: number;
  name: string;
  value: string;
  active: boolean;
  shopId: number;
}

interface ProductVariantDTO {
  productVariantId: number;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  status: string;
  productId: number;
  productName: string;
  productImage: string;
  attributeDTOs: AttributeDTO[];
}

interface AddressDTO {
  addressId: number;
  province: string;
  district: string;
  ward: string;
  fullAddress: string;
  fullName: string;
  phone: string;
  status: string;
}

interface OrderItemDTO {
  orderItemId: number;
  orderId: number;
  cartId: number;
  productVariantDTO: ProductVariantDTO;
  quantity: number;
  price: number;
}

interface VoucherOrderDTO {
  voucherOrderId: number;
  voucherId: number;
  voucherName: string;
  type: boolean;
  orderId: number;
}

interface OrderDTO {
  orderId: number | null;
  note: string | null;
  paymentMethod: string;
  shippingMethod: string;
  count: number;
  shopId: number;
  shopName: string;
  totalPrice: number;
  discount: number;
  shippingFee: number;
  paymentTotal: number;
  status: string;
  addressDTO: AddressDTO;
  voucherOrderDTOs: VoucherOrderDTO[] | null;
  orderItemDTOs: OrderItemDTO[];
  orderDate: string;
}

interface ApiResponse {
  status: string;
  message: string;
  code: number;
  username?: string;
  orderDTO?: OrderDTO;
}

export const OrderDetailsForm = () => {
  const { id } = useParams();

  console.log("id", id);

  const {
    data: getOrderByOrderId,
    isFetching,
    isLoading,
    refetch,
  } = useGetOrderByOrderIdQuery(parseInt(id!));

  console.log("getOrderByOrderId", getOrderByOrderId);

  // setData(getOrderByOrderId.data);
  // console.log("data", data);
  // useEffect(() => {
  //   refetch();
  // }, []);

  // const response: ApiResponse = getOrderByOrderId.data;

  // setData(response);

  // if (getOrderByOrderId.isFetching) {
  //   return <div>Loading...</div>;
  // }

  // const [getOrderByOrderIdMu] = useGetOrderByOrderIdMuMutation();
  // const response = getOrderByOrderIdMu(parseInt(id!)).unwrap();

  // setData(response);

  // console.log("response", response);
  // Get the trigger
  // const [getOrderByOrderId] = useGetOrderByOrderIdMuMutation();
  // useEffect(() => {
  //   fetchDta();
  // }, []);

  // const fetchDta = async () => {
  //   console.log("id", id);

  //   const response: ApiResponse = await getOrderByOrderIdMu(
  //     parseInt(id!)
  //   ).unwrap();

  //   await setData(response);

  //   console.log("response", response);
  // };
  // fetchDta();

  const order: ApiResponse | undefined = getOrderByOrderId;
  console.log("order:  ", order?.orderDTO);

  if (order?.code !== 200) {
    console.log("error", order?.message);
    // alert("Order not found");
  }

  const orderDetails: OrderDTO | undefined = order?.orderDTO;

  if (!orderDetails) {
    console.log("error", order?.message);
    // alert("Order not found");
  }

  console.log("order:  ", orderDetails);

  const address: AddressDTO | undefined = orderDetails?.addressDTO;

  const orderItems: OrderItemDTO[] = orderDetails?.orderItemDTOs;

  const products: ProductVariantDTO[] = orderItems.map(
    (item) => item.productVariantDTO
  );

  console.log("orderDetails", products);

  const voucher: VoucherOrderDTO[] | null | undefined =
    orderDetails?.voucherOrderDTOs;

  const voucherOfShop: VoucherOrderDTO[] | undefined = voucher?.filter(
    (e) => e.type === false
  );

  const voucherOfSys: VoucherOrderDTO[] | undefined = voucher?.filter(
    (e) => e.type !== false
  );

  console.log("voucher", voucherOfSys);

  return (
    <div className="bg-gray">
      <Header_v1 />
      <div className="flex bg-white h-full w-full py-8 mt-44 items-center">
        {/* Image */}
        <img
          src="/logo_border.png"
          alt="Description of the image"
          className="mr-8 ml-4"
          style={{ width: "50px", height: "50px" }}
        />

        <div className="flex items-center">
          <span className="whitespace-nowrap">VTC</span>

          <div className="h-10 w-1 bg-black ml-4"></div>
          <span className="whitespace-nowrap ml-4">Thanh Toán</span>
        </div>
      </div>

      {/* Additional Information Section */}
      <div
        className="w-4/5 mx-auto mt-4 bg-white flex flex-col h-36"
        style={{ borderTop: "4px solid red" }}
      >
        <div className="bg-white flex flex-col shadow-md rounded px-8 py-6 mb-4">
          <div className="bg-white flex flex-row ">
            <div className="mb-4 flex items-center">
              <span className="text-gray-700 text-2xl font-medium mr-2">
                {address?.fullName}
              </span>
              <span className="text-gray-700 text-2xl font-medium "> | </span>
              <span className="text-gray-700 text-2xl font-medium ml-2">
                {address?.phone}
              </span>
              <span className="text-gray-700 text-2xl font-medium ml-16">
                {address
                  ? `${address.province} | ${address.district} | ${address.ward}`
                  : "N/A"}
              </span>
            </div>
          </div>
          <span className="">Địa chỉ: {address?.fullAddress}</span>
          <div className="flex flex-row mt-4 "></div>
          <div className="inline-block border-2 border-red-300 rounded p-1 max-w-max">
            <span className="inline-block text-red-500">Địa chỉ</span>
          </div>
        </div>
      </div>

      <div
        className="w-4/5 mx-auto mt-12 bg-white flex flex-col h-auto rounded-md"
        style={{
          borderTop: "4px solid red",
          border: "none",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="px-4">Sản phẩm</th>
              <th className="px-4">Phân loại</th>
              <th className="px-4">Gía</th>
              <th className="px-4">Số lượng</th>
              <th className="px-4">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails?.orderItemDTOs.map((item) => (
              <tr key={Math.random()}>
                <td className="flex px-4 py-2 ml-[30px]">
                  <h1>{item.productVariantDTO.productName}</h1>

                  <img
                    className="w-20 h-20 object-cover object-center"
                    src={item.productVariantDTO.productImage}
                    alt=""
                  />
                </td>
                <td className="px-4 py-2">
                  {/* Hiển thị thông tin phân loại */}
                  {item.productVariantDTO.attributeDTOs.map((attribute) => (
                    <div key={Math.random()}>
                      <strong>{attribute.name}:</strong> {attribute.value}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t my-4 border-black-200"></div>
        {/* Voucher Section */}
        <div className="flex justify-between px-4 items-center mb-4">
          <div className="flex items-center">
            <img
              src="/public/voucher.png"
              alt="Voucher Icon"
              className="mr-2"
              style={{ width: "30px", height: "28px" }}
            />
            <span className="text-red-500">Voucher của shop</span>
          </div>
          <span>{voucherOfShop ? voucherOfShop[0].voucherName : ""}</span>
        </div>

        <div className="flex justify-between px-4 items-center mb-4">
          <div className="flex items-center">
            <img
              src="/public/voucher.png"
              // src="public\discount-voucher-outline-icon-thin-line-black-discount-voucher-icon-vector.jpg"
              alt="Voucher Icon"
              className="mr-2"
              style={{ width: "30px", height: "28px" }}
            />
            <span className="text-red-500">Voucher VTC</span>
          </div>
          <span>
            {voucherOfSys
              ? voucherOfSys[0]
                ? voucherOfSys[0].voucherName
                : "Không có"
              : "Không có voucher"}
          </span>
        </div>
      </div>

      <div className="w-4/5 mx-auto mt-4 bg-white flex flex-col">
        <div className="bg-white flex flex-col shadow-md rounded px-8 py-6 mb-4">
          <div className="bg-white flex justify-between mb-4">
            <span className="text-gray-700 text-2xl font-medium">
              Phương thức vận chuyển
            </span>
            <span className="text-gray-700 text-2xl font-medium ml-auto flex items-center">
              <button className="mr-2">
                <FaTruck size={20} />
              </button>
              {orderDetails?.shippingMethod}
            </span>
          </div>
          <div className="bg-white flex justify-between mb-4">
            <span className="text-gray-700 text-2xl font-medium">
              Phương thức thanh toán
            </span>
            <span className="text-gray-700 text-2xl font-medium ml-auto">
              Thanh Toán khi nhận hàng (COD)
            </span>
          </div>
          <div className="border-t my-4 border-black-200"></div>

          <div className="flex flex-col  rounded px-8 py-6 mb-4">
            {/* Existing content */}
            <div className="bg-white flex justify-between mb-4">
              <span className="text-gray-700 text-2xl font-medium">
                Tổng tiền hàng
              </span>
              <span className="text-gray-700 text-2xl font-medium">
                {orderDetails?.totalPrice} VNĐ
              </span>
            </div>
            {/* Tiền vận chuyển Section */}
            <div className="bg-white flex justify-between mb-4">
              <span className="text-gray-700 text-2xl font-medium">
                Tiền giảm voucher
              </span>
              <span className="text-gray-700 text-2xl font-medium">
                {orderDetails?.discount} VNĐ
              </span>
            </div>
            {/* <div className="border-t my-4 border-black-200"></div> */}
            {/* Tiền vận chuyển Section */}
            <div className="bg-white flex justify-between mb-4">
              <span className="text-gray-700 text-2xl font-medium">
                Phí vận chuyển
              </span>
              <span className="text-gray-700 text-2xl font-medium">
                {orderDetails?.shippingFee} VNĐ
              </span>
            </div>
            <div className="border-t my-4 border-black-200"></div>
            {/* Tổng tiền Section */}
            <div className="bg-white flex justify-between mb-4">
              <span className="text-gray-700 text-2xl font-medium">
                Tổng tiền
              </span>
              <span className="text-gray-700 text-2xl font-medium">
                {orderDetails?.paymentTotal} VNĐ
              </span>
            </div>
          </div>
          <div className="border-t my-4 border-black-200"></div>
          {/* <div className="w-4/5 mx-auto mb-8 flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-800 focus:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Đặt hàng
              </button>
            </div> */}
        </div>
      </div>
      <Footer_v1 />
    </div>
  );
};
