import styled from "styled-components";
import Contact from "./Contact";
import { useNavigate } from "react-router-dom";

const BlogDiv = styled.div`
  background-color: #fff;
  text-align: center;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 400px) {
    /* padding-top: 10%; */
  }

  @media (min-width: 768px) {
    /* padding-top: 10%; */
  }
  @media (min-width: 1024px) {
    /* padding-top: 10%; */
  }
`;

const Heading = styled.h1`
  color: black;
  font-size: 34px;
  text-align: center;
  font-weight: 600;
  padding: 20px 1px;
  padding-top: 10px;
  line-height: 40px;
  @media only screen and (max-width: 400px) {
    font-size: 1rem;
    padding: 2px 1px;
    padding-top: 1px;
    line-height: 30px;
  }
`;

const Paragraph = styled.p`
  color: rgb(38, 38, 38, 0.8);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.5px;
  line-height: 23px;
  padding: 15px 0;
  @media only screen and (max-width: 400px) {
    font-size: 0.7rem;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
    font-weight: 400;
    padding: 10px 20px 30px 20px;
  }
  @media (min-width: 1024px) {
    font-size: 1.1rem;
    font-weight: 400;
    padding: 30px 20px 40px 20px;
    line-height: 28px;
  }
`;
const Button = styled.button`
  margin: 10px 0;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 0.9rem;
  padding: 15px 20px;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    background-color: #387e89;
    color: #fdfdfd;
  }
  @media only screen and (max-width: 400px) {
    font-size: 0.7rem;
  }
`;

const BlogHeading = styled.div`
  height: auto;
  margin: 0px 10px;
  @media only screen and (max-width: 400px) {
    font-size: 0.7rem;
    margin: 0px;
  }
`;

const BlogsDivs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  @media only screen and (max-width: 400px) {
    font-size: 0.7rem;
    gap: 8px;
  }

  @media (min-width: 768px) {
    margin-top: 10px;
    font-size: 1rem;
    font-weight: 400;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  @media (min-width: 1024px) {
    margin-top: 14px;
    font-size: 1rem;
    font-weight: 400;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
`;
const BlogsDiv = styled.div`
  /* border: 2px solid red; */
  position: relative;
  margin: 10px 0;
  border-radius: 10px;
  border: 0.001rem solid silver;
  height: 100%;
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const BlogsTittle = styled.h5`
  position: absolute;
  color: #ffffff;
  background-color: rgb(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 5px;
  font-weight: 500;
  top: 5%;
  left: 5%;
  @media only screen and (max-width: 400px) {
    font-size: 0.7rem;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
    font-weight: 400;
  }
  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;
const ImageDiv = styled.div`
  height: 40dvw;
  max-height: 300px;
  background-image: url("https://source.unsplash.com/random/300x200?sig=1");
  background-size: cover;
  border-radius: 10px 10px 0 0;
  background-position: center;
  border: none;
`;
const ImageDiv2 = styled.div`
  height: 40dvw;
  max-height: 300px;
  background-image: url("https://source.unsplash.com/random/300x200?sig=5");
  background-size: cover;
  border-radius: 10px 10px 0 0;
  background-position: center;
  border: none;
`;

const BlogParagraph = styled.p`
  text-align: start;
  padding: 10px 20px;
  font-size: 10px;
  font-weight: 400;
  @media only screen and (max-width: 400px) {
    font-size: 0.7rem;
  }

  @media (min-width: 768px) {
    font-size: 0.8rem;
    font-weight: 300;
    padding: 1px 20px;
  }
  @media (min-width: 1024px) {
    font-size: 0.9rem;
    font-weight: 300;
    padding: 1px 20px;
  }
`;
const BlogAuthor = styled.h6`
  letter-spacing: 1px;
  text-align: start;
  padding: 1px 20px;
  font-weight: 600;
`;

function Blog() {
  const navigate = useNavigate();
  return (
    <BlogDiv>
      <BlogHeading>
        <Heading>Our Blog</Heading>
        <Paragraph>
          Wealth Management businesses should provide educational resources to
          help investors make informed investment decisions.
        </Paragraph>
        <Button onClick={() => navigate("/blogs")}>View Entire Posts </Button>

        <BlogsDivs>
          <BlogsDiv>
            <BlogsTittle>Saving 101</BlogsTittle>
            <ImageDiv></ImageDiv>
            <BlogParagraph>
              Design Thinking: Building a Design System for an Existing Product
            </BlogParagraph>
            <BlogAuthor className="author-name">
              AUTHOR <span className="date-blog">AUGUTS 31, 2020</span>
            </BlogAuthor>
          </BlogsDiv>
          <BlogsDiv>
            <BlogsTittle>Table banking beats poverty trap </BlogsTittle>
            <ImageDiv2></ImageDiv2>
            <BlogParagraph>
              Women’s dreams of owning land is within reach thanks to loans from
              self-help groups that are beginning to change Kenya’s financial
              landscape
            </BlogParagraph>
            <BlogAuthor className="author-name">
              AUTHOR <span className="date-blog">AUGUTS 31, 2020</span>
            </BlogAuthor>
          </BlogsDiv>
        </BlogsDivs>

        <Contact></Contact>
      </BlogHeading>
    </BlogDiv>
  );
}

export default Blog;
