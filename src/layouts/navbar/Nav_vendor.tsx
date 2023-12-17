import { Link } from "react-router-dom";

function Nav_vendor() {
  return (
    <>
      <div className="flex items-center">
        {/* shopee */}
        <Link
          to={"/vendor"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white no-underline text-xl font-medium p-1 outline-none"
        >
          Kênh Người Bán
        </Link>
      </div>
    </>
  );
}

export default Nav_vendor;
