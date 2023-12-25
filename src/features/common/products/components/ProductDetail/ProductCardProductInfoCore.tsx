import { FC, useEffect, useState } from "react";

interface Attribute {
  name: string;
  values: string[];
}

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
interface dataType {
  productVariantDTOs: ProductVariantDTO[];
}

//!BEGIN FUNCTION-------------------------
export const ProductCardProductInfoCore = ({
  data,
  selectedVariantID_ForAddToCart,
  selectedQuantity_ForAddToCart,
}: {
  data: ProductVariantDTO[] | null;
  selectedVariantID_ForAddToCart: (id: number) => void;
  selectedQuantity_ForAddToCart: (quantity: number) => void;
}) => {
  //!BEGIN HANDLE FUNCTION---------------------------------
  console.log("data attribute: ", data);
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});

  const [selectedVariantInfo, setSelectedVariantInfo] = useState<{
    price: number;
    quantity: number;
  } | null>(null);

  // Inside your component
  const [value, setValue] = useState(1);

  const handleClickAttribute = (attributeName: string, value: string) => {
    const newSelectedAttributes = {
      ...selectedAttributes,
    };

    if (newSelectedAttributes[attributeName] === value) {
      delete newSelectedAttributes[attributeName];
    } else {
      newSelectedAttributes[attributeName] = value;
    }

    console.log("newSelectedAttributes: ", newSelectedAttributes);
    setSelectedAttributes(newSelectedAttributes);

    // Find the selected variant based on the chosen attributes

    const selectedVariant = data?.find((variant) =>
      variant.attributeDTOs?.every(
        (attribute) =>
          newSelectedAttributes[attribute.name] === attribute.value &&
          Object.keys(newSelectedAttributes).length ===
            variant.attributeDTOs.length
      )
    );

    console.log("selectedVariant: ", selectedVariant);
    // Update the state with the price and quantity of the selected variant
    if (selectedVariant) {
      selectedVariantID_ForAddToCart(selectedVariant.productVariantId);
      setSelectedVariantInfo({
        price: selectedVariant.price,
        quantity: selectedVariant.quantity,
      });
    } else {
      // If no variant is found, the state equal sum of quantity
      const quantity = data?.reduce(
        (sum, variant) => sum + variant.quantity,
        0
      );
      setSelectedVariantInfo({
        price: data ? data[0]?.price : 0,
        quantity: quantity || 0,
      });
      // setSelectedVariantInfo(null);
    }
  };

  const getAttributes = () => {
    const attributes = [];

    // Check if data.productVariantDTOs is defined
    if (data) {
      // Loop through each product variant
      data.forEach((variant) => {
        // Check if variant.attributeDTOs is defined
        if (variant.attributeDTOs) {
          console.log("variant.attributeDTOs", variant.attributeDTOs);
          // Loop through each attribute in the variant
          variant.attributeDTOs.forEach((attribute) => {
            // Check if the attribute is not already in the array
            const existingAttribute = attributes.find(
              (a) => a.name === attribute.name
            );

            // If not, add it to the array
            if (!existingAttribute) {
              attributes.push({
                name: attribute.name,
                values: [attribute.value],
              });
            } else {
              // If already exists, add the value to the existing attribute
              existingAttribute.values.push(attribute.value);
            }

            console.log("exist attributes ", existingAttribute);
          });
        }
      });
    }

    return attributes;
  };

  function removeDuplicates(attribute: Attribute): Attribute {
    return {
      name: attribute.name,
      values: [...new Set(attribute.values)],
    };
  }

  useEffect(() => {
    const fetchedAttributes = getAttributes();
    const uniqueAttributes = fetchedAttributes.map((attribute) =>
      removeDuplicates(attribute)
    );
    console.log("fetchedAttributes: ", uniqueAttributes);
    setAttributes(uniqueAttributes);
  }, []);

  useEffect(() => {
    selectedQuantity_ForAddToCart(value);
  }, [value]);

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
      {attributes
        ? attributes.map((attribute, index) => (
            <div key={index} className="mb-8 ">
              <h2 className="w-16 pb-1 mb-4 text-xl font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                {attribute.name}
              </h2>
              <div>
                <div className="flex flex-wrap -mb-2 overflow-y-auto h-32">
                  {attribute.values.map((value, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleClickAttribute(attribute.name, value)
                      }
                      className={`
                      px-4 py-2 mb-2 mr-4 font-semibold border rounded-md hover:border-blue-400
                       hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400
                      ${
                        selectedAttributes[attribute.name] === value
                          ? "bg-blue-400 text-white"
                          : ""
                      }
                    `}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))
        : null}

      {/* <div className="mb-8">
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
      </div> */}
      {/* <div className="mb-8 ">
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
      </div> */}
      {/* {divCount.map((_, index) => (
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
      ))} */}
      {/* fix xong inline */}
      {/* <div className="mb-8">
        <div className="mb-6 inline-block border-b border-blue-300 dark:border-gray-600">
          <h2 className="pb-1 text-xl font-semibold  dark:text-gray-400">
            Storage
          </h2>
        </div>
        <div>
          <div className="flex flex-wrap -mb-2 overflow-y-auto max-h-32">
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
          </div>
        </div>
      </div> */}
      {/* quantity */}
      <div className="w-auto mb-8 ">
        <label
          htmlFor=""
          className="w-full pb-1 text-xl font-semibold text-gray-700 border-b border-blue-300 dark:border-gray-600 dark:text-gray-400"
        >
          Số lượng
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
          <div className="pl-4 text-gray-700">
            {selectedVariantInfo?.quantity} sản phẩm có sẵn
          </div>
        </div>
      </div>
    </>
  );
};
