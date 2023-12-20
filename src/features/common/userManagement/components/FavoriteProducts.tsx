import { Link } from "react-router-dom";
import { useGetFavoriteProductsQuery } from "../../redux/api/productsApi";
import {
  FavoriteProductDTO,
  GetFavoriteApiResponse,
} from "./interface/GetFavoriteProductRes";

export const FavoriteProducts = () => {
  // const { data } = useGetFavoriteProductsQuery;

  const { data, error, isLoading } = useGetFavoriteProductsQuery();
  if (!data) return null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const res: GetFavoriteApiResponse = data;

  return (
    <div className="bg-green-600 w-full h-full ">
      <div className="h-full w-full p-10 bg-white overflow-y-auto">
        <h1 className="text-red-600 text-4xl pb-6">Sản phẩm yêu thích</h1>
        <div>
          {res.favoriteProductDTOs.map((product: FavoriteProductDTO) => (
            // <FavoriteProducts key={product.id} product={product} />
            <div
              key={product.favoriteProductId}
              className="mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm"
            >
              <Link
                // to={`${path.home}${generateNameId({
                //   name: purchase.product.name,
                //   id: purchase.product._id,
                // })}`}
                to={`/product/${product.productDTO.productId}`}
                className="flex"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-20 w-20 object-cover"
                    src={product.productDTO.image}
                    alt="Hình ảnh sản phẩm"
                  />
                </div>
                <div className="ml-3 flex-grow overflow-hidden">
                  <div className="truncate">{product.productDTO.name}</div>
                  {/* <div className="mt-3">x9999</div> */}
                </div>
                <div className="ml-3 flex-shrink-0">
                  {/* <span className="truncate text-gray-500 line-through">₫3213123</span> */}
                  {/* <span className="ml-2 truncate text-orange">
                    {product.productDTO.productVariantDTOs[0].price}
                  </span> */}
                </div>
              </Link>
              {/* <div className="flex justify-end">
        <div>
          <span>Tổng giá tiền</span>
          <span className="ml-4 text-xl text-orange">₫123123123</span>
        </div>
      </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
