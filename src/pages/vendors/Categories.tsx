import {
    useGetShopCategoriesMutation
} from "../../features/vendor/redux/api/categorysApi";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";


interface ListCategoryShopResponse {
    status: string;
    message: string;
    code: number;
    categoryDTOs: CategoryDTO[];
}

interface CategoryDTO {
    categoryId: number;
    name: string;
    image: string;
    description: string;
    adminOnly: boolean;
    status: string;
    shopId: number;
    parentId: number;
}


export default function Categories() {

    const [getShopCategories] = useGetShopCategoriesMutation();

    const [categories, setCategories] = React.useState<CategoryDTO[]>([]);

    const navigate = useNavigate();

    const handleGetShopCategories = async () => {
        try {
            const res = await getShopCategories("").unwrap();
            console.log(res);
            setCategories(res.categoryDTOs);
            toast.success(res.message);

        } catch (error) {
            // @ts-ignore
            console.error(error.data.message);
        }
    };

    useEffect(() => {
        handleGetShopCategories();
    }, []);

    const handleNewCategory = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        navigate("/vendor/shop/category/add");
    }


    return (
        <div className="container mx-auto p-4">
            <h3 className="text-2xl font-bold mb-4">Danh sách danh mục của cửa hàng</h3>

            <div className="mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNewCategory}
                >
                    Tạo danh mục mới
                </button>
            </div>

            <div className="mb-4">
                <table className="table-auto w-full">
                    <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">Tên</th>
                        <th className="px-4 py-2 text-left">Mô tả</th>
                        <th className="px-4 py-2 text-left">Ảnh</th>
                        <th className="px-4 py-2 text-left">Trạng thái</th>
                        <th className="px-4 py-2 text-left">Chỉnh sửa</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories &&
                        categories.map((category) => (
                            <tr key={category.categoryId}>
                                <td className="px-4 py-2">{category.name}</td>
                                <td className="px-4 py-2">{category.description}</td>
                                <td className="px-4 py-2">
                                    <img src={category.image} alt={category.name} className="w-16 h-16" />
                                </td>
                                <td className="px-4 py-2">{category.status}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => {
                                            navigate(`/vendor/shop/category/edit/${category.categoryId}`);
                                        }}
                                    >
                                        Chỉnh sửa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <ToastContainer position="bottom-right" />
            </div>
        </div>
    );

}



