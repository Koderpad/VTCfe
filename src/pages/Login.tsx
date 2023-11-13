import styled, { css } from "styled-components";
import Logo from "../components/ui-styled/Logo";
import LoginForm from "../features/auth/components/LoginForm.js";

function Login() {
  return (
    <>
      <LoginPageContainer>
        <LeftSection>
          <Logo />
        </LeftSection>
        <RightSection>
          <Label_welcome title="welcome">Welcome</Label_welcome>
          <Label_welcome title="loginWE">Login with Username</Label_welcome>
          <LoginForm />
        </RightSection>
      </LoginPageContainer>
    </>
  );
}

const LoginPageContainer = styled.div`
  display: flex;
  height: auto;
  background: #caf7fa;
`;

const LeftSection = styled.div`
  flex: 1;
  background-image: url("/public/BiaPhai_Login.png");
  opacity: 0.9;
  background-size: cover;
  background-position: center;
  /* opacity: 0.9; */
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
`;

export const Label_welcome = styled.div`
  ${(props) =>
    props.title === "welcome" &&
    css`
      height: 50px;
      width: 306px;

      color: #009ee2;
      font-family: "Cabinet Grotesk-Extrabold", Helvetica;
      font-size: 74px;
      font-weight: 400;
      left: 0;
      letter-spacing: 0;
      line-height: 48px;
      position: relative;
      top: 0;
      white-space: nowrap;
    `}

  ${(props) =>
    props.title === "loginWE" &&
    css`
      height: 11px;
      width: 111px;

      color: #00000080;
      font-family: "Cabinet Grotesk-Medium", Helvetica;
      font-size: 16px;
      font-weight: 500;
      left: 0;
      letter-spacing: 0;
      line-height: normal;
      position: relative;
      top: 0;
      white-space: nowrap;
      padding-top: 20px;
    `}

    ${(props) =>
    props.title === "forgot" &&
    css`
      height: 18px;
      width: 121px;

      color: #00000080;
      font-family: "Cabinet Grotesk-Bold", Helvetica;
      font-size: 12px;
      font-weight: 700;
      /* left: 0; */

      letter-spacing: 0;
      line-height: 18px;
      position: relative;
      text-align: right;
      /* top: 0; */
      float: right;
      margin-right: 1rem;
      white-space: nowrap;
    `}
`;

export default Login;
