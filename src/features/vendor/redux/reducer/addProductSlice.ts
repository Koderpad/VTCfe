import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

////////////////main
interface ProductState {
  product: any;
  variantTableData: VariantTableData;
  attributeData: { [key: string]: AttributeValuesItem[] };
}

const initialState: ProductState = {
  product: {},
  variantTableData: { data: [] },
  attributeData: {},
};

const productDataInAddProductReducer = createSlice({
  name: "productInAddProduct",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<any>) => {
      state.product = action.payload;
    },
    updateVariantTableData: (
      state,
      action: PayloadAction<VariantTableData>
    ) => {
      return { ...state, variantTableData: action.payload };
    },
    setAttributeData: (
      state,
      action: PayloadAction<{ [key: string]: AttributeValuesItem[] }>
    ) => {
      state.attributeData = action.payload;
    },
    addVariant: (state, action: PayloadAction<VariantDataItem>) => {
      state.variantTableData.data = [
        ...state.variantTableData.data,
        action.payload,
      ];
    },
    addAttribute: (
      state,
      action: PayloadAction<{
        index: number | undefined;
        data: { [key: string]: string[] };
      }>
    ) => {
      const { index, data } = action.payload;

      if (index === undefined || data === undefined) {
        console.log("Index or data is undefined");
        return;
      }

      const attributeData = state.attributeData;
      const oldKey = Object.keys(attributeData)[index];
      const newKey = Object.keys(data)[0];
      const newValue = Object.values(data)[0].map((x) => ({ value: x }));

      if (oldKey || oldKey === "") {
        delete attributeData[oldKey];

        // Thêm khóa mới với giá trị mới tại index của oldKey
        const keys = Object.keys(attributeData);
        const keysBeforeIndex = keys.slice(0, index);
        const keysAfterIndex = keys.slice(index);

        attributeData[newKey] = newValue;

        // Tạo đối tượng mới với khóa mới được thêm vào index của oldKey
        const newData: { [key: string]: AttributeValuesItem[] } = {};

        keysBeforeIndex.forEach((key) => {
          newData[key] = attributeData[key];
        });

        newData[newKey] = newValue;

        keysAfterIndex.forEach((key) => {
          newData[key] = attributeData[key];
        });

        // Gán newData cho state.attributeData
        state.attributeData = newData;
      } else {
        state.attributeData = {
          ...state.attributeData,
          [newKey]: newValue,
        };
      }
    },
    showAttributeData: (state) => {
      console.log("Attribute data in showData:", state.attributeData);
    },
    updateProduct: (
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) => {
      const { field, value } = action.payload;
      state.product = { ...state.product, [field]: value };
    },
    saveProduct: (state) => {
      console.log("Product saved:", state.product);
      // Reset product to an empty object after saving
      state.product = {};
    },
  },
});

export const {
  setProduct,
  updateVariantTableData,
  setAttributeData,
  addVariant,
  addAttribute,
  showAttributeData,
  updateProduct,
  saveProduct,
} = productDataInAddProductReducer.actions;

export default productDataInAddProductReducer.reducer;
