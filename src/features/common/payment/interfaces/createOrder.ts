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
  attributeDTOs: AttributeDTO[];
}

interface AddressDTO {
  addressId: number;
  province: string;
  district: string;
  ward: string;
  fullAddress: string;
  fullName: string;
  phone: string;
  status: string;
}

interface OrderItemDTO {
  orderItemId: number;
  orderId: number;
  cartId: number;
  productVariantDTO: ProductVariantDTO;
  quantity: number;
  price: number;
}

interface VoucherOrderDTO {
  // Define properties for VoucherOrderDTO as needed
}

interface OrderDTO {
  orderId: number | null;
  note: string | null;
  paymentMethod: string;
  shippingMethod: string;
  count: number;
  shopId: number;
  shopName: string;
  totalPrice: number;
  discount: number;
  shippingFee: number;
  paymentTotal: number;
  status: string;
  addressDTO: AddressDTO;
  voucherOrderDTOs: VoucherOrderDTO[] | null;
  orderItemDTOs: OrderItemDTO[];
  orderDate: string;
}

interface ApiResponse {
  status: string;
  message: string;
  code: number;
  username: string;
  orderDTO: OrderDTO;
}

export type {
  ApiResponse,
  OrderDTO,
  OrderItemDTO,
  ProductVariantDTO,
  AttributeDTO,
  AddressDTO,
  VoucherOrderDTO,
};
