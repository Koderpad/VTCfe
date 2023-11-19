// import TextIcon from "../../../../components/ui/TextIcon";
import { useState } from "react";
import VoucherForm from "./VoucherForm";
import CartItem from "./CartItem";
// import CartSummary from "./CartSummary";
import Header_v1 from "../../../../../../layouts/headers/Header_v1";
import Footer_v1 from "../../../../../../layouts/footers/Footer_v1";

function CartForm() {
  
  return (
    <>
    <div>
        <Header_v1/>
    </div>
    <div className="tw-flex tw-bg-gray-100 tw-h-full tw-w-full tw-py-8 tw-mt-44">
    <div className="tw-container tw-mx-full tw-px-16">
        <h1 className="tw-ext-2xl tw-font-semibold tw-mb-4">Shopping Cart</h1>
        <div className="tw-flex tw-flex-col tw-md:flex-row tw-gap-4">
                <CartItem/>
                <CartItem/>
                <CartItem/>

            </div>
            <div className="tw-md:w-1/4 ">
            <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 ">
                <h2 className="tw-text-lg tw-font-semibold tw-mb-4">Summary</h2>
                <div className="tw-flex tw-justify-between tw-mb-2">
                    <span>Subtotal</span>
                    <span>$19.99</span>
                </div>
                <div className="tw-flex tw-justify-between tw-mb-2">
                    <span>Taxes</span>
                    <span>$1.99</span>
                </div>
                <div className="tw-flex tw-justify-between tw-mb-2">
                    <span>Shipping</span>
                    <span>$0.00</span>
                </div>
                <div className='tw-flex tw-justify-between tw-mb-2'>
                  <VoucherForm/>
                </div>
                <hr className="tw-my-2" />
                <div className="tw-flex tw-justify-between tw-mb-2">
                    <span className="tw-font-semibold">Total</span>
                    <span className="tw-font-semibold">$21.98</span>
                </div>
                <button className="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded-lg tw-mt-4 tw-w-full">Checkout</button>
            </div>
        </div>
        </div>
    </div>
    <div>
        <Footer_v1/>
    </div>

    </>
  );
}

export default CartForm;