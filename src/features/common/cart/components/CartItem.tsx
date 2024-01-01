import React, { useState } from "react";
import VoucherForm from "./VoucherForm";
import { useDeleteCartMutation } from "../../redux/api/cartApi";
import { useUpdateCartMutation } from "../../redux/api/cartApi";
import { useNavigate } from "react-router-dom";

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

interface CartItemDTO {
  cartId: number;
  quantity: number;
  productId: number;
  productName: string;
  productImage: string;
  updateAt: string;
  productVariantDTO: ProductVariantDTO;
}

interface ShopDTO {
  shopId: number;
  shopName: string;
  avatar: string;
  carts: CartItemDTO[];
}

interface VoucherComponentProps {
  data: ShopDTO;
  onSelectedProductsChange: (
    shopId: number,
    cartIds: number[],
    totalPrice: number
  ) => void;
}

interface CartRequest {
  username: string;
  productVariantId: number;
  quantity: number;
}

const CartItem: React.FC<VoucherComponentProps> = ({
  data,
  onSelectedProductsChange,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isShopCheckboxChecked, setShopCheckboxChecked] =
    useState<boolean>(false);

  const [deleteCart] = useDeleteCartMutation();
  const [updateCartApi] = useUpdateCartMutation();
  const [cartRequest, setCartRequest] = useState<CartRequest>({
    username: "",
    productVariantId: 0,
    quantity: 0,
  });

  const [reload, setReload] = useState(false);

  // Call the parent component's callback when selected products change
  //   React.useEffect(() => {
  //     console.log("selectedProducts: ", selectedProducts);
  //     // const productIDs = selectedProducts.map((item) => item.valueOf());
  //     // console.log("productIDs: ", productIDs);
  //     onSelectedProductsChange(data.shopId, selectedProducts, totalPrice);
  //   }, [selectedProducts]);

  // React.useEffect(() => {
  //
  // }

  // Call the parent component's callback when selected products change
  React.useEffect(() => {
    const totalPrice = calculateTotalPrice(selectedProducts);
    setTotalPrice(totalPrice);
    onSelectedProductsChange(data.shopId, selectedProducts, totalPrice);
  }, [selectedProducts]);

  const toggleShopCheckbox = () => {
    setShopCheckboxChecked(!isShopCheckboxChecked);
    if (!isShopCheckboxChecked) {
      // Select all products for the current shop
      setSelectedProducts(data.carts.map((cart) => cart.cartId));
    } else {
      // Deselect all products
      setSelectedProducts([]);
    }
  };

  const handleQuantityChange = async (
    productVariantId: number,
    quantity: number,
    historyQuantity: number
  ) => {
    const updateQuantity = historyQuantity + quantity;
    try {
      const rte = await updateCartApi({
        username: "",
        productVariantId: productVariantId,
        quantity: updateQuantity,
      });

      console.log("rte", rte);

      window.location.reload();

      //navigate("/cart");
    } catch (e) {
      console.log("error", e);
    }
  };

  const toggleProductCheckbox = (cartId: number) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(cartId)) {
        // Deselect the product
        const newSelectedProducts = prevSelectedProducts.filter(
          (id) => id !== cartId
        );

        // Kiểm tra nếu đã bỏ chọn tất cả các sản phẩm, thì đặt isShopCheckboxChecked về false
        if (newSelectedProducts.length === 0) {
          setShopCheckboxChecked(false);
        }

        return newSelectedProducts;
      } else {
        // Select the product
        // Nếu đang ở chế độ isShopCheckboxChecked true, thì đặt về false
        if (isShopCheckboxChecked) {
          setShopCheckboxChecked(false);
        }

        return [...prevSelectedProducts, cartId];
      }
    });
  };

  const isProductSelected = (cartId: number) => {
    return selectedProducts.includes(cartId);
  };

  const handleDeleteCartItem = async (cartId: number) => {
    try {
      // Call the mutate function with the cartId to delete
      await deleteCart(cartId);

      window.location.reload();

      // Update the component state after successful deletio

      // Optionally, you may want to trigger a refetch of your cart data here
      // to ensure your component reflects the latest state from the server.
      // Refetching logic depends on how you fetch cart data in your app.
    } catch (error) {
      // Handle error if the deletion fails
      console.error("Error deleting cart item:", error);
    }
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const calculateTotalPrice = (cartIds: number[]) => {
    let total = 0;
    cartIds.forEach((id) => {
      const cartItem = data.carts.find((cart) => cart.cartId === id);
      if (cartItem) {
        total += cartItem.productVariantDTO.price * cartItem.quantity;
      }
    });
    return total;
  };

  //   const handleSelectedProductsChange = (shopId: number, cartIds: number[]) => {
  //     const totalPrice = calculateTotalPrice(cartIds);
  //     onSelectedProductsChange(shopId, cartIds, totalPrice);
  //   };

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
            {data.shopName}
          </label>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left font-semibold">Product</th>
              <th className="text-left font-semibold">Phân loại</th>
              <th className="text-left font-semibold">Giá</th>
              <th className="text-left font-semibold">Số lượng</th>
              <th className="text-left font-semibold">Tổng giá</th>
              <th className="text-left font-semibold">Thao tác</th>
            </tr>
          </thead>
          <tbody className="flex-col md:flex-row gap-4">
            {data &&
              data.carts.map((cart) => (
                <tr key={cart.cartId}>
                  <td className="py-4">
                    <div className="flex items-center">
                      <input
                        id={`product-checkbox-${cart.cartId}`}
                        type="checkbox"
                        checked={
                          isProductSelected(cart.cartId) ||
                          isShopCheckboxChecked
                        }
                        onChange={() => toggleProductCheckbox(cart.cartId)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 px-2"
                      />
                      <img
                        className="h-28 w-28 mr-4 mx-2"
                        src={cart.productImage}
                        alt={`Product image for ${cart.productName}`}
                      />
                      {/* defind style line-clamp-2 */}
                      <span className="w-72 flex font-semibold overflow-hidden line-clamp-2">
                        {cart.productName}
                      </span>
                    </div>
                  </td>
                  {/* variant of pro */}
                  <td className="py-4">
                    <div className="flex flex-col">
                      {cart.productVariantDTO.attributeDTOs.map((attr) => (
                        <span key={attr.attributeId} className="flex">
                          <span className="font-semibold mr-2">
                            {attr.name}:
                          </span>
                          <span>{attr.value}</span>
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4">
                    {formatPrice(cart.productVariantDTO.price)} VNĐ
                  </td>
                  <td className="py-4">
                    <div className="flex items-center w-1/2 rounded-full  border-gray-200 bg-white">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            cart.productVariantDTO.productVariantId,
                            -1,
                            cart.quantity
                          )
                        }
                        className="border rounded-md py-2 px-4 mr-2"
                      >
                        -
                      </button>
                      <span className="text-center w-8">{cart.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            cart.productVariantDTO.productVariantId,
                            1,
                            cart.quantity
                          )
                        }
                        className="border rounded-md py-2 px-4 ml-2"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4">
                    {formatPrice(cart.productVariantDTO.price * cart.quantity)}{" "}
                    VNĐ
                  </td>
                  <td className="py-4">
                    <div className="w-full">
                      <button
                        type="button"
                        onClick={() => handleDeleteCartItem(cart.cartId)}
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
