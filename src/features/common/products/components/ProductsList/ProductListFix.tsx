import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useGetProductPageListQuery } from "../../services/productsPageGetApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
interface ListProductPageResponse {
  status: string;
  message: string;
  code: number;
  count: number;
  size: number;
  page: number;
  totalPage: number;
  productDTOs: ProductDTO[];
}

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

interface AttributeDTO {
  attributeId: number;
  name: string;
  value: string;
  active: boolean;
  shopId: number;
}

export const ProductListFix = React.memo(
  () => {
    const [page, setPage] = useState(1);
    const size = 8;
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [productPageResponse, setProductPageResponse] =
      useState<ListProductPageResponse | null>(null);

    const { data, error, isLoading, refetch } = useGetProductPageListQuery({
      page,
      size,
    });

    console.log("data", data);

    const fetchData = useCallback(async () => {
      console.log("1");
      try {
        if (data) {
          //   console.log("responseData", responseData);
          setProductPageResponse(data || null);
          setProducts(data.productDTOs || []);
          toast.success("Lấy dữ liệu thành công !!");
        } else {
          toast.error("Invalid response data", data.message);
        }
      } catch (error) {
        toast.error("Error fetching data");
      }
    }, [data]);

    useEffect(() => {
      fetchData();
      console.log("2");
    }, [fetchData]);

    if (!data) {
      return null;
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

    return (
      <>
        <section className="bg-gray-50 font-poppins  ">
          <div className="px-4 py-4 mx-auto lg:py-6 md:px-6">
            <div className="flex flex-wrap mb-24 -mx-3">
              {/* filter */}

              {/* products */}
              <div className="w-full px-3 lg:w-5/6">
                {/* sort products */}

                {/* grid */}
                <span className="text-[20px]">Danh sách sản phẩm mới</span>
                <div className="grid grid-cols-4 gap-4 ">
                  {products.map((product: ProductDTO) => (
                    <div
                      key={product.productId}
                      className="w-auto px-3 mb-6 sm:w-1/2 md:w-full"
                    >
                      <div className="border border-gray-300 dark:border-gray-700">
                        <div className="relative bg-gray-200">
                          <Link
                            to={`/product/${product.productId}`}
                            className=""
                          >
                            <img
                              src={product.image}
                              alt=""
                              className="object-fill w-full h-60 "
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

                        {/* </div> */}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4">{renderPageButtons()}</div>
              </div>
            </div>
            <ToastContainer position="bottom-right" />
          </div>
        </section>
      </>
    );
  },
  (prevProps, nextProps) => prevProps === nextProps
);
