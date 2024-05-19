import { faCrown, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const slideFromTop = keyframes`
  0%{
    transform: translateY(100%);
  }
  100%{
    transform: translateY(0%);
  }
`;

const StyledDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #111f34;
  color: #fff;
  padding: 15px;
  width: 100%;
  animation: ${slideFromTop} 1s forwards;
`;

const Image = styled(FontAwesomeIcon)`
  font-size: 30px;
  border-radius: 50%;
`;

const Content = styled.div`
  /* margin-left: 20px; */
`;

const Title = styled.h5`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
  padding: 5px 0;
`;

const Description = styled.p`
  margin-bottom: 5x;
  font-size: 11px;
  font-weight: 200;
  padding: 5px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  margin-top: 5px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
const BtnDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ActionIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: gold;
`;
const ActionIconTwo = styled(FontAwesomeIcon)`
  font-size: 21px;
  color: red;
`;
const ButtonUser = styled.div`
  padding: 8px 1px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(128, 128, 128, 0.5);
`;
const P = styled.p`
  font-size: 14px;
  font-weight: 400;
  padding: 5px 0;
`;

function UserModal({ handleYesClick, handleAdminClick, handleCloseCLick, isAdmin }) {
  const innerDivRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (innerDivRef.current && !innerDivRef.current.contains(event.target)) {
        handleCloseCLick();
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleCloseCLick]);

  
  function handleInnerClick(event) {
    event.stopPropagation();
  }

  return (
    <StyledDiv ref={innerDivRef} onClick={handleInnerClick}>
      <Content>
        <Title>Manage Member</Title>
        <Description>
          This feature is only limited to Admins and action can not be done by
          normal group members
        </Description>
        <ButtonContainer>
          <ButtonUser onClick={handleAdminClick}>
            <ActionIcon icon={faCrown} />
            <P> Add as Administrator</P>
          </ButtonUser>
          <Divider />
          <ButtonUser onClick={handleYesClick}>
            <ActionIconTwo icon={faUser} />
            <P> Remove Member </P>
          </ButtonUser>
          <Divider />
        </ButtonContainer>
        <BtnDiv>
          <Button onClick={handleCloseCLick}>Close</Button>
        </BtnDiv>
      </Content>
    </StyledDiv>
  );
}

export default UserModal;
