import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { keyframes } from "styled-components";
import useDepositTransaction from "../features/deposit/useDeposit";


const slideFromSide = keyframes`
   0%{
    transform: translateX(-100%);
  }
  100%{
    transform: translateY(0%);
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 120px;
  color: rgb(0, 255, 0, 0.9);
  border-radius: 50%;
  border: 30px solid rgba(3, 247, 56, 0.3);
`;

const MainDiv = styled.div`
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0px 20px;
  background-color: #fff;

  animation: ${slideFromSide} 1s ease forwards;
`;

const CircleInner = styled.div`
  border-radius: 50%;
  border: 40px solid rgba(3, 247, 56, 0.2);
`;

const CircleDIv = styled.div`
  border-radius: 50%;
  border: 1px solidrgba(3, 247, 56, 0.1);
  top: 50%;
  left: 50%;
`;

const Funds = styled.div`
  font-size: 15px;
  text-align: center;
`;

const Heading = styled.p`
  font-size: 20px;
  font-weight: 500;
  padding: 2px 0;
`;
const Paragraph = styled.p`
  font-size: 13px;
  font-weight: 300;
  padding: 10px 0;
  color: #000;
`;

const Button = styled.button`
  border-radius: 8px;
  font-weight: 600;
  font-size: 20px;
  background-color: #111f34;
  color: #fff;
  border: none;
  padding: 15px 140px;
  cursor: pointer;
`;

const Span = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #273b56;
`;

function Confirmed({ confirmedAmount, data }) {
  const { mutate: depositFunction, isLoading } = useDepositTransaction();
  let { amount, firstName, lastName, user_id, email, group, avatar } = data;

  const name = `${firstName} ${lastName}`;

  function handleButtonClick() {
    depositFunction({ user_id, amount, group, email, name, avatar });
  }

  return (
    <MainDiv>
      <CircleDIv>
        <CircleInner>
          <Icon icon={faCircleCheck} />
        </CircleInner>
      </CircleDIv>
      <Funds>
        <Heading>Deposit is done, Pending Verification ! </Heading>
        <Paragraph>
          <Span>KES {confirmedAmount} </Span> deposit is pending approval, you
          will get an approval message once the Admin approves it.
        </Paragraph>
      </Funds>
      <Button disabled={isLoading} onClick={handleButtonClick}>
        Done
      </Button>
    </MainDiv>
  );
}

export default Confirmed;
