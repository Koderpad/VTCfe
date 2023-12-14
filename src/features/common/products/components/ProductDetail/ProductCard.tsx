import { useEffect, useState } from "react";
import { useGetProductByIdQuery } from "../../services/productApi";
import { ImageSliderComponent } from "./ImageSlider";
import { ProductCardProductInfo } from "./ProductCardProductInfo";

export const ProductCard = ({ id }) => {
  const [product, setProduct] = useState(null);
  const { data: response, isFetching, isLoading } = useGetProductByIdQuery(id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Access data directly from the response, not by calling the hook again
        setProduct(response.productDTO);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, response]); // Include response as a dependency

  console.log("product", product);

  if (response) console.log("response", response);

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
          <div className="w-full px-4 md:w-2/5 ">
            <ImageSliderComponent />
          </div>
          {/* product info */}
          <div className="w-full px-4 md:w-3/5 ">
            <ProductCardProductInfo product={product} />
          </div>
        </div>
      </div>
    </section>
  );
};

// import { useEffect, useState } from "react";
// import { useGetProductByIdQuery } from "../../services/productApi";
// import { ImageSliderComponent } from "./ImageSlider";
// import { ProductCardProductInfo } from "./ProductCardProductInfo";

// export const ProductCard = ({ id }) => {
//   // const id = 3;
//   const [product, setProduct] = useState(null);
//   const { data: response, isFetching, isLoading } = useGetProductByIdQuery(id);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const response = await useGetProductByIdQuery(id);
//       setProduct(response);
//     };

//     fetchProduct();
//   }, [id]);

//   console.log("product", product);

//   if (response) console.log("response", response);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   if (isFetching) {
//     return <div>Fetching...</div>;
//   }

//   return (
//     <section className="overflow-hidden bg-white py-11 font-poppins">
//       <div className="lg:py-8 md:px-6">
//         <div className="flex flex-wrap w-full">
//           {/* image */}
//           {/* <RingShowcase/> */}
//           <div className="w-full px-4 md:w-2/5 ">
//             <ImageSliderComponent />
//           </div>
//           {/* <ProductCardImages /> */}
//           {/* product info */}
//           <div className="w-full px-4 md:w-3/5 ">
//             <ProductCardProductInfo product={product} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
