import styled from "styled-components";
import Footer from "../ui/Footer";
import Blog from "../ui/Blog";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../ui/HeaderSample";
import useUser from "../features/authentification/useUser";
import { useEffect, useState } from "react";
import video from "/videos/family video.mp4";

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #111f34;
`;
const StyledDashBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
  background-color: #fff;
  max-width: 1000px;

  @media (max-width: 350px) {
    /* SMALLER SCREENS iphone 5s , 6 */
  }

  @media (min-width: 350px) {
    /* SMARTPHONES SCREENS iphone 11 - IPHONE 14PROMAX */
    /* border: 10px solid yellow; */
  }

  @media (min-width: 768px) {
  }
  @media (min-width: 992px) {
  }
  @media (min-width: 1024px) {
  }
`;
const Overview = styled.div`
  width: 100%;
  height: 100dvh;
  color: #100f0f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const OverviewHeading = styled.h5`
  color: black;
  font-size: 1.8rem;
  text-align: center;
  font-weight: 600;
  padding: 20px 1px;
  padding-top: 70px;
  line-height: 40px;
  @media (max-width: 350px) {
    /* SMALLER SCREENS iphone 5s , 6 */
    font-size: 1.5rem;
    padding-top: 10px;
    padding: 20px 1px;
    line-height: 1.1;
  }

  @media (min-width: 350px) {
    /* SMARTPHONES SCREENS iphone 11 - IPHONE 14PROMAX */
    font-weight: 700;
    font-size: 2.4rem;
    padding-top: 1px;
    padding: 1px 1px;
    line-height: 1.2;
    /* border: 10px solid yellow; */
  }

  @media (min-width: 768px) {
    font-size: 4rem;
    line-height: 1.2;
  }
  @media (min-width: 992px) {
    font-size: 5.2rem;
    line-height: 1;
    /* border: 10px solid red; */
  }
  /* @media (min-width: 1024px) {
    font-size: 4rem;
    line-height: 1.2;
    line-height: 1.3;
  } */
`;

const VideoDiv = styled.div`
  display: none;
  position: relative;
  width: 100%;
  min-height: 220px;
  border-radius: 10px;
`;
const Video = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%, -50%);
  height: 100%;
  width: 100%;
  border-radius: 10px;
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;
const StyledButton = styled.button`
  border-radius: 30px;
  padding: 15px 30px;
  background-color: #1570ef;
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
  border: none;
  cursor: pointer;
`;
const OverviewParagraph = styled.p`
  color: #262626;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.5px;
  line-height: 23px;
  padding: 10px 10px 20px 10px;
  @media only screen and (max-width: 400px) {
    font-size: 0.7rem;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
    font-weight: 400;
    padding: 20px 20px 30px 20px;
  }
  @media (min-width: 1024px) {
    font-size: 1.1rem;
    font-weight: 400;
    padding: 30px 20px 40px 20px;
    line-height: 28px;
  }
`;

const MaxDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

// MAIN
function Dashboard() {
  const { user, isLoading } = useUser();
  const [group, setGroup] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const groupName = JSON.parse(localStorage.getItem("group"));
    setGroup(groupName);
    window.addEventListener(
      "click",
      (event) => {
        if (event.target.matches("video")) {
          event.stopPropagation();
        }
      },
      true
    );
  }, [group]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleClick() {
    if (user) {
      navigate(`/overview`);
    } else {
      navigate("/signup");
    }
  }

  return (
    <Main>
      <Navbar />
      <MaxDiv>
        <StyledDashBoard>
          <Overview>
            <OverviewHeading className="overview-heading">
              Stres less <br /> about your family's financial future through{" "}
              <br />
              savings
            </OverviewHeading>
            <OverviewParagraph>
              Introducing a user-friendly Family or Group Savings App, designed
              to simplify and optimize your finance management. This app offers
              a variety of features to help you efficiently handle your finances
            </OverviewParagraph>
            <ButtonContainer>
              <StyledButton disabled={isLoading} onClick={handleClick}>
                {user ? "Go to Group" : "Create Account"}
              </StyledButton>
            </ButtonContainer>
          </Overview>

          <VideoDiv>
            <Video muted autoPlay>
              <source
                className="video-family"
                src={video} //
                // src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
                type="video/mp4"
              />
            </Video>
          </VideoDiv>
          <Blog></Blog>
        </StyledDashBoard>
      </MaxDiv>

      <Footer></Footer>
    </Main>
  );
}

export default Dashboard;
