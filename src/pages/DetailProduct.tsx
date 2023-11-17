//create ProductDetail page
import React, { useState } from "react";

import Footer_v1 from "../layouts/footers/Footer_v1";
import Header_not_fixed from "../layouts/headers/Header_not_fixed";

export const DetailProduct = () => {
  const buttonLabels = [
    "1 TB",
    "2 TB",
    "3 TB",
    "4 TB",
    "5 TB",
    "6 TB",
    "7 TB",
    "8 TB",
    "9 TB",
    "10 TB",
    "1 TB",
    "2 TB",
    "3 TB",
    "4 TB",
    "5 TB",
    "6 TB",
    "7 TB",
    "8 TB",
    "9 TB",
    "10 TB",
    "1 TB",
    "4 TB",
    "5 TB",
    "6 TB",
    "7 TB",
    "8 TB",
    "9 TB",
    "10 TB",
    "1 TB",
    "2 TB",
    "3 TB",
    "4 TB",
    "5 TB",
    "6 TB",
    "7 TB",
    "8 TB",
    "9 TB",
    "10 TB",
    "1 TB",
  ];
  const divCount = Array.from({ length: 0 }, (_, i) => i + 1);

  // Inside your component
  const [value, setValue] = useState(1);

  const decrementValue = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const incrementValue = () => {
    if (value < 100) {
      setValue(value + 1);
    }
  };

  // Inside your component
  const [selectedButton, setSelectedButton] = useState("");

  const handleClick = (value: string) => {
    if (selectedButton === value) {
      setSelectedButton("");
    } else {
      setSelectedButton(value);
      console.log(value);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header_not_fixed />
        {/* page product */}
        <div className="flex justify-center">
          {/* main container */}
          <div className="w-4/5">
            <section className="overflow-hidden bg-white py-11 font-poppins">
              <div className="lg:py-8 md:px-6">
                <div className="flex flex-wrap w-full">
                  {/* image */}
                  <div className="mb-8 md:w-1/2 justify-start md:mb-0">
                    <div className="sticky top-0 z-50 overflow-hidden ">
                      <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                        <img
                          src="https://i.postimg.cc/6qcPhTQg/R-18.png"
                          alt=""
                          className="object-cover w-full lg:h-full "
                        />
                      </div>
                      <div className="flex-nowrap hidden md:flex ">
                        <div className="w-1/2 p-2 sm:w-1/4">
                          <a
                            href="#"
                            className="block border border-blue-300 hover:border-blue-300"
                          >
                            <img
                              src="https://i.postimg.cc/6qcPhTQg/R-18.png"
                              alt=""
                              className="object-cover w-full lg:h-20"
                            />
                          </a>
                        </div>
                        <div className="w-1/2 p-2 sm:w-1/4">
                          <a
                            href="#"
                            className="block border border-transparent hover:border-blue-300"
                          >
                            <img
                              src="https://i.postimg.cc/6qcPhTQg/R-18.png"
                              alt=""
                              className="object-cover w-full lg:h-20"
                            />
                          </a>
                        </div>
                        <div className="w-1/2 p-2 sm:w-1/4">
                          <a
                            href="#"
                            className="block border border-transparent hover:border-blue-300"
                          >
                            <img
                              src="https://i.postimg.cc/6qcPhTQg/R-18.png"
                              alt=""
                              className="object-cover w-full lg:h-20"
                            />
                          </a>
                        </div>
                        <div className="w-1/2 p-2 sm:w-1/4">
                          <a
                            href="#"
                            className="block border border-transparent hover:border-blue-300"
                          >
                            <img
                              src="https://i.postimg.cc/6qcPhTQg/R-18.png"
                              alt=""
                              className="object-cover w-full lg:h-20"
                            />
                          </a>
                        </div>
                        <div className="w-1/2 p-2 sm:w-1/4">
                          <a
                            href="#"
                            className="block border border-transparent hover:border-blue-300"
                          >
                            <img
                              src="https://i.postimg.cc/6qcPhTQg/R-18.png"
                              alt=""
                              className="object-cover w-full lg:h-20"
                            />
                          </a>
                        </div>
                      </div>
                      {/* <div className="px-6 pb-6 mt-6 border-t border-gray-300 dark:border-gray-400 ">
                      <div className="flex flex-wrap items-center mt-6">
                        <span className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="w-4 h-4 text-gray-700 dark:text-gray-400 bi bi-truck"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                          </svg>
                        </span>
                        <h2 className="text-lg font-bold text-gray-700 dark:text-gray-400">
                          Free Shipping
                        </h2>
                      </div>
                      <div className="mt-2 px-7">
                        <a
                          className="text-sm text-blue-400 dark:text-blue-200"
                          href="#"
                        >
                          Get delivery dates
                        </a>
                      </div>
                    </div> */}
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2 ">
                    <div className="lg:pl-20">
                      <div className="mb-8 ">
                        {/* name product */}
                        <h2 className="max-w-xl mb-6 text-5xl font-bold dark:text-gray-400 md:text-4xl">
                          Macbook Pro M130c90
                        </h2>
                        {/* star, sold */}
                        <div className="flex mb-2">
                          {/* rating */}
                          <div className="flex items-center">
                            <div className="pr-2 underline">3</div>
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
                            <svg
                              className="flex-shrink-0 w-5 h-5 text-gray-300 dark:text-gray-600"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                            <svg
                              className="flex-shrink-0 w-5 h-5 text-gray-300 dark:text-gray-600"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                          </div>
                          {/* line div between review and rating: ligne droite | */}
                          <div className="flex items-center justify-center w-px h-6 mx-3 bg-gray-300"></div>

                          {/* review amount */}
                          <div className="flex items-center">
                            <div className="mr-2 underline">3</div>
                            <div className="text-gray-500 dark:text-gray-400">
                              Đánh giá
                            </div>
                          </div>
                          <div className="flex items-center justify-center w-px h-6 mx-3 bg-gray-300"></div>

                          {/* sold */}
                          <div className="flex items-center">
                            <div className="mr-2 underline">3</div>
                            <div className="text-gray-500 dark:text-gray-400">
                              Đã bán
                            </div>
                          </div>
                        </div>
                        {/* price */}
                        <p className="inline-block mb-6 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                          <span>$1500.99</span>
                          <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">
                            $1800.99
                          </span>
                        </p>
                        <p className="max-w-md text-gray-700 dark:text-gray-400">
                          Lorem ispum dor amet Lorem ispum dor amet Lorem ispum
                          dor amet Lorem ispum dor amet Lorem ispum dor amet
                          Lorem ispum dor amet Lorem ispum dor amet Lorem ispum
                          dor amet
                        </p>
                      </div>
                      {/* attribute of product */}
                      <div className="mb-8">
                        <h2 className="w-[5rem] pb-1 mb-4 text-2xl font-bold border-b border-blue-300">
                          Colors
                        </h2>
                        <div className="flex flex-wrap -mx-2 -mb-2">
                          <button className="p-1 mb-2 mr-3 ">
                            <div className="w-6 h-6 rounded-full bg-stone-400"></div>
                          </button>
                          <button className="p-1 mb-2 mr-3 ">
                            <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                          </button>
                          <button className="p-1 mb-2 ">
                            <div className="w-6 h-6 bg-blue-200 rounded-full"></div>
                          </button>
                        </div>
                      </div>
                      <div className="mb-8 ">
                        <h2 className="w-16 pb-1 mb-4 text-xl font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                          RAM
                        </h2>
                        <div>
                          <div className="flex flex-wrap -mb-2 overflow-y-auto h-32">
                            {buttonLabels.map((label, index) => (
                              <button
                                key={index}
                                className="px-4 py-2 mb-2 mr-4 font-semibold border rounded-md hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400"
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      {divCount.map((_, index) => (
                        <div key={index} className="mb-8 ">
                          <h2 className="w-16 pb-1 mb-4 text-xl font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                            RAM
                          </h2>
                          <div>
                            <div className="flex flex-wrap -mb-2 overflow-y-auto h-32">
                              {buttonLabels.map((label, index) => (
                                <button
                                  key={index}
                                  className="px-4 py-2 mb-2 mr-4 font-semibold border rounded-md hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400"
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* fix xong inline */}
                      <div className="mb-8">
                        <div className="mb-6 inline-block border-b border-blue-300 dark:border-gray-600">
                          <h2 className="pb-1 text-xl font-semibold  dark:text-gray-400">
                            StorageStorageStorageStorage
                          </h2>
                        </div>
                        <div>
                          <div className="flex flex-wrap -mb-2 overflow-y-auto max-h-32">
                            {/* <div className="flex flex-wrap -mx-2 -mb-2"> */}
                            {buttonLabels.map((label, index) => (
                              <button
                                key={index}
                                onClick={() => handleClick(label)}
                                className={`
                                px-4 py-2 mb-2 mr-4 font-semibold border rounded-md hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400
                                ${selectedButton === label ? 'bg-blue-400 text-white' : ''}
                                `}
                              >
                                {label}
                              </button>
                            ))}
                            {/* <button
                              onClick={() => handleClick("256 GB")}
                              className="px-4 py-2 mb-2 mr-4 font-semibold border rounded-md hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400"
                            >
                              256 GB
                            </button>
                            <button
                              onClick={() => handleClick("112 GB")}
                              className="px-4 py-2 mb-2 mr-4 font-semibold border rounded-md hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400"
                            >
                              112 GB
                            </button>
                            <button
                              onClick={() => handleClick("1 TB")}
                              className="px-4 py-2 mb-2 mr-2 font-semibold border rounded-md hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400"
                            >
                              1 TB
                            </button> */}
                          </div>
                        </div>
                      </div>
                      <div className="w-auto mb-8 ">
                        <label
                          htmlFor=""
                          className="w-full pb-1 text-xl font-semibold text-gray-700 border-b border-blue-300 dark:border-gray-600 dark:text-gray-400"
                        >
                          Quantity
                        </label>
                        <div className="relative flex flex-row w-full h-10 mt-6 bg-transparent rounded-lg">
                          <button
                            onClick={decrementValue}
                            className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400"
                          >
                            <span className="m-auto text-2xl font-thin">-</span>
                          </button>
                          <input
                            type="number"
                            className="flex items-center w-1/6 font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                            placeholder="1"
                            // defaultValue={123}
                            value={value}
                            readOnly
                          />
                          <button
                            onClick={incrementValue}
                            className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400"
                          >
                            <span className="m-auto text-2xl font-thin">+</span>
                          </button>
                          <div className="pl-4 text-gray-700">
                            1123 sản phẩm có sẵn
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <button className="w-full p-4 bg-blue-500 rounded-md lg:w-2/5 dark:text-gray-200 text-gray-50 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700">
                          Add to cart
                        </button>
                        <button className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md lg:w-2/5 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-500 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <Footer_v1 />
      </div>
    </>
  );
};
