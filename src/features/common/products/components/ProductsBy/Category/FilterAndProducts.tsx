import { CategoryPart } from "./CategoryPart";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useGetListProductPageByCategoryIdMutation } from "../../../services/productPageApi";
import {
  useAddNewFavoriteProductMutation,
  useDeleteFavoriteProductMutation,
} from "../../../services/productsPageGetApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ListProductPageResponse,
  ProductDTO,
} from "../interfaces/ListProductPageResponse";
import { useGetFavoriteProductsQuery } from "../../../../redux/api/productsApi";
import {
  FavoriteProductDTO,
  GetFavoriteProductsApiResponse,
} from "../interfaces/GetFavoriteProductsResponsesBody";
import axios from "axios";
import ProductList from "../common/ProductList";

export const FilterAndProducts = ({ categoryId }: { categoryId: number }) => {
  const [page, setPage] = useState(1);
  const size = 8;
  // Define new state variables
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  // Define a new state variable to track if the price filter is being applied
  const [isPriceFilterApplied, setIsPriceFilterApplied] = useState(false);

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [productPageResponse, setProductPageResponse] =
    useState<ListProductPageResponse | null>(null);
  // const [selectedProductId, setSelectedProductId] = useState(null);

  const [getListProductPage, { isLoading }] =
    useGetListProductPageByCategoryIdMutation();

  const {
    data: favoriteProducts,
    error: favoriteProductsError,
    isLoading: favoriteProductsLoading,
    refetch: refetchFavoriteProducts,
  } = useGetFavoriteProductsQuery("arg");

  const [favoriteProductIds, setFavoriteProductIds] = useState<number[]>([]);

  const [addNewFavoriteProduct] = useAddNewFavoriteProductMutation();

  const [deleteFavoriteProduct] = useDeleteFavoriteProductMutation();

  useEffect(() => {
    fetchData();
    refetchFavoriteProducts();
    setFavoriteProductIds(getFavoriteProductIds(favoriteProducts));
  }, [getListProductPage, page, size]);

  // const fetchData = async () => {
  //     try {
  //         const response = await getListProductPage({page, size, categoryId});
  //         const responseData = response?.data;
  //
  //         if (responseData) {
  //             console.log("responseData", responseData);
  //             setProductPageResponse(responseData);
  //             setProducts(responseData.productDTOs || []);
  //             // toast.success(responseData.message);
  //         } else {
  //             // alert("Invalid response data");
  //             toast.error("Invalid response data");
  //         }
  //     } catch (error) {
  //         console.error("Lỗi tìm nạp dữ liệu:", error);
  //         toast.error(error.data?.message || "Error fetching data");
  //     }
  // };

  const fetchData = async () => {
    try {
      let response;
      if (isPriceFilterApplied) {
        response = await axios.get(
          `http://localhost:8181/api/product/page/price-range?page=${page}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        );
      } else {
        response = await getListProductPage({ page, size, categoryId });
      }
      const responseData = response?.data;

      if (responseData) {
        console.log("responseData", responseData);
        setProductPageResponse(responseData);
        setProducts(responseData.productDTOs || []);
      } else {
        toast.error("Invalid response data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error.data?.message || "Error fetching data");
    }
  };

  function getFavoriteProductIds(
    response: GetFavoriteProductsApiResponse
  ): number[] {
    if (response && response.favoriteProductDTOs) {
      return response.favoriteProductDTOs.map(
        (product) => product.productDTO.productId
      );
    }
    return [];
  }

  function isProductFavorited(
    productId: number,
    favoriteProductIds: number[]
  ): boolean {
    return favoriteProductIds.includes(productId);
  }

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };
  const renderPageButtons = () => {
    if (!productPageResponse) {
      return null;
    }

    const totalPage = productPageResponse.totalPage;
    const currentPage = page;

    const visiblePages = 5; // Number of pages to display around the current page
    const halfVisiblePages = Math.floor(visiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisiblePages);
    let endPage = Math.min(totalPage, startPage + visiblePages - 1);

    // Adjust startPage and endPage to always display visiblePages number of buttons
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );

    return (
      <div className="flex space-x-2 justify-center">
        {startPage > 1 && (
          <button
            className={`px-3 py-2 bg-gray-200 rounded-md`}
            onClick={() => handlePageClick(1)}
          >
            1
          </button>
        )}
        {startPage > 2 && <span className="px-3 py-2">...</span>}
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-3 py-2 ${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } rounded-md`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        {endPage < totalPage - 1 && <span className="px-3 py-2">...</span>}
        {endPage < totalPage && (
          <button
            className={`px-3 py-2 bg-gray-200 rounded-md`}
            onClick={() => handlePageClick(totalPage)}
          >
            {totalPage}
          </button>
        )}
      </div>
    );
  };

  const handleAddFavorite = async (productId: number) => {
    try {
      console.log("productId", productId);
      const response = await addNewFavoriteProduct({ productId });

      if (response.error) {
        toast.error("Sản phẩm đã trong danh sách yêu thích");
        return;
      }

      const responseData = response?.data;
      console.log("responseData", response);

      if (responseData) {
        console.log("responseData", responseData);
        toast.success(responseData);
        // Update favoriteProductIds state
        setFavoriteProductIds((prevIds) => [...prevIds, productId]);
        refetchFavoriteProducts();
      } else {
        console.log("responseData in error: ", responseData);
        toast.error(responseData);
      }
    } catch (error) {
      toast.error("Lỗi tìm nạp dữ liệu");
    }
  };

  const handleRemoveFavorite = async (productId: number) => {
    try {
      console.log("productId", productId);
      console.log("favoriteProducts", favoriteProducts);
      // Find the favoriteProductId corresponding to the productId
      const favoriteProduct: FavoriteProductDTO =
        favoriteProducts.favoriteProductDTOs.find(
          (favoriteProductDTO: FavoriteProductDTO) =>
            favoriteProductDTO.productDTO.productId === productId
        );

      if (!favoriteProduct) {
        toast.error("Sản phẩm không tồn tại trong danh sách yêu thích");
        return;
      }

      console.log(
        "favoriteProduct cua san pham xoa",
        favoriteProduct.favoriteProductId
      );

      const response = await deleteFavoriteProduct({
        favoriteProductId: favoriteProduct.favoriteProductId,
      });

      if (response.error) {
        toast.error("Lỗi khi xóa sản phẩm khỏi danh sách yêu thích");
        return;
      }

      const responseData = response?.data;

      if (responseData) {
        toast.success(responseData);
        // Update favoriteProductIds state
        setFavoriteProductIds((prevIds) =>
          prevIds.filter((id) => id !== productId)
        );
        refetchFavoriteProducts();
      } else {
        toast.error(responseData);
      }
    } catch (error) {
      toast.error("Lỗi khi xóa sản phẩm khỏi danh sách yêu thích");
    }
  };

  // Update state variables when input fields change
  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleApply = async () => {
    setPage(1); // Reset page to 1 when applying new filters
    setIsPriceFilterApplied(true); // Set isPriceFilterApplied to true
    try {
      const response = await axios.get(
        `http://localhost:8181/api/product/page/price-range?page=1&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      const responseData = response?.data;

      if (responseData) {
        console.log("responseData", responseData);
        setProductPageResponse(responseData);
        setProducts(responseData.productDTOs || []);
      } else {
        toast.error("Invalid response data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error.data?.message || "Error fetching data");
    }
  };

  return (
    <>
      <section className="bg-gray-50 font-poppins  ">
        <div className="px-4 py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap mb-24 -mx-3">
            {/* filter */}
            <div className="w-full pr-2 lg:w-1/6 lg:block">
              <CategoryPart />
              <div className="p-4 mb-5 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-900">
                <h2 className="text-2xl font-bold dark:text-gray-400">
                  Price Range
                </h2>
                <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
                <div>
                  <div className="flex gap-4">
                    <input
                      id="minPrice"
                      type="number"
                      className="w-[75px] h-[35px] bg-blue-100 text-xl "
                      max="100"
                      onChange={handleMinPriceChange}
                    />
                    <span>
                      <i className="text-lg text-gray-400">to</i>
                    </span>
                    <input
                      id="maxPrice"
                      type="number"
                      className="w-[75px] h-[35px] bg-blue-100 text-xl "
                      max="100"
                      onChange={handleMaxPriceChange}
                    />
                  </div>
                  <div className="flex justify-between ">
                    <button
                      className="px-4 py-2 mt-4 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      onClick={handleApply}
                    >
                      Áp dụng
                    </button>
                    {/* <button className="px-4 py-2 mt-4 text-lg font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600">
                      Reset
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
            {/* products */}
            <div className="w-full px-3 lg:w-5/6">
              {/* sort products */}
              <div className="px-3 mb-4">
                <div className="items-center justify-between hidden px-3 py-2 bg-gray-100 md:flex dark:bg-gray-900 ">
                  <div className="flex justify-start space-x-4 h-full">
                    <span className="">Sắp xếp theo: </span>
                    <button
                      className="text-gray-800 text-center text-base font-semibold leading-5 tracking-normal whitespace-nowrap justify-center items-stretch border border-[color:var(--components-button-white-border-color,#E5E7EB)] shadow-sm bg-white px-4 py-3.5 rounded-lg border-solid"
                      aria-label="Button"
                    >
                      Mới nhất
                    </button>
                    <button
                      className="text-gray-800 text-center text-base font-semibold leading-5 tracking-normal whitespace-nowrap justify-center items-stretch border border-[color:var(--components-button-white-border-color,#E5E7EB)] shadow-sm bg-white px-4 py-3.5 rounded-lg border-solid"
                      aria-label="Button"
                    >
                      Bán chạy
                    </button>
                    <div
                      className="border border-[color:var(--components-button-white-border-color,#E5E7EB)]
                       shadow-sm bg-white rounded-lg border-solid
                      "
                    >
                      <select
                        name=""
                        id=""
                        className="text-center  text-1xl bg-white cursor-pointer h-full"
                      >
                        <option value="1">Gía từ cao đến thấp</option>
                        <option value="2">Gía từ thấp đến cao</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    {/* content phia ben phai */}
                  </div>
                </div>
              </div>

              {/* grid */}
              {/* <div className="grid grid-cols-4 gap-4">
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
                        <button
                          onClick={() => {
                            if (
                              isProductFavorited(
                                product.productId,
                                favoriteProductIds
                              )
                            ) {
                              handleRemoveFavorite(product.productId);
                            } else {
                              handleAddFavorite(product.productId);
                            }
                          }}
                          className={`text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-300 ${
                            isProductFavorited(
                              product.productId,
                              favoriteProductIds
                            )
                              ? "text-red-500"
                              : ""
                          }`}
                        >
                          {isProductFavorited(
                            product.productId,
                            favoriteProductIds
                          ) ? (
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
              </div> */}

              <ProductList
                products={products}
                favoriteProductIds={favoriteProductIds}
                handleAddFavorite={handleAddFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
              />

              {/* phan trang */}
              <div className="text-center mt-4">{renderPageButtons()}</div>
            </div>
          </div>
          <ToastContainer position="bottom-right" />
        </div>
      </section>
    </>
  );
};
