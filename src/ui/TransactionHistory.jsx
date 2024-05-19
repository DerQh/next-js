import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import formatCurrency from "../helpers/formatKes";
import { useNavigate } from "react-router-dom";
import { formatDate, formatHour } from "../helpers/formatDate";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import capitalizeFirstTwoWords from "../helpers/capitalizeName";

const StyledDiv = styled.div`
  width: 100%;
  margin-top: 200px;
  height: auto;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  color: #1d2939;
`;
const Transaction = styled.div`
  height: auto;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 15px;
  background-color: rgb(224, 224, 224, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
  &:hover {
    border: 1px solid black;
    background-color: rgb(218, 218, 218);
  }
`;

const StatusIcon = styled(FontAwesomeIcon)`
  color: #0b0a0a;
  font-size: small;
  padding-right: 5px;
`;

const User = styled.div`
  height: auto;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StatusDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
`;
const Status = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
`;
const Amount = styled.div`
  font-size: 18px;
  font-weight: 550;
  width: 120px;
`;

const ImageDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  padding-bottom: 2px;
`;
const Image = styled.img`
  border-radius: 50%;
  border: 1px solid gray;
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

const Button = styled.button`
  cursor: pointer;
  font-weight: 500;
  font-size: small;
  border-radius: 5px;
  padding: 5px 5px;
  min-width: 95px;
  color: ${(props) =>
    (props.$status === "rejected" && "#800000") ||
    (props.$status === "approved" && "#008000") ||
    (props.$status === "pending" && "#c1b0b0")};

  border: 1px ridge
    ${(props) =>
      (props.$status === "rejected" && "rgb(128, 0, 0, 0.3)") ||
      (props.$status === "approved" && "rgb(0, 128, 0,0.3)") ||
      (props.$status === "pending" && "orange")};
`;

const Span = styled.span`
  font-weight: 500;
  color: ${(props) =>
    (props.$status === "rejected" && "#800000") ||
    (props.$status === "approved" && "#008000") ||
    (props.$status === "pending" && "orange")};
`;
const UserName = styled.p`
  font-size: 16px;
  font-weight: 520;
  padding-left: 2px;
`;

const Date = styled.p`
  font-size: small;
  font-weight: 400;
  padding: 2px 0;
`;
const TransactionType = styled.p`
  font-size: small;
  font-weight: 500;
  padding: 2px 0;
`;
const P = styled.p`
  text-align: center;
  font-size: 12px;
  color: #253442;
`;
const SpanDeposit = styled.span`
  text-align: center;
  font-size: 12px;
  color: #1429e9;
  text-decoration: underline;
  cursor: pointer;
`;

// MAIN COMPONENT

function TransactionHistory({
  dataArray,
  isLoading,
  isLoadingUser,
  statusFilter,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dataArray) {
      // console.log(statusFilter, dataArray);
      let filteredData = [...dataArray]; // Create a copy of the dataArray

      if (statusFilter === "Approved") {
        filteredData = filteredData.filter((dat) => dat.status === "approved");
        window.history.pushState(null, "", `?approved=${filteredData.length}`);
      } else if (statusFilter === "Rejected") {
        filteredData = filteredData.filter((dat) => dat.status === "rejected");
        window.history.pushState(null, "", `?rejected=${filteredData.length}`);
      } else if (statusFilter === "Pending") {
        filteredData = filteredData.filter((dat) => dat.status === "pending");
        window.history.pushState(null, "", `?pending=${filteredData.length}`);
      } else if (statusFilter === "Min-Max") {
        filteredData.sort((a, b) => b.amount - a.amount);
        window.history.pushState(null, "", `?min-max`);
      } else if (statusFilter === "Max-Min") {
        filteredData.sort((a, b) => a.amount - b.amount);
        window.history.pushState(null, "", `?max-min`);
      } else if (statusFilter === "A-Z") {
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
        window.history.pushState(null, "", `?a-z=${filteredData.length}`);
      } else if (statusFilter === "Z-A") {
        filteredData.sort((a, b) => b.name.localeCompare(a.name));
        window.history.pushState(null, "", `?z-a=${filteredData.length}`);
      } else if (statusFilter === "Ascend") {
        filteredData.sort((a, b) => b.created_at - a.created_at);
        window.history.pushState(null, "", `?asc=${filteredData.length}`);
      } else if (statusFilter === "Descend") {
        filteredData.sort((a, b) => a.created_at - b.created_at);
        window.history.pushState(null, "", `?dsc=${filteredData.length}`);
      } else {
        window.history.pushState(null, "", `/transactions`);
      }

      setData(filteredData);
    }
  }, [statusFilter, dataArray]);

  if (isLoading || isLoadingUser) return <Loader />;
  return (
    <StyledDiv>
      {data?.length == 0 && (
        <P>
          Click{" "}
          <SpanDeposit onClick={() => navigate("/deposit")}>here</SpanDeposit>{" "}
          to Deposit any amount and show transactions history.....
        </P>
      )}
      {data?.map((dat, index) => (
        <Transaction
          data={dat}
          key={dat.id}
          onClick={() => navigate(`/transaction/${dat.id}`)}
        >
          <Details>
            <User>
              <ImageDiv>
                <Image
                  src={
                    dat?.profileUrl ||
                    `https://picsum.photos/200/300?random=${index}`
                  }
                ></Image>
                <UserName> {capitalizeFirstTwoWords(dat.name)}</UserName>
              </ImageDiv>
              <Date>
                {formatDate(dat.created_at)} -
                <span> {formatHour(dat.created_at)}</span>
              </Date>
              <TransactionType>
                Status: <Span $status={`${dat.status}`}>{dat.status}</Span>
              </TransactionType>
            </User>
          </Details>
          <StatusDiv>
            <Amount>{formatCurrency(dat.amount)}</Amount>
            <Status>
              <Button $status={`${dat.status}`}>{dat.status}</Button>
              <StatusIcon icon={faChevronRight} />
            </Status>
          </StatusDiv>
        </Transaction>
      ))}
    </StyledDiv>
  );
}

export default TransactionHistory;
