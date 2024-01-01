import { useParams } from "react-router-dom";
import Footer_v1 from "../layouts/footers/Footer_v1";
import Header_not_fixed from "../layouts/headers/Header_not_fixed";
import SearchProducts from "../features/common/products/components/ProductsBy/Search/SearchProducts";

export const ProductsBySearch = () => {
  const { keyword, page, size } = useParams(); // Use useParams to get parameters directly

  if (
    isNaN(Number(page)) ||
    isNaN(Number(size)) ||
    Number(page) < 0 ||
    Number(size) < 0 ||
    keyword === undefined
  ) {
    alert("Lỗi URL không hợp lệ, quay về trang chủ!");
    window.location.href = "/";
    return <></>;
  }
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header_not_fixed />
        {/* filter and product list */}
        <div className="flex justify-center bg-gradient-to-r from-blue-400 to-emerald-400">
          {/* main container */}
          <div className="w-4/5">
            <SearchProducts
              keyword={keyword}
              page={Number(page)}
              size={Number(size)}
            />
          </div>
        </div>

        <Footer_v1 />
      </div>
    </>
  );
};
