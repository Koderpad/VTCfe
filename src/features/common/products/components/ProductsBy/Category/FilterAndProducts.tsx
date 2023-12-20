import { useGetProductsByCategoryQuery } from "../../../../redux/api/productsApi";
import axios from "axios";
import { CategoryPart } from "./CategoryPart";
import { Link } from "react-router-dom";

type AttributeDTO = {
  attributeId: number;
  name: string;
  value: string;
  active: boolean;
  shopId: number;
};

type ProductVariantDTO = {
  productVariantId: number;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  status: string;
  productId: number;
  attributeDTOs: AttributeDTO[];
};

type Product = {
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
};

type ProductProps = {
  product: Product;
};

export const FilterAndProducts = ({ categoryId }: { categoryId: number }) => {
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsByCategoryQuery(categoryId);

  console.log("products", products);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <section className="bg-gray-50 font-poppins  ">
        <div className="px-4 py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap mb-24 -mx-3">
            {/* filter */}
            <div className="w-full pr-2 lg:w-1/6 lg:block">
              {/* <div className="p-4 mb-5 bg-white border border-gray-200 ">
                <h2 className="text-2xl font-bold dark:text-gray-400">
                  Categories
                </h2>
                <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
                <ul>
                  <li className="mb-4">
                    <label
                      htmlFor=""
                      className="flex items-center dark:text-gray-400 "
                    >
                      <input type="checkbox" className="w-4 h-4 mr-2" />
                      <span className="text-lg">Biscuits</span>
                    </label>
                  </li>
                  <li className="mb-4">
                    <label
                      htmlFor=""
                      className="flex items-center dark:text-gray-400 "
                    >
                      <input type="checkbox" className="w-4 h-4 mr-2 " />
                      <span className="text-lg">Fruits</span>
                    </label>
                  </li>
                  <li className="mb-4">
                    <label
                      htmlFor=""
                      className="flex items-center dark:text-gray-400"
                    >
                      <input type="checkbox" className="w-4 h-4 mr-2" />
                      <span className="text-lg">Seafood</span>
                    </label>
                  </li>
                  <li className="mb-4">
                    <label
                      htmlFor=""
                      className="flex items-center dark:text-gray-400"
                    >
                      <input type="checkbox" className="w-4 h-4 mr-2" />
                      <span className="text-lg">Vegetables</span>
                    </label>
                  </li>
                  <li className="mb-4">
                    <label
                      htmlFor=""
                      className="flex items-center dark:text-gray-400"
                    >
                      <input type="checkbox" className="w-4 h-4 mr-2" />
                      <span className="text-lg">
                        Frozen Foods &amp; Staples
                      </span>
                    </label>
                  </li>
                </ul>
                <a
                  href="#"
                  className="text-base font-medium text-blue-500 hover:underline dark:text-blue-400"
                >
                  View More
                </a>
              </div> */}
              <CategoryPart />
              <div className="p-4 mb-5 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-900">
                <h2 className="text-2xl font-bold dark:text-gray-400">
                  Product Status
                </h2>
                <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
                <ul>
                  <li className="mb-4">
                    <label
                      htmlFor=""
                      className="flex items-center dark:text-gray-300"
                    >
                      <input type="checkbox" className="w-4 h-4 mr-2" />
                      <span className="text-lg dark:text-gray-400">
                        In Stock
                      </span>
                    </label>
                  </li>
                  <li className="mb-4">
                    <label
                      htmlFor=""
                      className="flex items-center dark:text-gray-300"
                    >
                      <input type="checkbox" className="w-4 h-4 mr-2" />
                      <span className="text-lg dark:text-gray-400">
                        On Sale
                      </span>
                    </label>
                  </li>
                </ul>
                C
              </div>
              <div className="p-4 mb-5 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-900">
                <h2 className="text-2xl font-bold dark:text-gray-400">Brand</h2>
                <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
                <ul>
                  <li className="mb-4">
                    <label
                      htmlFor=""
                      className="flex items-center dark:text-gray-300"
                    >
                      <input type="checkbox" className="w-4 h-4 mr-2" />
                      <span className="text-lg dark:text-gray-400">Apple</span>
                    </label>
                  </li>
                  <li className="mb-4">
                    <label
                      htmlFor=""
                      className="flex items-center dark:text-gray-300"
                    >
                      <input type="checkbox" className="w-4 h-4 mr-2" />
                      <span className="text-lg dark:text-gray-400">Oreo</span>
                    </label>
                  </li>
                  <li className="mb-4">
                    <label
                      htmlFor=""
                      className="flex items-center dark:text-gray-300"
                    >
                      <input type="checkbox" className="w-4 h-4 mr-2" />
                      <span className="text-lg dark:text-gray-400">Mango</span>
                    </label>
                  </li>
                  <li className="mb-4">
                    <label
                      htmlFor=""
                      className="flex items-center dark:text-gray-300"
                    >
                      <input type="checkbox" className="w-4 h-4 mr-2" />
                      <span className="text-lg dark:text-gray-400">Nebico</span>
                    </label>
                  </li>
                </ul>
                <a
                  href="#"
                  className="text-base font-medium text-blue-500 hover:underline dark:text-blue-400"
                >
                  View More
                </a>
              </div>
              <div className="p-4 mb-5 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-900">
                <h2 className="text-2xl font-bold dark:text-gray-400">Price</h2>
                <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
                <div>
                  <input
                    type="range"
                    className="w-full h-1 mb-4 bg-blue-100 rounded appearance-none cursor-pointer"
                    max="100"
                    value="50"
                    onChange={() => {}}
                  />
                  <div className="flex justify-between ">
                    <span className="inline-block text-lg font-bold text-blue-400 ">
                      $1
                    </span>
                    <span className="inline-block text-lg font-bold text-blue-400 ">
                      $500
                    </span>
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
              <div className="grid grid-cols-4 gap-4">
                {products.productDTOs.map((product: Product) => (
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
                          {/* <ul className="flex">
                            <li>
                              <a href=" #">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="w-4 mr-1 text-gray-700 dark:text-gray-400 bi bi-star "
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                </svg>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="w-4 mr-1 text-gray-700 dark:text-gray-400 bi bi-star"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                </svg>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="w-4 mr-1 text-gray-700 dark:text-gray-400 bi bi-star"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                </svg>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="w-4 mr-1 text-gray-700 dark:text-gray-400 bi bi-star"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                </svg>
                              </a>
                            </li>
                          </ul> */}
                        </div>
                        <p className="text-lg ">
                          <span className="text-green-600 dark:text-green-600">
                            {product.productVariantDTOs[0].price}đ
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between p-4 border-t border-gray-300 dark:border-gray-700">
                        {/* yêu thích */}
                        <a
                          href="#"
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
                        </a>
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

              {/* phan trang */}
              <div className="flex justify-end mt-6">
                <nav aria-label="page-navigation">
                  <ul className="flex list-style-none">
                    <li className="page-item disabled ">
                      <a
                        href="#"
                        className="relative block pointer-events-none px-3 py-1.5 mr-3 text-base text-gray-700 transition-all duration-300  rounded-md dark:text-gray-400 hover:text-gray-100 hover:bg-blue-600"
                      >
                        Previous
                      </a>
                    </li>
                    <li className="page-item ">
                      <a
                        href="#"
                        className="relative block px-3 py-1.5 mr-3 text-base hover:text-blue-700 transition-all duration-300 hover:bg-blue-200 dark:hover:text-gray-400 dark:hover:bg-gray-700 rounded-md text-gray-100 bg-blue-400"
                      >
                        1
                      </a>
                    </li>
                    <li className="page-item ">
                      <a
                        href="#"
                        className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 rounded-md mr-3  "
                      >
                        2
                      </a>
                    </li>
                    <li className="page-item ">
                      <a
                        href="#"
                        className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 rounded-md mr-3 "
                      >
                        3
                      </a>
                    </li>
                    <li className="page-item ">
                      <a
                        href="#"
                        className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 rounded-md "
                      >
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
