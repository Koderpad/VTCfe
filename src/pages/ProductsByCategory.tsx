//create ProductDetail page

import { useParams } from "react-router-dom";
import { FilterAndProducts } from "../features/common/products/components/ProductsBy/Category/FilterAndProducts";
import Footer_v1 from "../layouts/footers/Footer_v1";
import Header_not_fixed from "../layouts/headers/Header_not_fixed";

export const ProductsByCategory = () => {
  const { id } = useParams();
  const id_ = parseInt(id!);
  if (isNaN(id_)) {
    alert("Category not found");
    window.location.href = "/";
  }
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header_not_fixed />
        {/* filter and product list */}
        <div className="flex justify-center bg-gradient-to-r from-blue-400 to-emerald-400">
          {/* main container */}
          <div className="w-4/5">
            <FilterAndProducts categoryId={id_} />
          </div>
        </div>

        <Footer_v1 />
      </div>
    </>
  );
};
