import {useNavigate, useParams} from "react-router-dom";
import {
    useAddNewCategoryByAdminMutation,
    useGetCategoryParentByIdMutation
} from "../../features/admin/redux/api/categoryAdminApi.ts";
import React, {useEffect, useRef, useState} from "react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../constants/firebaseConfig.ts";
import {toast, ToastContainer} from "react-toastify";



interface CategoryAdminRequest {
    categoryId: number;
    name: string;
    description: string;
    image: string;
}

const metadata = {
    contentType: "image/jpeg",
};

const UpdateParentCategory = () => {
    const id = useParams();


    const [callApiAddParentCategory] = useAddNewCategoryByAdminMutation();



    const [callApiGetCategoryById] = useGetCategoryParentByIdMutation();

    const [categoryAdminRequest, setCategoryAdminRequest] = useState<CategoryAdminRequest>({
        categoryId: 0,
        name: "",
        description: "",
        image: "",
    });

    const handleGetCategoryById = async () => {
        try {
            const response = await callApiGetCategoryById(id).unwrap();
            const categoryData: CategoryAdminRequest = {
                categoryId: response.categoryAdminDTO.categoryId,
                name: response.categoryAdminDTO.name,
                description: response.categoryAdminDTO.description,
                image: response.categoryAdminDTO.image,
            };

            setCategoryAdminRequest(categoryData);
            setUrl(categoryData.image);

        } catch (error) {
            toast.error(error.data.message);
        }
    };

    useEffect(() => {
        handleGetCategoryById();
    }, []);



    const [imageData, setImageData] = useState<string | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [url, setUrl] = useState<string | undefined>(undefined);

    const navigate = useNavigate();

    const handlecategories = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        navigate("/admin/categories");
    };

    useEffect(() => {
        uploadImageToFirebase();
    }, [imageData]);

    const uploadImageToFirebase = async () => {
        if (imageData) {
            const storageRef = ref(
                storage,
                `images/${Date.now()}-${fileInputRef.current?.files?.[0]?.name}`
            );
            const uploadTask = uploadBytesResumable(
                storageRef,
                dataURLtoBlob(imageData),
                metadata
            );

            uploadTask.on(
                "state_changed",
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                (snapshot) => {
                    // Your existing code to track upload progress
                },
                (error) => {
                    console.error("Error uploading image:", error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setUrl(downloadURL);
                    setCategoryAdminRequest((prevData) => ({
                        ...prevData,
                        image: downloadURL,
                    }));
                }
            );
        }
    };

    const dataURLtoBlob = (dataURL: string): Blob => {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };

    const handleFileChange = () => {
        if (fileInputRef.current && fileInputRef.current.files) {
            const file = fileInputRef.current.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImageData(reader.result as string);
            });
            reader.readAsDataURL(file);
        }
    };



    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setCategoryAdminRequest({
            ...categoryAdminRequest,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await callApiAddParentCategory(categoryAdminRequest).unwrap();
            toast.success("Thêm danh mục cha thành công");
            console.log(response);
            navigate("/admin/categories");
            // Additional logic or redirection on success
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
            <h1 className="text-3xl font-bold mb-6">Thêm Danh Mục</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Tên<span className="text-red-500">*</span>
                    </label>
                    <input
                        name="name"
                        value={categoryAdminRequest.name}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 p-3 w-full border rounded"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Mô Tả<span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        value={categoryAdminRequest.description}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border rounded"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="avatar"
                        className="block text-sm font-medium text-gray-600"
                    >
                        Hình Ảnh<span className="text-red-500">*</span>:
                    </label>
                    <input
                        ref={fileInputRef}
                        id="vtc-upload__input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <div className="flex flex-col gap-4 mt-4">
                        {url && (
                            <img
                                src={url}
                                alt="Hình ảnh đã tải lên"
                                className="w-60 h-60 object-cover rounded"
                            />
                        )}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-blue-500 text-black py-2 px-3 rounded cursor-pointer text-sm self-end"
                        >
                            Chọn Ảnh
                        </button>
                    </div>
                </div>



                <div className="mt-8">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-3 px-6 rounded"
                    >
                        Cập Nhật Danh Mục
                    </button>
                </div>
            </form>
            <br />

            <div>
                <button className={"justify-center"} onClick={handlecategories}>
                    Quay lại
                </button>
            </div>

            <ToastContainer position="bottom-right" />
        </div>
    );
}


export default UpdateParentCategory;