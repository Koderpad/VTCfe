import styled from "styled-components";
import Navbar from "../navbar/Navbar";
import Header_search_wrapper from "./Header_search_wrapper";

function Header_v1() {
  return (
    <>
      <StyledTransform className="sticky top-0 bg-orange-600 z-50">
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
