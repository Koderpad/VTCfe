// import TextIcon from "../../../../components/ui/TextIcon";
import VoucherForm from "./VoucherForm";
import CartItem from "./CartItem";
// import CartSummary from "./CartSummary";
import Header_v1 from "../../../../layouts/headers/Header_v1";
import Footer_v1 from "../../../../layouts/footers/Footer_v1";

function CartForm() {
  return (
    <>
      <div>
        <Header_v1 />
      </div>
      <div className="flex bg-gray-100 h-full w-full py-8 mt-44">
        <div className="container mx-full px-16">
          <h1 className="ext-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col gap-4">
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div
            id="footer-cart"
            className="sticky bottom-0 left-0 w-full bg-white rounded-lg shadow-md p-6 border-2 border-blue-500"
          >
            <div className="flex justify-between mb-2">
              <VoucherForm />
            </div>
            <div className="flex gap-4 w-full justify-start">
              <div className="flex flex-col justify-start w-full">
                <div className="flex justify-between mb-2">
                  <span>Tổng tiền hàng</span>
                  <span>$19.99</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tiết kiệm</span>
                  <span>$19.99</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span>Tổng thanh toán (... sản phẩm):</span>
                  <span className="font-semibold">$0</span>
                </div>
              </div>
              <div className="flex w-full justify-end pt-14">
                <button className="w-[200px] h-[50px] bg-blue-500 text-white py-2 px-4 rounded-lg mt-4">
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer_v1 />
      </div>
    </>
  );
}

export default CartForm;
