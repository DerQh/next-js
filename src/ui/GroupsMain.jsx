import styled from "styled-components";
import capitalizeFirstLetter from "../helpers/capitalise";
import { useNavigate, useSearchParams } from "react-router-dom";
import CreateGroupTab from "./CreateGroupTab";
import { useEffect, useState } from "react";

const GroupHeader = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 12dvh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #111f34;
  color: #fff;
  padding: 10px 20px;
`;

const GroupTitleDiv = styled.div``;
const GroupTitle = styled.h5`
  font-size: 18px;
  font-weight: 450;
  padding: 4px 0;
`;
const GroupParagraph = styled.p`
  font-size: 10px;
  font-weight: 300;
  padding: 4px 0;
  color: #cecece;
`;
const ButtonGroup = styled.button`
  background-color: transparent;
  max-height: 45px;
  color: #fff;
  font-size: 12px;
  font-weight: 200;
  border-radius: 18px;
  border: 2px solid #fff;
  padding: 9px;
  margin: 5px 0;
  cursor: pointer;
`;
//
const GroupsDiv = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
`;
const GroupDiv = styled.div`
  padding: 5px 0;
  border: 1px solid rgb(0, 0, 0, 0);
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: rgb(189, 216, 242, 0.02);
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgb(17, 31, 52, 0.3);
    border-radius: 5px;
    border: 1px solid #000;
  }
`;
const GroupImg = styled.img`
  border-radius: 50%;
  max-width: 50px;
  max-height: 50px;
`;
const GroupName = styled.h5`
  font-weight: 600;
  letter-spacing: 1.2px;
`;
const MembersP = styled.p`
  font-weight: 250;
  font-size: 11px;
`;
const Date = styled.p`
  font-weight: 450;
  font-size: 9px;
  color: #5b5959;
  &:hover {
    color: #fff;
  }
`;

const InputDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 15px 0;
  margin-bottom: 30px;
`;

const Input = styled.input`
  min-width: 50dvw;
  color: #000;
  font-size: 16px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgb(17, 31, 52, 0.2);
  &::placeholder {
    font-size: 10px;
  }
`;
const ButtonJoin = styled.button`
  background-color: transparent;
  color: #111f34;
  border: 1px solid #111f34;
  border-radius: 10px;
  padding: 5px 6px;
  cursor: pointer;
`;

const GroupActiveP = styled.h4`
  text-align: center;
  font-size: clamp(10px, 10vw, 12px);
  font-weight: 550;
  padding: 10px;
`;

//
function GroupsMain({
  data,
  handleJoinClick,
  setinPutValue,
  inPutValue,
  isMember,
  id,
  handleCreateClick,
}) {
  const navigate = useNavigate();
  const [create, setCreate] = useState(false);

  function handleCLick(groupName) {
    localStorage.setItem("group", JSON.stringify(groupName));
    navigate(`/overview`);
  }

  function handleCreateButton() {
    setCreate((open) => !open);
  }

  return (
    <>
      {create ? (
        <CreateGroupTab
          handleCreateButton={handleCreateButton}
          id={id}
          inPutValue={inPutValue}
          setinPutValue={setinPutValue}
          handleCreateClick={handleCreateClick}
        />
      ) : (
        <>
          <GroupHeader>
            <GroupTitleDiv>
              <GroupTitle>Groups</GroupTitle>
              <GroupParagraph>Join/Create a group</GroupParagraph>
            </GroupTitleDiv>
            <ButtonGroup onClick={handleCreateButton}>Create Group</ButtonGroup>
          </GroupHeader>
          <GroupsDiv>
            <InputDiv>
              <Input
                type="text"
                placeholder="Search Group Name"
                value={inPutValue}
                onChange={(e) => setinPutValue(e.target.value.toLowerCase())}
              />
              <ButtonJoin onClick={handleJoinClick}>Join Group</ButtonJoin>
            </InputDiv>

            {isMember ? (
              data?.map((groupOne) => (
                <GroupDiv key={groupOne} onClick={() => handleCLick(groupOne)}>
                  <GroupImg src="/images/groups.png" alt="" />
                  <div>
                    <GroupName>{capitalizeFirstLetter(groupOne)}</GroupName>
                    <MembersP>
                      Registered Members: <span>1</span>
                    </MembersP>
                    <MembersP>Status: pending</MembersP>
                    <Date>
                      Date created: <span>April, 2024</span>
                    </Date>
                  </div>
                </GroupDiv>
              ))
            ) : (
              <GroupActiveP>
                No active Groups, use the above buttons to Create or Join Group
              </GroupActiveP>
            )}
          </GroupsDiv>
        </>
      )}
    </>
  );
}

export default GroupsMain;
