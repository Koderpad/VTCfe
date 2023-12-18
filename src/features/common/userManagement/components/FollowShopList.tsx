import { Link } from "react-router-dom";

export const FollowShopList = () => {
  const products = [
    // Add your product data here
    // Example:
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },
    { id: 2, name: "Product 2", price: 150 },

    // ... Add more products
  ];
  return (
    <div className="bg-green-600 w-full h-full ">
      <div className="h-full w-full p-10 bg-white overflow-y-auto">
        <h1 className="text-red-600 text-4xl pb-6">Cửa hàng theo dõi</h1>
        <div>
          {products.map((product) => (
            // <FavoriteProducts key={product.id} product={product} />
            <div
              key={12}
              className="mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm"
            >
              <Link
                // to={`${path.home}${generateNameId({
                //   name: purchase.product.name,
                //   id: purchase.product._id,
                // })}`}
                to="/"
                className="flex"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-20 w-20 object-cover"
                    src="https://firebasestorage.googleapis.com/v0/b/react-firebase-learning-62f42.appspot.com/o/images%2FIMG_1767.jpeg?alt=media&token=5c5ece45-aa44-4fdc-8f39-8f79c74225ce"
                    alt="{purchase.product.name}"
                  />
                </div>
                <div className="ml-3 flex-grow overflow-hidden">
                  <div className="truncate">Tên sản phẩm</div>
                  {/* <div className="mt-3">x9999</div> */}
                </div>
                <div className="ml-3 flex-shrink-0">
                  {/* <span className="truncate text-gray-500 line-through">₫3213123</span> */}
                  <span className="ml-2 truncate text-orange">₫12312</span>
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
