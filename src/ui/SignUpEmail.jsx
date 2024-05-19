import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSignUp } from "../features/authentification/useSignUp";

const Main = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 2px;
  padding-right: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 450px;
`;
const HelloHeading = styled.h5`
  font-size: 25px;
  font-weight: 600;
  text-align: start;
  width: 100%;
  padding-top: 20px;
`;

const ButtonDiv = styled.button`
  background-color: black;
  color: #fff;
  color: ${(prop) => (prop.disabled ? "rgb(216, 208, 208, 0.4)" : "#fff")};

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

const TermsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  padding: 25px 0;
  text-align: center;
  font-weight: 400;
  font-size: 11px;
`;

const CheckInput = styled.input`
  cursor: pointer;
`;
const Terms = styled.p`
  color: black;
  padding-left: 5px;
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
  text-align: center;
  font-size: 14px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
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
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-left: -2px;
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;
const Label = styled.label`
  font-weight: 500;
  padding: 35px 0 5px 0px;
  font-weight: 600;
`;
const Input = styled.input`
  border-radius: 10px;
  padding: 16px 10px;
  font-size: 16px;
`;

const NamesDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100;
  column-gap: 10px;
`;
const FirstNameInput = styled.input`
  border-radius: 10px;
  font-size: 16px;
  padding: 16px 10px;
  width: 100%;
`;
const LastNameInput = styled.input`
  border-radius: 10px;
  font-size: 16px;
  padding: 16px 10px;
  width: 100%;
`;
const NameLabel = styled.label`
  border-radius: 10px;
  font-size: 16px;
  padding-bottom: 5px;
  font-weight: 600;
`;
const LastNameLabel = styled.label`
  width: 100%;
  text-align: start;
  border-radius: 10px;
  font-size: 16px;
  padding-bottom: 5px;
  font-weight: 600;
`;

const NamesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const LastWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

// ---- MAIN -----/
function SignUpEmail({ signUp, setsignUp }) {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isloading } = useSignUp();

  function handleClick() {
    setsignUp(!signUp);
  }
  function onSubmit({ firstName, lastName, email, password }) {
    // console.log(firstName, lastName, email, password);
    signup(
      { firstName, lastName, email, password },
      { onSettled: () => reset() }
    );
  }

  function handleClickCheck(event) {
    setIsChecked(event.target.checked);
    event.stopPropagation();
  }

  return (
    <Main>
      <IconDiv onClick={handleClick}>
        <Icon src="/images/chevron-left.png" alt="" />
      </IconDiv>
      <HelloHeading>Sign up to QApp ! </HelloHeading>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <NamesDiv>
          <NamesWrapper>
            <NameLabel htmlFor="firstName">First Name</NameLabel>
            <FirstNameInput
              id="firstName"
              placeholder=""
              required
              type="text"
              {...register("firstName", {
                required: "Please enter your first name",
              })}
            />
          </NamesWrapper>
          <LastWrapper>
            <LastNameLabel htmlFor="lastName">Last Name</LastNameLabel>
            <LastNameInput
              id="lastName"
              placeholder=""
              type="text"
              required
              {...register("lastName", {
                required: "Please enter your last name",
              })}
            />
          </LastWrapper>
        </NamesDiv>
        <InputDiv>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="test@mail.com"
            {...register("email", {
              required: "Provide a valid email address",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
        </InputDiv>

        <InputDiv>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="6+ Characters"
            type="password"
            {...register("password", {
              required: "Please enter your password ! ",
              minLength: {
                value: 6,
                message: "password needs a minium of 8 characters",
              },
            })}
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="passwordConfirm">Re-Enter Password</Label>
          <Input
            id="passwordConfirm"
            placeholder="6+ Characters"
            type="password"
            {...register("passwordConfirm", {
              required: "Please enter your passwordConfirm ! ",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
        </InputDiv>

        <TermsDiv>
          <CheckInput
            type="checkbox"
            checked={isChecked}
            onChange={handleClickCheck}
          />
          <Terms>
            I agree with Omindi's
            <Span>Terms of Service</Span> <Span>Privacy Policy </Span> and our
            default Notification Settings.
          </Terms>
        </TermsDiv>

        <ButtonDiv disabled={!isChecked} type="submit">
          Create Account
        </ButtonDiv>
      </Form>

      <ParagraphSignin>
        Already Have an account?
        <Span onClick={() => navigate("/login")}>Sign In</Span>
      </ParagraphSignin>
    </Main>
  );
}

export default SignUpEmail;
