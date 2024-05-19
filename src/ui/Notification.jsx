import styled from "styled-components";

const Main = styled.div`
  position: absolute;
  background-color: #fff;
  color: #0d0c22;
  width: 100%;
  height: 10dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  max-width: 450px;

  @media (min-width: 768px) {
    max-width: 768px;
    max-height: 100dvh;
    padding: 10px 50px;
  }

  @media (min-width: 1024px) {
    padding: 10px 150px;
    :root {
      --base-font-size: 10px; /* Define a base font size */
    }
  }
`;

const NotificationsMain = styled.div`
  padding: 50px 0;
`;

// ----- MAIM ----//
function Notifications({ amount }) {
  return (
    <Main>
      <NotificationsMain>
        <p>{amount} has been depositeds to your account </p>
      </NotificationsMain>
    </Main>
  );
}

export default Notifications;
