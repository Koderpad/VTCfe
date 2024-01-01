import { useEffect, useState } from "react";
import CategoryModal from "./AddCategoryModal";
import {
  useGetAllParentCategoriesQuery,
  useGetAllCategoriesQuery,
} from "../../../../../../redux/api/categorysApi";
import { ApiResponseOfGetAllCategoryByShopId } from "./interface/GetAllCategoryByShopIdResponses";
import { updateProduct } from "../../../../../../redux/reducer/addProductSlice";
import { useDispatch, useSelector } from "react-redux";

export const CategoryProduct = () => {
  const [categories, setCategories] = useState<string[]>([]); // ["Thời trang nữ", "Quần"
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const dispatch = useDispatch();

  const {
    data: categoriesShop,
    error,
    isLoading,
    refetch,
  } = useGetAllCategoriesQuery("cate");

  useEffect(() => {
    if (categoriesShop) {
      const data: ApiResponseOfGetAllCategoryByShopId = categoriesShop;
      const categoriesShopName = data.categoryDTOs.map((category) => {
        return category.name;
      });
      setCategories(categoriesShopName);
    }
  }, [isLoading]);

  useEffect(() => {
    refetch();
    if (categoriesShop) {
      const data: ApiResponseOfGetAllCategoryByShopId = categoriesShop;
      const categoriesShopName = data.categoryDTOs.map((category) => {
        return category.name;
      });
      setCategories(categoriesShopName);
    }
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    const data: ApiResponseOfGetAllCategoryByShopId = categoriesShop;
    const selectedId = data.categoryDTOs[selectedIndex - 1].categoryId
      ? data.categoryDTOs[selectedIndex - 1].categoryId
      : null;
    if (selectedId === null) {
      return;
    }
    console.log("seelct id: ", selectedId);
    dispatch(updateProduct({ field: "categoryId", value: selectedId }));
    setSelectedCategoryId(selectedId);
  };

  return (
    <>
      <div id="edit-row is-last-edit-row" className="flex">
        <div
          id="edit-label edit-row-left"
          className="flex pl-5
          w-[180px] h-[40px] justify-center items-center"
        >
          <div id="mandatory">
            <span
              style={{
                color: "#ee4d2d",
              }}
            >
              *
            </span>
          </div>
          <span style={{}}>Ngành hàng</span>
        </div>
        <div
          id="degrade-wrap edit-row-right-full"
          //   className=" flex flex-col justify-center w-[100%]"
          className="flex w-full"
        >
          <div id="product-category" className="w-auto">
            <div id="product-category-box" className="w-auto">
              <div id="product-edit-form-item" className="w-auto">
                <div id="product-edit-form-item-content" className="w-auto">
                  <div id="popover-wrap" className="flex gap-4 w-auto">
                    <div
                      id="product-category-box-inner"
                      className="flex flex-col"
                    >
                      <div className="relative">
                        <select
                          id="select-1"
                          onChange={handleCategoryChange}
                          className="py-3 px-4 pe-16 block border-red-500 rounded-lg text-xl focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        >
                          <option selected>Chọn thể loại</option>
                          {categories.map((category) => {
                            return <option key={category}>{category}</option>;
                          })}
                        </select>
                        <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-8">
                          <svg
                            className="flex-shrink-0 h-4 w-4 text-red-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" x2="12" y1="8" y2="12" />
                            <line x1="12" x2="12.01" y1="16" y2="16" />
                          </svg>
                        </div>
                      </div>
                      {/* <p className="text-sm text-red-600 mt-2">
                        Please select a valid state.
                      </p> */}
                      {/* <p
                        className={`text-sm text-red-600 mt-2 ${
                          isValid ? "hidden" : ""
                        }`}
                      >
                        Please select a valid state.
                      </p> */}
                    </div>
                    {/* Button để mở modal */}
                    {/* <button onClick={openModal}>Thêm Category</button> */}

                    {/* Modal */}
                    {/* <CategoryModal
                      isOpen={isModalOpen}
                      onRequestClose={closeModal}
                      addCategory={addCategory}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
