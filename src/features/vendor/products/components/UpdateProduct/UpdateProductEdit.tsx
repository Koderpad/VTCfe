import {useNavigate, useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Image} from "./MainContent/Image";
import {useEffect, useState} from "react";
import {useGetProductDetailQuery, useUpdateProductMutation,} from "../../../redux/api/updateProductApi";
import {GetProductDetailApiResponse, ProductVariantDTO} from "./interfaces/GetProductDetailResponsesBody";
import {Name} from "./MainContent/Name";
import {Category} from "./MainContent/Category";
import {Description} from "./MainContent/Description";
import {Info} from "./MainContent/Info";
import {ProductUpdateRequest, ProductVariantRequest} from "./interfaces/UpdateProductRequestBody.ts";
import ProductVariations from "./MainContent/ProductVariations.tsx";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export const UpdateProductEdit = () => {
    const {id} = useParams<{
        id: string
    }>();
    const [updateProduct, {isLoading: isUpdating, isError: updateError}] =
        useUpdateProductMutation();
    const {
        data: productDetail,
        isLoading: isLoading,
        isError: fetchError,
        refetch,
    } = useGetProductDetailQuery(id);

    const [image, setImage] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [info, setInfo] = useState<string>("");
    const [productVariantRequests, setProductVariantRequests]
        = useState<ProductVariantRequest[]>([]);

    const [productVariantDTOs, setProductVariantDTOs]
        = useState<ProductVariantDTO[]>([]);

    const navigate = useNavigate();

    const fetchData = async () => {
        await refetch();
        if (isLoading) {
            return <h1>Đang lấy dữ liệu</h1>;
        }
        if (productDetail) {
            const productDetailResponse: GetProductDetailApiResponse = productDetail;
            setImage(productDetailResponse.productDTO.image);
            setName(productDetailResponse.productDTO.name);
            setCategoryId(productDetailResponse.productDTO.categoryId);
            setDescription(productDetailResponse.productDTO.description);
            setInfo(productDetailResponse.productDTO.information);
            setProductVariantDTOs(productDetailResponse.productDTO.productVariantDTOs);
        } else {
            toast.error("Lỗi khi lấy dữ liệu sản phẩm");
        }
    };

    useEffect(() => {
        fetchData();
    }, [isLoading, productDetail]);

    if (!id) {
        alert("ID is missing from the route parameters.")
        throw new Error("ID is missing from the route parameters.");
    }

    const handleSaveProduct = async () => {
        const productUpdateRequest: ProductUpdateRequest = {
            name: name,
            image: image,
            description: description,
            information: info,
            categoryId: categoryId,
            productVariantRequests: productVariantRequests,
        };

        try {
            const response: {
                data: any;
            } | {
                error: FetchBaseQueryError | SerializedError;
            } = await updateProduct({id: parseInt(id), ...productUpdateRequest});
            if ('data' in response && response.data.status === "success") {
                toast.success(response.data.message);
                navigate("/vendor/shop/products");
                return;
            } else {
                // If the server responds with a message, display it
                if ('data' in response.error && response.error.data.message) {
                    toast.error(response.error.data.message);
                } else {
                    toast.error("Failed to update product");
                }
            }
        } catch (error) {
            // If the error has a message, display it
            if (error.message) {
                toast.error(error.message);
            } else {
                toast.error("An error occurred while updating the product");
            }
        }
    }


    return (
        <div id="product-edit" className="w-[75%]  bg-[#E4E4E7]">
            <div id="product-edit-container" className="w-full">
                <div id="product-edit-main" className="flex flex-col w-full">
                    {/* info */}
                    <div id="product-edit-section" className="bg-[#FAFAF9]">
                        <div id="product-basic-info" className="px-[24px] pt-[24px]">
                            <div id="panel-header" className="mb-[24px]">
                <span className="text-[20px] font-semibold text-[#222222] mb-[16px]">
                  Thông tin cơ bản
                </span>
                            </div>
                            <div id="panel-content-wrapper" className="mb-[24px]">
                                <div id="panel-content" className="">
                                    <div id="container" className="flex flex-col">
                                        <Image
                                            existsImage={image}
                                            setImageUrl={(img: string) => setImage(img)}
                                        />
                                        <Name
                                            existsName={name}
                                            setName={(name: string) => setName(name)}
                                        />
                                        <Category
                                            existsCategoryId={categoryId}
                                            setCategoryId={(id: number) => setCategoryId(id)}
                                        />
                                        <Description
                                            existsDescription={description}
                                            setDescription={(des: string) => setDescription(des)}
                                        />
                                        <Info
                                            existsInfo={info}
                                            setInfo={(info: string) => setInfo(info)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*rest ......*/}

                    <section id="product-edit-section" className="mt-[16px] bg-[#FAFAF9]">
                        <div
                            id="product-detail-panel product-sales-info"
                            className="px-[24px] pt-[24px]"
                        >
                            <div id="panel-header" className="mb-[24px]">
                <span className="text-[20px] font-semibold text-[#222222] mb-[16px]">
                  Thông tin biến thể
                </span>
                            </div>
                            <div id="panel-content-wrapper" className="mb-[24px]">
                                <div id="panel-content" className="">
                                    {/* component để hiển thị những biến thể của sản phẩm */}
                                    <ProductVariations
                                        existsVariations={productVariantDTOs}
                                        setExistsVariations={setProductVariantDTOs}
                                        setProductVariantRequests={
                                            (requests: ProductVariantRequest[]) =>
                                                setProductVariantRequests(requests)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* save */}
                    <div
                        id="product-selected-fix shopee-fix-bottom-card"
                        className="w-full h-[56px] mt-[16px] bg-[#FAFAF9]"
                    >
                        <div id="container" className="flex w-full">
                            <div id="container-left" className="w-0 h-0"></div>
                            <div
                                id="container-right btn-group"
                                className="flex justify-end p-4 w-full gap-10"
                            >
                                <button onClick={
                                    () => navigate("/vendor/shop/products")
                                }>Hủy
                                </button>
                                <button type="submit" onClick={handleSaveProduct}>
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right"/>
        </div>
    );
};