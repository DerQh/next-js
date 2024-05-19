import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const slideFromSide = keyframes`
  0%{
    transform: translateX(-100%);
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

const ConfirmAmountDiv = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: black;
  width: 100dvw;
  height: 100dvh;
  padding: 20px 30px;
  animation: ${slideFromSide} 1s ease forwards;
  @media (max-width: 320px) {
    padding: 1px 10px;
  }
`;

const UserDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 15px;
  @media (max-width: 320px) {
    margin-top: 1px;
  }
`;

const UserHeading = styled.p`
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  padding-bottom: 25px;
  padding-top: 20px;
  @media (max-width: 320px) {
    font-size: 18px;
    padding: 5px 5px;
  }
`;

const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgba(15, 14, 14, 0.9);
  background-color: rgba(235, 235, 244, 0.4);
  padding: 20px;
  border-radius: 10px;
  font-size: 15px;
  @media (max-width: 320px) {
    font-size: 18px;
    padding: 10px;
  }
`;

const TransInnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
`;
const ImageDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
const DetailsHeading = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: #1a0f45;
`;

const AuthorizationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const AuthoInnerDiv = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  text-align: justify;
  /* border: 1px solid red; */
  margin-bottom: 15px;
`;

const ReviewButton = styled.button`
  text-align: center;
  width: 100%;
  height: 45px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  padding: 10px;
  border-radius: 10px;
  background-color: #111f34;

  color: ${(props) =>
    props.disabled ? "rgb(255, 255, 255, 0.1)" : "rgb(255, 255, 255)"};

  margin-top: 20px;
  cursor: pointer;
`;

const ParagraphLast = styled.div`
  text-align: justify;
  word-spacing: -1px;
  padding: 20px 0;
  font-size: 14px;
  @media (max-width: 320px) {
    font-size: 10px;
    padding: 8px 0;
  }
`;

const Input = styled.input`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  height: auto;
`;
const InputDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 0;
`;
const Terms = styled.a`
  text-align: center;
  color: rgb(4, 134, 255, 0.5);
  font-weight: 600;
  font-size: 13px;
  margin-top: 10px;
  @media (max-width: 320px) {
    font-size: 12px;
    margin-top: 1px;
  }
`;
const DetailsHeadingTwo = styled.p`
  text-align: center;
  font-size: 12px;
  color: rgba(105, 105, 119, 1);
  padding: 10px 0;
  font-weight: 600;
`;
const Details = styled.p`
  text-align: center;
  color: #1a0f45;
  font-size: 16px;
  font-weight: 600;
`;
const Wrapper = styled.div`
  max-width: 700px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: black;
  width: 100dvw;
  height: 100dvh;
  padding: 20px 30px;
  animation: ${slideFromSide} 1s ease forwards;
  @media (max-width: 320px) {
    padding: 1px 10px;
  }
`;

function ConfirmAmount({ amount, onClick, fullName, avatar }) {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const currentDate = new Date(); // Current date and time

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-based (January is 0)
  const day = currentDate.getDate();

  const date = `${new Date(2000, month).toLocaleString("en-US", {
    month: "long",
  })} ${day}, ${year}`;

  function handleCheckboxChange(event) {
    setIsChecked(event.target.checked);
  }

  function handleClick() {
    onClick();
  }

  return (
    <ConfirmAmountDiv>
      <Wrapper>
        <UserDiv>
          <UserHeading>Does this look right ? </UserHeading>
          <TransactionDetails>
            <TransInnerDiv>
              <DetailsHeading>Name</DetailsHeading>
              <ImageDiv>
                <Image
                  src={avatar || "https://source.unsplash.com/200×300/?random"}
                  alt="user-image"
                />
                <Details>{fullName}</Details>
              </ImageDiv>
            </TransInnerDiv>
            <TransInnerDiv>
              <DetailsHeading>Deposit</DetailsHeading>
              <Details>Ksh {amount}*</Details>
            </TransInnerDiv>
            <TransInnerDiv>
              <DetailsHeading>Type</DetailsHeading>
              <Details>Cash</Details>
            </TransInnerDiv>
            <TransInnerDiv>
              <DetailsHeading>Date</DetailsHeading>
              <Details>{date}</Details>
            </TransInnerDiv>
            <DetailsHeadingTwo>
              * Amount will be converted to ksh {amount}.00
            </DetailsHeadingTwo>
          </TransactionDetails>
        </UserDiv>
        <AuthorizationDiv>
          <ParagraphLast>
            The amount won't instantly show in your account; it requires
            confirmation by an authorized user. Once approved, it'll display in
            the approved section.
          </ParagraphLast>
          <AuthoInnerDiv>
            <InputDiv>
              <Input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </InputDiv>
            <ParagraphLast>
              I authorize OmindiApp to debit my M-Pesa account for the stated
              amount. Additionally, I authorize adjustments for any erroneous
              debits to my bank account. This authorization is one-time and
              irrevocable
            </ParagraphLast>
          </AuthoInnerDiv>
          <Terms>Terms and Conditons</Terms>
          <ReviewButton disabled={!isChecked} onClick={handleClick}>
            Confirm Deposit
          </ReviewButton>
        </AuthorizationDiv>
      </Wrapper>
    </ConfirmAmountDiv>
  );
}

export default ConfirmAmount;
