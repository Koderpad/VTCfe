



interface PageOrderResponse  {
    status: string;
    message: string;
    code: number;
    count: number;
    page: number;
    size: number;
    totalPage: number;
    shopDTO: ShopDTO;
    orderDTOs: OrderDTO[];
}



interface ShopDTO {
    shopId: number;
    name: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    phone: string;
    email: string;
    avatar: string;
    description: string;
    openTime: string;
    closeTime: string;
    status: string;
    customerId: number;
}

interface OrderDTO {
    orderId: number;
    note: string;
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


interface OrderItemDTO {
    orderItemId: number;
    orderId: number;
    cartId: number;
    productVariantDTO: ProductVariantDTO;
    quantity: number;
    price: number;
}

interface VoucherOrderDTO {
    voucherOrderId: number;
    voucherId: number;
    voucherName: string;
    type: boolean; // true: voucher system, false: voucher shop
    orderId: number;
}



import React from 'react'

export default function ShopOrders() {
  return (
    <div>ShopOrders</div>
  )
}







