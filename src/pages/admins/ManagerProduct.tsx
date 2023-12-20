import React, { useState, useEffect } from "react";
import { useGetListProductPageMutation } from "../../features/common/products/services/productPageApi";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ListManagerProductResponse.ts
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

const ManagerProduct = () => {
  const [page, setPage] = useState(1);
  const size = 25;
  const [products, setProducts] = useState([]);
  const [productPageResponse, setProductPageResponse] =
    useState<ListProductPageResponse | null>(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [getListProductPage, { isLoading }] = useGetListProductPageMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListProductPage({ page, size });
        const responseData = response?.data;

        if (responseData) {
          setProductPageResponse(responseData);
          setProducts(responseData.productDTOs || []);
          toast.success(responseData.message);
        } else {
          toast.error("Invalid response data");
        }
      } catch (error) {
        console.error("Lỗi tìm nạp dữ liệu:", error);
        toast.error(error.data?.message || "Error fetching data");
      }
    };

    fetchData();
  }, [getListProductPage, page, size]);

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

  const renderProductDetails = () => {
    if (!selectedProductId) {
      return null;
    }

    const selectedProduct = products.find(
      (product) => product.productId === selectedProductId
    );

    if (!selectedProduct) {
      return null;
    }

    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-md w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2">Chi tiết Sản phẩm</h2>

          {/* Product Details - Left Side */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0 md:mr-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
            <div className="flex-1 md:mt-0 mt-4">
              <p className="flex items-center gap-2">
                <span className="font-semibold text-gray-500">ID:</span>
                <span>{selectedProduct.productId}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-gray-500">Tên:</span>
                <span>{selectedProduct.name}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-gray-500">Mô tả:</span>
                <span>{selectedProduct.description}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-gray-500">Thông tin:</span>
                <span>{selectedProduct.information}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-gray-500">Đã bán:</span>
                <span>{selectedProduct.sold}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-gray-500">Trạng thái:</span>
                <span>{selectedProduct.status}</span>
              </p>
            </div>
          </div>

          {/* Product Variant and Attribute Details - Right Side */}
          <div className="flex flex-col gap-4 md:flex-row">
            {selectedProduct.productVariantDTOs.map((variant, index) => (
              <div
                key={variant.productVariantId}
                className={`flex-1 md:mr-4 ${index !== 0 ? "mt-4" : ""}`}
              >
                <h3 className="text-lg font-semibold">
                  Thông tin phiên bản sản phẩm
                </h3>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-green-500">SKU:</span>
                  <span>{variant.sku}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-green-500">Giá:</span>
                  <span>{variant.price}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-green-500">
                    Số lượng:
                  </span>
                  <span>{variant.quantity}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-green-500">
                    Trạng thái:
                  </span>
                  <span>{variant.status}</span>
                  <br />
                </p>
                <div className="mt-2">
                  {variant.attributeDTOs.map((attribute) => (
                    <div key={attribute.attributeId}>
                      <h4 className="text-base font-semibold text-black">
                        {attribute.name}
                      </h4>
                      <p className="flex items-center gap-2">
                        <span className="font-semibold text-black">
                          Giá trị:
                        </span>
                        <span>{attribute.value}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-semibold text-black">
                          Trạng thái:
                        </span>
                        <span>{attribute.active ? "Active" : "Inactive"}</span>
                      </p>
                      <br />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-md self-end mt-4"
            onClick={() => setSelectedProductId(null)}
          >
            Đóng
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-8">
      <table className="table-auto w-full border-collapse border border-green-800">
        <thead>
          <tr>
            <th className="px-4 py-2">STT</th>
            <th className="px-4 py-2">Mã sản phẩm</th>
            <th className="px-4 py-2">Tên</th>
            <th className="px-4 py-2">Hình ảnh</th>
            <th className="px-4 py-2">Số lượng bán</th>
            <th className="px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.productId}
              className={`${
                selectedProductId === product.productId ? "bg-blue-200" : ""
              } hover:bg-blue-100 cursor-pointer`}
            >
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{product.productId}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12"
                />
              </td>
              <td className="border px-4 py-2">{product.sold}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() =>
                    setSelectedProductId(
                      selectedProductId === product.productId
                        ? null
                        : product.productId
                    )
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                >
                  {selectedProductId === product.productId
                    ? "Ẩn chi tiết"
                    : "Xem chi tiết"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {renderProductDetails()}

      <div className="text-center mt-4">{renderPageButtons()}</div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ManagerProduct;
