import { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  width: 80%;
  flex-direction: column;
`;

const ImageUpload = styled.input`
  cursor: pointer;
`;

const DescriptionInput = styled.textarea`
  min-height: 250px;
  margin: 20px 0;
  padding: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #111f34;
  color: white;
  border: none;
  cursor: pointer;
`;
const InnerDivs = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2px;
`;
const Input = styled.input`
  font-size: 16px;
  padding: 4px;
  cursor: pointer;
`;
const InputLabel = styled.label`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const AddProject = () => {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Image:", image);
    console.log("Description:", description);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <InnerDivs>
          <InputLabel htmlFor="name">Enter Project Name</InputLabel>
          <Input name="name" value={name} onChange={handleNameChange} />
        </InnerDivs>

        <InnerDivs>
          <InputLabel htmlFor="amount">Enter Project Cost</InputLabel>
          <Input name="amount" value={amount} onChange={handleAmountChange} />
        </InnerDivs>
        <InnerDivs>
          <InputLabel htmlFor="about">Sub Title</InputLabel>
          <Input name="about" value={about} onChange={handleAboutChange} />
        </InnerDivs>
        <InnerDivs>
          <InputLabel htmlFor="imageUpload">Project Image </InputLabel>
          <ImageUpload
            name="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </InnerDivs>
        <DescriptionInput
          placeholder="Enter description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default AddProject;
