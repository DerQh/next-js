import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import Group from "../ui/Group";
import { useEffect } from "react";

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const Main = styled.div`
  margin: 0 auto;
  width: 100dvw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #111f34;
`;

// ----MAIN ---- ///
function Groups() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  return (
    <Main>
      <Group />
    </Main>
  );
}

export default Groups;
