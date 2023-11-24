import { useGetProductByIdQuery } from "../../services/productApi";
import { ImageSliderComponent } from "./ImageSlider";
import { ProductCardProductInfo } from "./ProductCardProductInfo";

export const ProductCard = () => {

  const id =3;
   const {
     data:response,
     isFetching,
     isLoading,
  } = useGetProductByIdQuery(id);
  console.log(response?.productDTO);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isFetching) {
    return <div>Fetching...</div>;
  }
  
  return (
    <section className="overflow-hidden bg-white py-11 font-poppins">
      <div className="lg:py-8 md:px-6">
        <div className="flex flex-wrap w-full">
          {/* image */}
          {/* <RingShowcase/> */}
          <div className="w-full px-4 md:w-2/5 ">
            <ImageSliderComponent />
          </div>
          {/* <ProductCardImages /> */}
          {/* product info */}
          <div className="w-full px-4 md:w-3/5 ">
            <ProductCardProductInfo />
          </div>
        </div>
      </div>
    </section>
  );
};
