//create ProductDetail page

import { useParams } from "react-router-dom";
import { ProductCard } from "../features/common/products/components/ProductDetail/ProductCard";
import Footer_v1 from "../layouts/footers/Footer_v1";
import Header_not_fixed from "../layouts/headers/Header_not_fixed";

export const DetailProduct = () => {
  const { productId } = useParams();
  console.log("productId", productId);

  return (
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

        <Footer_v1 />
      </div>
    </>
  );
};
