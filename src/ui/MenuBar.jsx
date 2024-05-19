import React from "react";
import styled from "styled-components";

const MenuCloseBarWrapper = styled.div`
  width: 25px;
  height: 20px;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Bar = styled.div`
  margin-bottom: 3px;
  margin-left: 6px;
  width: 24px;
  height: 2px;
  border-radius: 5px;
  background-color: black;

  position: absolute;
  top: 50%;
  transition: transform 0.3s ease-in-out;

  &:nth-child(1) {
    transform: translateY(-50%) rotate(45deg);
  }

  &:nth-child(2) {
    transform: translateY(-50%) rotate(-45deg);
  }
`;

function MenuCloseBar() {
  return (
    <MenuCloseBarWrapper>
      <Bar />
      <Bar />
    </MenuCloseBarWrapper>
  );
}

export default MenuCloseBar;
