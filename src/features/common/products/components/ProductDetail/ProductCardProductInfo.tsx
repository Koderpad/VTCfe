import { useState } from "react";
import { ProductCardProductInfoCore } from "./ProductCardProductInfoCore";
import { useAddNewCartMutation } from "../../../redux/api/cartApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import { useNavigate } from "react-router-dom";

// Định nghĩa kiểu dữ liệu cho đối tượng thuộc tính sản phẩm
interface AttributeDTO {
  attributeId: number;
  name: string;
  value: string;
  active: boolean;
  shopId: number;
}

// Định nghĩa kiểu dữ liệu cho đối tượng biến thể sản phẩm
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

// Định nghĩa kiểu dữ liệu cho đối tượng sản phẩm
interface ProductDTO {
  productId: number;
  name: string;
  image: string;
  description: string;
  information: string;
  sold: number;
  status: string;
  categoryId: number;
  brandId: number | null;
  productVariantDTOs: ProductVariantDTO[];
}

//!BEGIN FUNCTION-------------------------
export const ProductCardProductInfo = ({
  product,
  rating,
  sold,
}: {
  product: ProductDTO;
  rating: number;
}) => {
  //!BEGIN HANDLE-------------------------
  const [selectedVariantID_ForAddToCart, setSelectedVariantID_ForAddToCart] =
    useState(0);

  const [selectedQuantity_ForAddToCart, setSelectedQuantity_ForAddToCart] =
    useState(0);

  const [addNewCart, { data }] = useAddNewCartMutation();

  const isAuth: boolean = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const navigate = useNavigate();

  // let selectedVariantID_ForAddToCart: number = 0;

  if (!product) {
    return <div>Loading...</div>; // hoặc hiển thị thông báo khác tùy ý khi product chưa có
  }

  const renderRatingStars = (rating: number) => {
    if (rating === 0) {
      // Nếu không có đánh giá, hiển thị các ngôi sao rỗng
      // return (
      //   <svg
      //     className="flex-shrink-0 w-5 h-5 text-gray-300 dark:text-gray-600"
      //     xmlns="http://www.w3.org/2000/svg"
      //     width="16"
      //     height="16"
      //     fill="currentColor"
      //     viewBox="0 0 16 16"
      //   >
      //     <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      //   </svg>
      // );

      return (
        <div className="flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              className="flex-shrink-0 w-5 h-5 text-gray-300 dark:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          ))}
        </div>
      );
    }

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    const stars = Array(fullStars).fill(
      <svg
        className="flex-shrink-0 w-5 h-5 text-yellow-400 dark:text-yellow-600"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg>
    );

    if (hasHalfStar) {
      stars.push(
        <svg
          className="flex-shrink-0 w-5 h-5 text-yellow-400 dark:text-yellow-600"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          {/* Nếu bạn muốn hiển thị nửa sao, thêm path tương ứng ở đây */}
        </svg>
      );
    }

    return stars;
  };

  console.log("data of useAAAA", data);

  const handleAddToCart = async () => {
    // try {
    //   // Call the mutation function returned by the useAddNewCartMutation hook
    //   const response = await addNewCart({
    //     productVariantId: selectedVariantID_ForAddToCart,
    //     quantity: selectedQuantity_ForAddToCart,
    //   });

    //   // // Access the data from the response
    //   // const data = response?.data;
    //   // console.log("data of respine", data);

    //   // Kiểm tra kết quả thành công từ API
    //   if (response) {
    //     // Hiển thị thông báo thành công
    //     toast.success(response.message);
    //   } else {
    //     // Hiển thị thông báo lỗi
    //     toast.error(response.message);
    //   }
    // } catch (error) {
    //   console.error("Error adding to cart:", error);
    //   // Hiển thị thông báo lỗi
    //   toast.error("An error occurred. Please try again later.");
    // }

    if (!isAuth) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng", {
        onClose: () => navigate("/login"),
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await addNewCart({
        productVariantId: selectedVariantID_ForAddToCart,
        quantity: selectedQuantity_ForAddToCart,
      });

      if (response && response.data) {
        const responseData = response.data;

        if (responseData.status === "success") {
          // Assuming success is a boolean indicating whether the operation was successful
          toast.success(responseData.message || "Added to cart successfully!");
        } else {
          toast.error(
            responseData.message || "Failed to add to cart. Please try again."
          );
        }
      } else {
        // Handle unexpected response structure
        toast.error("Failed to add to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  // Find the lowest and highest prices among product variants
  const minPrice = Math.min(
    ...product.productVariantDTOs.map((variant) => variant.price)
  );
  const maxPrice = Math.max(
    ...product.productVariantDTOs.map((variant) => variant.price)
  );

  // Determine the selected variant
  const selectedVariant = product.productVariantDTOs.find(
    (variant) => variant.productVariantId === selectedVariantID_ForAddToCart
  );

  // Get the price of the selected variant or default to 0
  const selectedVariantPrice = selectedVariant ? selectedVariant.price : 0;

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  //!BEGIN RENDER-------------------------
  return (
    <section className="lg:pl-20">
      <div className="mb-8 ">
        {/* name product */}
        <h2 className=" mb-6 text-5xl font-bold dark:text-gray-400 md:text-4xl">
          {product.name}
        </h2>
        {/* star, sold */}
        <div className="flex mb-2">
          <div className="flex items-center">
            <div className="pr-2 underline">{rating}</div>
            {renderRatingStars(rating)}
          </div>
          {/* line div between review and rating: ligne droite | */}
          <div className="flex items-center justify-center w-px h-6 mx-3 bg-gray-300"></div>

          {/* review amount */}
          <div className="flex items-center">
            <div className="mr-2 underline"></div>
            <div className="text-gray-500 dark:text-gray-400">Đánh giá</div>
          </div>
          <div className="flex items-center justify-center w-px h-6 mx-3 bg-gray-300"></div>

          {/* sold */}
          <div className="flex items-center">
            <div className="mr-2 underline">{sold}</div>
            <div className="text-gray-500 dark:text-gray-400">Đã bán</div>
          </div>
        </div>
        {/* price */}
        <p className="inline-block mb-6 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
          <p className="inline-block mb-6 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
            <span>
              {selectedVariantID_ForAddToCart
                ? `${formatPrice(selectedVariantPrice)} VNĐ`
                : `Từ ${formatPrice(minPrice)} VNĐ đến ${formatPrice(
                    maxPrice
                  )} VNĐ`}
            </span>
          </p>

          {/*<span>{product ? product.productVariantDTOs[0].price : "0"}đ</span>*/}
          {/* <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">
            $1800.99
          </span> */}
        </p>
        {/* description */}
        {/* <div className="flex">
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-400">
            Mô tả sản phẩm:
          </h3>
        </div> */}
        <p className="pb-10 text-gray-700 dark:text-gray-400">
          <p className="text-2xl font-bold text-gray-700 dark:text-gray-400">
            Mô tả sản phẩm:
          </p>
          {product ? product.description : "description"}
        </p>
        <p className="pb-10 text-gray-700 dark:text-gray-400">
          <p className="text-2xl font-bold text-gray-700 dark:text-gray-400">
            Thông tin sản phẩm:
          </p>
          {product ? product.information : "information"}
        </p>
      </div>
      {/* attribute of product */}
      <ProductCardProductInfoCore
        data={product ? product.productVariantDTOs : null}
        selectedVariantID_ForAddToCart={setSelectedVariantID_ForAddToCart}
        selectedQuantity_ForAddToCart={setSelectedQuantity_ForAddToCart}
      />
      <div className="flex flex-wrap items-center gap-4">
        <button
          className="w-full p-4 bg-blue-500 rounded-md lg:w-2/5 dark:text-gray-200 text-gray-50 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </button>
        {/*<button*/}
        {/*    className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md lg:w-2/5 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-500 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">*/}
        {/*    Buy Now*/}
        {/*</button>*/}
      </div>
      <ToastContainer />
    </section>
  );
};
