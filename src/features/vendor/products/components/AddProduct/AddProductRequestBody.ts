interface ProductVariantRequest {
  productVariantId?: number;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  attributeIds: number[];
}

interface AddProductRequest {
  name?: string;
  image?: string;
  description?: string;
  information?: string;
  categoryId?: number;
  brandId?: number;
  productVariantRequests?: ProductVariantRequest[];
}

export type { AddProductRequest, ProductVariantRequest };
