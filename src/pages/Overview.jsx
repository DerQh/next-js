import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import useUser from "../features/authentification/useUser";
import capitalizeFirstLetter from "../helpers/capitalise";

import { useEffect, useState } from "react";
import EmptyDeposit from "../ui/EmptyDeposit";
import useGetTotal from "../features/transactions/useGetTotal";
import { formatMoney } from "../helpers/formatCurrency";
import { formatDate } from "../helpers/formatDate";
import WithdrawalDiv from "../ui/SingleWithdrawal";
import Loader from "../ui/Loader";

const Main = styled.div`
  background-color: #111f34;
  margin: 0 auto;
  color: #1d2939;
  width: 100%;
  height: 100dvh;
  @media (min-width: 768px) {
    max-height: 100dvh;
  }

  @media (min-width: 1024px) {
  }
`;

const User = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #111f34;
  color: #fff;
`;
const UserName = styled.div`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;
const GreetingP = styled.p`
  font-size: 10px;
  font-weight: 300;
  padding: 3px 0;
  color: #747171;
`;
const Name = styled.p`
  font-size: 20px;
  font-weight: 600;
  font-family: "Courier New", Courier, monospace;
`;
const UserDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ImageDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Image = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: 1px solid rgb(62, 109, 62, 0.5);
  object-fit: cover;
`;

const BalanceDiv = styled.div`
  position: relative;
  background-image: url("/images/black.jpg");
  background-size: cover;
  padding: 20px 30px;
  border-radius: 20px;
  margin: 0 25px;
  margin-top: 20px;
  cursor: pointer;
  z-index: 1;
`;

const BalanceDivOutter = styled.div`
  position: absolute;
  background-color: rgb(16, 16, 16, 0.7);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  padding: 20px 30px;
  border-radius: 20px;
  cursor: pointer;
  z-index: 2;
`;
const CreditImage = styled.img`
  width: 40px;
  height: 40px;
`;
const CreditInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px 0;
`;
const CreditChip = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 20px;
  padding: 5px 0;
`;
const Chip = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 5px;
`;
const BalanceP = styled.p`
  padding: 10px 0;
  font-weight: 550;
  font-size: 21px;
  white-space: nowrap;
  color: #efefef;
`;

const Expire = styled.p`
  font-weight: 450;
  font-size: 16px;
  width: 100%;
  text-align: center;
  padding: 1px 0;
`;

const CreditLastDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CreditLabe = styled.p`
  font-weight: 450;
  font-size: 16px;
`;

const CreditLabeL = styled.p`
  font-weight: 300;
  font-size: 16px;
  color: #fff;
`;

const DividerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
  padding: 5px 0;
`;
const Divider = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #3e6d3e;
`;
const ServicesWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 5px;
`;

const Service = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const Services = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 5px 20px;
  margin-top: 20px;
`;
const ImageService = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid rgb(62, 109, 62, 0.1);
  &:hover {
    border: 1px solid rgb(62, 109, 62);
  }
`;

const HeadingOverview = styled.h4`
  text-align: start;
  font-size: 16px;
  font-weight: 680;
  width: 100%;
  padding-left: 12px;
`;

const ServiceName = styled.h5`
  padding: 5px 0;
  font-weight: 600;
`;

const TransactionsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background-color: #f3f4f6; */
  border-radius: 10px;
  padding: 10px;
`;
const Transactions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const Transaction = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid rgb(62, 109, 62, 0.5);
  padding: 5px 5px;
`;
const TransactionDetails = styled.div`
  font-size: 12px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AmountDetails = styled.div`
  font-size: 12px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: end;
`;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`;

const HeadingMore = styled.div`
  text-decoration: underline;
  font-size: 12px;
  font-weight: 600;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: end;
  border-radius: 10px;
  padding: 4px;
  cursor: pointer;
