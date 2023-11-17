import { useState } from "react";

export const ProductCardProductInfoCore = () => {
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
                                ${
                                  selectedButton === label
                                    ? "bg-blue-400 text-white"
                                    : ""
                                }
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
      {/* quantity */}
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
            value={value}
            readOnly
          />
          <button
            onClick={incrementValue}
            className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400"
          >
            <span className="m-auto text-2xl font-thin">+</span>
          </button>
          <div className="pl-4 text-gray-700">1123 sản phẩm có sẵn</div>
        </div>
      </div>
    </>
  );
};
