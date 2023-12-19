import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "react";
import { useUser } from "../../hooks/states/useUser";
import { persistor } from "../../app/store";

function Nav_vendor() {
  const user = useUser();
  const navigate = useNavigate();

  if (!user) {
    return;
  }

  const handleClick = () => {
    if (user.roles.includes("VENDOR")) {
      navigate("/vendor/shop");
    } else if (user.roles.includes("CUSTOMER")) {
      navigate("/vendor/register");
    } else {
      persistor.purge();
      navigate("/login");
    }
  };

  return (
    <>
      <div className="flex items-center">
        {/* shopee */}
        <Link
          to={"/vendor/register"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white no-underline text-xl font-medium p-1 outline-none"
          onClick={handleClick}
        >
          Kênh Người Bán
        </Link>
      </div>
    </>
  );
}

export default Nav_vendor;
