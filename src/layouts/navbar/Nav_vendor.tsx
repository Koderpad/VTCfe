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
      navigate("/vendor");
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
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-white no-underline text-xl font-medium p-1 outline-none hover:cursor-pointer"
          onClick={handleClick}
        >
          Kênh Người Bán
        </a>
      </div>
    </>
  );
}

export default Nav_vendor;
