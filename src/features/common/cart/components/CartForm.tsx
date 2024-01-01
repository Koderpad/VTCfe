import VoucherForm from "./VoucherForm";
import CartItem from "./CartItem";
import Header_v1 from "../../../../layouts/headers/Header_v1";
import Footer_v1 from "../../../../layouts/footers/Footer_v1";
import { useGetListCartByUsernameQuery } from "../../redux/api/cartApi";
import { useCreateOrderMutation } from "../../redux/api/orderApi";
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export const CartForm = () => {
  const { data, error, isLoading, refetch } =
    useGetListCartByUsernameQuery("cus");

  const [createOrder] = useCreateOrderMutation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<{
    [shopId: number]: number[];
  }>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSelectedProductsChange = async (
    shopId: number,
    cartIds: number[],
    totalPrice: number
  ) => {
    await setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [shopId]: cartIds,
    }));
    // await setTotalPrice((prevTotalPrice) => prevTotalPrice + totalPrice);
    console.log("totalPrice: ", totalPrice);
    await setTotalPrice(totalPrice);
  };

  const handleCreateOrder = async () => {
    try {
      setLoading(true); // Hiển thị modal loading

      // Simulate a delay for 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const orderDetails = Object.values(selectedProducts).flat();
      const res = await createOrder(orderDetails);
      if (res.error) {
        if (
          res.error.data.message ===
            "Thông báo: Khách hàng chưa có địa chỉ nào." &&
          res.error.status === 404
        ) {
          alert("Địa chỉ của bạn chưa có, vui lòng thêm địa chỉ!");
          navigate("/user/account/address");
          return;
        }
      }
      console.log("res", res);
      setSuccess(true); // Hiển thị thành công
      await new Promise((resolve) => setTimeout(resolve, 500));

      navigate("/checkout", { state: { res: res } });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Ẩn modal loading
    }
  };

  const totalSelectedProducts = Object.values(selectedProducts).reduce(
    (total, current) => total + current.length,
    0
  );

  //!BEGIN RENDER------------------------------------------
  return (
    <>
      <div>
        <Header_v1 />
      </div>
      <div className="flex bg-gray-100 h-full w-full py-8 mt-44">
        <div className="container mx-full px-16">
          <h1 className="ext-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col gap-4">
            {data
              ? data.listCartByShopDTOs.map((item) => (
                  <CartItem
                    key={item.shopId}
                    data={item}
                    onSelectedProductsChange={(
                      shopId: number,
                      cartIds: number[],
                      totalPrice: number
                    ) =>
                      handleSelectedProductsChange(shopId, cartIds, totalPrice)
                    }
                  />
                ))
              : null}
          </div>
          <div
            id="footer-cart"
            className="sticky bottom-0 left-0 w-full bg-white rounded-lg shadow-md p-6 border-2 border-blue-500"
          >
            <div className="flex gap-4 w-full justify-start">
              <div className="flex flex-col justify-start w-full">
                <div className="flex justify-between mb-2">
                  <span>Tổng tiền hàng</span>
                  <span>{totalPrice} VNĐ</span>
                </div>

                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  {/* <span>Tổng thanh toán (... sản phẩm):</span> */}
                  <span>
                    Tổng thanh toán ({totalSelectedProducts} sản phẩm):
                  </span>
                  <span className="font-semibold">
                    {totalPrice.toFixed(2)} VNĐ
                  </span>
                </div>
              </div>
              <div className="flex w-full justify-end pt-14">
                <button
                  className="w-[200px] h-[50px] bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
                  onClick={handleCreateOrder}
                  disabled={isLoading} // Disable button khi đang loading
                >
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Loading */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <ClipLoader
            color={"#ffffff"}
            css={override}
            size={150}
            loading={loading}
          />
        </div>
      )}
      {/* Modal Thành công */}
      {success && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-green-500 bg-opacity-50">
          <div className="text-white text-4xl">✔️</div>
        </div>
      )}
      <div>
        <Footer_v1 />
      </div>
    </>
  );
};
