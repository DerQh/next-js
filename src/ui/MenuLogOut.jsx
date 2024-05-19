import {
  faArrowRightFromBracket,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {  logOutApi } from "../services/apiAuth";

const slideFromTop = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
`;
const Main = styled.div`
  background-color: #e2e3e3;
  position: absolute;
  right: 0;
  bottom: -60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgb(60, 59, 59, 0.2);
  border-radius: 5px;
  gap: 5px;
  padding: 6px 15px;
  animation: ${slideFromTop} 0.7s ease-in-out backwards;
`;
const LogoWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;
const Button = styled.button`
  font-size: 13px;
  border: none;
  background-color: transparent;
  padding: 4px 3px;
  color: black;
  cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 16px;
`;
function MenuLogOut({ low }) {
  function handleLogout() {
    logOutApi();
    navigate("/login");
  }
  const navigate = useNavigate();
  return (
    <Main>
      <LogoWrapper>
        <Icon icon={faHouse} />
        <Button onClick={() => navigate("/")}>Home</Button>
      </LogoWrapper>
      <LogoWrapper>
        <Icon icon={faArrowRightFromBracket} />
        <Button onClick={handleLogout}>Log Out</Button>
      </LogoWrapper>
    </Main>
  );
}

export default MenuLogOut;
