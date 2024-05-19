import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; 
  margin: 10px 0; 
`;
const StyledButton = styled.button`
  border-radius: 30px;
  padding: 20px 36px;
  background-color: #c8f169;
  font-weight: 500;
  border: none;
  cursor: pointer;
`;



function Button({ handleClick, text }) {
  return (
    <ButtonContainer>
      <StyledButton onClick={handleClick}>{text}</StyledButton>
    </ButtonContainer>
  );
}

export default Button;
