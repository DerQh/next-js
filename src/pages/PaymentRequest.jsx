import {
  faArrowLeft,
  faCircleCheck,
  faCircleExclamation,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  background-color: #fff;
  color: #0d0c22;
  width: 100%;
  max-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: 10px 35px;
  overflow: hidden;
  max-width: 450px;

  @media (min-width: 768px) {
    max-width: 768px;
    max-height: 100dvh;
    padding: 10px 50px;
  }

  @media (min-width: 1024px) {
    padding: 10px 150px;
    :root {
      --base-font-size: 10px; /* Define a base font size */
    }
  }
`;

const AmountToDesposit = styled.p`
  display: flex;
  justify-content: center;
  align-items: end;
  font-size: 32px;
  font-weight: 600;
  padding: 32px 0;
  color: ${(props) => (props.isApproved ? "green" : "red")};
`;

const Form = styled.form`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  border: none;
`;
const Button = styled(FontAwesomeIcon)`
  background-color: transparent;
  color: ${(props) => (props.approve ? "green" : "red")};
  font-size: 55px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 20px;
  cursor: pointer;
`;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const DetailsDiv = styled.div`
  font-size: small;
  font-weight: 300;
`;

const FamilyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 45px;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.isApproved ? "green" : "red")};

  margin-bottom: 20px;
`;

const IconHeader = styled(FontAwesomeIcon)`
  font-size: 20px;
  font-weight: 200;
`;

const SpanKes = styled.span`
  color: #5f5c5c;
  margin-right: 4px;
  padding-bottom: 4px;
  font-size: 16px;
`;
const SpanP = styled.p`
  display: flex;
  justify-content: center;
  align-items: end;
  font-weight: 700;
`;
const SubHeading = styled.p`
  text-align: center;
  font-size: 15px;
  padding: 10px;
  font-weight: 500;
`;

const Name = styled.h4`
  font-weight: 600;
  font-size: 25px;
  padding: 10px;
`;
const Span = styled.span`
  font-weight: 300;
  padding: 1px;
  color: #3e6d3e;
`;

// confirm alert ----///
const AlertWrapper = styled.div`
  position: absolute;
  background-color: rgb(0, 0, 0, 0.8);
  top: 0%;
  height: 100dvh;
  width: 100dvw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Alert = styled.div`
  width: 80%;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 20px;
  border: none;
`;

const AlertButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const AlertButton = styled.button`
  border: none;
  padding: 10px 30px;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 500;
  color: black;
  margin-bottom: 5px;
  background-color: ${(props) => (props.isApproved ? "green" : "red")};
  border: 2px solid ${(props) => (props.isApproved ? "green" : "red")};
  cursor: pointer;
`;

const AlertButtonCancel = styled.button`
  border: none;
  padding: 10px 30px;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 500;
  color: black;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.isApproved ? "rgb(73, 141, 50, 0.2)" : ""};
  }
`;

const AlertParagraph = styled.p`
  font-size: 15px;
  font-weight: 500;
  padding: 0px 0px 0px 0;
`;
const AlertPara = styled.p`
  font-size: 12px;
  font-weight: 400;
  padding: 10px 0px 25px 0px;
`;

// ------- MIAN ------//
function PaymentRequest() {
  const [isApproved, setIsApproved] = useState(true);
  const [isConfirm, setisConfirm] = useState(true);

  const navigate = useNavigate();

  function handleApprove() {
    setIsApproved(true);
    setisConfirm((confirm) => !confirm);
  }

  function handleReject() {
    setIsApproved(false);
    setisConfirm((confirm) => !confirm);
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/transactions");
  }
  return (
    <>
      {!isConfirm && (
        <AlertWrapper>
          <Alert>
            <AlertParagraph>
              {isApproved ? "Accept" : "Reject"} Payment Request
            </AlertParagraph>
            <AlertPara>
              {isApproved
                ? "Confirmning this payment will add it to the total balance of the Family"
                : "The member: 001 will be notified when you Reject this payment"}
            </AlertPara>
            <AlertButtonWrapper>
              <AlertButtonCancel
                onClick={() => setisConfirm(!isConfirm)}
                isApproved={isApproved}
              >
                Cancel
              </AlertButtonCancel>
              <AlertButton isApproved={isApproved}>
                {isApproved ? "Confirm" : "Confirm"}
              </AlertButton>
            </AlertButtonWrapper>
          </Alert>
        </AlertWrapper>
      )}

      <Main>
        <DetailsDiv>
          <HeadingWrapper>
            <IconHeader icon={faArrowLeft} onClick={() => navigate(-1)} />
            <IconHeader icon={faEllipsis} />
          </HeadingWrapper>

          <FamilyWrapper>
            <Image
              isApproved={isApproved}
              src="/public/users/userImage.jpg"
              alt=""
            />
            <Name>Fredrick</Name>
            <SubHeading>
              {isApproved ? "Approve" : "Reject"} cash deposited by  
              <Span> Omindi - 001 </Span>
            </SubHeading>
          </FamilyWrapper>
        </DetailsDiv>

        <AmountToDesposit isApproved={isApproved}>
          <SpanKes>KES</SpanKes>
          <SpanP>2,400.00</SpanP>
        </AmountToDesposit>

        <Form onSubmit={handleSubmit}>
          <Button approve icon={faCircleCheck} onClick={handleApprove}></Button>
          <Button icon={faCircleExclamation} onClick={handleReject}></Button>
        </Form>
      </Main>
    </>
  );
}

export default PaymentRequest;
