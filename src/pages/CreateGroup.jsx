import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  useJoinGroup,
  useCreateGroup,
  useAddUserToTable,
} from "../features/group/useCreateGroup";
import useUser from "../features/authentification/useUser";
import Loader from "../ui/Loader";
import Modal from "../ui/Modal";
import { userGroupsAPi } from "../services/apiGroups";
import { useCheckGroupDelete } from "../features/group/useDeleteGroup";
import { useQuery } from "@tanstack/react-query";
import CreateGroupTab from "../ui/CreateGroupTab";
import capitalizeFirstTwoWords from "../helpers/capitalizeName";
import { formatDate } from "../helpers/formatDate";

// ---- MAIN -----

function CreateGroup() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    create: false,
    openModal: false,
    inPutValue: "",
    groups: null,
    description: "",
  });
  const { user: userData, isLoading: useLoading } = useUser();
  const {
    createGroup: createGroupFn,
    isLoading,
    isSuccess: isGroupSucess,
  } = useCreateGroup();
  const {
    joinGroup,
    isLoading: isJoining,
    isSuccess: isJoinSucess,
  } = useJoinGroup();
  const { isLoadingCheck, isCheckSucess, checkGroupDelete } =
    useCheckGroupDelete();

  const { mutate: addUser, isLoading: isLoadingUser } = useAddUserToTable();
  const { email, firstName, lastName } = userData?.user_metadata;
  const id = userData?.id;
  const fullName = `${firstName} ${lastName}`;
  const {
    isLoading: isLoadingGroups,

    data: groupsArray,
    isSuccess,
    isFetching,
    refetch: refetchGroups,
  } = useQuery({
    queryFn: () => userGroupsAPi({ id }),
    queryKey: ["groups", id],
    enabled: false,
  });

  function handleGroupCLick(groupName) {
    localStorage.setItem("group", JSON.stringify(groupName));
    navigate(`/overview`);
  }

  function handleCreateButton() {
    setState((prevState) => ({
      ...prevState,
      create: !prevState.create,
    }));
  }

  // -----------------------------------------USEEFFECTS ----------------------------//

  useEffect(() => {
    // check if groupArray has group data, if so... setstae groups = grouparray
    setState((prevState) => ({
      ...prevState,
      groups: groupsArray,
    }));
  }, [state.groups, isFetching, isGroupSucess]);

  useEffect(() => {
    refetchGroups();
    addUser({ id, email, fullName });
    checkGroupDelete(id);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isJoinSucess || isGroupSucess) {
      refetchGroups();
    }
  }, [isJoinSucess, isGroupSucess]);

  // ---- ------------------------------------MODAL  --//
  function handleModalClick() {
    setOpenModal((open) => !open);
  }
  // create Group and Admin
  function handleCreateClick() {
    if (!state.inPutValue || !id) return;
    createGroupFn({
      inPutValue: state.inPutValue,
      id,
      fullName,
      email,
      description: state.description,
    });
    setState((prevState) => ({
      ...prevState,
      inPutValue: "",
    }));
  }

  // join Group and update user groups //
  function handleJoinClick() {
    if (!state.inPutValue || !id) return;
    joinGroup({ inPutValue: state.inPutValue, id, fullName, email });
    setState((prevState) => ({
      ...prevState,
      inPutValue: "",
    }));
  }

  const reload = isLoadingGroups || isJoining || isLoading;

  return (
    <Main>
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
            value={state.inPutValue}
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                inPutValue: e.target.value.toLowerCase(),
              }))
            }
          />
          <ButtonJoin onClick={handleJoinClick}>Join Group</ButtonJoin>
        </InputDiv>
        <div>
          {reload ? (
            <Loader />
          ) : (
            <>
              {state.groups?.length > 0 ? (
                state.groups?.map((groupOne) => (
                  <GroupDiv
                    key={groupOne.id}
                    onClick={() => handleGroupCLick(groupOne.group_name)}
                  >
                    <GroupImg src="/images/groups.png" alt="" />
                    <div>
                      <GroupName>
                        {groupOne.group_name &&
                          capitalizeFirstTwoWords(groupOne.group_name)}
                      </GroupName>
                      <MembersP>
                        Group ID: <span>00{groupOne.group_id}</span>
                      </MembersP>
                      <MembersP></MembersP>
                      <Date>
                        Created on{" "}
                        <span>{formatDate(groupOne.created_at)}</span>
                      </Date>
                    </div>
                  </GroupDiv>
                ))
              ) : (
                <GroupActiveP>
                  No active Groups, use the above buttons to Create or Join
                  Group
                </GroupActiveP>
              )}
            </>
          )}
        </div>
      </GroupsDiv>
      {state.create && (
        <CreateGroupTab
          handleCreateButton={handleCreateButton}
          id={id}
          inPutValue={state.inPutValue}
          setState={setState}
          handleCreateClick={handleCreateClick}
          description={state.description}
        />
      )}
      {state.openModal && <Modal handleClick={handleModalClick}></Modal>}
    </Main>
  );
}

