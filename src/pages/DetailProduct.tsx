//create ProductDetail page

import { useParams } from "react-router-dom";
import { ProductCard } from "../features/common/products/components/ProductDetail/ProductCard";
import Footer_v1 from "../layouts/footers/Footer_v1";
import Header_not_fixed from "../layouts/headers/Header_not_fixed";
import Reviews from "./gest/Reviews.tsx";

export const DetailProduct = () => {
  const { productId } = useParams();
  console.log("productId", productId);

  return (
    // <>
    //   <div className="flex flex-col min-h-screen">
    //     <Header_not_fixed />
    //     {/* page product */}
    //     <div className="flex justify-center bg-gradient-to-r from-blue-400 to-emerald-400">
    //       {/* main container */}
    //       <div className="w-4/5">
    //         <ProductCard id={productId} />
    //       </div>
    //     </div>

    //     <div>
    //       <h1 className="font-bold">Danh Sách Đánh giá:</h1>
    //       <Reviews reviewId={productId} />
    //     </div>

    //     <Footer_v1 />
    //   </div>
    // </>
    <>
      <div className="flex flex-col min-h-screen">
        <Header_not_fixed />

        {/* page product */}
        <div className="flex justify-center bg-gradient-to-r from-blue-400 to-emerald-400">
          {/* main container */}
          <div className="w-4/5">
            <ProductCard id={productId} />
          </div>
        </div>

        {/* review section */}
        <div className="flex justify-center bg-gradient-to-r from-blue-400 to-emerald-400 pt-4">
          <div className="w-4/5 mx-auto overflow-hidden bg-white py-11 font-poppins">
            <h1 className="font-bold text-2xl mb-4">Danh Sách Đánh giá:</h1>
            <Reviews reviewId={productId} />
          </div>
        </div>

        <Footer_v1 />
      </div>
    </>
  );
};
