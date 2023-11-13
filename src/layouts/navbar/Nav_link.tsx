import ContentTooltip from "./ContentTooltip";
import styled from "styled-components";

function Nav_link() {
  return (
    <>
      <div className="tw-flex tw-gap-1">
        {/* account */}
        <StyledToolTip>
          {/* account container */}
          <div className="tw-flex tw-cursor-pointer hover:">
            {/* avatar */}
            <div className="tw-w-10 tw-h-10 tw-rounded-full tw-overflow-hidden">
              <img
                src="https://down-vn.img.susercontent.com/file/vn-11134226-7r98o-ln4gdiy4aasz87_tn"
                className="tw-w-full tw-h-full tw-object-cover"
              />
            </div>

            {/* username */}
            <div
              className="tw-flex tw-items-center tw-text-white tw-outline-none
            tw-text-xl tw-font-medium tw-p-1
            "
            >
              nguyenquoctrung999
            </div>
          </div>
          {/* <Tooltip /> */}
          <div className="tooltipContent tw-flex tw-invisible ">
            <div className="tw-w-0 tw-h-0 tw-relative ">
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
