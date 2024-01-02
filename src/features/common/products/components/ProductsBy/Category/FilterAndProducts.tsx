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
                  Phạm vi giá
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
