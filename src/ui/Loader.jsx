import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100%; */
  height: 100dvh;
`;

const LoaderCircle = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spinAnimation} 1s linear infinite;
`;
function Loader() {
  return (
    <LoaderContainer>
      <LoaderCircle />
    </LoaderContainer>
  );
}

export default Loader;
