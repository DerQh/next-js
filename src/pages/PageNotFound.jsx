import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  width: 100%;
  height: 100dvh;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const LogoDiv = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const Logo = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #0882ee;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  font-weight: 600;
`;

const Oops = styled.p`
  font-weight: 500;
  font-size: 18px;
  color: #929292;
`;

const MessageDiv = styled.div`
  padding: 20px;
  background-color: #b8b8b8;
  color: #504e4e;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Message = styled.div`
  font-size: 12px;
  line-height: 25px;
  padding: 10px;
`;

const Tryagain = styled.div`
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #32609c;
    font-weight: 600;
  }
`;
const ContactDiv = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h4`
  font-size: 15px;
  font-weight: 500;
  padding: 10px;
`;
const AnchorTag = styled.a`
  text-decoration: none;
  color: #3070a9;
  font-size: 13px;
  margin-bottom: 20px;
`;
const Contact = styled.p`
  text-decoration: none;
  color: #3070a9;
  font-size: 13px;
  cursor: pointer;
`;

function PageNotFound() {
  const navigate = useNavigate();
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <Main>
      <LogoDiv>
        <Logo>OW</Logo>
        <h3>Omindi Financial App</h3>
        <Oops>Ooops ! something went wrong..... </Oops>
      </LogoDiv>
      <MessageDiv>
        <Message>
          It seems that you may be experiencing an issue with the system or a
          service outage,leading to a server error. We monitor and track these
          errors electronically. However, if the problem continues, please don't
          hesitate to contact us via the email provided below.
        </Message>
        <Tryagain onClick={() => navigate("/")}>Please try again. </Tryagain>
      </MessageDiv>
      <ContactDiv>
        <Heading>TECHNICAL DETAILS</Heading>
        <AnchorTag href="">see details of this error</AnchorTag>

        <Heading>SUPPORT</Heading>
        <Contact>
          <FontAwesomeIcon icon={faEnvelope} color="black" />
          <span> help@omindi.com</span>
        </Contact>
      </ContactDiv>
    </Main>
  );
}

export default PageNotFound;
