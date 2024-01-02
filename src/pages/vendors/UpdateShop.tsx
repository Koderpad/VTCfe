import { useEffect, useRef, useState } from "react";
import { storage } from "../../constants/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  useGetAllProvinceMutation,
  useGetAllDistrictByProvinceCodeMutation,
  useGetAllWardByDistrictCodeMutation,
  useRegisterShopMutation,
  useGetProfileShopMutation,
  useUpdateShopMutation,
} from "../../features/vendor/redux/api/shopApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/common/auth/authSlice";

interface RegisterShopRequest {
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  phone: string;
  email: string;
  avatar: string;
  description: string;
  openTime: string;
  closeTime: string;
  status: string;
  username: string;
}

interface ShopDTO {
  shopId: number;
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  phone: string;
  email: string;
  avatar: string;
  description: string;
  openTime: string;
  closeTime: string;
  status: string;
  customerId: number;
}

interface ShopResponse {
  status: string;
  message: string;
  code: number;
  shopDTO: ShopDTO;
}

interface ListProvinceResponse {
  status: string;
  message: string;
  code: number;
  count: number;
  provinceDTOs: ProvinceDTO[];
}

interface ProvinceDTO {
  provinceCode: string;
  name: string;
}

interface ListDistrictResponse {
  status: string;
  message: string;
  code: number;
  count: number;
  provinceCode: number;
  districtDTOs: DistrictDTO[];
}

interface DistrictDTO {
  districtCode: string;
  name: string;
}

interface ListWardResponse {
  status: string;
  message: string;
  code: number;
  count: number;
  districtCode: number;
  wardDTOs: WardDTO[];
}

interface WardDTO {
  wardCode: string;
  name: string;
}

const metadata = {
  contentType: "image/jpeg",
};

