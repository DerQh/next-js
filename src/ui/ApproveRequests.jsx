import {
  faCheck,
  faCircleExclamation,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import ApproveModal from "./ApprovalModal";
import useTransaction from "../features/transactions/useTransactions";
import Loader from "./Loader";
import { formatDate, formatHour } from "../helpers/formatDate";
import { useMembers } from "../features/group/useMembers";
import capitalizeFirstTwoWords from "../helpers/capitalizeName";

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
`;
const Main = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  margin: 0 auto;
  background-color: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow: ${(props) => props.$openmodal && "hidden"};
  animation: ${slideIn} 1s ease forwards;
`;
const NavDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 25px;
`;
const GroupName = styled.h4`
  font-size: 26px;
  font-weight: 400;
`;
const ContainerOne = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const AleartDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  border-radius: 2px;
  background-color: aliceblue;
  gap: 15px;
`;
const AleartP = styled.p`
  font-size: 10px;
  font-weight: 400;
`;

const BellIcon = styled(FontAwesomeIcon)`
  font-size: 15px;
  color: #161616;
  cursor: pointer;
`;
const Aleart = styled(FontAwesomeIcon)`
  font-size: 17px;
  color: #000;
  border-radius: 50%;
`;

// dots
const DotsDivs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  margin-right: 10px;
`;
const Dots = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: #8e8989;
`;

const ApprovalDiv = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
`;
const ApprovalDivInner = styled.div`
  position: absolute;
  opacity: ${(props) => (props.$type ? "1" : "0")};
  bottom: 0;
  width: 90%;
  height: 3px;
  background-color: #3c81ac;
  border-radius: 2px;
`;
const ApprovalDivAll = styled.div`
  position: absolute;
  bottom: 0;
  width: 90dvw;
  height: 0.5px;
  background-color: #0a0a0a;
`;

const ApprovalHeading = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: start;
  text-align: start;
  font-size: 14px;
  font-size: ${(props) => (props.$type ? "14px" : "12px")};
  font-weight: 500;
  padding: 5px;

  cursor: pointer;
  &:hover {
    color: #1da6b8;
  }
`;
const Divider = styled.div`
  position: relative;
  bottom: -5px;
  width: 100%;
  height: 1px;
  background-color: gray;
  border-radius: 1px;
`;
const ApprovalsWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
`;
const Approval = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 65px;
  padding-top: 12px;
  padding-left: 2px;
  padding-right: 2px;
  padding-bottom: 3px;
  gap: 10px;
  &:hover {
    background-color: aliceblue;
  }
`;
const UserDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserDetails = styled.div`
  display: flex;
  align-items: center;
`;
const User = styled.div`
  display: flex;
  align-items: center;
`;
const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;
const UserName = styled.h5`
  font-size: 12px;
  font-weight: 500;
  padding: 1px 2px;
`;
const UserDate = styled.h5`
  font-size: 7px;
  font-weight: 500;
  color: rgb(128, 128, 128);
  padding: 1px 2px;
  @media (max-width: 368px) {
    font-size: 6px;
    font-weight: 600;
  }
`;
const RequestDiv = styled.h5`
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 13px;
`;
const Tick = styled(FontAwesomeIcon)`
  background-color: green;
  color: #fff;
  padding: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    font-size: 15px;
  }
`;
const Cancel = styled(FontAwesomeIcon)`
  background-color: #fe0606;
  color: #fff;
  padding: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    font-size: 15px;
  }
`;
const Type = styled.h5`
  font-size: 10px;
  font-weight: 500;
  color: rgb(0, 0, 0, 0.5);
  @media (max-width: 368px) {
    font-size: 7px;
    font-weight: 700;
  }
`;
const TypeDiv = styled.div`
  margin-left: 10px;
`;
const Amount = styled.h4`
  padding-top: 2px;
`;
const AllApproved = styled.p`
  text-align: center;
  padding: 20px 10px;
  font-weight: 500;
  color: #2c4b42;
  font-size: 12px;
`;
const Count = styled.div`
  position: absolute;
  right: 0;
  top: -3px;
  background-color: #fff;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CountInner = styled.div`
  background-color: red;
  color: #fff;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  font-size: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 700px;
`;
// -----------------MAIN ----------------//
function ApproveRequests() {
  const navigate = useNavigate();
  const {
    transactions,
    isLoading,
    refetch: refetchTransaction,
  } = useTransaction();
  const [searchParams, setSearchParams] = useSearchParams();
  let {
    isLoading: isLoadingMembers,
    refetch: refetchMembers,
    members,
  } = useMembers();

  const [transactionOpen, setTransactionOpen] = useState(true);
  const [membersOpen, setMembersOpen] = useState(false);
  const [pendingTransactions, setPendingTransactions] = useState();
  const [modalIsOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [type, setType] = useState();
  const [pendingMembers, setpendingMembers] = useState([]);

  const [count, setCount] = useState();

  const group = JSON.parse(localStorage.getItem("group"));

  //   force rerender of approvalDiv component
  const dataRefetch = useCallback(() => {
    refetchTransaction();
    refetchMembers();
  }, [refetchTransaction, refetchMembers]);

  //    ------ useEffect ------- //

  // useEffect(() => {
  //   if (members) {
  //     setpendingMembers(members.members.filter((mem) => !mem.status));
  //   }
  // }, [members]);

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  useEffect(() => {
    dataRefetch();
    if (members) {
      setpendingMembers(members.members.filter((mem) => !mem.status));
    }
    if (group) {
      searchParams.set("group", group);
      setSearchParams(searchParams);
    }
    const pendingArray = transactions?.filter((trans) => !trans.approved);
    setPendingTransactions(pendingArray);
  }, [group, transactions, members]);

  useEffect(() => {
    if (pendingTransactions?.length > 0 || pendingMembers?.length > 0) {
      setCount(
        transactionOpen ? pendingMembers?.length : pendingTransactions?.length
      );
    }
  }, [transactionOpen, pendingMembers, pendingTransactions]);

  //   ----------Tabs change --------------//
  function handleTransactionsTab() {
    setTransactionOpen(true);
    setMembersOpen(false);
  }
  function handleMembersTab() {
    setMembersOpen(true);
    setTransactionOpen(false);
    setpendingMembers(pendingMembers);
  }

  //   ----------Reject & Approve Click  Transactions --------------//
  function handleApproveTransaction(data) {
    // 1. Open Modal
    setModalOpen((open) => !open);
    setModalData(data);
    setType("approve");
  }
  function handleRejectTransaction(data) {
    setModalOpen((open) => !open);
    setModalData(data);
    setType("reject");
  }

  //   ----------Reject & Approve Click  Members --------------//
  function handleApproveMembers(data) {
    setModalOpen((open) => !open);
    setModalData(data);
    setType("approve");
  }
  function handleRejectMember(data) {
    setModalOpen((open) => !open);
    setModalData(data);
    setType("reject");
  }
  return (
    <Main $openmodal={modalIsOpen}>
      <Wrapper>
        {modalIsOpen && (
          <ApproveModal
            type={type}
            setModalOpen={setModalOpen}
            data={modalData}
            dataRefetch={dataRefetch}
          ></ApproveModal>
        )}
        <ContainerOne>
          <NavDiv>
            <GroupName>Approvals</GroupName>
            <BellIcon onClick={() => navigate("/group/overview")} icon={faX} />
          </NavDiv>
          <AleartDiv>
            <Aleart icon={faCircleExclamation} />
            <AleartP>
              Only the Administrators are allowed to approve members and
              transactions
            </AleartP>
          </AleartDiv>
          <ApprovalDiv>
            <ApprovalDivAll></ApprovalDivAll>
            {/* if transaction is not open and there are no pending transaction, dont show the count */}
            <ApprovalHeading
              $type={transactionOpen}
              onClick={handleTransactionsTab}
            >
              {!transactionOpen && pendingTransactions?.length > 0 && (
                <Count>
                  <CountInner>{count}</CountInner>
                </Count>
              )}
              Transaction
              <ApprovalDivInner $type={transactionOpen}></ApprovalDivInner>
            </ApprovalHeading>
            <ApprovalHeading $type={membersOpen} onClick={handleMembersTab}>
              {!membersOpen && pendingMembers?.length > 0 && (
                <Count>
                  <CountInner>{count}</CountInner>
                </Count>
              )}
              Members
              <ApprovalDivInner $type={membersOpen}></ApprovalDivInner>
            </ApprovalHeading>
          </ApprovalDiv>
        </ContainerOne>
        <ApprovalsWrapper>
          {isLoading || isLoadingMembers ? (
            <Loader />
          ) : (
            <>
              {/* if array is empty , all members/transactions  are approved  */}
              {membersOpen && pendingMembers?.length == 0 && (
                <AllApproved>All members are approved.....</AllApproved>
              )}
              {transactionOpen && pendingTransactions?.length == 0 && (
                <AllApproved>All Transactions are approved.....</AllApproved>
              )}
              {/* if array length is more than 0 , map over the array */}
              {membersOpen &&
                pendingMembers?.map((member, index) => (
                  <Approval key={member.id}>
                    <UserDetailsWrapper>
                      <UserDetails>
                        <DotsDivs>
                          <Dots></Dots>
                          <Dots></Dots>
                          <Dots></Dots>
                          <Dots></Dots>
                          <Dots></Dots>
                          <Dots></Dots>
                          <Dots></Dots>
                          <Dots></Dots>
                        </DotsDivs>
                        <User>
                          <UserImage
                            src={
                              member.profile_url ||
                              `https://picsum.photos/200/300?random=${index}`
                            }
                            alt="userImage"
                          />
                          <div>
                            <UserName>
                              {capitalizeFirstTwoWords(member?.member_name)}
                            </UserName>
                            <UserDate>
                              {" "}
                              {formatDate(member?.created_at)} at{" "}
                              {formatHour(member?.created_at)}
                            </UserDate>
                          </div>
                        </User>
                      </UserDetails>
                      <RequestDiv>
                        <Tick
                          onClick={() => handleApproveMembers(member)}
                          icon={faCheck}
                        />
                        <Cancel
                          onClick={() => handleRejectMember(member)}
                          icon={faX}
                        />
                      </RequestDiv>
                    </UserDetailsWrapper>
                    <Divider></Divider>
                  </Approval>
                ))}
              {transactionOpen &&
                pendingTransactions?.map((user, index) => (
                  <Approval key={user.id}>
                    <UserDetailsWrapper>
                      <UserDetails>
                        <DotsDivs>
                          <Dots></Dots>
                          <Dots></Dots>
                          <Dots></Dots>
                          <Dots></Dots>
                          <Dots></Dots>
                          <Dots></Dots>
                          <Dots></Dots>
                          <Dots></Dots>
                        </DotsDivs>
                        <User>
                          <UserImage
                            src={
                              user?.profileUrl ||
                              `https://picsum.photos/200/300?random=${index}`
                            }
                            alt="userImage"
                          />
                          <div>
                            <UserName>
                              {capitalizeFirstTwoWords(user?.name)}
                            </UserName>
                            <UserDate>
                              Deposited on {formatDate(user.created_at)}
                            </UserDate>
                          </div>
                        </User>
                        <TypeDiv>
                          <Type>Type: {user.type}</Type>
                          <Amount>{user.amount}</Amount>
                        </TypeDiv>
                      </UserDetails>
                      <RequestDiv>
                        <Tick
                          onClick={() => handleApproveTransaction(user)}
                          icon={faCheck}
                        />
                        <Cancel
                          onClick={() => handleRejectTransaction(user)}
                          icon={faX}
                        />
                      </RequestDiv>
                    </UserDetailsWrapper>
                    <Divider></Divider>
                  </Approval>
                ))}
            </>
          )}
        </ApprovalsWrapper>
      </Wrapper>
    </Main>
  );
}

export default ApproveRequests;
