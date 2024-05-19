import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100dvw;
  padding: 15px 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
`;

const OuterDiv = styled.div`
  width: 100%;
`;
function AdminSettings() {
  <Container>
    <OuterDiv>Approve Members</OuterDiv>
    <OuterDiv>Approve Cash transactions</OuterDiv>
  </Container>;
}

export default AdminSettings;
