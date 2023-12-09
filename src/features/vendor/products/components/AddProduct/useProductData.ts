import { useEffect, useState } from "react";

interface VariantDataItem {
  attributeName1?: string;
  attributeName2?: string;

  attributeLength1?: number;
  attributeLength2?: number;

  attributeValue1: string;
  attributeValue2?: string;

  hasImage: boolean;
  sku: string;
  image?: string;
  price: string;
  stock: string;
}

interface VariantTableData {
  data: VariantDataItem[];
}

interface AttributeValuesItem {
  value: string;
}

// interface AttributeValues {
//   data: AttributeValuesItem[];
// }

// type OnAttributesDataChangeType = (data: {
//   [key: string]: AttributeValuesItem[];
// }) => void;

export const useProductData = () => {
  const [product, setProduct] = useState({});

  const [variantTableData, setVariantTableData] = useState<VariantTableData>({
    data: [],
  });

  const [attributeData, setAttibuteData] = useState<{
    [key: string]: AttributeValuesItem[];
  }>({});

  useEffect(() => {
    console.log("Variant table data:", variantTableData);
  }, [variantTableData]);

  //function of variant table
  const addVariant = (data: VariantDataItem) => {
    setVariantTableData((prevData) => ({
      data: [...prevData.data, data],
    }));
  };

  useEffect(() => {
    console.log("Attribute data:", attributeData);
  }, [attributeData]);

  const addAttribute = (data: { [key: string]: string[] }) => {
    const attributeData = Object.keys(data).map((key) => ({
      [key]: data[key].map((value) => ({ value })),
    }));
    setAttibuteData(attributeData.reduce((acc, curr) => ({ ...acc, ...curr })));
  };

  const showAttributeData = () => {
    console.log("Attribute data in table:", attributeData);
  };

  const updateProduct = (field: any, value: any) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  const saveProduct = () => {
    console.log("Product saved:", product);
    //then
    setProduct({});
  };

  return {
    product,
    updateProduct,
    saveProduct,

    addVariant,

    addAttribute,
    showAttributeData,
  };
};
