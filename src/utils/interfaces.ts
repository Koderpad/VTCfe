// Tạo các interface tương ứng với cấu trúc dữ liệu trả về từ API

interface IAttribute {
  attributeId: number;
  name: string;
  value: string;
  active: boolean;
  shopId: number;
}

interface IProductVariant {
  productVariantId: number;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  status: string;
  productId: number;
  attributeDTOs: IAttribute[];
}

interface IProduct {
  productId: number;
  name: string;
  image: string;
  description: string;
  information: string;
  sold: number;
  status: string;
  categoryId: number;
  brandId: number;
  productVariantDTOs: IProductVariant[];
}


interface IUser {
  //   customerId: 4;
  username: string;
  email: string;
  gender: true;
  fullName: string;
  birthday: string;
  roles: string[];
}

//export all interfaces
export type { IProduct, IProductVariant, IAttribute, IUser };