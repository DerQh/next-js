import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetTransaction } from "../features/transactions/useTransactions";
import Loader from "../ui/Loader";
import { formatDate, formatHour } from "../helpers/formatDate";
import capitalizeFirstTwoWords from "../helpers/capitalizeName";
import { _capitalize } from "chart.js/helpers";

const StyledDiv = styled.div`
  margin: 0 auto;
  background-color: #fff;
  width: 100%;
  height: auto;
  padding: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
`;

const Details = styled.div`
  margin-top: 15px;
  background-color: #e1e5eb;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px dotted green;
  padding: 16px;
`;
const CircleLeftTop = styled.div`
  position: absolute;
  width: 21px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  top: -3%;
  left: -3%;
`;
const CircleRightTop = styled.div`
  position: absolute;
  width: 21px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  top: -3%;
  right: -3%;
`;
const CircleRightBottom = styled.div`
  position: absolute;
  width: 21px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  bottom: -3%;
  left: -3%;
`;
const CircleLeftBottom = styled.div`
  position: absolute;
  width: 21px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  bottom: -3%;
  right: -3%;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
`;
const Title = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: gray;
`;
const SubTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
`;

const StatusDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => {
    if (props.$status === "approved") {
      return "green";
    }
    if (props.$status === "rejected") {
      return "red";
    }
    if (props.$status === "pending") {
      return "orange";
    }
  }};
`;

const SubTitleID = styled.p`
  font-size: 10px;
  font-weight: 700;
`;

const HeaderIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;
const WrapperDiv = styled.div`
  width: 100%;
  height: 100%;
  max-width: 700px;
`;

function Transaction() {
  const navigate = useNavigate();
  const { transactionfn, isLoading } = useGetTransaction();

  if (isLoading) return <Loader />;

  return (
    <StyledDiv>
      <WrapperDiv>
        <Header>
          <HeaderIcon icon={faArrowLeft} onClick={() => navigate(-1)} />
          <h4>Transaction Details</h4>
          <HeaderIcon icon={faEllipsis} />
        </Header>
        <Details>
          <CircleLeftTop></CircleLeftTop>
          <CircleRightTop></CircleRightTop>
          <CircleLeftBottom></CircleLeftBottom>
          <CircleRightBottom></CircleRightBottom>
          <Row>
            <Title>Reference No. </Title>
            <SubTitleID>{transactionfn[0].id}</SubTitleID>
          </Row>

          <Row>
            <Title>Name :</Title>
            <SubTitle>
              {" "}
              {capitalizeFirstTwoWords(transactionfn[0].name)}
            </SubTitle>
          </Row>
          <Row>
            <Title>Transaction ID. </Title>
            <SubTitle>QR1245-0{transactionfn[0].transaction_num}</SubTitle>
          </Row>

          <Row>
            <Title>Transaction Type :</Title>
            <SubTitle>
              {capitalizeFirstTwoWords(transactionfn[0].type)}
            </SubTitle>
          </Row>
          <Row>
            <Title>Amount :</Title>
            <SubTitle> Ksh {transactionfn[0].amount}</SubTitle>
          </Row>
          <Row>
            <Title>Transaction Method :</Title>
            <SubTitle>Cash</SubTitle>
          </Row>
          <Row>
            <Title>Date : </Title>
            <SubTitle>
              {formatDate(transactionfn[0].created_at)}{" "}
              {formatHour(transactionfn[0].created_at)}
            </SubTitle>
          </Row>

          <Row>
            <Title>Status :</Title>
            <StatusDiv $status={`${transactionfn[0].status}`}>
              <FontAwesomeIcon icon={faCircleCheck} />
              <SubTitle>{transactionfn[0].status}</SubTitle>
            </StatusDiv>
          </Row>
        </Details>
      </WrapperDiv>
    </StyledDiv>
  );
}

export default Transaction;
