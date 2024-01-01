// ProductList.tsx
import React from "react";
import { ProductDTO } from "../interfaces/ListProductPageResponse";
import { Link } from "react-router-dom";

interface ProductListProps {
  products: ProductDTO[];
  favoriteProductIds: number[];
  handleAddFavorite: (productId: number) => void;
  handleRemoveFavorite: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  favoriteProductIds,
  handleAddFavorite,
  handleRemoveFavorite,
}) => {
  const isProductFavorited = (productId: number): boolean => {
    return favoriteProductIds.includes(productId);
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product: ProductDTO) => (
        <div
          key={product.productId}
          className="w-full px-3 mb-6 sm:w-1/2 md:w-full"
        >
          <div className="border border-gray-300 dark:border-gray-700">
            <div className="relative bg-gray-200">
              <Link to={`/product/${product.productId}`} className="">
                <img
                  src={product.image}
                  alt=""
                  className="object-cover w-full h-56 mx-auto "
                />
              </Link>
            </div>
            <div className="p-3 ">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-medium dark:text-gray-400">
                  {product.name}
                </h3>
              </div>
              <p className="text-lg ">
                <span className="text-green-600 dark:text-green-600">
                  {product.productVariantDTOs[0].price}đ
                </span>
              </p>
            </div>
            <div className="flex justify-between p-4 border-t border-gray-300 dark:border-gray-700">
              {/* yêu thích */}
              <button
                onClick={() => {
                  if (
                    isProductFavorited(product.productId, favoriteProductIds)
                  ) {
                    handleRemoveFavorite(product.productId);
                  } else {
                    handleAddFavorite(product.productId);
                  }
                }}
                className={`text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-300 ${
                  isProductFavorited(product.productId, favoriteProductIds)
                    ? "text-red-500"
                    : ""
                }`}
              >
                {isProductFavorited(product.productId, favoriteProductIds) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-heart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-heart"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                  </svg>
                )}
              </button>
              {/* cart */}
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart3 "
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                </svg>
              </a>
              {/* mắt */}
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
