import styled from "styled-components";
import SearchTransaction from "../ui/SearchTransaction";
import TransactionHistory from "../ui/TransactionHistory";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FilterComponent from "../ui/Filter";
import { useEffect, useState } from "react";
import MenuLogOut from "../ui/MenuLogOut";
import useTransaction from "../features/transactions/useTransactions";
import useUser from "../features/authentification/useUser";

const StyledDiv = styled.div`
  margin: 0 auto;
  background-color: #fff;
  width: 100%;
  height: auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TransactionHeading = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: #6d6a6a;
  padding: 17px 2px;
  display: flex;
  justify-content: space-between;
`;
const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const Image = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 20px;
  padding: 0 5px;
  cursor: pointer;
`;

const FixedDiv = styled.div`
  position: fixed;
  background-color: #fff;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  width: 100dvw;
  height: 200px;
  z-index: 9999;
  padding: 0 20px;
  max-width: 700px;
`;
const P = styled.p`
  color: #060505;
`;
const WrapperDiv = styled.div`
  width: 100%;
  height: 100%;
  max-width: 700px;
`;

// -- main -- //
function Transactions() {
  const navigate = useNavigate();
  const { user, isLoading: isLoadingUser } = useUser();

  const [isMenu, setIsMenu] = useState(false);
  let { transactions, isLoading, refetch } = useTransaction();
  const [statusFilter, setFilterStatus] = useState();

  const options = [
    "All",
    "Approved",
    "Rejected",
    "Pending",
    "Min-Max",
    "Max-Min",
    "A-Z",
    "Z-A",
    // "Ascend",
    // "Descend",
  ];

  function handleClick() {
    setIsMenu((open) => !open);
  }
  function clickOut() {
    if (isMenu) {
      setIsMenu(false);
    }
  }

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0)
  }, []);

  return (
    <StyledDiv onClick={clickOut}>
      <WrapperDiv>
        <FixedDiv>
          <Header>
            {isMenu && <MenuLogOut />}
            <Icon icon={faArrowLeft} onClick={() => navigate(`/overview`)} />
            <Image
              onClick={handleClick}
              src={
                user?.user_metadata.avatar ||
                "https://source.unsplash.com/random/300x200"
              }
              alt="userlogo"
            ></Image>
          </Header>

          <TransactionHeading>
            <P>Transactions</P>
            <FilterComponent
              options={options}
              onSelect={setFilterStatus}
            ></FilterComponent>
          </TransactionHeading>
          <SearchTransaction />
        </FixedDiv>

        <TransactionHistory
          dataArray={transactions}
          isLoading={isLoading}
          isLoadingUser={isLoadingUser}
          statusFilter={statusFilter}
        />
      </WrapperDiv>
    </StyledDiv>
  );
}

export default Transactions;
