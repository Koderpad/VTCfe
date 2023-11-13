import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../features/auth/authSlice";
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
      <div className="tw-absolute tw-w-64 tw-left-0 tw-ml-none tw-shadow-lg tw-bg-white tw-rounded">
        {/* content */}
        {/* Dropdown content */}
        <ul className="tw-list-none tw-m-0 tw-p-0 tw-w-full tw-h-full ">
          <li className="tw-py-2 tw-pl-4 tw-text-2xl tw-text-gray-800 hover:tw-text-green-600 hover:tw-bg-gray-200 tw-cursor-pointer tw-transition tw-duration-300 tw-ease-in-out">
            <a href="#">Tài khoản của tôi</a>
          </li>
          <li className="tw-py-2 tw-pl-4 tw-text-2xl tw-text-gray-800 hover:tw-text-green-600 hover:tw-bg-gray-200 tw-cursor-pointer tw-transition tw-duration-300 tw-ease-in-out">
            <a href="#">Đơn mua</a>
          </li>
          <li className="tw-py-2 tw-pl-4 tw-text-2xl tw-text-gray-800 hover:tw-text-green-600 hover:tw-bg-gray-200 tw-cursor-pointer tw-transition tw-duration-300 tw-ease-in-out">
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
