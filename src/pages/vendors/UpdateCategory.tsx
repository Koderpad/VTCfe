import { useParams } from "react-router-dom";
import React, { useState } from "react";
import {
  useUpdateCategoryShopMutation,
  useGetParentCategoriesMutation,
  useGetShopCategoryByIdMutation,
} from "../../features/vendor/redux/api/categorysApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef } from "react";
import { storage } from "../../constants/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface CategoryShopRequest {
  categoryId: number;
  name: string;
  description: string;
  image: string;
  username: string;
  parentId: number;
}

interface CategoryAdminDTO {
  categoryId: number;
  name: string;
  image: string;
  description: string;
  adminOnly: boolean;
  status: string;
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

const metadata = {
  contentType: "image/jpeg",
};

const UpdateCategory = () => {
  const { id } = useParams();

  const [parantCategoryDTOs, setParantCategoryDTOs] = useState<
    CategoryAdminDTO[]
  >([]);
  const [categoryShopRequest, setCategoryShopRequest] =
    useState<CategoryShopRequest>({
      categoryId: 0,
      name: "",
      description: "",
      image: "",
      username: "",
      parentId: 0,
    });

  const [callListParantCategories] = useGetParentCategoriesMutation();
  const [updateCategoryShop] = useUpdateCategoryShopMutation();
  const [category, setCategory] = useState<CategoryDTO>();

  const [imageData, setImageData] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState<string | undefined>(undefined);

  const [getCategoryById] = useGetShopCategoryByIdMutation();

  const navigate = useNavigate();

  const handleGetCategoryById = async () => {
    try {
      const res = await getCategoryById({ id }).unwrap();
      console.log(res);
      setCategory(res.categoryDTO);
      toast.success(res.message);
      setUrl(res.categoryDTO.image);

      const categoryShopRequestData: CategoryShopRequest = {
        categoryId: res.categoryDTO.categoryId,
        name: res.categoryDTO.name,
        description: res.categoryDTO.description,
        image: res.categoryDTO.image,
        username: "", // You may need to provide a value for username
        parentId: res.categoryDTO.parentId,
      };

      setCategoryShopRequest(categoryShopRequestData);
    } catch (error) {
      // @ts-ignore
      console.error(error.data.message);
    }
  };

  const handlecategories = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("/vendor/shop/categories");
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
          setCategoryShopRequest((prevData) => ({
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

  const handleFetchListParantCategories = async () => {
    try {
      const response = await callListParantCategories("").unwrap();
      setParantCategoryDTOs(response.categoryAdminDTOs);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    handleFetchListParantCategories();
    handleGetCategoryById();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCategoryShopRequest({
      ...categoryShopRequest,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateCategoryShop(categoryShopRequest).unwrap();

      console.log("response", response);

      toast.success("Chỉnh sửa danh mục thành công");
      navigate("/vendor/shop/categories");
      // Additional logic or redirection on success
    } catch (error) {
      console.log("error", error);
      toast.error(error.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6">Chỉnh Sửa Danh Mục</h1>
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
            value={categoryShopRequest.name}
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
            value={categoryShopRequest.description}
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

        <div className="mb-6">
          <label
            htmlFor="parentId"
            className="block text-sm font-medium text-gray-600"
          >
            Danh Mục Cha<span className="text-red-500">*</span>
          </label>
          <select
            name="parentId"
            value={categoryShopRequest.parentId}
            onChange={handleChange}
            className="mt-1 p-3 w-full border rounded"
            required
          >
            <option value="">Chọn Danh Mục Cha</option>
            {parantCategoryDTOs.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded"
          >
            Chỉnh Sửa
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
};

export default UpdateCategory;
