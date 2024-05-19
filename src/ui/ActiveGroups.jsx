import styled, { keyframes } from "styled-components";
import capitalizeFirstLetter from "../helpers/capitalise";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Main = styled.div`
  width: 90dvw;
  margin-top: 25px;
  background-color: #efefef;
  max-width: 400px;
  padding: 0 10dvw;
  padding: 20px;
  border-radius: 10px;
  overflow: scroll;
`;
const Heading = styled.h4`
  text-align: center;
  padding: 10px 0;
  font-weight: 600;
  color: #0a2448;
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const GroupDiv = styled.div`
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Button = styled.button`
  min-width: 260px;
  max-width: 500px;
  border: 1px solid rgb(48, 45, 45, 0.3);
  background-color: rgb(255, 255, 255);
  color: black;
  padding: 15px 25px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 18px;
  &:hover {
    background-color: green;
  }
`;

function ActiveGroups({ groups }) {
  const navigate = useNavigate();

  function handleCLick(group) {
    localStorage.setItem("group", JSON.stringify(group));
    navigate(`/overview`)
  }
  return (
    <Main>
      <Heading>Join Active Groups</Heading>
      <InnerDiv>
        {groups?.map((group) => (
          <GroupDiv key={group} onClick={() => handleCLick(group)}>
            <Button>{capitalizeFirstLetter(group)}</Button>
          </GroupDiv>
        ))}
      </InnerDiv>
    </Main>
  );
}

export default ActiveGroups;
