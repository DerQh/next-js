import { v4 as uuidv4 } from "uuid";
import {
  faBell,
  faChevronLeft,
  faGear,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import UserModal from "./ModalMemberGroup";
import GroupModal from "./GroupModal";
import { useEffect, useState } from "react";
import Messages from "./Messages";
import { useAdmins, useMembers } from "../features/group/useMembers";
import Loader from "./Loader";
import { formatDate } from "../helpers/formatDate";
import capitalizeFirstLetter from "../helpers/capitalise";
import useUser from "../features/authentification/useUser";
import capitalizeFirstTwoWords from "../helpers/capitalizeName";
import { useGroup } from "../features/group/useGroup";

const Main = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* max-width: 700px; */
  background-color: #111f34;
  overflow: ${(props) => props.$modalopen && "hidden"};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const GroupNameDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
`;
const ContainerOne = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 15px 10px;
  max-width: 700px;
  width: 100%;
`;

const BellDiv = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 50%;
`;

const MessageCount = styled.h4`
  top: -2px;
  right: 0;
  position: absolute;
  font-size: 10px;
  font-weight: 500;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  background-color: red;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const BellIcon = styled(FontAwesomeIcon)`
  font-size: 15px;
  color: #fff;
  cursor: pointer;
`;
const ChevronLeft = styled(FontAwesomeIcon)`
  font-size: 17px;
  color: #fff;
  cursor: pointer;
`;

const ContainerTwo = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100dvh;
  padding: 5px 10px;
  max-width: 700px;
`;

const GroupDetails = styled.div`
  display: flex;
  gap: 15px;
  padding: 20px 0;
`;
const GroupImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;
const GroupDetailsName = styled.h4`
  font-weight: 550;
  font-size: 15px;
`;
const GroupDescription = styled.p`
  font-weight: 450;
  font-size: 11px;
`;
const DateCreated = styled.p`
  margin-top: 10px;
  font-weight: 400;
  font-size: 11px;
`;

const ActionsDiv = styled.div`
  background-color: #f4faff;
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
`;
const Action = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 4px;
`;
const ApproveDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 4px;
`;

const ActionInnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;
const ActionHeading = styled.div`
  font-weight: 400;
  font-size: 13px;
`;
const ActionImage = styled.img`
  background-color: #111f34;
  width: 35px;
  height: 35px;
  padding: 9px;
  border-radius: 5px;
`;

const MembersDiv = styled.div`
  margin-top: 20px;
`;
const MembersTitle = styled.h5`
  font-size: 16px;
  font-weight: 600;
  padding: 10px 0;
  color: rgb(0, 0, 0, 0.3);
`;

const AdminDiv = styled.div`
  margin-top: 5px;
  padding: 15px;
  padding-left: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
`;
const AdminImageDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;
const AdminImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 3px solid #000000;
`;
const AdminImageCrown = styled.img`
  position: absolute;
  /* left: 15px; */
  top: -18px;
  width: 55px;
  height: 55px;
  transform: rotate(-0deg);
  border-radius: 50%;
`;
const MemberImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
const MemberDiv = styled.div`
  padding: 10px;
  padding-left: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MemberImageDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const MemberParagraph = styled.p`
  font-size: 11px;
  font-weight: 550;
  color: rgb(17, 31, 52, 0.4);
`;

const GroupName = styled.h4`
  font-size: 16px;
  font-weight: 500;
`;
const Span = styled.span`
  border-radius: 8px;
  padding: 1px 2px;
  font-size: 10px;
  font-weight: 500;
  color: green;
`;
const WrapperDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//
function Group() {
  const navigate = useNavigate();
  const [openDeleteModal, setGroupModal] = useState(false);
  const [openExiteModal, setExitpModal] = useState(false);
  const [openUserModal, setUserModal] = useState(false);
  const [openMessages, setopenMessages] = useState(false);
  const [modalopen, setModalOpen] = useState(false);
  let [isAdmin, setAdmin] = useState(false);

  const {
    isLoading,
    members,
    refetch: refetchMembers,
    isSuccess,
  } = useMembers();
  const { user, isloading: isLoadingUser } = useUser();
  const { isLoadinGroup, groupData, isSuccess: isGroupSucess } = useGroup();

  const regularMembers = members?.membersFilteredArray;
  const admins = members?.adminsFilteredArray;
  const userID = user?.id;
  const group = groupData?.[0];

  function handleDeleteClick(event) {
    event?.stopPropagation();
    if (!isAdmin) return;
    setGroupModal((open) => !open);
    setModalOpen((modal) => !modal);
  }

  function handleExitClick(event) {
    event?.stopPropagation();
    setExitpModal((open) => !open);
    setModalOpen((modal) => !modal);
  }

  function handleMemberClick(event) {
    event?.stopPropagation();
    setUserModal((open) => !open);
    setModalOpen((modal) => !modal);
  }

  // --------------------useEffect -------------------//
  useEffect(() => {
    // check if user is admin ?
    if (admins) {
      admins.forEach((adm) => {
        if (adm.user_id == userID) {
          setAdmin(true);
        }
      });
    }
  }, [admins]);

  useEffect(() => {
    refetchMembers();
    if (isSuccess) {
    }
  }, [admins, members, isSuccess]);

  if (isLoading || isLoadingUser || isLoadinGroup) return <Loader />;
  // console.log(admins);

  return (
    <Main $modalopen={modalopen}>
      <ContainerOne>
        <GroupNameDiv
          onClick={() =>
            openMessages ? setopenMessages(false) : navigate("/overview")
          }
        >
          <ChevronLeft icon={faChevronLeft} />
          <GroupName>
            {!openMessages &&
              `${capitalizeFirstLetter(group?.group_name)} Group`}
          </GroupName>
        </GroupNameDiv>
        <BellDiv>
          <MessageCount>5</MessageCount>
          <BellIcon icon={faBell} />
        </BellDiv>
      </ContainerOne>
      <WrapperDiv>
        <ContainerTwo>
          <GroupDetails>
            <GroupImage src="https://picsum.photos/id/1/200/300" alt="" />
            <div>
              <GroupDetailsName>
                {capitalizeFirstLetter(group?.group_name)}
              </GroupDetailsName>
              <GroupDescription>
                Description: {group?.description}
              </GroupDescription>
              <DateCreated>
                Created on {formatDate(group?.created_at)}
              </DateCreated>
            </div>
          </GroupDetails>

          {/* actions  */}
          {openMessages ? (
            <Messages />
          ) : (
            <>
              <ActionsDiv>
                <Action onClick={() => navigate("/approvals")}>
                  <ActionInnerDiv>
                    <ActionImage src="/images/validation.png" alt="" />
                    <ActionHeading>Approve Requests</ActionHeading>
                  </ActionInnerDiv>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Action>
                <Action onClick={() => isAdmin && navigate("/group/edit")}>
                  <ActionInnerDiv>
                    <ActionImage src="/images/editgroup.png" alt="" />
                    <ActionHeading>Edit Group</ActionHeading>
                  </ActionInnerDiv>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Action>
                <Action onClick={handleExitClick}>
                  <ActionInnerDiv>
                    <ActionImage src="/images/exit.png" alt="" />
                    <ActionHeading>Exit Group</ActionHeading>
                  </ActionInnerDiv>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Action>
                <Action onClick={handleDeleteClick}>
                  <ActionInnerDiv>
                    <ActionImage src="/images/bin.png" alt="" />
                    <ActionHeading>Delete Group</ActionHeading>
                  </ActionInnerDiv>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Action>
                <Action onClick={() => setopenMessages(true)}>
                  <ActionInnerDiv>
                    <ActionImage src="/images/groupchat.png" alt="" />
                    <ActionHeading> Group Chats</ActionHeading>
                  </ActionInnerDiv>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Action>
                <Action onClick={() => navigate("/projects")}>
                  <ActionInnerDiv>
                    <ActionImage src="/images/project.png" alt="" />
                    <ActionHeading> Group Projects</ActionHeading>
                  </ActionInnerDiv>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Action>
                <Action onClick={() => navigate("/group")}>
                  <ActionInnerDiv>
                    <ActionImage src="/images/switch.png" alt="" />
                    <ActionHeading> Switch Group</ActionHeading>
                  </ActionInnerDiv>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Action>
              </ActionsDiv>
              <MembersDiv>
                <MembersTitle>Members</MembersTitle>

                {admins?.map((admin, index) => (
                  <AdminDiv key={uuidv4()}>
                    <AdminImageDiv>
                      <AdminImage
                        src={
                          admin.profile_url ||
                          `https://picsum.photos/200/300?random=${index}`
                        }
                        alt=""
                      />
                      <AdminImageCrown src="/images/crown.png" alt="" />
                    </AdminImageDiv>
                    <div>
                      <ActionHeading>
                        {capitalizeFirstTwoWords(admin?.member_name)}-{" "}
                        <Span>Admin</Span>
                      </ActionHeading>
                      <MemberParagraph>
                        Membership No. 10{admin.id}
                      </MemberParagraph>
                      <MemberParagraph>
                        {formatDate(admin.created_at)}
                      </MemberParagraph>
                    </div>
                  </AdminDiv>
                ))}

                {regularMembers?.map((member, index) => (
                  <MemberDiv key={uuidv4()}>
                    <MemberImageDiv>
                      <MemberImage
                        src={
                          member.profile_url ||
                          `https://picsum.photos/200/300?random=${index}`
                        }
                        alt=""
                      />
                      <div>
                        <ActionHeading>
                          {" "}
                          {capitalizeFirstTwoWords(member?.member_name)}
                        </ActionHeading>
                        {member.is_member && (
                          <MemberParagraph>
                            Membership No. 10{member.id}
                          </MemberParagraph>
                        )}
                        <MemberParagraph>
                          {member.is_member
                            ? "Approved"
                            : `${
                                !member.status
                                  ? "Status: Pending"
                                  : "Status: Rejected"
                              }`}
                        </MemberParagraph>
                        <MemberParagraph>
                          {member.is_member ? "joined on " : "request sent on "}
                          {formatDate(member.created_at)}
                        </MemberParagraph>
                      </div>
                    </MemberImageDiv>
                    <FontAwesomeIcon
                      icon={faGear}
                      onClick={handleMemberClick}
                    />
                  </MemberDiv>
                ))}
              </MembersDiv>
            </>
          )}
        </ContainerTwo>
        {/* ---MODALS --  */}
        {openUserModal && (
          <UserModal isAdmin={isAdmin} handleCloseCLick={handleMemberClick} />
        )}

        {openExiteModal && (
          <GroupModal
            isAdmin={isAdmin}
            setExitModal={handleExitClick}
            exit={true}
            setModalOpen={setModalOpen}
          />
        )}
        {openDeleteModal && (
          <GroupModal
            isAdmin={isAdmin}
            setGroupModal={handleDeleteClick}
            setModalOpen={setModalOpen}
          />
        )}
      </WrapperDiv>
    </Main>
  );
}

export default Group;