export const UpdateShop = () => {
  const [imageData, setImageData] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState<RegisterShopRequest>({
    name: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    phone: "",
    email: "",
    avatar: "",
    description: "",
    openTime: "",
    closeTime: "",
    status: "",
    username: "",
  });

  const [updateShop] = useUpdateShopMutation();
  const [shopResponse, setShopResponse] = useState<ShopResponse | null>(null);

  const [callProvince] = useGetAllProvinceMutation();
  const [callDistrict] = useGetAllDistrictByProvinceCodeMutation();
  const [callWard] = useGetAllWardByDistrictCodeMutation();

  const [listProvinceResponse, setListProvinceResponse] =
    useState<ListProvinceResponse>();

  const [listDistrict, setListDistrict] = useState<DistrictDTO[]>([]);
  const [listWard, setListWard] = useState<WardDTO[]>([]);

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  const [callShopProfile] = useGetProfileShopMutation();

  const handleGetShopProfile = async () => {
    try {
      const response = await callShopProfile("").unwrap();
      const shopData: RegisterShopRequest = {
        shopId: response.shopDTO.shopId,
        name: response.shopDTO.name,
        address: response.shopDTO.address,
        province: response.shopDTO.province,
        district: response.shopDTO.district,
        ward: response.shopDTO.ward,
        phone: response.shopDTO.phone,
        email: response.shopDTO.email,
        avatar: response.shopDTO.avatar,
        description: response.shopDTO.description,
        openTime: response.shopDTO.openTime,
        closeTime: response.shopDTO.closeTime,
        status: response.shopDTO.status,
        username: response.shopDTO.username,
      };

      setFormData(shopData);
      setUrl(shopData.avatar);
      //setSelectedProvinceName(shopData.province);
      setProvince(shopData.province);
      setDistrict(shopData.district);
      setWard(shopData.ward);
      console.log("response", response);
      console.log("shopData", ward);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetShopProfile();
  }, []);

  const callApiDistrict = async (provinceCode: string) => {
    try {
      const response = await callDistrict(`${provinceCode}`).unwrap();
      setListDistrict(response.districtDTOs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProvinceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvinceCode = e.target.value;
    const selectedProvince = listProvinceResponse?.provinceDTOs.find(
      (province) => province.provinceCode === selectedProvinceCode
    );

    setFormData((prevData) => ({
      ...prevData,
      province: selectedProvince?.name || "",
    }));

    setProvince(selectedProvince?.name || "");
    setDistrict("");
    setWard("");

    if (selectedProvinceCode) {
      callApiDistrict(selectedProvinceCode);
    }
  };

  const callApiWard = async (districtCode: string) => {
    try {
      const response = await callWard(`${districtCode}`).unwrap();
      setListWard(response.wardDTOs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDistrictSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrictCode = e.target.value;

    const selectedDistrict = listDistrict.find(
      (district) => district.districtCode === selectedDistrictCode
    );

    setFormData((prevData) => ({
      ...prevData,
      district: selectedDistrict?.name || "",
    }));

    setDistrict(selectedDistrict?.name || "");
    setWard("");

    if (selectedDistrictCode) {
      callApiWard(selectedDistrictCode);
    }
  };

  const handleWardSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWardCode = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      ward: selectedWardCode || "",
    }));

    setWard(selectedWardCode);
  };

  const callApiProvince = async () => {
    try {
      const response = await callProvince("get-all").unwrap();
      setListProvinceResponse(response);
      setProvince("");
      setDistrict("");
      setWard("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApiProvince();
  }, []);

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
          setFormData((prevData) => ({
            ...prevData,
            avatar: downloadURL,
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await updateShop(formData).unwrap();
      setShopResponse(response);
      toast.success(response?.message);

      navigate("/vendor/shop/profile");
    } catch (error) {
      console.error("Registration failed:", error.data.message);
      toast.error(error.data.message);
    }
  };

  const handleBackShopProfile = (e) => {
    e.preventDefault();
    navigate("/vendor/shop/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 min-h-screen">
      <br />
      <h1 className="text-5xl font-bold mb-6 text-blue-600">
        Cập Nhật Cửa Hàng
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex flex-col gap-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-black text-xl font-bold mb-2"
            >
              Tên cửa hàng<span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input-field rounded border w-full px-3 py-2 text-gray-700 leading-tight text-xl focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-black text-xl font-bold mb-2"
            >
              Địa chỉ<span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="input-field rounded border w-full px-3 py-2 text-gray-700 leading-tight text-xl focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="province"
              className="block text-black text-xl font-bold mb-2"
            >
              Tỉnh/Thành phố:
            </label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={(e) => handleProvinceSelect(e)}
              className="input-field rounded border w-full px-3 py-2 text-gray-700 leading-tight text-xl focus:outline-none focus:shadow-outline"
            >
              <option value="">Chọn Tỉnh/Thành phố</option>
              {listProvinceResponse?.provinceDTOs.map((province) => (
                <option
                  key={province.provinceCode}
                  value={province.provinceCode}
                >
                  {province.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Tỉnh/Thành phố: {province}
            </p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-black text-xl font-bold mb-2"
            >
              Quận/Huyện:
            </label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={(e) => handleDistrictSelect(e)}
              className="input-field rounded border w-full px-3 py-2 text-gray-700 leading-tight text-xl focus:outline-none focus:shadow-outline"
            >
              <option value="">Chọn Quận/Huyện</option>
              {listDistrict.map((district) => (
                <option
                  key={district.districtCode}
                  value={district.districtCode}
                >
                  {district.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">Quận/Huyện: {district}</p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="ward"
              className="block text-black text-xl font-bold mb-2"
            >
              Phường/Xã<span className="text-red-500">*</span>:
            </label>
            <select
              id="ward"
              name="ward"
              value={formData.ward}
              onChange={(e) => handleWardSelect(e)}
              className="input-field rounded border w-full px-3 py-2 text-gray-700 leading-tight text-xl focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Chọn Phường/Xã</option>
              {listWard.map((ward) => (
                <option key={ward.wardCode} value={ward.name}>
                  {ward.name} {formData.ward === ward.wardCode ? "Đã chọn" : ""}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">Phường/Xã: {ward}</p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-black text-xl font-bold mb-2"
            >
              Điện thoại<span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="input-field rounded border w-full px-3 py-2 text-gray-700 leading-tight text-xl focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-black text-xl font-bold mb-2"
            >
              Email<span className="text-red-500">*</span>:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field rounded border w-full px-3 py-2 text-gray-700 leading-tight text-xl focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="avatar"
              className="block text-black text-xl font-bold mb-2"
            >
              Avatar<span className="text-red-500">*</span>:
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
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-500 text-black py-2 px-3 rounded cursor-pointer text-sm self-end"
              >
                Chọn Ảnh
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-black text-xl font-bold mb-2"
            >
              Mô tả<span className="text-red-500">*</span>:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="input-field rounded border w-full px-3 py-2 text-gray-700 leading-tight text-xl resize-none focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="openTime"
              className="block text-black text-xl font-bold mb-2"
            >
              Giờ mở cửa<span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              id="openTime"
              name="openTime"
              value={formData.openTime}
              onChange={handleInputChange}
              placeholder="HH:MM AM/PM"
              className="input-field rounded border w-full px-3 py-2 text-gray-700 leading-tight text-xl"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="closeTime"
              className="block text-black text-xl font-bold mb-2"
            >
              Giờ đóng cửa<span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              id="closeTime"
              name="closeTime"
              value={formData.closeTime}
              onChange={handleInputChange}
              placeholder="HH:MM AM/PM"
              className="input-field rounded border w-full px-3 py-2 text-gray-700 leading-tight text-xl"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded cursor-pointer text-xl focus:outline-none focus:shadow-outline mt-6 self-center"
        >
          Cập Nhật Cửa Hàng
        </button>
      </form>

      <ToastContainer position="bottom-right" />

      <div>
        <button className={"justify-center"} onClick={handleBackShopProfile}>
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default UpdateShop;
