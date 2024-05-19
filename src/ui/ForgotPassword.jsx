import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  width: 100%;
  max-width: 450px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  gap: 5px;
  position: relative;
`;

const IconDiv = styled.div`
  height: 35px;
  width: 35px;
  border: 1px solid rgb(162, 164, 162, 0.5);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 3%;
  left: 0;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-left: -2px;
`;
const HelloHeading = styled.h5`
  font-size: 25px;
  font-weight: 600;
  text-align: start;
  width: 100%;
  padding-bottom: 20px;
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
  margin-bottom: 19px;
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

const Disclaimer = styled.p`
  padding: 5px;
  font-size: 16px;
`;

// ---- MAIN -----/
function ForgotPawwsordUi({}) {
  const [isSend, setisSend] = useState(false);
  const [approved, setisApproved] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.PreventDefault();
  }

  function handleChange(event) {}

  return (
    <Main>
      <IconDiv onClick={() => navigate("/login")}>
        <Icon src="/images/chevron-left.png" alt="" />
      </IconDiv>
      <HelloHeading>Reset Password ! </HelloHeading>
      <DividerDiv>
        <Divider>
          <Dividerabsolute></Dividerabsolute>
        </Divider>
        <Divider>
          <Dividerabsolute></Dividerabsolute>
        </Divider>
      </DividerDiv>
      <Disclaimer>
        Enter the email address you used when you joined and we’ll send you
        instructions to reset your password. <br /> For security reasons, we do
        NOT store your password. So rest assured that we will never send your
        password via email.
      </Disclaimer>

      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <InputDiv>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="omindi@gmail.com" type="text" />
        </InputDiv>

        <CreateButton type="submit">Reset Password</CreateButton>
      </Form>
    </Main>
  );
}

export default ForgotPawwsordUi;
