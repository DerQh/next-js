import styled from "styled-components";
import FooterLink from "./FooterLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright, faTrademark } from "@fortawesome/free-solid-svg-icons";

const FooterMain = styled.footer`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-around;
  background-color: #111f34;
  color: #ffffff;
  padding: 20px 0px;
  padding-top: 50px;
  width: 100%;
  max-width: 1000px;
  @media (min-width: 768px) {
    grid-template-columns: auto auto auto;
    gap: 28px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: auto auto auto;
    gap: 30px;
  }
`;

const FooterColumn = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const FooterHeading = styled.h3`
  margin-bottom: 10px;
  font-size: 15px;
  text-align: start;
`;

const StyledUl = styled.ul`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const StyledDiv = styled.div`
  margin-top: 50px;
  padding-top: 5px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  margin-bottom: 10px;
  gap: 8px;

  @media (min-width: 768px) {
    margin-top: 0px;
    font-size: 25px;
    gap: 15px;
  }

  @media (min-width: 1024px) {
    margin-top: 0px;
    font-size: 28px;
    gap: 20px;
  }
`;
const Icons = styled(FontAwesomeIcon)`
  cursor: pointer;
  &:hover {
    color: green;
  }
`;

const Copyright = styled.p`
  padding-top: 4px;
  font-size: 7px;
  cursor: pointer;
  &:hover {
    color: green;
  }
  @media (min-width: 768px) {
    font-size: 8px;
  }

  @media (min-width: 1024px) {
    font-size: 10px;
  }
`;
const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function Footer() {
  return (
    <Main>
      <FooterMain>
        <FooterColumn>
          <StyledUl>
            <FooterHeading>Profile</FooterHeading>
            <FooterLink text="About" />
            <FooterLink text="News" />
            <FooterLink text="Contact" />
            <FooterLink text="Blogs" />
          </StyledUl>
        </FooterColumn>
        <FooterColumn>
          <StyledUl>
            <FooterHeading>Company</FooterHeading>
            <FooterLink text="Blog" />
            <FooterLink text="Help" />
            <FooterLink text="Terms" />
            <FooterLink text="FAQs" />
          </StyledUl>
        </FooterColumn>

        <FooterColumn>
          <StyledDiv>
            <Icons icon={faInstagram} />
            <Icons icon={faFacebook} />
            <Icons icon={faYoutube} />
            <Icons icon={faTwitter} />
          </StyledDiv>
          <Copyright>
            <FontAwesomeIcon icon={faCopyright} /> 2024
            <span> All rights reserved</span>
          </Copyright>
        </FooterColumn>
      </FooterMain>
    </Main>
  );
}

export default Footer;
