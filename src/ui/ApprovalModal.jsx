import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { formatDate, formatHour } from "../helpers/formatDate";
import useUser from "../features/authentification/useUser";
import { useUpdateTransaction } from "../features/transactions/useUpdateTransaction";
import { useRejectTransaction } from "../features/transactions/useRejectTransaction";
import { useRejectMember } from "../features/group/useRejectMember";
import { useUpdateMember } from "../features/group/useUpdateMember";
import capitalizeFirstTwoWords from "../helpers/capitalizeName";

const StyledDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100dvh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.8);
  overflow: hidden;
  z-index: 999;
`;
const InnerDiv = styled.div`
  height: auto;
  max-width: 400px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Content = styled.div`
  margin-top: 15px;
`;

const Title = styled.h5`
  margin-bottom: 5px;
  padding: 5px;
  font-weight: 500;
  color: ${(props) => (props.$type == "approve" ? "green" : "red")};
`;

const Description = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
  font-size: 10px;
  font-weight: 300;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 9px 17px;
  background-color: #ff0000;
  color: #fff;
  border: 1px solid #ff0000;
  border-radius: 25px;
  font-size: 10px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
  }
`;
const ButtonTwo = styled.button`
  padding: 8px 15px;
  background-color: #fff;
  color: ${(props) => (props.$type == "approve" ? "green" : "red")};
  border: ${(props) =>
    props.$type == "approve" ? "1px solid green" : "1px solid red"};
  border-radius: 25px;
  font-size: 10px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000000;

    border: 1px solid #2ea33b;
  }
`;

const UserDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: start;
  border-radius: 5px;
  padding: 10px 5px;
  background-color: rgb(204, 230, 237, 0.2);
  border: ${(props) =>
    props.$type == "approve" ? "1px solid green" : "1px solid red"};
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 5px;
`;
const UserName = styled.h5`
  font-size: 10px;
  font-weight: 600;
  padding: 1px 2px;
`;
const UserDate = styled.h5`
  font-size: 7px;
  font-weight: 500;
  color: rgb(128, 128, 128);
  padding: 1px 2px;
  @media (max-width: 368px) {
    font-size: 5px;
    font-weight: 600;
  }
`;
const Type = styled.h5`
  font-size: 9px;
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
  font-size: 14px;
`;

//  ---- COMPONENT  ---//
function ApproveModal({ type, setModalOpen, data, dataRefetch }) {
  const innerDivRef = useRef(null);
  const { user, isLoading } = useUser();
  const { updateTransaction, isUpdating, isSuccess, isError } =
    useUpdateTransaction();
  const { rejectTransaction, isRejecting, isRejectSucess } =
    useRejectTransaction();
  const { rejectMember, isRejectingMember, isRejectMemberSucess } =
    useRejectMember();
  const { updateMember, isUpdatingMember, isUpdateMemberSucess } =
    useUpdateMember();
  // data && console.log(data);
  const userId = user?.id;
  const transactionId = data?.id;
  const memberId = data?.id;

  useEffect(() => {
    // if sucess , refetch transactions data
    if (isSuccess || isRejectSucess) {
      dataRefetch();
      setModalOpen(false);
    }
    if (isRejectMemberSucess || isUpdateMemberSucess) {
      dataRefetch();
      setModalOpen(false);
    }
    // handleClick outside the modal div
    function handleClickOutside(event) {
      if (innerDivRef.current && innerDivRef.current.contains(event.target)) {
        if (
          isUpdating ||
          isRejecting ||
          isRejectingMember ||
          isUpdatingMember
        ) {
        } else {
          setModalOpen(false);
        }
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [
    setModalOpen,
    isSuccess,
    isRejectSucess,
    isRejectMemberSucess,
    isUpdateMemberSucess,
  ]);

  //
  function handleCancel() {
    setModalOpen(false);
  }
  function handleApproveReject() {
    // if type is approve , approve the transaction , is type is reject , reject the transaction
    //   console.log(userId, transactionId);
    // console.log(type, memberId);
    if (type == "approve") {
      data?.amount
        ? updateTransaction({ transactionId, userId })
        : updateMember({ memberId, userId });
    }
    if (type == "reject") {
      data?.amount
        ? rejectTransaction({ transactionId, userId })
        : rejectMember({ memberId, userId });
    }
  }

  function handleInnerClick(event) {
    event.stopPropagation();
  }

  return (
    <>
      <StyledDiv ref={innerDivRef}>
        {data?.amount ? (
          <InnerDiv onClick={handleInnerClick}>
            <Content>
              {/* type approve should be grenn , while reject modal should be red  */}
              <Title $type={type}>
                {type == "approve" ? "Approve Deposit ?" : "Reject Deposit ?"}
              </Title>
              <UserDiv $type={type}>
                <User>
                  <UserImage
                    src={`https://picsum.photos/200/300?random=1`}
                    alt="userImage"
                  />
                  <div>
                    <UserName>{capitalizeFirstTwoWords(data?.name)}</UserName>
                    <UserDate>
                      Deposited on {formatDate(data?.created_at)} at{" "}
                      {formatHour(data?.created_at)}
                    </UserDate>
                  </div>
                </User>
                <TypeDiv>
                  <Type>{data?.type}</Type>
                  <Amount>{data?.amount} </Amount>
                </TypeDiv>
              </UserDiv>
              <Description>
                <FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon>
                Once Done, this action can not be reversed !
              </Description>
              <ButtonContainer>
                <Button
                  $type={type}
                  onClick={handleCancel}
                  disabled={
                    isUpdating ||
                    isRejecting ||
                    isRejectingMember ||
                    isUpdatingMember
                  }
                >
                  Back
                </Button>
                <ButtonTwo
                  $type={type}
                  onClick={handleApproveReject}
                  disabled={
                    isUpdating ||
                    isRejecting ||
                    isRejectingMember ||
                    isUpdatingMember
                  }
                >
                  Yes,{" "}
                  {type == "approve" ? "Approve Transaction" : "Reject Deposit"}
                </ButtonTwo>
              </ButtonContainer>
            </Content>
          </InnerDiv>
        ) : (
          <InnerDiv onClick={handleInnerClick}>
            <Content>
              {/* type approve should be grenn , while reject modal should be red  */}
              <Title $type={type}>
                {type == "approve"
                  ? "Approve Membership Request ?"
                  : "Reject Membership Request ?"}
              </Title>
              <UserDiv $type={type}>
                <User>
                  <UserImage
                    src={`https://picsum.photos/200/300?random=1`}
                    alt="userImage"
                  />
                  <div>
                    <UserName>{capitalizeFirstTwoWords(data?.member_name)}</UserName>
                    <UserDate>
                      Requested on {formatDate(data?.created_at)} at{" "}
                      {formatHour(data?.created_at)}
                    </UserDate>
                  </div>
                </User>
              </UserDiv>
              <Description>
                <FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon>
                Once Done, this action can not be reversed !
              </Description>
              <ButtonContainer>
                <Button $type={type} onClick={handleCancel}>
                  Back
                </Button>
                <ButtonTwo $type={type} onClick={handleApproveReject}>
                  Yes,{" "}
                  {type == "approve" ? "Approve Request" : "Reject Request"}
                </ButtonTwo>
              </ButtonContainer>
            </Content>
          </InnerDiv>
        )}
      </StyledDiv>
    </>
  );
}

export default ApproveModal;
