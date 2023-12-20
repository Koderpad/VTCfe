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
  status: string;
  productId: number;
  productName: string;
  productImage: string;
  attributeDTOs: AttributeDTO[];
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

interface CustomerDTO {
  customerId: number;
  username: string;
  email: string;
  gender: boolean;
  fullName: string;
  birthday: string;
  status: string;
  roles: string[];
}

interface FavoriteProductDTO {
  favoriteProductId: number;
  productDTO: ProductDTO;
}

interface GetFavoriteApiResponse {
  status: string;
  message: string;
  code: number;
  count: number;
  customerDTO: CustomerDTO;
  favoriteProductDTOs: FavoriteProductDTO[];
}

export type {
  AttributeDTO,
  ProductVariantDTO,
  ProductDTO,
  CustomerDTO,
  FavoriteProductDTO,
  GetFavoriteApiResponse,
};
