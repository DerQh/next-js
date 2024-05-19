import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Loader from "./Loader";
import { formatDate } from "../helpers/formatDate";

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

const Approval = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 55px;
  padding-top: 12px;
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

//
function Requests({
  isLoading,
  membersOpen,
  transactionOpen,
  pendingTransactions,
}) {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {membersOpen && (
            <Approval>
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
                    <UserImage src="/users/phoebe.JPG" alt="userImage" />
                    <div>
                      <UserName>User Name</UserName>
                      <UserDate>Date requested</UserDate>
                    </div>
                  </User>
                </UserDetails>
                <RequestDiv>
                  <Tick icon={faCheck} />
                  <Cancel icon={faX} />
                </RequestDiv>
              </UserDetailsWrapper>
              <Divider></Divider>
            </Approval>
          )}
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
                        src={`https://picsum.photos/200/300?random=${index}`}
                        alt="userImage"
                      />
                      <div>
                        <UserName>{user.name}</UserName>
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
                    <Tick icon={faCheck} />
                    <Cancel icon={faX} />
                  </RequestDiv>
                </UserDetailsWrapper>
                <Divider></Divider>
              </Approval>
            ))}
        </>
      )}
    </>
  );
}

export default Requests;
