import Nav_link from "./Nav_link";
import Nav_spacer from "./Nav_spacer";
import Nav_vendor from "./Nav_vendor";

function Navbar() {
  return (
    <>
      {/* navbar */}
      <div className="flex items-center justify-center h-[34px] z-[100] bg-transparent relative min-w-[1200px]">
        {/* mid */}
        <nav className="flex w-4/5 h-full">
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
