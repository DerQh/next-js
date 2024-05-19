import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ForgotPawwsordUi from "../ui/ForgotPassword";

const Main = styled.div`
  background-color: #fff;
  color: #0d0c22;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;

  @media (min-width: 768px) {
    max-height: 100dvh;
    padding: 10px 50px;
  }

  @media (min-width: 1024px) {
    /* Adjust styles for desktop screens */
    padding: 10px 150px;
    :root {
      --base-font-size: 10px; /* Define a base font size */
    }
  }
`;

// ----- MAIM ----//
function ForgotPassword() {
  return (
    <Main>
      <ForgotPawwsordUi></ForgotPawwsordUi>
    </Main>
  );
}

export default ForgotPassword;
