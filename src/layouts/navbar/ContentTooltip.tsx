import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../features/common/auth/authSlice";
import React from "react";
import { persistor } from "../../app/store";

function ContentTooltip() {
  // Trong component của bạn
  const dispatch = useDispatch(); // eslint-disable-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(logOut());
    // await dispatch(logOut());
    //chueyern trang login
    navigate("/login");

    //xoa state
    await persistor.purge();
  };

  return (
    <>
      <div className="absolute w-64 left-0 ml-none shadow-lg bg-white rounded">
        {/* content */}
        {/* Dropdown content */}
        <ul className="list-none m-0 p-0 w-full h-full ">
          <li className="py-2 pl-4 text-2xl text-gray-800 hover:text-green-600 hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out">
            <Link to="/user/account">Tài khoản của tôi</Link>
          </li>
          <li className="py-2 pl-4 text-2xl text-gray-800 hover:text-green-600 hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out">
            <Link to="/user/account/history-purchase">Đơn mua</Link>
          </li>
          <li className="py-2 pl-4 text-2xl text-gray-800 hover:text-green-600 hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out">
            {/* <Link onClick={handleLogout}>Đăng xuất</Link> */}
            <Link to="/login">
              <button onClick={handleLogout}>Đăng xuất</button>
            </Link>
          </li>
        </ul>
        {/* <a>Hi</a>
        <p className="text-sm font-bold text-gray-800 pb-1">
          Keep track of follow ups
        </p>
        <p className="text-xs leading-4 text-gray-600 pb-3">
          Reach out to more prospects at the right moment.
        </p> */}
      </div>
    </>
  );
}

export default ContentTooltip;
