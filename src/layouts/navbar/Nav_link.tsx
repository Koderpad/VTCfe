import ContentTooltip from "./ContentTooltip";
import styled from "styled-components";

function Nav_link() {
  return (
    <>
      <div className="flex gap-1">
        {/* account */}
        <StyledToolTip>
          {/* account container */}
          <div className="flex cursor-pointer hover:">
            {/* avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://down-vn.img.susercontent.com/file/vn-11134226-7r98o-ln4gdiy4aasz87_tn"
                className="w-full h-full object-cover"
              />
            </div>

            {/* username */}
            <div
              className="flex items-center text-white outline-none
            text-xl font-medium p-1
            "
            >
              nguyenquoctrung999123
            </div>
          </div>
          {/* <Tooltip /> */}
          <div className="tooltipContent flex invisible ">
            <div className="w-0 h-0 relative ">
              <ContentTooltip />
            </div>
          </div>
        </StyledToolTip>
      </div>
    </>
  );
}

const StyledToolTip = styled.div`
  display: block;
  position: relative;
  padding-top: 0.5rem;
  &:hover .tooltipContent {
    visibility: visible;
  }
`;

export default Nav_link;
