import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  categoryId: number;
  name: string;
  image: string;
  description?: string;
  adminOnly?: boolean;
  status: string;
}

interface getAllParentRes {
  status: string;
  message: string;
  code: number;
  categoryAdminDTOs: Category[];
}

export const CategoryPart = () => {
  // const [data, setData] = useState([]);
  const [categoryItems, setCategoryItems] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:8181/api/vendor/shop/category/all-parent",
          {
            method: "GET",
          }
        );

        if (res) {
          const data: getAllParentRes = await res.json();
          console.log(data);
          setCategoryItems(data.categoryAdminDTOs);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 mb-5 bg-white border border-gray-200 ">
      <h2 className="text-2xl font-bold dark:text-gray-400">Danh mục cha</h2>
      <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
      <ul>
        {categoryItems ? (
          categoryItems.map((item) => (
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
