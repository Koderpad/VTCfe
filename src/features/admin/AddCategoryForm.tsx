// AddCategoryForm.tsx
import React, { useState } from 'react';

interface AddCategoryFormProps {
  onClose: () => void;
  onAddCategory: (newCategory: Category) => void;
}

interface Category {
  name: string;
  description: string;
  image: string;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onClose, onAddCategory }) => {
  const [categoryForm, setCategoryForm] = useState<Category>({
    name: '',
    description: '',
    image: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleCreateCategory = () => {
    onAddCategory(categoryForm);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded w-96">
        <h2 className="text-xl font-semibold mb-4">Thêm Danh mục Mới</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            value={categoryForm.name}
            onChange={handleInputChange}
            placeholder="Tên danh mục"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="description"
            value={categoryForm.description}
            onChange={handleInputChange}
            placeholder="Mô tả"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="image"
            value={categoryForm.image}
            onChange={handleInputChange}
            placeholder="Link hình ảnh"
            className="p-2 border border-gray-300 rounded"
          />
          <div className="flex justify-between">
            <button
              onClick={handleCreateCategory}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Thêm Danh mục
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
