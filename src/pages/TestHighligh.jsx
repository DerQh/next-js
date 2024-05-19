import styled, { keyframes } from "styled-components";
import LineChart from "../ui/Chart";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Group from "../ui/Group";

const HighlightsSection = styled.div`
  margin: 0 auto;
  width: 100dvw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const slideFromTop = keyframes`
  0%{
    transform: translateY(-100%);
  }
  100%{
    transform: translateY(0%);
  }
`;

const slideFromBottom = keyframes`
  0%{
    transform: translateY(100%);
  }
  100%{
    transform: translateY(0%);
  }
`;

const Account = styled.div`
  width: 100%;
  padding: 10px 0;
  animation: ${slideFromTop} 1s ease forwards;
`;
const AccountSummary = styled.div`
  padding: 5px 0;
  animation: ${slideFromBottom} 1s ease forwards;
  border: 1px solid black;
  border-radius: 10px;
  margin-top: 70px;
  background-color: #000;
  color: #fff;
`;

const Map = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  padding: 25px 5px;
  margin-top: 15px;
`;

const BalanceH = styled.h5`
  padding: 5px 0;
  font-size: 18px;
  font-weight: 500;
`;

const AmountH = styled.h5`
  font-size: 31px;
  font-weight: 600;
  padding: 10px 0;
`;
const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 3px 6px;
  background-color: rgba(151, 182, 151, 0.8);
  color: rgba(0, 128, 0);
  font-weight: 600;
  font-size: 14px;
`;
const BalanceData = styled.div`
  display: flex;
  justify-content: start;
  gap: 25px;
  align-items: center;
`;

const StatsDiv = styled.div`
  padding: 12px;
`;

const SummaryHeading = styled.h5`
  font-size: 20px;
  font-weight: 500;
  padding-top: 2px 0;
`;

const SummaryStatus = styled.div`
  padding: 10px 0;
`;
const SummaryStatusInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
const SummmaryAmount = styled.p`
  min-width: 120px;
  display: flex;
  align-items: end;
  color: green;
  font-weight: 400;

  justify-content: end;
`;
const SummmaryInfo = styled.p`
  min-width: 120px;
  display: flex;
  justify-content: start;
  padding: 2px 0;
  font-weight: 400;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 29px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 21px;
  padding: 0 5px;
  cursor: pointer;
`;

const Span = styled.span`
  font-size: ${(props) => (props.$small ? "10px" : "16px")};
  font-weight: 400;
  padding-bottom: ${(props) => (props.$small ? "1px" : "")};
  padding-right: ${(props) => (props.$small ? "1px" : "2px")};
`;


// ----MAIN ---- ///
function Groups() {
  const navigate = useNavigate();

  return (
    <HighlightsSection>
      <Group />
      {/* <Account>
        <Header>
          <Icon icon={faArrowLeft} onClick={() => navigate("/overview")} />
          <Image
            src="https://source.unsplash.com/random/300x200"
            alt="userlogo"
          ></Image>
        </Header>
        <BalanceH> Family Account Balance</BalanceH>
        <BalanceData>
          <AmountH>
            <Span>KES</Span>300,456.65
          </AmountH>
          <Button>+3.35%</Button>
        </BalanceData>
        <Map>
          <LineChart></LineChart>
        </Map>
        <Paragraph>
          The graph displays the overall increase or decrease in contributions
          over the past 30 days, with the amount represented on the y-axis. The
          names of the contributers are not shown.
        </Paragraph>
      </Account>
      <AccountSummary>
        <StatsDiv>
          <SummaryHeading>Account Summary</SummaryHeading>
          <SummaryStatus>
            <SummaryStatusInner>
              <SummmaryInfo>Monthly Contribution</SummmaryInfo>
              <SummmaryAmount>
                <Span $small={true}>KES</Span>3,200.58
              </SummmaryAmount>
            </SummaryStatusInner>
            <SummaryStatusInner>
              <SummmaryInfo>Monthly Target</SummmaryInfo>
              <SummmaryAmount>
                <Span $small={true}>KES</Span>37,500.52
              </SummmaryAmount>
            </SummaryStatusInner>
            <SummaryStatusInner>
              <SummmaryInfo>Latest Contibution</SummmaryInfo>
              <SummmaryAmount>
                <Span $small={true}>KES</Span>31,538.87
              </SummmaryAmount>
            </SummaryStatusInner>
          </SummaryStatus>
        </StatsDiv>
      </AccountSummary> */}
    </HighlightsSection>
  );
}

export default Groups;
