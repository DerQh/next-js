import {
  faEnvelope,
  faPaperPlane,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Main = styled.div`
  position: relative;
  width: 100%;
  height: 72dvh;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;
const MessageDiv = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  min-height: 25px;
  height: auto;
  font-size: 16px;
  display: flex;
  height: fit-content;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #111f34;
`;

const ReceivedMessage = styled.div`
  margin-top: 10px;
  width: 100%;
  padding-right: 15dvw;
  height: auto;
  display: flex;
`;

const ImageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  padding: 0 5px;
`;
const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
const P = styled.p`
  background-color: ${(prop) =>
    prop.$received=='true' ? "rgb(17, 31, 52,0.3)" : "rgb(17, 31, 52,0.9)"};
  color: ${(prop) => (prop.$received=='true' ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)")};
  font-size: 12px;
  font-weight: 300;
  padding: 10px;
  height: fit-content;
  border-radius: ${(prop) =>
    prop.$received=='true' ? "15px 15px 15px 0px" : "15px 15px 0px 15px"};
`;
const Date = styled.p`
  color: #0a0a0a;
  font-size: 10px;
  font-weight: 300;
  margin-top: 5px;
  text-align: ${(prop) => (prop.$received=='true' ? "start" : "end")};
`;
const SentMessage = styled.div`
  padding-top: 5px;
  margin-top: 10px;
  width: 100%;
  padding-left: 15dvw;
  height: auto;
  display: flex;
  justify-content: end;
`;

function Messages() {
  return (
    <Main>
      <Divider />
      <ReceivedMessage>
        <ImageDiv>
          <Image
            src="https://source.unsplash.com/random/800x800/?img=1"
            alt="userImage"
          />
        </ImageDiv>
        <div>
          <P $received='true'>
            Here is where the message will be displayed , for the sender
          </P>
          <Date $received='true'>Sent on April, 24 2015 1:45pm</Date>
        </div>
      </ReceivedMessage>
      <ReceivedMessage>
        <ImageDiv>
          <Image
            src="https://source.unsplash.com/random/800x800/?img=1"
            alt="userImage"
          />
        </ImageDiv>
        <div>
          <P $received='true'>
            Here is where the message will be displayed , for the sender. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nullam commodo eu
            neque id aliquet. Nullam porta laoreet suscipit. Proin convallis
            eleifend malesuada
          </P>
          <Date $received='true'>Sent on April, 24 2015 1:45pm</Date>
        </div>
      </ReceivedMessage>
      <ReceivedMessage>
        <ImageDiv>
          <Image
            src="https://source.unsplash.com/random/800x800/?img=1"
            alt="userImage"
          />
        </ImageDiv>
        <div>
          <P $received='true'>
            Here is where the message will be displayed , for the sender
          </P>
          <Date $received='true'> Sent on April, 24 2015 1:45pm</Date>
        </div>
      </ReceivedMessage>
      <SentMessage>
        <div>
          <P>
            Here is where the message will be displayed , for the sender. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nullam commodo eu
            neque id aliquet. Nullam porta laoreet suscipit. Proin convallis
            eleifend malesuada
          </P>
          <Date>Sent on April, 24 2015 1:45pm</Date>
        </div>
        <ImageDiv>
          <Image
            src="https://source.unsplash.com/random/800x800/?img=1"
            alt="userImage"
          />
        </ImageDiv>
      </SentMessage>

      <MessageDiv>
        <Input type="text" />
        <FontAwesomeIcon icon={faPaperPlane} />
      </MessageDiv>
    </Main>
  );
}

export default Messages;
