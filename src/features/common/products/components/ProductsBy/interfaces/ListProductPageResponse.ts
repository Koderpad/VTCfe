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

export type {
  ListProductPageResponse,
  ProductDTO,
  ProductVariantDTO,
  AttributeDTO,
};
