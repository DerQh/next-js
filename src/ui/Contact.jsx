import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  color: #fff;
  background-color: black;
  padding: 16px 35px;
  border-radius: 13px;
  margin: 20px 0;
  border: none;
  font-size: 14px;
  font-weight: 500;
  &:hover {
    background-color: #fff;
    color: black;
  }
`;

const StyledContact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px; // SHOULD APPLY IN ALL DIVS IN THE MAIN SECTION
  background-color: #1d87e4;
  color: #fff;
  padding: 30px 0;
  margin: 70px 0;
  border: none;
  width: 100%;
  height: auto;
  gap: 10px;
  @media only screen and (max-width: 400px) {
    padding: 30px 0;
    margin: 30px 0;
  }

  @media (min-width: 768px) {
    padding: 30px 0;
    margin: 70px 0;
  }
  @media (min-width: 1024px) {
    padding: 30px 0;
    margin: 80px 0;
  }
`;

const ContactDiv = styled.div`
  width: 90%;
  text-align: start;
  border: none;
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
`;
const ImageDiv = styled.div`
  display: flex;
  gap: 20px;
  margin: 15px 0;
  font-size: 14px;
`;
const ImageParagraph = styled.p`
  font-size: 13px;
  font-weight: 200;
  padding: 10px 0;
  line-height: 20px;
  letter-spacing: 1px;
  @media only screen and (max-width: 400px) {
    font-size: 0.7rem;
  }

  @media (min-width: 768px) {
    font-size: 0.8rem;
    font-weight: 300;
  }
  @media (min-width: 1024px) {
    font-size: 0.9rem;
    font-weight: 200;
  }
`;
const Heading = styled.h1`
  font-size: 1.4rem;
  font-weight: 500;
  @media only screen and (max-width: 400px) {
    font-size: 0.9rem;
    font-weight: 600;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
    font-weight: 500;
  }
  @media (min-width: 1024px) {
    font-size: 1.6rem;
    font-weight: 500;
  }
`;
const ContactLinks = styled.a`
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: #151414;
  }
`;

//
function Contact() {
  return (
    <>
      <StyledContact>
        <ContactDiv>
          <Heading>Do you have any questions ?</Heading>
          <ImageParagraph>
            If you have any questions or need assistance with our family savings
            account, feel free to reach out to us. We as a team are here to help
            you manage your finances effectively and achieve your savings goals.
          </ImageParagraph>
          <Button>Contact Us</Button>
        </ContactDiv>

        <ContactDiv>
          <ImageDiv className="logo-email">
            <Image src="/images/mail.png" alt="" />
            <ContactLinks href="">omindi@helpline.com</ContactLinks>
          </ImageDiv>
          <ImageDiv className="logo-phone">
            <Image src="/images/telephone.png" alt="" />
            <ContactLinks href="">+254 713425161</ContactLinks>
          </ImageDiv>
          <ImageDiv className="logo-adress">
            <Image src="/images/location.png" alt="" />
            <ContactLinks href="https://www.google.com/maps/place/RRW4%2BHMC,+Kisumu,+Kenya/@-0.1535625,34.8066406,17z/data=!3m1!4b1!4m5!3m4!1s0x182aa437ad4ac81d:0xada75cc56240ad79!8m2!3d-0.1535625!4d34.8066406?entry=ttu">
              RRW4+HMC Kisumu, Kenya
            </ContactLinks>
            <div id="map"></div>
          </ImageDiv>
        </ContactDiv>
      </StyledContact>
    </>
  );
}

export default Contact;
