interface CategoryDTO {
  categoryId: number;
  name: string;
  image: string;
  description: string;
  adminOnly: boolean;
  status: "ACTIVE" | "INACTIVE"; // Chọn giá trị có thể là 'ACTIVE' hoặc 'INACTIVE'
  shopId: number;
  parentId?: number; // Optional, nếu có
}

interface ApiResponseOfGetAllCategoryByShopId {
  status: string;
  message: string;
  code: number;
  categoryDTOs: CategoryDTO[];
}

export type { CategoryDTO, ApiResponseOfGetAllCategoryByShopId };
