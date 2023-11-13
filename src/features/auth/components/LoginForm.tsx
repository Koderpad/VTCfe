import styled from "styled-components";
import Form from "../../../components/ui-styled/Form";
import FormRowVertical from "../../../components/ui-styled/FormRowVertical";
import Input from "../../../components/ui-styled/Input";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { setCredentials } from "../authSlice.ts";
import { useLoginMutation } from "../services/authApi.ts";
import React from "react";

interface Error {
  status?: number;
}

function LoginForm() {
  // const errRef = useRef();
  // const errRef = useRef(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("HandleSubmit!####");

      const userData = await login({ username, password }).unwrap();
      console.log("userData: ", userData);
      const { access_token, refresh_token, customerDTO } = userData;
      dispatch(setCredentials({ access_token, refresh_token, customerDTO }));

      setUsername("");
      setPassword("");
      navigate("/user/account");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err as Error;
      if (!error.status) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
    }
    console.log("DONE HandleSubmit");
  };

  // const handleUserInput = (e: Event) => setUsername(e.target?.value);

  // const handlePwdInput = (e: Event) => setPassword(e.target?.value);

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Tên đăng nhập" htmlFor="username" error="">
        <Input
          type="text"
          id="username"
          name="username"
          icon="/public/sms.png"
          placeholder="Tên đăng nhập | Username"
          onChange={handleUserInput}
        />
      </FormRowVertical>
      <FormRowVertical label="Mật khẩu" htmlFor="password" error="">
        <Input
          type="password"
          id="password"
          name="password"
          icon="/public/lock.png"
          placeholder="Mật khẩu | Password"
          onChange={handlePwdInput}
        />
      </FormRowVertical>

      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <Label_forgot>
        <Link to="#">Forgot Your Password?</Link>
      </Label_forgot>

      <ButtonContainer>
        <Button_Login type="submit">Login</Button_Login>
      </ButtonContainer>

      <Label_Regis>
        <p className="don-t-have-account">
          <span className="text-wrapper">Don’t have account? </span>
          <Link to="#" className="span">
            Register Now
          </Link>
        </p>
      </Label_Regis>
    </Form>
  );
}

const Label_Regis = styled.div`
  height: 300px;
  width: 500px;
  display: flex;
  position: fixed;
  white-space: nowrap;
  flex-direction: column-reverse;
  justify-content: space-around;
  margin-left: 70px;
  padding-bottom: 30px;

  & .don-t-have-account {
    color: #000000;
    font-family: "Cabinet Grotesk-Medium", Helvetica;
    font-size: 14px;
    font-weight: 400;
    /* left: 0; */
    letter-spacing: 0;
    line-height: normal;
    /* top: 0; */
    width: 209px;
  }

  & .text-wrapper {
    font-weight: 500;
  }

  & .span {
    font-family: "Cabinet Grotesk-Bold", Helvetica;
    font-weight: 700;
  }
`;

const Label_forgot = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: row-reverse;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const Button_Login = styled.button`
  height: 48px;
  width: 125px;

  background-color: #009ee2;
  border: 1px solid;
  border-color: #ffffff26;
  border-radius: 5px;
  box-shadow: 0px 16px 32px #009ee21a;
  height: 48px;
  left: 0;
  position: relative;
  top: 0;
  width: 125px;
`;

export default LoginForm;
