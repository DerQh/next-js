import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

const Main = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 99;
`;

const InnerDiv = styled.div`
  position: relative;
  max-width: 300px;
  min-width: 250px;
  background-color: #fff;
  color: #000;
  height: 20dvh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  font-size: 13px;
  border-radius: 5px;
  @media (max-height: 468px) {
    height: 30dvh;
  }
`;

const ButtonsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  width: 100%;
  background-color: rgb(128, 128, 128, 0.1);
  gap: 5px;
`;
const Button = styled.button`
  width: 70px;
  color: #fff;
  font-weight: 450;
  border-radius: 5px;
  padding: 8px 15px;
  border: none;
  background-color: #afc0c8;
`;
const ButtonTwo = styled.button`
  width: 70px;
  color: inherit;
  height: auto;
  font-weight: 450;
  border-radius: 5px;
  padding: 8px 15px;
  border: none;
  background-color: #f36061;
  color: #fff;
`;

const P = styled.p`
  margin-top: 15%;
  font-size: 17px;
  font-weight: 500;
  padding: 5px;
`;

const Close = styled(FontAwesomeIcon)`
  position: absolute;
  top: 1%;
  right: 2%;
  border: none;
  font-weight: 700;
  color: gray;
  background-color: #fff;
  font-size: 16px;
  padding: 5px;
`;

function Modal({ handleClick }) {
  return (
    <>
      <Main>
        <InnerDiv>
          <P>Confirm group creation</P>
          <Close onClick={handleClick} icon={faClose} />
          <ButtonsDiv>
            <Button>Yes</Button>
            <ButtonTwo>No</ButtonTwo>
          </ButtonsDiv>
        </InnerDiv>
      </Main>
    </>
  );
}

export default Modal;
