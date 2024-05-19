import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Main = styled.div`
  display: absolute;
  border: 1px solid red;
`;
const Icon = styled(FontAwesomeIcon)`
  font-size: 16px;
  margin-top: 2px;
`;

function PopNotification() {
  return (
    <Main>
      <Icon icon={faEnvelope} />
    </Main>
  );
}

export default PopNotification;
