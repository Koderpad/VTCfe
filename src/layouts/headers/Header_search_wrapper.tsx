import Header_search_cart from "./Header_search_cart";
import Header_search_logo from "./Header_search_logo";
import Header_search_section from "./Header_search_section";

function Header_search_wrapper() {
  return (
    <>
      {/* header search wrapper */}
      <div className="flex items-center justify-center w-full h-[85px] z-[100] bg-transparent">
        {/* header with search */}
        <div
          className="
            flex
            w-4/5
            h-full
            pt-[2rem]
            pb-[0.625rem]
          "
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
