import Header_search_cart from "./Header_search_cart";
import Header_search_logo from "./Header_search_logo";
import Header_search_section from "./Header_search_section";

function Header_search_wrapper() {
  return (
    <>
      {/* header search wrapper */}
      <div className=" w-full h-[85px] z-[100] bg-none px-60 py-2">
        {/* header with search */}
        <div className="flex items-center justify-between w-full h-full gap-10"
        >
          {/* search logo */}
          <Header_search_logo />

          {/* search section */}
          <Header_search_section />
          {/* end search */}

          {/* search cart */}
          <Header_search_cart />
          {/* end search cart */}
        </div>
      </div>
    </>
  );
}

export default Header_search_wrapper;
