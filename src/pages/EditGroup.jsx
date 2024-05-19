import {
  faCamera,
  faChevronLeft,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100dvw;
  height: 100dvh;
  padding: 15px 20px;
  margin: 0 auto;
  background-color: #fff;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 25dvw;
  align-items: center;
  margin-bottom: 20px;
`;

const NavItem = styled.p`
  color: #333;
  text-decoration: none;
  font-weight: 490;
  font-size: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
  position: relative;
`;

const Label = styled.label`
  position: absolute;
  background-color: white;
  padding: 0 3px;
  top: -12%;
  left: 15px;
  font-weight: 400;
  color: #b0b0b0;
  margin-bottom: 4px;
  font-size: 12px;
`;

const Input = styled.input`
  padding: 12px 15px;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
  border: 1px solid #b0b0b0;
  color: #000;
  border-radius: 10px;
  margin-bottom: 10px;
  &:focus {
    border: 2px solid #080808;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  width: 100%;
  height: 45px;
  background-color: #111f34;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 300;
  cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 10px;
`;
const Camera = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 40px;
  background-color: transparent;
`;
const BackDiv = styled.div`
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  height: 30px;
  padding: 8px 13px;
  cursor: pointer;
`;

const ImageDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 120px;
`;
const ImageDivWrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 8px;
  cursor: pointer;
`;
const ImageDivAbsolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 110px;
  height: 110px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(6, 5, 5, 0.4);
  border-radius: 8px;
`;
const Image = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 8px;
`;
const ImageContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: left;
`;
const ParaPhoto = styled.input`
  font-size: 6px;
  text-align: center;
  padding: 2dvw;
  font-weight: 600;
`;

const UploadBtn = styled.button`
  font-size: 12px;
  font-weight: 400;
  padding: 5px 8px;
  max-width: 100px;
  border: 0.5px solid rgb(0, 0, 0, 0.2);
  background-color: #111f34;
  color: #fff;
  font-size: 15px;
  font-weight: 300;
  border-radius: 6px;
  cursor: pointer;
`;

const Alert = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
  background-color: rgb(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 5px;
  margin: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const AlertP = styled.p`
  font-size: 10px;
`;

// -- MAIN --//
const EditGroup = () => {
  const navigate = useNavigate();

  const [firstName, setfirstName] = useState("");
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  const handleChange = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <Navigation>
        <BackDiv onClick={() => navigate("/group/overview")}>
          <Icon icon={faChevronLeft} />
        </BackDiv>
        <NavItem>Edit Group</NavItem>
      </Navigation>
      <Alert>
        <FontAwesomeIcon icon={faCircleExclamation} />
        <AlertP>
          Only the Admin is allowed to edit the photo and the name of the Group
        </AlertP>
      </Alert>
      <ImageContainer>
        <ImageDiv>
          <ImageDivWrapper>
            <Image src="https://picsum.photos/200/300" alt="" />
            <ImageDivAbsolute>
              <Camera icon={faCamera} />
            </ImageDivAbsolute>
          </ImageDivWrapper>
          <ParaPhoto type="file" />
          <UploadBtn>Upload</UploadBtn>
        </ImageDiv>
      </ImageContainer>

      <FormContainer>
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <FormGroup>
            <Label>Group Name</Label>
            <Input type="text" name="lastName" required />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Input type="text" name="firstName" required />
          </FormGroup>

          <Button type="submit">Save</Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default EditGroup;
