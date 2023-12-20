// interface AttributeDTO {
//   attributeId: number;
//   name: string;
//   value: string;
//   active: boolean;
//   shopId: number;
// }

// interface ProductVariantDTO {
//   productVariantId: number;
//   sku: string;
//   image: string;
//   price: number;
//   quantity: number;
//   status: string;
//   productId: number;
//   productName: string;
//   productImage: string;
//   attributeDTOs: AttributeDTO[];
// }

// interface OrderItemDTO {
//   orderItemId: number;
//   orderId: number;
//   cartId: number;
//   productVariantDTO: ProductVariantDTO;
//   quantity: number;
//   price: number;
// }

// interface AddressDTO {
//   addressId: number;
//   province: string;
//   district: string;
//   ward: string;
//   fullAddress: string;
//   fullName: string;
//   phone: string;
//   status: string;
// }

// interface VoucherOrderDTO {
//   voucherOrderId: number;
//   voucherId: number;
//   voucherName: string;
//   type: boolean;
//   orderId: number;
// }

// interface OrderDTO {
//   orderId: number;
//   note: string | null;
//   paymentMethod: string;
//   shippingMethod: string;
//   count: number;
//   shopId: number;
//   shopName: string;
//   totalPrice: number;
//   discount: number;
//   shippingFee: number;
//   paymentTotal: number;
//   status: string;
//   addressDTO: AddressDTO;
//   voucherOrderDTOs: VoucherOrderDTO[];
//   orderItemDTOs: OrderItemDTO[];
//   orderDate: string;
// }

// export interface GetOrderByStatusApiResponse {
//   status: string;
//   message: string;
//   code: number;
//   username: string;
//   count: number;
//   orderDTOs: OrderDTO[];
// }

export interface AttributeDTO {
  attributeId: number;
  name: string;
  value: string;
  active: boolean;
  shopId: number;
}

export interface ProductVariantDTO {
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

export interface OrderItemDTO {
  orderItemId: number;
  orderId: number;
  cartId: number;
  productVariantDTO: ProductVariantDTO;
  quantity: number;
  price: number;
}

export interface AddressDTO {
  addressId: number;
  province: string;
  district: string;
  ward: string;
  fullAddress: string;
  fullName: string;
  phone: string;
  status: string;
}

export interface VoucherOrderDTO {
  voucherOrderId: number;
  voucherId: number;
  voucherName: string;
  type: boolean;
  orderId: number;
}

export interface OrderDTO {
  orderId: number;
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
  voucherOrderDTOs: VoucherOrderDTO[];
  orderItemDTOs: OrderItemDTO[];
  orderDate: string;
}

export interface GetOrderByStatusApiResponse {
  status: string;
  message: string;
  code: number;
  username: string;
  count: number;
  orderDTOs: OrderDTO[];
}