`;
const HeadingM = styled.h5`
  font-size: 12px;
  font-weight: 600;
  padding: 0 5px;
  white-space: nowrap;
  color: #3e6d3e;
  &:hover {
    text-decoration: underline;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 10px;
  color: #3e6d3e;
  padding-right: 4px;
`;

const OverviewBalance = styled.p`
  color: ${(props) => (props.$negative ? "#991b1b" : "#3e6d3e")};
  font-weight: 600;
  font-size: 13px;
  min-width: 40px;
  white-space: nowrap;
  padding-right: 4px;
`;

const OverviewHeading = styled.p`
  font-size: 16px;
  font-weight: 550;
  color: ${(props) => (props.$negative ? "#991b1b" : "#3e6d3e")};
`;

const LastTransactionDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px 0;
`;
const DateDetails = styled.p`
  font-size: 10px;
  white-space: nowrap;
`;
const LastImage = styled.img`
  width: 30px;
  height: 30px;
  padding: 1px;
  border-radius: 50%;
  object-fit: cover;
`;

const LastTransactionh = styled.h5`
  padding: 2px;
`;
const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Icons = styled(FontAwesomeIcon)`
  font-size: ${(props) => (props.$btn ? "20px" : "22px")};
  color: ${(props) => (props.$btn ? "#991b1b" : "#3e6d3e")};
`;

const UserLast = styled.h4`
  white-space: nowrap;
`;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 25px;
`;
const P = styled.p`
  color: green;
`;
const TopWrapper = styled.div`
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const BottomWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const WrapperDiv = styled.div`
  width: 100%;
  height: 100%;
  max-width: 700px;
`;

//------ MAIN ------
function Overview() {
  const navigate = useNavigate();
  const { user: userData, isLoading } = useUser();
  const [deposit, setDeposit] = useState();
  const [withdrawal, setwithdrawal] = useState();

  const [searchParams, setSearchParams] = useSearchParams();
  const { getTotal, isLoadingTotal, refetchTotal } = useGetTotal();

  //
  const group = JSON.parse(localStorage.getItem("group"));
  const total = getTotal?.total;
  const lastTransaction = getTotal?.lastTransaction[0];
  const { firstName, lastName } = userData.user_metadata;

  useEffect(() => {
    if (group) {
      refetchTotal();
      if (total == "0" || !total) {
        setDeposit(false);
      } else {
        setDeposit(true);
      }
      // getTotal && setDeposit(true);
      searchParams.set("group", group);
      setSearchParams(searchParams);
    }
  }, [group, getTotal]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading || isLoadingTotal) return <Loader></Loader>;

  return (
    <>
      <Main>
        <>
          <TopWrapper>
            <User>
              <UserDetails>
                <UserName onClick={() => navigate(`/`)}>
                  <Name>{capitalizeFirstLetter(firstName)} </Name>
                  <GreetingP>
                    Joined on {formatDate(userData?.created_at)}
                  </GreetingP>
                </UserName>
                <ImageDiv onClick={() => navigate(`/user`)}>
                  <Image
                    src={
                      userData?.user_metadata.avatar ||
                      "https://source.unsplash.com/random/300x200"
                    }
                    alt=""
                  />
                </ImageDiv>
              </UserDetails>
            </User>
          </TopWrapper>

          <BottomWrapper>
            <WrapperDiv>
              <BalanceDiv>
                <BalanceDivOutter>
                  <CreditInner>
                    <CreditLabeL>
                      {capitalizeFirstLetter(group)} Group
                    </CreditLabeL>
                    <CreditImage src="/images/visa.png" alt="visa" />
                  </CreditInner>
                  <CreditChip>
                    <Chip src="/images/chip.png" alt="visa" />
                    <BalanceP> {total ? formatMoney(total) : "Ksh "}</BalanceP>
                  </CreditChip>
                  <Expire>EXP 03/2*</Expire>
                  <CreditLastDiv>
                    <CreditLabe> 2024 0331 **** 0001</CreditLabe>
                    <CreditImage src="/images/card.png" alt="visa" />
                  </CreditLastDiv>
                </BalanceDivOutter>
                <CreditInner>
                  <CreditLabe>{capitalizeFirstLetter(group)} Group</CreditLabe>
                  <CreditImage src="/images/visa.png" alt="visa" />
                </CreditInner>
                <CreditChip>
                  <Chip src="/images/chip.png" alt="visa" />
                  <BalanceP> {total ? formatMoney(total) : "Ksh "}</BalanceP>
                </CreditChip>
                <Expire>EXP 03/29</Expire>
                <CreditLastDiv>
                  <CreditLabe> 2024 0331 **** 0001</CreditLabe>
                  <CreditImage src="/images/card.png" alt="visa" />
                </CreditLastDiv>
              </BalanceDiv>
              <DividerWrapper>
                <Divider></Divider>
                <Divider></Divider>
                <Divider></Divider>
              </DividerWrapper>
              <Services>
                <ServicesWrapper>
                  <Service onClick={() => navigate(`/deposit`)}>
                    <ImageService src="/images/deposit.png" />
                    <ServiceName>Deposit</ServiceName>
                  </Service>
                  <Service onClick={() => navigate("/projects")}>
                    <ImageService src="/images/money-transfer.png" />
                    <ServiceName>Projects</ServiceName>
                  </Service>
                  <Service onClick={() => navigate(`/group/overview`)}>
                    <ImageService src="/images/man.png" />
                    <ServiceName>Group Details</ServiceName>
                  </Service>
                </ServicesWrapper>
              </Services>

              {/* ------------- Placeholders ------------ */}
              <TransactionsWrapper>
                <HeadingWrapper>
                  <HeadingOverview>Overview</HeadingOverview>
                  <HeadingMore onClick={() => navigate(`/transactions`)}>
                    <HeadingM> Show all</HeadingM>
                  </HeadingMore>
                </HeadingWrapper>

                {deposit ? (
                  <>
                    <Transactions>
                      {deposit && (
                        <Transaction>
                          <Wrapper>
                            <Icons icon={faArrowRightToBracket} />
                            <TransactionDetails>
                              <OverviewHeading $negative={false}>
                                Deposits
                              </OverviewHeading>
                              <LastTransactionh>Last Deposit</LastTransactionh>
                              <LastTransactionDiv>
                                <LastImage
                                  src={
                                    lastTransaction?.profileUrl ||
                                    "https://picsum.photos/200/300?random=7"
                                  }
                                  alt=""
                                />
                                <UserDiv>
                                  <UserLast>{lastTransaction?.name}</UserLast>
                                  <DateDetails>
                                    {formatMoney(lastTransaction?.amount)}{" "}
                                    {" on "}
                                    {formatDate(lastTransaction?.approval_date)}
                                  </DateDetails>
                                </UserDiv>
                              </LastTransactionDiv>
                            </TransactionDetails>
                          </Wrapper>

                          <AmountDetails>
                            <OverviewBalance $negative={false}>
                              {formatMoney(lastTransaction?.amount)}{" "}
                            </OverviewBalance>
                          </AmountDetails>
                        </Transaction>
                      )}
                      {!withdrawal && <WithdrawalDiv />}
                    </Transactions>
                  </>
                ) : (
                  <EmptyDeposit />
                )}
              </TransactionsWrapper>
            </WrapperDiv>
          </BottomWrapper>
        </>
      </Main>
    </>
  );
}

export default Overview;
