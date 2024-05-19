import styled, { keyframes } from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const AppContainer = styled.div`
  /* text-align: center; */
`;

const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${rotate} infinite 20s linear;
  }
`;

const AppHeader = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const AppLink = styled.a`
  color: #61dafb;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Backdrop = styled.div`
  z-index: 1300;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = () => {
  return (
    <Backdrop>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Spinner;