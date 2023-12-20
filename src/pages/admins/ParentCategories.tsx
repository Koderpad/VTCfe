import React, {useEffect, useState} from "react";
import {useGetParentCategoriesMutation} from "../../features/vendor/redux/api/categorysApi.ts";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";


interface CategoryAdminDTO {
    categoryId: number;
    name: string;
    image: string;
    description: string;
    adminOnly: boolean;
    status: string;
}


const ParentCategories = () => {

    const [parentCategoryDTOs, setParentCategoryDTOs] = useState<
        CategoryAdminDTO[]
    >([]);
    const [callListParentCategories] = useGetParentCategoriesMutation();

    const navigate = useNavigate();
    const handleFetchListParentCategories = async () => {
        try {
            const response = await callListParentCategories("").unwrap();
            setParentCategoryDTOs(response.categoryAdminDTOs);
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    useEffect(() => {
        handleFetchListParentCategories();
    }, []);



    const handleNewParentCategory = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        navigate("/admin/category/add");
    }


    return (
        <div className="container mx-auto p-4">
            <h3 className="text-2xl font-bold mb-4">Danh sách danh mục cha</h3>

            <div className="mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNewParentCategory}
                >
                    Tạo danh mục cha mới
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
                    {parentCategoryDTOs &&
                        parentCategoryDTOs.map((category) => (
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
                                            navigate(`/admin/category/edit/${category.categoryId}`);
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

export default ParentCategories;