export default CreateGroup;

const GroupHeader = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100px;
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
  max-width: 40px;
  max-height: 50px;
  border: 2px solid #000;
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

const Main = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: #111f34;
  color: #0d0c22;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
    :root {
    }
  }
`;

// const Input = styled.input`
//   min-width: 260px;
//   max-width: 450px;

//   font-size: 16px;
//   font-weight: 400;
//   text-align: start;
//   padding: 10px;
//   border-radius: 5px;
//   margin: 18px 0;
//   border: 1px solid rgb(88, 183, 77, 0.3);
//   background-color: #f5f5f5;
//   &::placeholder {
//     font-size: 12px;
//   }
// `;

// const ButtonDiv = styled.button`
//   min-width: 260px;
//   max-width: 450px;
//   border: 1px solid rgb(48, 45, 45, 0.3);
//   background-color: black;
//   color: #fff;
//   padding: 20px 30px;
//   border-radius: 30px;
//   font-size: 15px;
//   font-weight: 600;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;

//   &:hover {
//     background-color: green;
//   }
// `;
// const ButtonDivTwo = styled.button`
//   min-width: 260px;
//   max-width: 500px;
//   border: 1px solid rgb(48, 45, 45, 0.3);
//   background-color: rgb(255, 255, 255);
//   color: black;
//   padding: 20px 30px;
//   border-radius: 30px;
//   font-size: 15px;
//   font-weight: 600;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   margin-top: 18px;
//   &:hover {
//     background-color: green;
//   }
// `;

// const DividerDiv = styled.div`
//   display: flex;
//   align-items: center;
//   margin-top: 20px;
//   margin-bottom: 20px;
// `;

// const Divider = styled.div`
//   border: none;
//   width: 60%;
//   height: 100%;
//   position: relative;
// `;
// const Dividerabsolute = styled.div`
//   position: absolute;
//   top: 60%;
//   left: 0%;
//   height: 1px;
//   width: 100%;
//   background-color: green;
// `;

// const OrDiv = styled.p`
//   width: 50px;
//   font-weight: 500;
//   font-size: 16px;
//   text-align: center;
//   color: green;
// `;

{
  /* 
      <Input
        placeholder="Enter Group name"
        type="text"
        name="createinput"
        id="joinGroup"
        value={inPutValue}
        onChange={(e) => setinPutValue(e.target.value.toLowerCase())}
      /> 
      */
}
{
  /* <ButtonDivTwo onClick={handleJoinClick}>Join Group</ButtonDivTwo> */
}
{
  /* <DividerDiv>
        <Divider>
          <Dividerabsolute></Dividerabsolute>
        </Divider>
        <OrDiv>or</OrDiv>
        <Divider>
          <Dividerabsolute></Dividerabsolute>
        </Divider>
      </DividerDiv> */
}
{
  /* <ButtonDiv onClick={handleCreateClick}>Create Group </ButtonDiv> */
}

{
  /* {isMember && <ActiveGroups groups={groups}></ActiveGroups>} */
}
