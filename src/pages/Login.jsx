import styled from "styled-components";
import LoginMain from "../ui/LoginMain";
import { toast } from "react-toastify";

const Main = styled.div`
  background-color: #fff;
  color: #0d0c22;
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 30px;

  @media (max-width: 368px) {
    padding: 10px 20px;
  }

  @media (min-width: 1024px) {
    :root {
      --base-font-size: 10px;
    }
  }
`;

// ----- MAIM ----//
function LogIn() {
  return (
    <Main>
      <LoginMain></LoginMain>
    </Main>
  );
}

export default LogIn;
