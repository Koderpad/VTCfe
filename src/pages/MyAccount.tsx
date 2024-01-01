import Breadcrumb from "../components/ui/Breadcrumb";
import Footer_v1 from "../layouts/footers/Footer_v1";
import Header_not_fixed from "../layouts/headers/Header_not_fixed";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

function MyAccount() {
  const state = useSelector((state: RootState) => state.auth.user);
  // const username = state ? state["username"] : null;
  const fullName = state ? state["fullName"] : null;

  return (
    // <div className="grid grid-rows-auto">
    <div className="grid grid-rows-auto min-h-screen">
      <Header_not_fixed />

      {/* flex div wrapper */}
      <div className="flex justify-self-center w-[1200px] h-[568px] pt-[20px] pb-[50px] mb-14 min-h-[568px]">
        {/* left nav side */}
        <div className="flex flex-col w-[180px] h-[568px]">
          <Breadcrumb />

          {/* navbar */}
          <div className="mt-11">
            <div>
              {/* name of list */}
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Quản lý tài khoản
              </h1>
              <ul className="pl-4 ">
                <li>
                  <Link to="profile" className=" hover:text-green-600 ">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="pw_changes" className=" hover:text-green-600 ">
                    Password Changes
                  </Link>
                </li>
                <li>
                  <Link to="address" className=" hover:text-green-600 ">
                    Địa chỉ
                  </Link>
                </li>
                {/* space */}
                <li>
                  <Link
                    to="favorite-products"
                    className=" hover:text-green-600 "
                  >
                    Sản phẩm yêu thích
                  </Link>
                </li>
                {/* <li>
                  <Link to="follow-shop" className=" hover:text-green-600 ">
                    Cửa hàng theo dõi
                  </Link>
                </li> */}
                <li>
                  <Link to="voucher-wallet" className=" hover:text-green-600 ">
                    Kho voucher
                  </Link>
                </li>
                <li>
                  <Link
                    to="history-purchase"
                    className=" hover:text-green-600 "
                  >
                    Đơn mua
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* right content side */}
        <div className="flex flex-col w-[1020px] h-[568px] ">
          {/* <div className="flex flex-col w-[1020px] h-[568px]"> */}
          {/* welcome */}
          <div className="self-end">Xin chào, {fullName}</div>

          {/* content */}
          <div className="h-full mt-11 pl-16 ">
            <div className="h-full shadow-xl shadow-indigo-500/40 overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <Footer_v1 />
    </div>
  );
}

export default MyAccount;
