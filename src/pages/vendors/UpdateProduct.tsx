import "react-advanced-cropper/dist/style.css";
import {UpdateProductEdit} from "../../features/vendor/products/components/UpdateProduct/UpdateProductEdit";

export const UpdateProduct = () => {
    return (
        <div id="app" className="w-full h-full">
            {/* <Header /> */}
            <div
                id="full-screen-container"
                // className="flex-grow overflow-auto absolute w-full pt-[56px] bg-[#E4E4E7]"
                className="w-full pt-[56px] bg-[#E4E4E7] pb-10"
            >
                <div id="page" className="h-full w-full">
                    <div id="product" className="pt-[16px]">
                        <div id="product-new" className="flex justify-center">
                            <UpdateProductEdit/>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Footer_v1 /> */}
        </div>
    );
};
