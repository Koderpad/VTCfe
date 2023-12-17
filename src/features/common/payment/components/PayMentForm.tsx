import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer_v1 from "../../../../layouts/footers/Footer_v1";
import Header_v1 from "../../../../layouts/headers/Header_v1";
import Vouchers from "./vouchers";
import AddressForm from "../../address/components/AddressForm";
import {
  useCreateOrderMutation,
  useCreateUpdateOrderMutation,
  useSaveOrderMutation,
} from "../../redux/api/orderApi";
import { useLocation } from "react-router-dom";
import {
  useGetVoucherByShopIdQuery,
  useGetVoucherSystemQuery,
} from "../../redux/api/voucherApi";
import { VoucherDTO } from "../interfaces/voucher";
import VoucherDetails from "./VoucherDetails";
import Modal from "react-modal";
import { FaTruck } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
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
  // Define properties for VoucherOrderDTO as needed
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
  username: string;
  orderDTO: OrderDTO;
}

function PayMentForm() {
  const [orderDetails, setOrderDetails] = useState<OrderDTO | null>(null);
  const [address, setAddress] = useState<AddressDTO | null>(null);
  const [selectedVouchersOfShop, setSelectedVouchersOfShop] = useState<
    number[]
  >([]);

  const [selectedVouchersOfSystem, setSelectedVouchersOfSystem] = useState<
    number[]
  >([]);
  const [shippingMethod, setShippingMethod] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [saveOrder] = useSaveOrderMutation();
  const [createUpdateOrder] = useCreateUpdateOrderMutation();

  const navigate = useNavigate();
  const [showVoucherForm, setShowVoucherForm] = useState(false);
  const [showSystemVoucherForm, setShowSystemVoucherForm] = useState(false);
  const location = useLocation();

  // Sử dụng hook để lấy danh sách voucher của hệ thống
  const { data: systemVouchers } = useGetVoucherSystemQuery("system");

  // Sử dụng các interface để đảm bảo kiểu dữ liệu
  const systemFromVouchers: VoucherDTO[] | undefined =
    systemVouchers?.voucherDTOs;

  const res: ApiResponse = location.state.res.data;

  // Sử dụng hook để lấy danh sách voucher của cửa hàng
  // const { data: shopVouchers } = useGetVoucherByShopIdQuery(
  //   res.orderDTO.shopId ? res.orderDTO.shopId : 0
  // );
  const { data: shopVouchers } = useGetVoucherByShopIdQuery(
    res && res.orderDTO && res.orderDTO.shopId ? res.orderDTO.shopId : 0
  );
  const handleVouchersOfShop = (voucherId: number) => {
    // Kiểm tra xem voucher đã được chọn chưa
    if (selectedVouchersOfShop.includes(voucherId)) {
      // Nếu đã chọn, loại bỏ khỏi danh sách
      setSelectedVouchersOfShop(
        selectedVouchersOfShop.filter((id) => id !== voucherId)
      );
    } else {
      // Nếu chưa chọn, thêm vào danh sách
      setSelectedVouchersOfShop([...selectedVouchersOfShop, voucherId]);
    }
  };

  const handleVouchersOfSystem = (voucherId: number) => {
    // Kiểm tra xem voucher đã được chọn chưa
    if (selectedVouchersOfSystem.includes(voucherId)) {
      // Nếu đã chọn, loại bỏ khỏi danh sách
      setSelectedVouchersOfSystem(
        selectedVouchersOfSystem.filter((id) => id !== voucherId)
      );
    } else {
      // Nếu chưa chọn, thêm vào danh sách
      setSelectedVouchersOfSystem([...selectedVouchersOfSystem, voucherId]);
    }
  };

  const shopFromVoucher: VoucherDTO[] | undefined = shopVouchers?.voucherDTOs;

  console.log("systemVouchers", systemVouchers);
  console.log("shopVouchers", shopVouchers);

  console.log("shop voucher", shopFromVoucher);
  console.log("system voucher", systemFromVouchers);

  console.log("cartIDs", res);

  useEffect(() => {
    if (res) {
      // console.log("res", res.orderDTO);
      setOrderDetails(res.orderDTO);
      setAddress(res.orderDTO?.addressDTO);
    }
  }, [res]);

  const [updateOrderResponse, setUpdateOrderResponse] =
    useState<ApiResponse>(null);

  useEffect(() => {
    if (res) {
      const fetchData = async () => {
        // Your async code here...
        const cartIds =
          res.orderDTO?.orderItemDTOs.map((item) => item.cartId) || [];

        const data = {
          cartIds: cartIds,
          addressId: address?.addressId || 0,
          note: orderDetails?.note || "",
          voucherShopId: selectedVouchersOfShop[0] || null,
          voucherSystemId: selectedVouchersOfSystem[0] || null,
          paymentMethod: orderDetails?.paymentMethod || "",
          shippingMethod: orderDetails?.shippingMethod || "",
        };

        console.log("Update Order API Data: ", data);

        // Make the API call to update order information
        const response = await createUpdateOrder(data);

        if (response) {
          // Lưu giữ dữ liệu từ API response trong state
          setUpdateOrderResponse(response?.data);
        }
        // Lưu giữ dữ liệu từ API response trong state
        // setUpdateOrderResponse(response?.data);

        // Handle the response as needed
        console.log("Update Order API Response:", response?.data);
      };
      fetchData();
    }
  }, [
    address,
    selectedVouchersOfSystem,
    selectedVouchersOfShop,
    orderDetails,
    createUpdateOrder,
    res,
  ]);

  const handleToggleVoucherForm = () => {
    setShowVoucherForm(!showVoucherForm);
  };

  const handlePlaceOrder = async () => {
    const cartIds =
      orderDetails?.orderItemDTOs.map((item) => item.cartId) || [];

    const data = {
      cartIds: cartIds,
      addressId: address?.addressId || 0,
      note: orderDetails?.note || "",
      voucherShopId: selectedVouchersOfShop[0] || null,
      voucherSystemId: selectedVouchersOfSystem[0] || null,
      paymentMethod: "COD",
      shippingMethod: shippingMethod || "",
    };

    console.log("Save Order API Data: ", data);

    try {
      if (shippingMethod === "") {
        toast.error("Vui lòng chọn phương thức vận chuyển!", {
          position: "top-right",
          autoClose: 3000, // Thời gian hiển thị thông báo (ms)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
      // Thực hiện gọi API để lưu đơn hàng
      const response = await saveOrder(data);

      if (response) {
        // Xử lý response theo cần thiết
        console.log("Save Order API Response:", response.data);

        const orderId: number | undefined | null =
          response?.data?.orderDTO.orderId;

        // Hiển thị thông báo thành công
        toast.success(`Đơn hàng đã được đặt thành công! id: ${orderId}`, {
          position: "top-right",
          autoClose: 3000, // Thời gian hiển thị thông báo (ms)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Chuyển hướng sau khi đặt hàng thành công
        // navigate("/order-success"); // Thay đổi đường dẫn tùy theo cần thiết

        if (orderId) {
          // navigate(`/order-details/${orderId}`);
        }
      }
    } catch (error) {
      console.error("Save Order API Error:", error);

      // Hiển thị thông báo lỗi
      toast.error("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại sau!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
              <div className="flex items-center justify-end flex-grow ">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Thay đổi
                </button>
              </div>
            </div>
            <div className="flex flex-row mt-4 "></div>
            <div className="inline-block border-2 border-red-300 rounded p-1 max-w-max">
              <span className="inline-block text-red-500">Mặc định</span>
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
                <tr key={item.cartId}>
                  <td className="flex px-4 py-2">
                    <strong>â</strong>
                    <img
                      className="
                    w-20 h-20 object-cover object-center
                    "
                      src={item.productVariantDTO.image}
                      alt=""
                    />
                  </td>
                  <td className="px-4 py-2">
                    {/* Hiển thị thông tin phân loại */}
                    {item.productVariantDTO.attributeDTOs.map((attribute) => (
                      <div key={attribute.attributeId}>
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
            <button
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => {
                handleToggleVoucherForm();
              }}
            >
              Chọn voucher
            </button>
          </div>
          {showVoucherForm && (
            <Vouchers
              key={1}
              vouchers={shopFromVoucher}
              onClose={() => {
                setShowVoucherForm(false);
              }}
              onVoucherSelect={handleVouchersOfShop} // Pass the handler for shop vouchers
              selectedVouchers={selectedVouchersOfShop} // Pass selected shop vouchers
            />
          )}
          {/* Display voucher details when a voucher is selected */}
          {selectedVouchersOfShop.length > 0 && (
            <VoucherDetails
              voucher={shopFromVoucher.find(
                (v) => v.voucherId === selectedVouchersOfShop[0]
              )}
            />
          )}
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
            <button
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => {
                setShowSystemVoucherForm(true);
              }}
            >
              Chọn voucher
            </button>
          </div>
          {showSystemVoucherForm && (
            <Vouchers
              key={2}
              vouchers={systemFromVouchers}
              onClose={() => {
                setShowSystemVoucherForm(false);
              }}
              onVoucherSelect={handleVouchersOfSystem} // Pass the handler for shop vouchers
              selectedVouchers={selectedVouchersOfSystem} // Pass selected shop vouchers
            />
          )}
          {/* Display voucher details when a voucher is selected */}
          {selectedVouchersOfSystem.length > 0 && (
            <VoucherDetails
              voucher={systemFromVouchers.find(
                (v) => v.voucherId === selectedVouchersOfSystem[0]
              )}
            />
          )}
        </div>

        <div className="w-4/5 mx-auto mt-4 bg-white flex flex-col">
          <div className="bg-white flex flex-col shadow-md rounded px-8 py-6 mb-4">
            <div className="bg-white flex justify-between mb-4">
              <span className="text-gray-700 text-2xl font-medium">
                Phương thức vận chuyển
              </span>
              <span className="text-gray-700 text-2xl font-medium ml-auto flex items-center">
                <button onClick={openModal} className="mr-2">
                  <FaTruck size={20} />
                </button>
                {shippingMethod || "Chưa chọn"}
              </span>
            </div>
            <Modal
              className={
                "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6"
              }
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Chọn phương thức vận chuyển"
            >
              <div className="flex flex-col bg-white p-4 rounded-md border border-gray-300">
                <h2 className="text-2xl font-semibold mb-4">
                  Chọn phương thức vận chuyển
                </h2>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setShippingMethod("GHN")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Giao hàng nhanh
                  </button>
                  <button
                    onClick={() => setShippingMethod("GHTK")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Giao hàng tiết kiệm
                  </button>
                  <button
                    onClick={() => setShippingMethod("EXPRESS")}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Giao hàng siêu tốc độ
                  </button>
                </div>
              </div>

              <button onClick={closeModal}>Đóng</button>
            </Modal>
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
                  {updateOrderResponse &&
                    updateOrderResponse.orderDTO.totalPrice}{" "}
                  VNĐ
                </span>
              </div>
              {/* Tiền vận chuyển Section */}
              <div className="bg-white flex justify-between mb-4">
                <span className="text-gray-700 text-2xl font-medium">
                  Tiền giảm voucher
                </span>
                <span className="text-gray-700 text-2xl font-medium">
                  {updateOrderResponse && updateOrderResponse.orderDTO.discount}{" "}
                  VNĐ
                </span>
              </div>
              {/* <div className="border-t my-4 border-black-200"></div> */}
              {/* Tiền vận chuyển Section */}
              <div className="bg-white flex justify-between mb-4">
                <span className="text-gray-700 text-2xl font-medium">
                  Phí vận chuyển
                </span>
                <span className="text-gray-700 text-2xl font-medium">
                  {updateOrderResponse &&
                    updateOrderResponse.orderDTO.shippingFee}{" "}
                  VNĐ
                </span>
              </div>
              <div className="border-t my-4 border-black-200"></div>
              {/* Tổng tiền Section */}
              <div className="bg-white flex justify-between mb-4">
                <span className="text-gray-700 text-2xl font-medium">
                  Tổng tiền
                </span>
                <span className="text-gray-700 text-2xl font-medium">
                  {updateOrderResponse &&
                    updateOrderResponse.orderDTO.paymentTotal}{" "}
                  VNĐ
                </span>
              </div>
            </div>
            <div className="border-t my-4 border-black-200"></div>
            <div className="w-4/5 mx-auto mb-8 flex justify-end">
              <button
                onClick={handlePlaceOrder}
                className="bg-blue-500 hover:bg-blue-800 focus:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Đặt hàng
              </button>
            </div>
            <ToastContainer />
          </div>
        </div>
        <Footer_v1 />
      </div>
    </>
  );
}

export default PayMentForm;
