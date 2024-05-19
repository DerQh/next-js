import { useState } from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
`;

const ReceivedMessage = styled.div`
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const SentMessage = styled.div`
  background-color: #dcf8c6;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  align-self: flex-end;
`;

const MessageInput = styled.input`
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SendButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;

const messages = [
  { content: "Hello, this is a received message.", type: "received" },
  { content: "This is a sent message.", type: "sent" },
  { content: "Another received message.", type: "received" },
  { content: "One more sent message.", type: "sent" },
];

const Message = () => {
  const [newMessage, setNewMessage] = useState("");

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  
  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (newMessage.trim() !== "") {
      const updatedMessages = [
        ...messages,
        { content: newMessage, type: "sent" },
      ];
      setNewMessage("");
    }
  };

  return (
    <MessageContainer>
      {messages.map((message, index) =>
        message.type === "received" ? (
          <ReceivedMessage key={index}>{message.content}</ReceivedMessage>
        ) : (
          <SentMessage key={index}>{message.content}</SentMessage>
        )
      )}
      <MessageInput
        type="text"
        placeholder="Type your message..."
        value={newMessage}
        onChange={handleInputChange}
      />
      <SendButton onClick={handleSendClick}>Send</SendButton>
    </MessageContainer>
  );
};

export default Message;
