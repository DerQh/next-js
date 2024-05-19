import styled from "styled-components";

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
function WithdrawalDiv() {
  return (
      <Wrapper>
        <Icon src="/images/atm.png" />
        <P>Approved Withdrawals will be diaplayed here</P>
      </Wrapper>
  );
}

export default WithdrawalDiv;
