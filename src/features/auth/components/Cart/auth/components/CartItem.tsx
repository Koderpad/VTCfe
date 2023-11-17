import React, { useState } from 'react';
import VoucherForm from './VoucherForm';
import products from './ProductData';

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }
  
  const CartItem: React.FC = () => {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [isShopCheckboxChecked, setShopCheckboxChecked] = useState<boolean>(false);
  
    const [productQuantities, setProductQuantities] = useState<{ [productId: number]: number }>(
      products.reduce((acc, product) => {
        acc[product.id] = product.quantity;
        return acc;
      }, {} as { [productId: number]: number })
    );
  
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
    <div className="tw-md:w-3/4">
      <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 tw-mb-4">
        <div>
          <input
            id="shop-checkbox"
            type="checkbox"
            checked={isShopCheckboxChecked}
            onChange={toggleShopCheckbox}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 tw-px-2"
          />
          <label
            htmlFor="shop-checkbox"
            className="ms-2 tw-mx-2 text-sm tw-font-semibold text-gray-900 dark:text-gray-300"
          >
            Shop Name
          </label>
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
            {products.map((product) => (
              <tr key={product.id}>
                <td className="tw-py-4">
                  <div className="tw-flex tw-items-center">
                    <input
                      id={`product-checkbox-${product.id}`}
                      type="checkbox"
                      checked={isProductSelected(product.id) || isShopCheckboxChecked}
                      onChange={() => toggleProductCheckbox(product.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 tw-px-2"
                    />
                    <img
                      className="tw-h-16 tw-w-16 tw-mr-4 tw-mx-2"
                      src={product.imageUrl}
                      alt={`Product image for ${product.name}`}
                    />
                    <span className="tw-font-semibold">{product.name}</span>
                  </div>
                </td>
                <td className="tw-py-4">${product.price.toFixed(2)}</td>
                <td className="tw-py-4">
                <div className="tw-flex tw-items-center">
                    <button
                      onClick={() => handleQuantityChange(product.id, -1)}
                      className="tw-border tw-rounded-md tw-py-2 tw-px-4 tw-mr-2"
                    >
                      -
                    </button>
                    <span className="tw-text-center tw-w-8">{productQuantities[product.id]}</span>
                    <button
                      onClick={() => handleQuantityChange(product.id, 1)}
                      className="tw-border tw-rounded-md tw-py-2 tw-px-4 tw-ml-2"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="tw-py-4">${(product.price * productQuantities[product.id]).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <VoucherForm />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
