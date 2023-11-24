//create ProductDetail page

import { FilterAndProducts } from "../features/products/components/ProductsBy/Category/FilterAndProducts";
import Footer_v1 from "../layouts/footers/Footer_v1";
import Header_not_fixed from "../layouts/headers/Header_not_fixed";

export const ProductsByCategory = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header_not_fixed />
        {/* filter and product list */}
        <div className="flex justify-center bg-gradient-to-r from-blue-400 to-emerald-400">
          {/* main container */}
          <div className="w-4/5">
            <FilterAndProducts />
          </div>
        </div>

        <Footer_v1 />
      </div>
    </>
  );
};
