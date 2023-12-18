//create ProductDetail page

import { useParams } from "react-router-dom";
import { ProductCard } from "../features/common/products/components/ProductDetail/ProductCard";
import Footer_v1 from "../layouts/footers/Footer_v1";
import Header_not_fixed from "../layouts/headers/Header_not_fixed";

export const DetailProduct = () => {
  const { productId } = useParams();
  console.log("productId", productId);

  // const [productData, setProductData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch data using axios or your preferred method
  //       const response = await fetch(
  //         `http://localhost:8181/api/product/detail/${productId}`
  //       );
  //       const data = await response.json();

  //       console.log("data", data);

  //       // Set the fetched data to the state
  //       setProductData(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [productId]);

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
