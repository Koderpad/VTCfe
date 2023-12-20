import { useSelector } from "react-redux";
import ContentTooltip from "./ContentTooltip";
import styled from "styled-components";
import { RootState } from "../../app/store";
import { useState } from "react";

interface CustomerDTO {
  customerId: number;
  username: string;
  email: string;
  gender: boolean;
  fullName: string;
  birthday: string; // You may want to use a Date type
  status: string; // You may want to define a more specific type for status
  roles: string[];
}

function Nav_link() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<CustomerDTO | null>(null);

  const auth = useSelector((state: RootState) => state.auth);

  const { isAuthenticated, user: CustomerDTO } = auth;

  console.log("isAuthenticated", isAuthenticated);
  console.log("CustomerDTO", CustomerDTO);

  // console.log("auth", auth);

  // if (auth) {
  //   setIsLogin(auth.isAuthenticated);
  //   setUser(auth.user);
  // }

  return (
    <>
      <div className="flex gap-1">
        {/* account */}
        <StyledToolTip>
          {/* account container */}
          <div className="flex cursor-pointer hover:">
            {/* avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
              {/* <img
                src="https://down-vn.img.susercontent.com/file/vn-11134226-7r98o-ln4gdiy4aasz87_tn"
                className="w-full h-full object-cover"
              /> */}
            </div>

            {/* username */}
            <div
              className="flex items-center text-white outline-none
            text-xl font-medium p-1
            "
            >
              {isAuthenticated ? (
                <div
                  className="text-white outline-none
            text-xl font-medium p-1
            "
                >
                  <span>{CustomerDTO.fullName}</span>
                </div>
              ) : (
                <div
                  className="text-white outline-none
            text-xl font-medium p-1
            "
                >
                  <a href="/login">Đăng nhập</a>
                  <span className="mx-2">/</span>
                  <a href="/register">Đăng ký</a>
                </div>
              )}
            </div>
          </div>
          {/* <Tooltip /> */}
          <div className="tooltipContent flex invisible ">
            <div className="w-0 h-0 relative ">
              {isAuthenticated ? <ContentTooltip /> : null}
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
