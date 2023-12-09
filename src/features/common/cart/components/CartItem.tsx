import React, { useState } from "react";
// import VoucherForm from './VoucherForm';
import products from "./ProductData";
import VoucherForm from "./VoucherForm";
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const CartItem: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isShopCheckboxChecked, setShopCheckboxChecked] =
    useState<boolean>(false);

  const [productQuantities, setProductQuantities] = useState<{
    [productId: number]: number;
  }>(
    products.reduce((acc, product) => {
      acc[product.id] = product.quantity;
      return acc;
    }, {} as { [productId: number]: number })
  );
  const [isHoveringVoucher, setIsHoveringVoucher] = useState(false);

  const handleToggleVoucherForm = () => {
    setShowVoucherForm(!setShowVoucherForm);
  };
  const toggleShopCheckbox = () => {
    setShopCheckboxChecked(!isShopCheckboxChecked);
    if (!isShopCheckboxChecked) {
      // Select all products
      setSelectedProducts(products.map((product) => product.id));
    } else {
      // Deselect all products
      setSelectedProducts([]);
    }
  };

  const toggleProductCheckbox = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const isProductSelected = (productId: number) => {
    return selectedProducts.includes(productId);
  };
  const handleQuantityChange = (productId: number, change: number) => {
    setProductQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      newQuantities[productId] = Math.max(0, newQuantities[productId] + change); // Ensure quantity doesn't go below 0
      return newQuantities;
    });
  };
  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div>
          <input
            id="shop-checkbox"
            type="checkbox"
            checked={isShopCheckboxChecked}
            onChange={toggleShopCheckbox}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 px-2"
          />
          <label
            htmlFor="shop-checkbox"
            className="ms-2 mx-2 text-xl font-semibold text-gray-900 dark:text-gray-300"
          >
            Shop Name
          </label>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left font-semibold">Product</th>
              <th className="text-left font-semibold">Price</th>
              <th className="text-left font-semibold">Quantity</th>
              <th className="text-left font-semibold">Total</th>
              <th className="text-left font-semibold">Thao tác</th>
            </tr>
          </thead>
          <tbody className="flex-col md:flex-row gap-4">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-4">
                  <div className="flex items-center">
                    <input
                      id={`product-checkbox-${product.id}`}
                      type="checkbox"
                      checked={
                        isProductSelected(product.id) || isShopCheckboxChecked
                      }
                      onChange={() => toggleProductCheckbox(product.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 px-2"
                    />
                    <img
                      className="h-28 w-28 mr-4 mx-2"
                      src={product.imageUrl}
                      alt={`Product image for ${product.name}`}
                    />
                    <span className="font-semibold">{product.name}</span>
                  </div>
                </td>
                <td className="py-4">${product.price.toFixed(2)}</td>
                <td className="py-4">
                  <div className="flex items-center w-1/3 rounded-full border border-gray-200 bg-white">
                    <button
                      onClick={() => handleQuantityChange(product.id, -1)}
                      className="border rounded-md py-2 px-4 mr-2"
                    >
                      -
                    </button>
                    <span className="text-center w-8">
                      {productQuantities[product.id]}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(product.id, 1)}
                      className="border rounded-md py-2 px-4 ml-2"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-4">
                  ${(product.price * productQuantities[product.id]).toFixed(2)}
                </td>
                <td className="py-4">
                  <div className="w-full">
                    {/* <button className="pl-5">xÓA</button> */}
                    <button
                      type="button"
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 "
                    >
                      XÓA
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-40">
          <VoucherForm />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
function setShowVoucherForm(arg0: boolean) {
  throw new Error("Function not implemented.");
}
