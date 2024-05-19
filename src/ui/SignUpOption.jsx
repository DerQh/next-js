import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoginWithGoogle } from "../services/apiAuth";

const HelloHeading = styled.h5`
  font-size: 25px;
  font-weight: 600;
  text-align: start;
  width: 100%;
  padding-bottom: 40px;
`;

const Image = styled.img`
  width: 15px;
  height: 15px;
`;
const ButtonDiv = styled.button`
  border: 1px solid rgb(48, 45, 45, 0.3);
  background-color: black;
  color: #fff;
  padding: 20px 30px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;
const ButtonDivTwo = styled.button`
  border: 1px solid rgb(48, 45, 45, 0.3);
  background-color: rgb(255, 255, 255);
  color: black;
  padding: 20px 30px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const DividerDiv = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  border: none;
  width: 50%;
  height: 100%;
  position: relative;
`;
const Dividerabsolute = styled.div`
  position: absolute;
  top: 50%;
  left: 0%;
  height: 0.5px;
  width: 100%;
  background-color: black;
`;

const OrDiv = styled.p`
  width: 50px;
  text-align: center;
`;

const TermsDiv = styled.div`
  width: 100%;
  padding: 25px 0;
  text-align: center;
  font-weight: 400;
  font-size: 11px;
`;
const Terms = styled.p`
  color: black;
`;
const Span = styled.span`
  color: #469c59;

  padding: 0 1px;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #055005;
  }
`;

const ParagraphSignin = styled.div`
  color: black;
  padding: 10px 0;
`;

const Main = styled.div`
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function SignUp({ signUp, setsignUp }) {
  const navigate = useNavigate();

  function handleClick() {
    setsignUp(!signUp);
  }

  return (
    <Main>
      <HelloHeading onClick={() => navigate("/")}>
        Sign up to QApp !
      </HelloHeading>

      <ButtonDiv onClick={LoginWithGoogle}>
        <Image src="/images/googlepng.png" alt="" /> Sign up with gmail
      </ButtonDiv>
      <DividerDiv>
        <Divider>
          <Dividerabsolute></Dividerabsolute>
        </Divider>
        <OrDiv>or</OrDiv>
        <Divider>
          <Dividerabsolute></Dividerabsolute>
        </Divider>
      </DividerDiv>
      <ButtonDivTwo onClick={handleClick}> Continue with email</ButtonDivTwo>
      <TermsDiv>
        <Terms>
          By creating an account you agree with our
          <Span>Terms of Service</Span> <Span>Privacy Policy </Span> and our
          default Notification Settings.
        </Terms>
        <ParagraphSignin>
          Already Have an account?
          <Span onClick={() => navigate("/login")}>Sign In</Span>
        </ParagraphSignin>
      </TermsDiv>
    </Main>
  );
}

export default SignUp;
