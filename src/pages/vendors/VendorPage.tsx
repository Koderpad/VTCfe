import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { persistor } from "../../app/store";
import { logOut } from "../../features/common/auth/authSlice";

export const VendorPage = () => {
  const dispatch = useDispatch(); // eslint-disable-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.split("/").pop();
    if (currentPath === undefined) return;

    if (currentPath === "statistical" && selectedTitle !== "Thongke") {
      setSelectedTitle("Thongke");
    }
    if (currentPath === "orders" && selectedTitle !== "Quanlydonhang") {
      setSelectedTitle("Quanlydonhang");
    }

    console.log(currentPath);
  }, [location.pathname, selectedTitle]);

  const handleTitleClick = (title: string) => {
    setSelectedTitle(title);
  };

  return (
    <div className=" justify-center h-screen bg-gray-100">
      <div className="grid grid-cols-2 h-full sm:grid-cols-6">
        <div className="w-auto m-4 col-start-1 col-end-2 flex h-full flex-col rounded-xl bg-white p-8">
          {/* title ADMIN */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-700 mt-4">
              Cửa hàng
            </h2>
          </div>
          <ul className="space-y-2">
            <li>
              <Link
                to="shop/profile"
                // className="flex font-medium text-gray-600 hover:text-green-400 p-2 rounded-lg bg-gray-100 hover:bg-green-100"
                className={`flex font-medium text-gray-600 hover:text-green-400 p-2 rounded-lg ${
                  selectedTitle === "Shopprofile"
                    ? "bg-gray-100 hover:bg-green-100"
                    : "hover:bg-green-100"
                }`}
                onClick={() => handleTitleClick("Shopprofile")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mr-3 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                Thông tin cửa hàng
              </Link>
            </li>
            <li>
              <a
                href="/vendor/shop/statistical"
                // className="flex font-medium text-gray-600 hover:text-green-400 p-2 rounded-lg hover:bg-green-100"
                className={`flex font-medium text-gray-600 hover:text-green-400 p-2 rounded-lg ${
                  selectedTitle === "Thongke"
                    ? "bg-gray-100 hover:bg-green-100"
                    : "hover:bg-green-100"
                }`}
                onClick={() => handleTitleClick("Thongke")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mr-3 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
                Thống kê
              </a>
            </li>
            <li>
              <Link
                to="shop/vouchers"
                // to="manager/customers"
                // className="flex font-medium text-gray-600 hover:text-green-400 p-2 rounded-lg hover:bg-green-100"
                className={`flex font-medium text-gray-600 hover:text-green-400 p-2 rounded-lg ${
                  selectedTitle === "Quanlyvoucher"
                    ? "bg-gray-100 hover:bg-green-100"
                    : "hover:bg-green-100"
                }`}
                onClick={() => handleTitleClick("Quanlyvoucher")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mr-3 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                Quản lý voucher
              </Link>
            </li>
            <li>
              <Link
                to="/vendor/shop/categories"
                className={`flex font-medium text-gray-600 hover:text-green-400 p-2 rounded-lg ${
                  selectedTitle === "Quanlycategory"
                    ? "bg-gray-100 hover:bg-green-100"
                    : "hover:bg-green-100"
                }`}
                onClick={() => handleTitleClick("Quanlycategory")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mr-3 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
                Quản lý danh mục
              </Link>
            </li>
            <li>
              <Link
                to="shop/products"
                className={`flex font-medium text-gray-600 hover:text-green-400 p-2 rounded-lg ${
                  selectedTitle === "Quanlyproduct"
                    ? "bg-gray-100 hover:bg-green-100"
                    : "hover:bg-green-100"
                }`}
                onClick={() => handleTitleClick("Quanlyproduct")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mr-3 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Quản lý sản phẩm
              </Link>
            </li>
            <li>
              <a
                href="/vendor/shop/orders"
                // className="flex font-medium text-gray-600 hover:text-green-400 p-2 rounded-lg hover:bg-green-100"
                className={`flex font-medium text-gray-600 hover:text-green-400 p-2 rounded-lg ${
                  selectedTitle === "Quanlydonhang"
                    ? "bg-gray-100 hover:bg-green-100"
                    : "hover:bg-green-100"
                }`}
                onClick={() => handleTitleClick("Quanlydonhang")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mr-3 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
                Quản lý đơn hàng
              </a>
            </li>
          </ul>

          <a
            href="#"
            onClick={async () => {
              localStorage.removeItem("token");
              window.location.reload();

              dispatch(logOut());

              navigate("/login");

              await persistor.purge();
            }}
            className="flex font-medium text-gray-600 hover:text-green-400 p-2 rounded-lg hover:bg-green-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              stroke="currentColor"
              className="mr-3 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            Đăng xuất
          </a>
        </div>

        <div className="w-auto m-4 col-start-2 col-end-7  p-8 bg-white rounded-xl flex ">
          <div className="font-medium text-gray-600 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
