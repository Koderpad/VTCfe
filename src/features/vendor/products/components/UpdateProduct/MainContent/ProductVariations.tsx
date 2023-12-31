import { ProductVariantDTO } from "../interfaces/GetProductDetailResponsesBody.ts";
import { ProductVariantRequest } from "../interfaces/UpdateProductRequestBody.ts";
import { ChangeEvent, useEffect } from "react";
import { VariantsImage } from "./VariantsImage.tsx";

interface Props {
  existsVariations: ProductVariantDTO[];
  setExistsVariations: (existsVariations: ProductVariantDTO[]) => void; // add this line
  setProductVariantRequests: (
    productVariantRequests: ProductVariantRequest[]
  ) => void;
}

const ProductVariations = ({
  existsVariations,
  setExistsVariations,
  setProductVariantRequests,
}: Props) => {
  //a function: change existsVariations to productVariantRequests
  const transformVariations = (
    existsVariations: ProductVariantDTO[]
  ): ProductVariantRequest[] => {
    return existsVariations.map((variant) => ({
      productVariantId: variant.productVariantId,
      sku: variant.sku,
      image: variant.image,
      price: variant.price,
      quantity: variant.quantity,
      attributeIds: variant.attributeDTOs.map(
        (attribute) => attribute.attributeId
      ),
    }));
  };

  const handleInputChange =
    (index: number, key: keyof ProductVariantDTO) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const newExistsVariations = [...existsVariations];
      newExistsVariations[index] = {
        ...newExistsVariations[index],
        [key]: event.target.value,
      };
      setExistsVariations(newExistsVariations);
    };

  useEffect(() => {
    const productVariantRequests = transformVariations(existsVariations);
    setProductVariantRequests(productVariantRequests);
  }, [existsVariations]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Biến thể sản phẩm</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="font-semibold">Image</div>
        <div className="font-semibold">SKU</div>
        <div className="font-semibold">Price</div>
        <div className="font-semibold">Quantity</div>
      </div>
      {existsVariations.map((variant, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 mb-4">
          {/*<img src={variant.image} alt="Product" className="w-16 h-16 object-cover"/>*/}
          <VariantsImage
            existsImage={variant.image}
            setImageUrl={(img: string) => {
              const newExistsVariations = [...existsVariations];
              newExistsVariations[index] = {
                ...newExistsVariations[index],
                image: img,
              };
              setExistsVariations(newExistsVariations);
            }}
          />
          <input
            type="text"
            value={variant.sku}
            onChange={handleInputChange(index, "sku")}
            className="h-[44px] border-2 border-gray-200 p-2 rounded"
          />
          <input
            type="number"
            value={variant.price}
            onChange={handleInputChange(index, "price")}
            className="h-[44px] border-2 border-gray-200 p-2 rounded"
          />
          <input
            type="number"
            value={variant.quantity}
            onChange={handleInputChange(index, "quantity")}
            className="h-[44px] border-2 border-gray-200 p-2 rounded"
          />
          <ul>
            {variant.attributeDTOs.map((attribute, attributeIndex) => (
              <li key={attributeIndex} className="list-disc list-inside">
                <strong>{attribute.name}:</strong> {attribute.value}
              </li>
            ))}
          </ul>
          <div className="col-span-4" />
        </div>
      ))}
    </div>
  );
};

export default ProductVariations;
