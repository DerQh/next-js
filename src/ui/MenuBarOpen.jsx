import { useState } from "react";
import styled from "styled-components";

const ToggleButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;

const ToggleBar = styled.div`
  width: 24px;
  height: 2.5px;
  background-color: #000000;
  margin-bottom: 5px;
  border-radius: 5px;
  &:nth-child(2) {
    width: 18px;
  }
`;

function MenuOpenBar() {
  return (
    <ToggleButtonWrapper>
      <ToggleBar
      // style={{
      //   transform: isActive ? "rotate(-45deg) translate(-9px, 6px)" : "none",
      // }}
      />
      <ToggleBar />
      <ToggleBar />
    </ToggleButtonWrapper>
  );
}

export default MenuOpenBar;
