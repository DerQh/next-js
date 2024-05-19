import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const SectionOne = styled.div`
  position: relative;
  height: 40dvh;
  width: 100%;
  background-image: url("https://www.goatfarming.in/wp-content/uploads/2023/05/Goat-Farming-in-Kenya-1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
`;
const SectionOneAbsolute = styled.div`
  color: #fff;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;
const CircleDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 5px;
  left: 5px;
  background-color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`;

const CircleInner = styled.div`
  position: absolute;
  background-color: #111f34;
  border-radius: 2px;
  width: 60%;
  height: 2px;
  transform: rotate(-45deg);
  &:nth-child(2) {
    transform: rotate(45deg);
  }
`;
const BottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;
const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  font-size: 17px;
`;

const Button = styled.div`
  border: 1.5px solid #fff;
  border-radius: 15px;
  padding: 2px 6px;
  font-size: 12px;
  cursor: pointer;
`;
const ProjectTitle = styled.h6`
  font-size: 18px;
  font-weight: 500;
`;

const SectionTwo = styled.div`
  color: #fff;
  width: 100%;
  height: 100%;
  padding: 10px;
  text-align: start;
`;
const About = styled.h5`
  font-size: 18px;
  font-weight: 500;
  padding: 4px 0;
`;
const SubTitle = styled.h6`
  font-size: 15px;
  font-weight: 300;
  padding: 4px 0;
  margin: 4px 0;
`;

const AMount = styled.p`
  font-size: 20px;
  font-weight: 300;
  border: 1px solid #fff;
  width: fit-content;
  padding: 4px;
  border-radius: 8px;
`;
const Details = styled.h5`
  font-size: 18px;
  font-weight: 500;
  padding: 4px 0;
  margin-top: 10px;
`;
const Paragraph = styled.div`
  padding: 4px 0;
  font-size: 12px;
  font-weight: 200;
`;

const Created = styled.div`
  padding: 4px 0;
  font-size: 10px;
  font-weight: 200;
`;

function Project({ handleOpenProject }) {
  return (
    <>
      <SectionOne>
        <SectionOneAbsolute>
          <CircleDiv onClick={handleOpenProject}>
            <CircleInner></CircleInner>
            <CircleInner></CircleInner>
          </CircleDiv>
          <BottomDiv>
            <TitleDiv>
              <ProjectTitle>Goat Rearing</ProjectTitle>
              <FontAwesomeIcon icon={faWallet} />
            </TitleDiv>
            <Button>Save now</Button>
          </BottomDiv>
        </SectionOneAbsolute>
      </SectionOne>

      <SectionTwo>
        <About>About</About>
        <SubTitle>Goat Rearing is the future</SubTitle>
        <AMount>Ksh 120,000</AMount>
        <Details>Details</Details>
        <Paragraph>
          When it comes to goat rearing, there are several essentials you need
          to consider to ensure the well-being and success of your goat farming
          venture. Here are some key essentials for goat rearing
        </Paragraph>
        <Created>
          Created on <span>June 24, 2024</span>{" "}
        </Created>
      </SectionTwo>
    </>
  );
}

export default Project;
