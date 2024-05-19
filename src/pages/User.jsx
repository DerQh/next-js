import { faCircleXmark, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faAward, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useUser from "../features/authentification/useUser";
import { useUserTransactions } from "../features/transactions/useTransactions";
import Loader from "../ui/Loader";
import { formatDate, formatHour } from "../helpers/formatDate";
import capitalizeFirstLetter from "../helpers/capitalise";
import { useGroup } from "../features/group/useGroup";

const Main = styled.div`
  margin: 0 auto;
  background-color: #fff;
  color: #1d2939;
  width: 100%;
  min-height: 100dvh;

  @media (max-width: 368px) {
    font-size: 10px;
  }

  @media (min-width: 1024px) {
    :root {
      --base-font-size: 10px;
    }
  }
`;

const UserWrapper = styled.div`
  margin: 0 auto;
  @media (max-width: 368px) {
    font-size: 10px;
  }
`;

const UserHeader = styled.div`
  position: relative;
  width: 100%;
  background-image: url("/images/background image .jpeg");
  background-size: cover;
  background-position: center;
  display: flex;
  height: 120px;
  background-color: #fff;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;
const ImageWrapper = styled.div`
  position: absolute;
  top: 70px;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 110px;
  height: 110px;
  border-radius: 50%;
`;
const Profilewrapper = styled.div`
  position: absolute;
  top: 110px;
  left: ${(prop) => (prop.$two ? "205px" : "124px")};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => (prop.$two ? "#EFEBFA" : "#d3dffa")};
  color: ${(prop) => (prop.$two ? "#6E55D1" : "#0E3286")};
  height: 20px;
  padding: 10px;
  border-radius: 10px;
  font-size: 9px;
  font-weight: 600;
  gap: 5px;
  border: ${(prop) => (prop.$two ? "1px solid #58cb6d" : "")};
  cursor: pointer;
`;

const Close = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: 500;
  padding: 2px 5px;
  border: 1px solid rgb(212, 89, 89, 0.2);
  height: 19px;
  width: 19px;

  border-radius: 50%;
  margin: 9px;
  cursor: pointer;
`;

const UserDetails = styled.div`
  margin: 0 auto;
  padding-left: 128px;
  padding-top: 20px;
  font-size: 13px;
  /* background-color: #e1e5eb; */
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  @media (max-width: 368px) {
    font-size: 10px;
  }
`;
const Name = styled.h5`
  font-size: 24px;
  font-weight: 600;
  padding: 5px 0;
`;
const SubHeader = styled.h4`
  font-size: 13px;
  font-weight: 500;
  padding: 2px 0;
  margin: 2px auto;

  @media (max-width: 368px) {
    font-size: 10px;
  }
`;

const SubTitles = styled.div`
  font-size: 11px;
  font-weight: 400;
  padding: 2px 0;
  display: flex;

  @media (max-width: 368px) {
    font-size: 9px;
    gap: 5px;
  }
`;
const Span = styled.p`
  font-weight: 500;
  padding-right: 6px;
  min-width: ${(prop) => (prop.$header ? "" : "")};
  font-weight: ${(prop) => (prop.$header ? "400" : "600")};
  text-decoration: none;
  @media (max-width: 368px) {
    font-weight: ${(prop) => (prop.$header ? "300" : "500")};
    font-size: 9px;
    padding-right: 3px;
  }
`;

const Button = styled.button`
  padding: 5px 12px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  font-weight: 500;
  gap: 5px;
  border: 1px solid rgb(149, 141, 141, 0.2);
  background-color: ${(prop) =>
    prop.$two ? "#EBF1FF" : "rgb(211, 223, 250, 0.1)"};
  color: ${(prop) => (prop.$two ? "#1D57E1" : "black")};
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
`;

// ACTIVITY
const StatsWrapper = styled.div`
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  background-color: #e1e5eb;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ActivityDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;
const SelectDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 2px;
  color: #000;
`;
const Select = styled.select`
  background-color: #fff;
  border: 1px solid rgb(0, 0, 0, 0.3);
  border-radius: 3px;
  font-size: 10px;
  height: 22px;
  cursor: pointer;
`;
const Option = styled.option`
  color: #000;
`;

const Thead = styled.thead`
  font-size: 14px;
`;
const Th = styled.th`
  padding: 6px 4px 5px 4px;
  font-size: 12px;
  font-weight: 600;
`;

const Table = styled.table`
  font-size: 13px;
`;

const Row = styled.tr`
  font-size: 14px;
  &:nth-child(odd) {
    background-color: rgb(0, 128, 0, 0.1);
  }
  cursor: pointer;
  &:hover {
    background-color: rgb(103, 146, 189);
  }
`;

