// Interface for a single attribute within a product variant
interface AttributeDTO {
    attributeId: number;
    name: string;
    value: string;
    active: boolean;
    shopId: number;
}

// Interface for a single product variant
interface ProductVariantDTO {
    productVariantId: number;
    sku: string;
    image: string;
    price: number;
    quantity: number;
    status: "ACTIVE";
    productId: number;
    productName: string;
    productImage: string;
    attributeDTOs: AttributeDTO[];
}

// Interface for the main product DTO
interface ProductDTO {
    productId: number;
    name: string;
    image: string;
    description: string;
    information: string;
    sold: number;
    status: "ACTIVE";
    categoryId: number;
    brandId: number | null;
    productVariantDTOs: ProductVariantDTO[];
}

// Interface for the successful response body
interface UpdateProductResponse {
    status: string;
    message: string;
    code: number;
    categoryName: null;
    shopName: null;
    rating: number;
    productDTO: ProductDTO;
}

export type {
    UpdateProductResponse,
    ProductDTO,
    ProductVariantDTO,
    AttributeDTO,
}