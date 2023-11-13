import Header_search_cart from "./Header_search_cart";
import Header_search_logo from "./Header_search_logo";
import Header_search_section from "./Header_search_section";

function Header_search_wrapper() {
  return (
    <>
      {/* header search wrapper */}
      <div className="tw-flex tw-items-center tw-justify-center tw-w-full tw-h-[85px] tw-z-[100] tw-bg-transparent">
        {/* header with search */}
        <div
          className="
            tw-flex
            tw-w-4/5
            tw-h-full
            tw-pt-[2rem]
            tw-pb-[0.625rem]
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