const TData = styled.td`
  padding: 8px 4px;
  text-align: start;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 500;

  &:nth-child(1) {
    font-size: 10px;
  }
  &:nth-child(2) {
    font-size: 11px;
    font-weight: 700;
  }
  &:nth-child(3) {
    font-size: 11px;
  }
  &:nth-child(4) {
    font-size: 11px;
    font-weight: 500;
    color: ${(prop) =>
      (prop.$status === "approved" && "green") ||
      (prop.$status === "rejected" && "red") ||
      (prop.$status === "pending" && "#ff9800;")};
  }
`;
const ActivityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// - MAIN -//
function User() {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const { getUserTransactions: data, isLoading: isLoadingUser } =
    useUserTransactions();
  const { isLoadinGroup, groupData, isSuccess } = useGroup();

  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { firstName, lastName, email, avatar } = user.user_metadata;

  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }
  function handleSortChange(event) {
    setSortBy(event.target.value);
  }

  useEffect(() => {
    if (isSuccess) {
      // console.log(groupData[0].admins.includes(user.id));
      groupData[0].admins.includes(user.id) && setIsAdmin(true);
    }
  }, [isSuccess]);

  if (isLoading || isLoadingUser) return <Loader />;

  return (
    <Main>
      <UserWrapper>
        <UserHeader>
          <ImageWrapper>
            <Image
              src={avatar || "https://source.unsplash.com/random/200x200"}
              alt=""
            />
          </ImageWrapper>
          <Profilewrapper>
            <FontAwesomeIcon icon={faAward} />
            10+ years
          </Profilewrapper>
          <Profilewrapper $two={true}>
            <p>{isAdmin ? "Admin" : "Member"}</p>
          </Profilewrapper>
          <Close onClick={() => navigate(`/overview`)}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </Close>
        </UserHeader>
        <UserDetails>
          <Name>{`${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(
            lastName
          )}`}</Name>
          <SubHeader>
            {" "}
            {isAdmin ? "Administrator & Team Leader" : "Member"}
          </SubHeader>
          <SubTitles>
            <Span $header={true}>Membership no </Span>
            <Span>001</Span>
          </SubTitles>
          <SubTitles>
            <Span $header={true}>Phone no </Span>
            <Span>N/A</Span>
          </SubTitles>

          <SubTitles>
            <Span $header={true}>Email </Span>
            <Span> {email}</Span>
          </SubTitles>
          <SubTitles>
            <Span $header={true}>Date of Birth </Span>
            <Span>N/A</Span>
          </SubTitles>
          <ButtonWrapper>
            <Button $two={true} onClick={() => navigate("/updateprofile")}>
              <FontAwesomeIcon icon={faUser} />
              Edit Profile
            </Button>
            <Button>
              <FontAwesomeIcon icon={faMessage} />
              Message
            </Button>
          </ButtonWrapper>
        </UserDetails>
      </UserWrapper>

      {/* stats */}
      <StatsWrapper>
        <ActivityDiv>
          <h5>Activity</h5>
          <ActivityWrapper>
            <SelectDiv>
              <Select
                id="timelime"
                value={filterBy}
                name="timeline"
                onChange={handleFilterChange}
              >
                <Option value="All">Filter by</Option>
                <Option value="12">Last 12 months</Option>
                <Option value="6">Last 6 months</Option>
                <Option value="1">Last 2 year</Option>
                <Option value="withdrawal">Withdrawals</Option>
                <Option value="loans">Loans</Option>
                <Option value="deposit">Deposits</Option>
              </Select>
            </SelectDiv>

            <SelectDiv>
              <Select
                id="timelime"
                value={sortBy}
                name="timeline"
                onChange={handleSortChange}
              >
                <Option value="All">Sort By</Option>
                <Option value="date">date</Option>
                <Option value="amount">amount</Option>
                <Option value="asc">A-Z</Option>
                <Option value="dsc">Z-A</Option>
              </Select>
            </SelectDiv>
          </ActivityWrapper>
        </ActivityDiv>
        <Table>
          <Thead>
            <tr>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Status</Th>
            </tr>
          </Thead>
          <tbody>
            {data.map((transaction) => (
              <Row
                key={transaction.id}
                onClick={() => navigate(`/transaction/${transaction.id}`)}
              >
                <TData>
                  {formatDate(transaction.created_at)},{" "}
                  {formatHour(transaction.created_at)}
                </TData>
                <TData>{transaction.amount}</TData>
                <TData>{transaction.type}</TData>
                <TData $status={transaction.status}>{transaction.status}</TData>
              </Row>
            ))}
          </tbody>
        </Table>
      </StatsWrapper>
    </Main>
  );
}

export default User;
