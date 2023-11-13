import Nav_link from "./Nav_link";
import Nav_spacer from "./Nav_spacer";
import Nav_vendor from "./Nav_vendor";

function Navbar() {
  return (
    <>
      {/* navbar */}
      <div className="tw-flex tw-items-center tw-justify-center tw-h-[34px] tw-z-[100] tw-bg-transparent tw-relative tw-min-w-[1200px]">
        {/* mid */}
        <nav className="tw-flex tw-w-4/5 tw-h-full">
          {/* start: -> vendor */}
          <Nav_vendor />

          {/* mid: spacer */}
          <Nav_spacer />

          {/* end: link */}
          <Nav_link />
          {/* <Nav_link_v1 /> */}
        </nav>
      </div>
      {/* end navbar */}
    </>
  );
}

export default Navbar;
