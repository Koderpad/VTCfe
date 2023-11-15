import TextIcon from "../../../../components/ui/TextIcon";
import { useState } from "react";
import VoucherForm from "./VoucherForm";

function CartForm() {
  
  return (
    <>
    <div className="tw-flex tw-bg-gray-100 tw-h-screen tw-w-full tw-py-8 ">
    <div className="tw-container tw-mx-full tw-px-16">
        <h1 className="tw-ext-2xl tw-font-semibold tw-mb-4">Shopping Cart</h1>
        <div className="tw-flex tw-flex-col tw-md:flex-row tw-gap-4">
            <div className="tw-md:w-3/4">
                <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 tw-mb-4">
                        <div>
 
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 tw-px-2"/>
                            <label  className="ms-2 tw-mx-2 text-sm tw-font-semibold text-gray-900 dark:text-gray-300">Shop Name</label>
                        </div>
                    <table className="tw-w-full">
                        <thead>
                                <tr>
                                    <th className="tw-text-left tw-font-semibold">Product</th>
                                    <th className="tw-text-left tw-font-semibold">Price</th>
                                    <th className="tw-text-left tw-font-semibold">Quantity</th>
                                    <th className="tw-text-left tw-font-semibold">Total</th>
                                </tr>

                        </thead>
                        <tbody className="tw-flex-col tw-md:flex-row tw-gap-4">
                            <tr>
                                <td className="tw-py-4">
                                    <div className="tw-flex tw-items-center">
                                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 tw-px-2"/>
                                        <img className="tw-h-16 tw-w-16 tw-mr-4 tw-mx-2" src="https://via.placeholder.com/150" alt="Product image"/>
                                        <span className="tw-font-semibold">Product name</span>
                                    </div>
                                </td>
                                <td className="tw-py-4">$19.99</td>
                                <td className="tw-py-4">
                                    <div className="tw-flex tw-items-center">
                                        <button className="tw-border tw-rounded-md tw-py-2 tw-px-4 tw-mr-2">-</button>
                                        <span className="tw-text-center tw-w-8">1</span>
                                        <button className="tw-border tw-rounded-md tw-py-2 tw-px-4 tw-ml-2">+</button>
                                    </div>
                                </td>
                                <td className="tw-py-4">$19.99</td>
                            </tr>
                            <tr>
                                <td className="tw-py-4">
                                    <div className="tw-flex tw-items-center">
                                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 tw-px-2"/>
                                        <img className="tw-h-16 tw-w-16 tw-mr-4 tw-mx-2" src="https://via.placeholder.com/150" alt="Product image"/>
                                        <span className="tw-font-semibold">Product name</span>
                                    </div>
                                </td>
                                <td className="tw-py-4">$19.99</td>
                                <td className="tw-py-4">
                                    <div className="tw-flex tw-items-center">
                                        <button className="tw-border tw-rounded-md tw-py-2 tw-px-4 tw-mr-2">-</button>
                                        <span className="tw-text-center tw-w-8">1</span>
                                        <button className="tw-border tw-rounded-md tw-py-2 tw-px-4 tw-ml-2">+</button>
                                    </div>
                                </td>
                                <td className="tw-py-4">$19.99</td>
                            </tr>
                            <tr>
                                <td className="tw-py-4">
                                    <div className="tw-flex tw-items-center">
                                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 tw-px-2"/>
                                        <img className="tw-h-16 tw-w-16 tw-mr-4 tw-mx-2" src="https://via.placeholder.com/150" alt="Product image"/>
                                        <span className="tw-font-semibold">Product name</span>
                                    </div>
                                </td>
                                <td className="tw-py-4">$19.99</td>
                                <td className="tw-py-4">
                                    <div className="tw-flex tw-items-center">
                                        <button className="tw-border tw-rounded-md tw-py-2 tw-px-4 tw-mr-2">-</button>
                                        <span className="tw-text-center tw-w-8">1</span>
                                        <button className="tw-border tw-rounded-md tw-py-2 tw-px-4 tw-ml-2">+</button>
                                    </div>
                                </td>
                                <td className="tw-py-4">$19.99</td>
                            </tr>
                            {/* <!-- More product rows --> */}

                        </tbody>
                        <div>
                            <VoucherForm/>
                        </div>
                    </table>
                </div>
            </div>
            <div className="tw-md:w-1/4">
                <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6">
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
                    <div>
                        <VoucherForm/>
                    </div>
                        <hr className="tw-my-2"/>
                    <div className="tw-flex tw-justify-between tw-mb-2">
                        <span className="tw-font-semibold">Total</span>
                        <span className="tw-font-semibold">$21.98</span>
                    </div>
                    <button className="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded-lg tw-mt-4 ">Checkout</button>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  );
}

export default CartForm;
