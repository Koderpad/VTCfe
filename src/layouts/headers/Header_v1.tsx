import styled from "styled-components";
import Navbar from "../navbar/Navbar";
import Header_search_wrapper from "./Header_search_wrapper";

function Header_v1() {
  return (
    <>
      <StyledTransform className="block fixed h-[119px] top-0 left-0 right-0 z-[100] bg-[linear-gradient(-180deg,#f53d2d,#f63)]">
        {/* navbar */}
        <Navbar />

        {/* header search wrapper */}
        <Header_search_wrapper />
      </StyledTransform>
    </>
  );
}

const StyledTransform = styled.div`
  transform: translateZ(0);
  font-size: 0.875rem;
`;

export default Header_v1;
