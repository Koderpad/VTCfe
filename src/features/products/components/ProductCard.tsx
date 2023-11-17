import { ProductCardImages } from "./ProductCardImages";
import { ProductCardProductInfo } from "./ProductCardProductInfo";

export const ProductCard = () => {
  return (
    <section className="overflow-hidden bg-white py-11 font-poppins">
      <div className="lg:py-8 md:px-6">
        <div className="flex flex-wrap w-full">
          {/* image */}
          <ProductCardImages />
          {/* product info */}
          <div className="w-full px-4 md:w-1/2 ">
            <ProductCardProductInfo />
          </div>
        </div>
      </div>
    </section>
  );
};
