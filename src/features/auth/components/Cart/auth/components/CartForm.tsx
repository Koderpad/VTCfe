// import TextIcon from "../../../../components/ui/TextIcon";
import { useState } from "react";
import VoucherForm from "./VoucherForm";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

function CartForm() {
  
  return (
    <>
    <div className="tw-flex tw-bg-gray-100 tw-h-screen tw-w-full tw-py-8 ">
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

    </>
  );
}

export default CartForm;