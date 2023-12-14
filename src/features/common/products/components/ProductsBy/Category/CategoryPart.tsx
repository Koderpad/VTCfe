import { useEffect, useState } from "react";
import { useGetAllCategoryFromAdminQuery } from "../../../../redux/api/categoryApi";

export const CategoryPart = () => {
  const [data, setData] = useState([]);

  const {
    data: categories,
    error_,
    isLoading_,
  } = useGetAllCategoryFromAdminQuery("arg");

  useEffect(() => {
    try {
      if (categories) setData(categories);
      console.log("categories", categories);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="p-4 mb-5 bg-white border border-gray-200 ">
      <h2 className="text-2xl font-bold dark:text-gray-400">Categories</h2>
      <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
      <ul>
        {data ? (
          data.categoryAdminDTOs?.map((item) => (
            <li className="mb-4" key={item.categoryId}>
              <label
                htmlFor=""
                className="flex items-center dark:text-gray-400 "
              >
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <span className="text-lg">{item.name}</span>
              </label>
            </li>
          ))
        ) : (
          <div>
            <h2>loading...</h2>
          </div>
        )}
      </ul>
      <a
        href="#"
        className="text-base font-medium text-blue-500 hover:underline dark:text-blue-400"
      >
        View More
      </a>
    </div>
  );
};
