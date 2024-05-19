import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SignUpOption from "../ui/SignUpOption";
import { useState } from "react";
import SignUpEmail from "../ui/SignUpEmail";

const Main = styled.div`
  background-color: #fff;
  color: #0d0c22;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  align-items: center;

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
    /* Adjust styles for desktop screens */
    /* padding: 10px 150px; */
    :root {
      --base-font-size: 10px; /* Define a base font size */
    }
    html {
      font-size: calc(var(--base-font-size) * 2);
    }
  }
`;

// ----- MAIM ----//
function SignUp() {
  const [signUp, setsignUp] = useState(true);

  return (
    <Main>
      {signUp ? (
        <SignUpOption signUp={signUp} setsignUp={setsignUp}></SignUpOption>
      ) : (
        <SignUpEmail signUp={signUp} setsignUp={setsignUp}></SignUpEmail>
      )}
    </Main>
  );
}

export default SignUp;
