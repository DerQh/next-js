import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import capitalizeFirstLetter from "../helpers/capitalise";

const Main = styled.div`
  background-color: #fff;
  color: #0d0c22;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 35px;
  &:nth-child() {
  }

  @media (max-width: 320px) {
    max-height: 100dvh;
    padding: 10px 20px;
  }
`;

const AmountToDesposit = styled.div`
  text-align: center;
  font-size: 35px;
  font-weight: 600;
  padding: 30px 0;
  @media (max-width: 320px) {
    font-size: 30px;
    font-weight: 500;
    padding: 20px 0;
  }
`;

const Form = styled.form`
  width: 100%;
  padding: 10px 0;
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
  gap: 10px;
  border: none;
  @media (max-width: 320px) {
    gap: 8px;
  }
`;
const Button = styled.input`
  width: 100%;
  background-color: transparent;
  color: black;
  font-size: 25px;
  font-weight: 500;
  border: 2px solid rgb(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 15px 40px;
  &:hover {
    border: 2px solid rgb(14, 14, 14);
    background-color: #111f34;
    color: #fff;
  }
  cursor: pointer;
  @media (max-width: 320px) {
    padding: 10px 35px;
    font-size: 20px;
  }
`;
const ReviewButton = styled.button`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  padding: 16px;
  border-radius: 10px;
  grid-column-start: 1;
  grid-column-end: 4;
  background-color: #111f34;
  /* color: rgb(0, 0, 0, 0.7); */
  color: #fff;
  border: none;
  margin-top: 20px;
  cursor: pointer;
  @media (max-width: 320px) {
    padding: 10px 35px;
    font-size: 20px;
  }
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

const IconHeader = styled(FontAwesomeIcon)`
  font-size: 20px;
  font-weight: 200;
`;
const IconHeaderRIght = styled(FontAwesomeIcon)`
  font-size: 20px;
  font-weight: 200;
  color: #fff;
`;

const SpanKes = styled.span`
  color: #5f5c5c;
  margin-right: 5px;
  margin-bottom: 7px;
  font-size: 12px;
  @media (max-width: 320px) {
    margin-right: 5px;
    margin-bottom: 4px;
  }
`;
const SpanP = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
`;

const FamilyName = styled.h4`
  font-weight: 400;
  font-size: 20px;
  color: rgb(0, 0, 0, 0.6);
`;

function EnterAmount({ amount, handleSubmit, handleClick, group }) {
  const navigate = useNavigate();
  const padDatas = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "<"];

  return (
    <Main>
      <DetailsDiv>
        <HeadingWrapper>
          <IconHeader
            icon={faChevronLeft}
            onClick={() => navigate(`/overview`)}
          />
          <FamilyName> {capitalizeFirstLetter(group)} Group </FamilyName>
          <IconHeaderRIght icon={faChevronLeft} />
        </HeadingWrapper>
      </DetailsDiv>
      <AmountToDesposit>
        <SpanP>
          <SpanKes>KES</SpanKes>
          {amount < 0 ? "0" : amount}
        </SpanP>
      </AmountToDesposit>

      <Form onSubmit={handleSubmit}>
        {padDatas.map((padata) => (
          <Button
            type="button"
            key={padata}
            onClick={handleClick}
            value={padata}
          ></Button>
        ))}
        <ReviewButton type="submit">Review Deposit</ReviewButton>
      </Form>
    </Main>
  );
}

export default EnterAmount;
