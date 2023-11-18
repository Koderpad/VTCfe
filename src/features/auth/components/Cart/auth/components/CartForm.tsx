// import TextIcon from "../../../../components/ui/TextIcon";
import { useState } from "react";
import VoucherForm from "./VoucherForm";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
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
            <CartSummary/>
        </div>
    </div>
    <div>
        <Footer_v1/>
    </div>

    </>
  );
}

export default CartForm;