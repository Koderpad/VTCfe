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
    <div className="tw-grid tw-grid-rows-auto">
      <Header_not_fixed />

      {/* flex div wrapper */}
      <div className="tw-flex tw-justify-self-center tw-w-[1200px] tw-h-[568px] tw-pt-[20px] tw-pb-[50px] tw-mb-14">
        {/* left nav side */}
        <div className="tw-flex tw-flex-col tw-w-[180px] tw-h-[568px]">
          <Breadcrumb />

          {/* navbar */}
          <div className="tw-mt-11">
            <div>
              {/* name of list */}
              <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-1">
                Manage My Account
              </h1>
              <ul className="tw-pl-4 ">
                <li>
                  <Link to="profile" className=" hover:tw-text-green-600 ">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="pw_changes" className=" hover:tw-text-green-600 ">
                    Password Changes
                  </Link>
                </li>
                <li>
                  <Link to="dashboard" className=" hover:tw-text-green-600 ">
                    My Payment Options
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* right content side */}
        <div className="tw-flex tw-flex-col tw-w-[1020px] tw-h-[568px]">
          {/* welcome */}
          <div className="tw-self-end">Xin chào, {fullName}</div>

          {/* content */}
          <div className="tw-h-full tw-mt-11 tw-pl-16 ">
            <div className="tw-h-full tw-shadow-xl tw-shadow-indigo-500/40">
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
