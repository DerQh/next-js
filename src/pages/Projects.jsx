import {
  faAdd,
  faCancel,
  faChevronLeft,
  faEye,
  faWallet,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Project from "../ui/Project";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProject from "../ui/AddProject";
import EmptyProjects from "../ui/EmptyProjects";

// -----MAIN -----///
function Projects() {
  const navigate = useNavigate();
  const [openProject, setOpenProject] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleOpenProject() {
    setOpenProject((open) => !open);
  }
  function handleAddProjectOPen() {
    setAddProject((open) => !open);
  }
  return (
    <Main>
      <>
        {openProject ? (
          <Project handleOpenProject={handleOpenProject} />
        ) : (
          <>
            <WrapperTwo>
              <ContainerOne>
                <GroupNameDiv onClick={() => navigate(-1)}>
                  <ChevronLeft icon={faChevronLeft} />
                  <GroupName>{"Group Projects"}</GroupName>
                </GroupNameDiv>
                <BellDiv onClick={handleAddProjectOPen}>
                  {addProject ? (
                    <FontAwesomeIcon icon={faX} />
                  ) : (
                    <FontAwesomeIcon icon={faAdd} />
                  )}
                </BellDiv>
              </ContainerOne>
            </WrapperTwo>

            <Wrapper>
              <ContainerTwo>
                {/* Add Project */}
                {addProject && <AddProject />}
                {!addProject && (
                  <>
                    {data?.length > 0 ? (
                      <>
                        <ProjectDiv onClick={handleOpenProject}>
                          <ProjectDivAbsolute>
                            <TitleDiv>
                              <TitleInnerDiv>
                                <Title>Project Title</Title>
                                <FontAwesomeIcon icon={faWallet} />
                              </TitleInnerDiv>
                              <SubTitle>100%</SubTitle>
                            </TitleDiv>
                            <Divider></Divider>
                            <SubTitle>Project Cost</SubTitle>
                            <TitleDiv>
                              <Amount>ksh 5,000</Amount>
                              <Eye icon={faEye} />
                            </TitleDiv>
                          </ProjectDivAbsolute>
                        </ProjectDiv>
                        <ProjectDiv onClick={handleOpenProject}>
                          <ProjectDivAbsolute>
                            <TitleDiv>
                              <TitleInnerDiv>
                                <Title>Goat Rearing</Title>
                                <FontAwesomeIcon icon={faWallet} />
                              </TitleInnerDiv>
                              <SubTitle>100%</SubTitle>
                            </TitleDiv>
                            <Divider></Divider>
                            <SubTitle>Project Cost</SubTitle>
                            <TitleDiv>
                              <Amount>ksh 100,000</Amount>
                              <Eye icon={faEye} />
                            </TitleDiv>
                          </ProjectDivAbsolute>
                        </ProjectDiv>
                      </>
                    ) : (
                      <EmptyProjects
                        handleAddProjectOPen={handleAddProjectOPen}
                      />
                    )}
                  </>
                )}
              </ContainerTwo>
            </Wrapper>
          </>
        )}
      </>
    </Main>
  );
}

export default Projects;

const Wrapper = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const WrapperTwo = styled.div`
  display: flex;
  justify-content: center;
`;
const Main = styled.div`
  width: 100%;
  min-height: 100dvh;
`;
const GroupNameDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
`;
const ContainerOne = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 15px 10px;
  max-width: 700px;
  width: 100%;
`;
const BellDiv = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 50%;
  cursor: pointer;
`;
const ChevronLeft = styled(FontAwesomeIcon)`
  font-size: 17px;
  color: #fff;
  cursor: pointer;
`;
const Eye = styled(FontAwesomeIcon)`
  font-size: 17px;
  color: #fff;
  padding-right: 5px;
  cursor: pointer;
`;
const GroupName = styled.h4`
  font-size: 16px;
  font-weight: 500;
`;
const ContainerTwo = styled.div`
  max-width: 700px;
  width: 100%;
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const ProjectDivAbsolute = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: rgb(0, 0, 0, 0.5);
  color: #fff;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  cursor: pointer;
  &:hover {
    background-color: rgb(0, 0, 0, 0.7);
  }
`;

const ProjectDiv = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  border-radius: 10px;
  background-image: url("/public/images/projectsImage.jpeg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  &:nth-child(2) {
    background-image: url("https://www.goatfarming.in/wp-content/uploads/2023/05/Goat-Farming-in-Kenya-1.jpg");
  }
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleInnerDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Title = styled.h4`
  font-weight: 500;
  text-align: left;
`;
const SubTitle = styled.h5`
  font-weight: 400;
  font-size: 11px;
  text-align: left;
`;
const Amount = styled.h4`
  font-weight: 400;
  font-size: 15px;
  text-align: left;
  padding-top: 5px;
`;

const Divider = styled.div`
  width: 100%;
  background-color: #fff;
  height: 1px;
  margin: 5px 0;
`;
