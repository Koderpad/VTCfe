interface ProductVariantRequest {
    productVariantId: number;
    sku: string;
    image: string;
    price: number;
    quantity: number;
    attributeIds: number[];
}

interface ProductUpdateRequest {
    name: string;
    image: string;
    description: string;
    information: string;
    categoryId: number;
    productVariantRequests: ProductVariantRequest[];
}

export type {
    ProductVariantRequest,
    ProductUpdateRequest,
}