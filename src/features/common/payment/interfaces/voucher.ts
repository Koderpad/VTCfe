interface VoucherDTO {
  voucherId: number;
  status: string;
  code: string;
  name: string;
  description: string;
  discount: number;
  minPrice: number;
  maxPrice: number;
  maxDiscount: number;
  quantity: number;
  startDate: string;
  endDate: string;
  quantityUsed: number;
  type: string;
}

// Thêm các thuộc tính cụ thể cho voucher của cửa hàng nếu có
interface ShopVoucherDTO extends VoucherDTO {
  // Thuộc tính cụ thể cho voucher của cửa hàng
  // Ví dụ: shopSpecificProperty: string;
}

// Thêm các thuộc tính cụ thể cho voucher của hệ thống nếu có
interface SystemVoucherDTO extends VoucherDTO {
  // Thuộc tính cụ thể cho voucher của hệ thống
  // Ví dụ: systemSpecificProperty: number;
}

export type { VoucherDTO, ShopVoucherDTO, SystemVoucherDTO };
