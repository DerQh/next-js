import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLogIn } from "../features/authentification/useLogIn";

const Main = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100%;
  padding-left: 2px;
  padding-right: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const HelloHeading = styled.h5`
  font-size: 25px;
  font-weight: 600;
  text-align: start;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: #19354e;
  }
`;

const ButtonDiv = styled.button`
  background-color: #fff;
  border: 1px solid rgb(0, 0, 0, 0.5);
  color: rgb(0, 0, 0);
  padding: 20px 30px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  margin-top: 20px;

  cursor: pointer;
`;
const CreateButton = styled.button`
  background-color: black;
  color: #fff;
  padding: 20px 30px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 600;
  margin-top: 50px;
  cursor: pointer;
`;

const Span = styled.span`
  color: #469c59;
  padding: 0 2px;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #055005;
  }
`;

const ParagraphSignin = styled.div`
  color: black;
  padding: 10px 0;
  text-align: center;
  font-size: 14px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;
const Label = styled.label`
  font-weight: 500;
  padding: 10px 0px;
  padding-top: 20px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;
const Input = styled.input`
  border-radius: 10px;
  padding: 16px 10px;
  font-size: 16px;
`;

const DividerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
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
const SpanForgot = styled.span`
  color: #469c59;
  width: 100%;
  text-align: end;
  padding-top: 5px;
  font-size: 12px;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
`;
const PasswordText = styled.p`
  padding-top: 5px;
`;

const Image = styled.img`
  width: 15px;
  height: 15px;
`;

// ---- MAIN -----/
function LoginMain({ signUp, setsignUp }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isloading } = useLogIn();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  function handleClick() {
    setsignUp(!signUp);
  }

  return (
    <Main>
      <HelloHeading onClick={() => navigate("/")}>
        Sign in to QApp !
      </HelloHeading>

      <ButtonDiv>
        <Image src="/images/googlepng.png" alt="" />
        Sign in with Google
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

      <Form onSubmit={handleSubmit}>
        <InputDiv>
          <Label htmlFor="email">Email or Username</Label>
          <Input
            id="email"
            required
            placeholder="omindi@mail.com"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="password">
            <PasswordText>Password</PasswordText>
            <SpanForgot onClick={() => navigate("/resetpassword")}>
              Forgot Password ?
            </SpanForgot>
          </Label>
          <Input
            id="password"
            placeholder="5+ Characters"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputDiv>

        <CreateButton type="submit" disabled={isloading}>
          Log in
        </CreateButton>
      </Form>

      <ParagraphSignin>
        Don't have an account?
        <Span onClick={() => navigate("/signup")}>Sign Up</Span>
      </ParagraphSignin>
    </Main>
  );
}

export default LoginMain;
