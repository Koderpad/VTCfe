import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetProductPageListQuery } from "../../services/productsPageGetApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

export const ProductListFix = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await data;
        // const responseData = response;

        // console.log("responseData", response.message);

        if (data) {
          //   console.log("responseData", responseData);
          setProductPageResponse(data || null);
          setProducts(data.productDTOs || []);
          toast.success("Lấy dữ liệu thành công");
        } else {
          // alert("Invalid response data");
          toast.error("Invalid response data");
        }
      } catch (error) {
        // console.error("Lỗi tìm nạp dữ liệu:", error);
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, [page, size]);

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
                        <Link to={`/product/${product.productId}`} className="">
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
                      {/* <div className="flex justify-between p-4 border-t border-gray-300 dark:border-gray-700"> */}
                      {/* yêu thích */}
                      {/* <button
                          onClick={() => handleAddFavorite(product.productId)}
                          className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-300"
                        >
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
                        </button> */}
                      {/* cart */}
                      {/* <a
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
                        </a> */}
                      {/* mắt */}
                      {/* <a
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
                        </a> */}
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
};
