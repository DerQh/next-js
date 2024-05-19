import { faCamera, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useUser from "../features/authentification/useUser";
import {
  useUpdateMeta,
  useUpdateUser,
} from "../features/authentification/useUpdateUser";
import BeatLoader from "react-spinners/BeatLoader";

// -- MAIN --//
const EditProfile = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const {
    updateCurrentUser,
    isUpdating,
    isSuccess,
    data: newProfileLink,
  } = useUpdateUser();
  const { upDateMetadata, isUpdatinMeta } = useUpdateMeta();

  const userData = user?.user_metadata;
  const fullName = `${userData?.firstName} ${userData?.lastName} `;
  const user_Id = user.id;

  const [firstName, setfirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  // const [password, setpassword] = useState("");
  const [profileUrl, setProfileUrl] = useState(userData?.avatar);
  const [file, setFile] = useState("");

  // console.log(user.user_metadata);

  function uploadImage() {
    if (!file) return;
    updateCurrentUser(
      { file, user_Id },
      {
        onSuccess: () => {
          setFile(null);
        },
      }
    );
  }
  useEffect(() => {
    if (isSuccess) {
      setProfileUrl(newProfileLink);
    }
  }, [isSuccess, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    upDateMetadata({ firstName, lastName });
    // console.log(lastName, firstName, password);
  };

  return (
    <Container>
      <Navigation>
        <BackDiv onClick={() => navigate(-1)}>
          <Icon icon={faChevronLeft} />
        </BackDiv>
        <NavItem>Edit Profile</NavItem>
        <div>i</div>
      </Navigation>
      <ImageContainer>
        <ImageDiv>
          <ImageDivWrapper>
            <Image src={profileUrl || "/images/userplaceholder.png"} alt="" />
            <ImageDivAbsolute $display={profileUrl ? true : false}>
              <Camera icon={faCamera} />
            </ImageDivAbsolute>
          </ImageDivWrapper>
          <PhotoInput
            type="file"
            accept="image/*"
            disabled={isUpdating}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <ButtonDelete disabled={isUpdating} onClick={() => uploadImage()}>
            {isUpdating ? (
              <BeatLoader
                color="black"
                loading={isUpdating}
                cssOverride={true}
                size={8}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Upload"
            )}
          </ButtonDelete>
        </ImageDiv>
      </ImageContainer>

      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstName"
              required
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </FormGroup>

          {/* <FormGroup>
            <Label>Password</Label>
            <Input
              type="tel"
              name="mobile"
              
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </FormGroup> */}

          <Button disabled={isUpdatinMeta} type="submit">
            {isUpdatinMeta ? (
              <BeatLoader
                color="white"
                loading={isUpdatinMeta}
                cssOverride={true}
                size={8}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default EditProfile;

const breakpoints = {
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100dvw;
  padding: 15px 20px;
  margin: 0 auto;
  background-color: #fff;
`;

const Navigation = styled.nav`
  /* border: 2px solid red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  width: 500px;

  @media (max-width: ${breakpoints.sm}) {
    width: 100%;
  }
  @media (min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg}) {
    padding: 0 30px;
    width: 100%;
  }

  @media (min-width: ${breakpoints.lg}) {
    padding: 0 40px;
  }
`;

const NavItem = styled.p`
  color: #333;
  text-decoration: none;
  font-weight: 590;
  font-size: 20px;
  white-space: nowrap;
`;

const FormContainer = styled.div`
  /* border: 2px solid red; */
  margin-top: 30px;
  width: 500px;
  @media (max-width: ${breakpoints.sm}) {
    width: 100%;
  }
  @media (min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg}) {
    padding: 0 30px;
    width: 100%;
  }

  @media (min-width: ${breakpoints.lg}) {
    padding: 0 40px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
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
  font-size: 15px;
`;

const Input = styled.input`
  padding: 18px 15px;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
  border: 1px solid #b0b0b0;
  color: #000;
  border-radius: 10px;
  margin-bottom: 20px;
  &:focus {
    border: 2px solid #080808;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  width: 100%;
  height: 55px;
  background-color: #111f34;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 15px;
`;
const Camera = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 40px;
  background-color: transparent;
`;
const BackDiv = styled.div`
  background-color: #000;
  border-radius: 10px;
  padding: 8px 13px;
  cursor: pointer;
`;

const ImageDiv = styled.div`
  display: flex;
  max-width: 200px;
  flex-direction: column;
  gap: 1dvh;
`;
const ImageDivWrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 8px;
  cursor: pointer;
`;
const ImageDivAbsolute = styled.div`
  visibility: ${(props) => (props.$display ? "hidden" : "block")};
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(6, 5, 5, 0.4);
  border-radius: 8px;
`;
const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  border: 1px solid rgb(0, 0, 0, 0.5);
  object-fit: cover;
`;
const ImageContainer = styled.div`
  /* border: 2px solid green; */
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: start;
  border: 2px soilid;
  padding: 20px 0;
`;
const PhotoInput = styled.input`
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 11px;
  text-align: center;
  padding: 1dvw;
  font-weight: 400;
  border-radius: 5px;
  color: #38648b;
  cursor: pointer;
`;

const ButtonDelete = styled.button`
  font-size: 12px;
  font-weight: 400;
  padding: 5px;
  max-width: 100px;
  border: 0.5px solid rgb(0, 0, 0, 0.2);
  background-color: #ddd9d9;
  font-size: 15px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
`;
