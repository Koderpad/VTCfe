interface AttributeDTO {
  attributeId: number;
  name: string;
  value: string;
  active: boolean;
  shopId: number;
}

interface ProductVariantDTO {
  productVariantId: number;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  status: "ACTIVE" | "INACTIVE"; // Chọn giá trị có thể là 'ACTIVE' hoặc 'INACTIVE'
  productId: number;
  attributeDTOs: AttributeDTO[];
}

interface ProductDTO {
  productId: number;
  name: string;
  image: string;
  description: string;
  information: string;
  sold: number;
  status: "ACTIVE" | "INACTIVE"; // Chọn giá trị có thể là 'ACTIVE' hoặc 'INACTIVE'
  categoryId: number;
  brandId: number | null;
  productVariantDTOs: ProductVariantDTO[];
}

interface AddProductResponse {
  status: string;
  message: string;
  code: number;
  categoryName?: string;
  shopName?: string;
  rating?: number;
  productDTO?: ProductDTO;
}

export type { AddProductResponse };
