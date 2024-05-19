import React, { useState } from "react";
import styled from "styled-components";

function GroupProfileEdit() {
  const [groupName, setgroupName] = useState("");
  const [description, setEmail] = useState("");

  const handlegroupNameChange = (event) => {
    setgroupName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("groupName:", groupName);
    console.log("Email:", description);
  };

  return (
    <Container>
      <h1>Edit Group Profile</h1>
      <ProfileImage src="path_to_image.jpg" alt="Profile" />

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>groupName:</label>
          <Input
            type="text"
            value={groupName}
            onChange={handlegroupNameChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Email:</label>
          <Input
            type="email"
            value={description}
            onChange={handleDescriptionChange}
          />
        </FormGroup>

        <SubmitButton type="submit">Save Changes</SubmitButton>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default GroupProfileEdit;
