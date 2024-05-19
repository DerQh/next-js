import styled from "styled-components";

const Main = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wrapper = styled.div`
  border: 1px dotted #000;
  border-radius: 5px;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  &:nth-child(2) {
    margin-top: 8px;
  }
`;
const Icon = styled.img`
  width: 50px;
  height: 50px;
  padding: 4px;
`;

const P = styled.p`
  font-size: 10px;
  font-weight: 600;
`;
function EmptyDeposit({widtrawal}) {
  widtrawal && (
    <>
      <Wrapper>
        <Icon src="/images/atm.png" />
        <P>Approved Withdrawals will be diaplayed here</P>
      </Wrapper>
    </>
  );
  return (
    <Main>
      <Wrapper>
        <Icon src="/images/add.png" />
        <P>Approved Deposits will be diaplayed here</P>
      </Wrapper>
      <Wrapper>
        <Icon src="/images/atm.png" />
        <P>Approved Withdrawals will be diaplayed here</P>
      </Wrapper>
    </Main>
  );
}

export default EmptyDeposit;
