import styled from "styled-components";
import { Outlet } from "react-router-dom";

import { createContext, useEffect, useState } from "react";

const StyledAppLayout = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  height: auto;
  display: flex;
  justify-content: center;
  background-color: #111f34;

  position: relative;

  @media (max-height: 568px) {
  }

  @media (min-width: 768px) {
    /* Adjust styles for tablets and larger screens */
  }

  @media (min-width: 1024px) {
    /* Adjust styles for desktop screens */
  }
`;

function AppLayout() {
  const [isNotificationOn, setNotification] = useState(false);

  useEffect(() => {
    if (isNotificationOn) {
      const timeOut = setTimeout(() => {
        setNotification(false);
      }, 2000);
      return () => clearTimeout(timeOut);
    }
  }, [isNotificationOn]);

  return (
    <StyledAppLayout>
      <Outlet />
    </StyledAppLayout>
  );
}

export default AppLayout;
