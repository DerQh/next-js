import { faRProject } from "@fortawesome/free-brands-svg-icons";
import {
  faBell,
  faChevronLeft,
  faCircleInfo,
  faCircleQuestion,
  faDotCircle,
  faEllipsis,
  faFlag,
  faLock,
  faMoon,
  faShieldHalved,
  faSignOut,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import AdminSettings from "./AdminSettings";

const Main = styled.div`
  margin: 0 auto;

  background-color: #fff;
  color: #0d0c22;
  width: 100%;
  height: 100dvh;
  padding: 30px;
  max-width: 450px;

  @media (min-width: 768px) {
    max-width: 768px;
    max-height: 100dvh;
    padding: 10px 50px;
  }

  @media (min-width: 1024px) {
    padding: 10px 150px;
    :root {
      --base-font-size: 10px;
    }
  }
`;
const OuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
`;
const InnerDiv = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: #f1f5f9;
`;

const SettingDiv = styled.div`
  display: flex;
  gap: 20px;
  padding: 7px 5px;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
    border-radius: 8px;
  }
`;
const SettingToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 7px 5px;
  cursor: pointer;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  cursor: pointer;
`;
const SettintTitle = styled.h5`
  font-size: 18px;
  font-weight: 500;
  padding: 15px 0px;
  margin-top: 5px;
`;
const Title = styled.h5`
  font-size: 20px;
  font-weight: 600;
`;
const Subheading = styled.p`
  font-size: 15px;
  font-weight: 500;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 22px;
  color: ${(prop) => (prop.toggle === "true" ? "#090a0a" : "#1d3e53")};
`;

const ToggleDiv = styled.div`
  background-color: ${(prop) => (prop.$toggle === "true" ? "black" : "green")};
  height: 22px;
  border-radius: 11px;
  width: 37px;
  display: flex;
  align-items: center;
  justify-content: ${(prop) => (prop.$toggle === "true" ? "end" : "start")};
`;
const ToggleInner = styled.div`
  background-color: #fff;
  margin: 1.5px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;
function User() {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  function handleToggle() {
    setToggle((tog) => !tog);
  }
  return (
    <Main toggle={`${toggle}`}>
      <Header>
        <FontAwesomeIcon
          onClick={() => navigate("/overview")}
          icon={faChevronLeft}
        />
        <Title>Settings</Title>
        <FontAwesomeIcon icon={faEllipsis} />
      </Header>
      <OuterDiv>
        <SettintTitle>Account</SettintTitle>
        <InnerDiv>
          <SettingDiv onClick={() => navigate("/updateprofile")}>
            <Icon toggle={`${toggle}`} icon={faUser} />
            <Subheading>Edit Profile</Subheading>
          </SettingDiv>
          <SettingDiv>
            <Icon toggle={`${toggle}`} icon={faShieldHalved} />
            <Subheading onClick={() => navigate(<AdminSettings />)}>
              Admin Settings
            </Subheading>
          </SettingDiv>

          <SettingDiv>
            <Icon toggle={`${toggle}`} icon={faLock} />
            <Subheading>Privacy</Subheading>
          </SettingDiv>
          <SettingToggle>
            <SettingDiv>
              <Icon toggle={`${toggle}`} icon={faMoon} />
              <Subheading>Dark Theme</Subheading>
            </SettingDiv>
            <ToggleDiv $toggle={`${toggle}`} onClick={handleToggle}>
              <ToggleInner></ToggleInner>
            </ToggleDiv>
          </SettingToggle>
        </InnerDiv>
      </OuterDiv>
      <OuterDiv>
        <SettintTitle>Support & About</SettintTitle>
        <InnerDiv>
          <SettingDiv>
            <Icon toggle={`${toggle}`} icon={faWallet} />
            <Subheading>My wallet</Subheading>
          </SettingDiv>
          <SettingDiv>
            <Icon toggle={`${toggle}`} icon={faCircleQuestion} />
            <Subheading>Help & Support</Subheading>
          </SettingDiv>
          <SettingDiv>
            <Icon toggle={`${toggle}`} icon={faCircleInfo} />
            <Subheading>Terms and Policies</Subheading>
          </SettingDiv>
        </InnerDiv>
      </OuterDiv>
      <OuterDiv>
        <SettintTitle>Actions</SettintTitle>
        <InnerDiv>
          <SettingDiv>
            <Icon toggle={`${toggle}`} icon={faFlag} />
            <Subheading>Report a problem</Subheading>
          </SettingDiv>

          <SettingDiv onClick={() => navigate("/login")}>
            <Icon toggle={`${toggle}`} icon={faSignOut} />
            <Subheading>Log out</Subheading>
          </SettingDiv>
        </InnerDiv>
      </OuterDiv>
    </Main>
  );
}

export default User;
