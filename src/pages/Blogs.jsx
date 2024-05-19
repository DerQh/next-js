import styled from "styled-components";
import Footer from "../ui/Footer";
import { useEffect, useState } from "react";
import { faChevronLeft, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Main = styled.div`
  color: #fff;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  overflow: scroll;
`;

const Blog = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  &:hover {
    color: #d8eafb;
  }
`;
const ImageDiv = styled.div`
  position: relative;
  height: 25dvh;
  width: 100%;
  padding: 5px;
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
`;
const ImageDivAbsolute = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgb(255, 255, 255, 0.5);
  }
`;

const BlogsDiv = styled.div`
  padding: 15px;
  width: 100%;
  height: 100%;
  /* min-height: 100dvh; */
  max-width: 1200px;
  margin-top: 20px;
  display: grid;
  justify-content: center;
  grid-template-columns: auto;
  gap: 25px;
  @media (min-width: 768px) {
    grid-template-columns: auto auto;
    gap: 28px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: auto auto auto;
    gap: 30px;
  }
`;
const ArticleDIv = styled.div`
  font-size: 12px;
  padding: 5px;
`;
const Header = styled.div`
  width: 100%;
  color: white;
`;
const Heading = styled.h3`
  text-align: center;
  font-weight: 200;
  line-height: 1.5;
  letter-spacing: 1px;
  font-size: 1.35rem;
  padding: 15px 5px;
  @media (min-width: 768px) {
    font-weight: 300;
    line-height: 1.6;
    letter-spacing: 1.2px;
    font-size: 1.9rem;
    padding: 20px 10px;
  }

  @media (min-width: 1024px) {
    font-weight: 300;
    line-height: 1.8;
    letter-spacing: 1.3px;
    font-size: 2rem;
    padding: 30px 5px;
  }
`;
const Subheading = styled.div`
  width: 100%;
`;

const SingleBlog = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* display: none; */
  flex-direction: column;
  align-items: center;
`;
const UnorderdList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 5px;
  list-style: none;
  color: #898d91;
  margin-bottom: 10px;
`;
const P = styled.p`
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  font-weight: 200;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  unicode-bidi: isolate;
  line-height: 1.5;
  padding-bottom: 10px;
`;

const ReadMoreButton = styled.button`
  margin-bottom: 1.8rem;
  border-radius: 15px;
  border: none;
  padding: 10px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #cdcdcd;
  }
`;
// single blog//
const HeaderSection = styled.section`
  position: relative;
  width: 100%;
  height: 30dvh;
  min-height: 250px;
  background-image: url(${(props) => props.$imageUrl});
  @media (min-width: 768px) {
    height: 35dvh;
  }

  @media (min-width: 1024px) {
    height: 40dvh;
  }
`;
const HeaderInner = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 0, 0, 0.5);
  padding: 10px;
`;
const HeaderMain = styled.section`
  padding-top: 25px;
  width: 100%;
  max-width: 1200px;
  display: grid;
  justify-content: center;
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
    gap: 28px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
    gap: 30px;
  }
`;
const ParagraphArticle = styled.p`
  text-align: center;
  line-height: 1.9;
  font-weight: 300;
  font-size: 13px;
  letter-spacing: 1px;
  padding: 10px 15px;
  @media (min-width: 768px) {
    text-align: start;
    font-weight: 200;
    font-size: 15px;
    letter-spacing: 1.5px;
    padding: 15px 35px;
  }

  @media (min-width: 1024px) {
    text-align: start;
    font-weight: 200;
    font-size: 16px;
    letter-spacing: 1.5px;
  }
`;
const List = styled.li`
  list-style: none;
  line-height: 1.9;
  font-weight: 300;
  font-size: 13px;
  letter-spacing: 1px;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const RecentPosts = styled.div`
  width: 100%;
  height: fit-content;
  text-align: start;
  padding: 10px 15px;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #7d7f80;
  margin: 10px 0px;
  max-width: 1000px;
`;
const GoBack = styled(FontAwesomeIcon)`
  position: absolute;
  z-index: 999;
  color: #fff;
  right: 5%;
  top: 10px;
  width: 10px;
  height: 10px;
  padding: 5px;
  border-radius: 50%;
  border: 2px solid #fff;
  cursor: pointer;
`;
const Back = styled(FontAwesomeIcon)`
  visibility: hidden;
  display: block;
  cursor: pointer;

  @media (min-width: 768px) {
    visibility: hidden;
  }
`;
const SectionOne = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
  padding: 20px 8px;
  font-size: 20px;
  align-items: center;
`;
const CreateBlogBtn = styled.button`
  margin-right: 5px;
  border-radius: 15px;
  border: none;
  padding: 8px 10px;
  border: 1px solid #fff;
  color: #000;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #111f34;
  }
`;

function Blogs() {
  const [openBlog, setOpenBlog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [openBlog]);

  function handleOPenClick() {
    setOpenBlog((open) => !open);
  }

  return (
    <Main>
      {!openBlog ? (
        <>
          <SectionOne>
            <Back onClick={() => navigate("/")} icon={faChevronLeft} />
            <CreateBlogBtn>Create Post</CreateBlogBtn>
          </SectionOne>
          <BlogsDiv>
            <Blog>
              <ImageDiv $imageUrl={`https://picsum.photos/800/800?random=2`}>
                <ImageDivAbsolute></ImageDivAbsolute>
              </ImageDiv>
              <ArticleDIv>
                <Heading>“Overcome”: Challenges of Christian Parents</Heading>
                <Subheading>
                  <UnorderdList>
                    <li>March 4, 2024 /</li>
                    <li>Gabrelle Sonkeng /</li>
                    <li>Finance</li>
                  </UnorderdList>
                </Subheading>
                <P>
                  Navigating the Challenges of Christian Parenting in a
                  Counterculture World. In today’s rapidly changing world,
                  Christian parents face multifaceted challenges as they strive
                  to raise spiritually mature (grand) children within a culture
                  that often contradicts or challenges their values. Amidst the
                  pervasive influence of secularism, individualism, moral
                  relativism, and a decline in biblical worldview and..
                </P>
                <ReadMoreButton onClick={handleOPenClick}>
                  Read More{" "}
                </ReadMoreButton>
              </ArticleDIv>
            </Blog>
            <Blog>
              <ImageDiv $imageUrl={`https://picsum.photos/800/800?random=5`}>
                <ImageDivAbsolute></ImageDivAbsolute>
              </ImageDiv>
              <ArticleDIv>
                <Heading>Family Discipleship Institute Empowers Future</Heading>
                <Subheading>
                  <UnorderdList>
                    <li>December 16, 2024 /</li>
                    <li>Kevin Ochieng /</li>
                    <li>Parenting</li>
                  </UnorderdList>
                </Subheading>
                <P>
                  In a world where the foundations of family values are being
                  tested, there arises a pressing need for intentional,
                  well-researched solutions. Victorious Family, which has spent
                  15 years in the realm of family discipleship, has taken a
                  groundbreaking step towards societal transformation with the
                  establishment of its Research and Equipping Family
                  Discipleship Institute. We are..
                </P>
                <ReadMoreButton onClick={handleOPenClick}>
                  Read More{" "}
                </ReadMoreButton>
              </ArticleDIv>
            </Blog>
          </BlogsDiv>
        </>
      ) : (
        <SingleBlog>
          <HeaderSection $imageUrl={`https://picsum.photos/800/800?random=2`}>
            <GoBack onClick={() => setOpenBlog((open) => !open)} icon={faX} />
            <HeaderInner>
              <Heading>“Overcome”: Challenges of Christian Parents</Heading>
              <UnorderdList>
                <li>March 4, 2024 /</li>
                <li>Gabrelle Sonkeng /</li>
                <li>Finance</li>
              </UnorderdList>
            </HeaderInner>
          </HeaderSection>
          <HeaderMain>
            <article>
              <ParagraphArticle>
                “Reclaiming Our Foundations: The Vitality of Family-Centered
                Faith”
              </ParagraphArticle>
              <ParagraphArticle>
                In the whirlwind of societal progress, the essence of the
                family, a cornerstone of civilizations past and present, has
                been overlooked. As we navigate the complexities of modern life,
                we stand at a critical juncture, grappling with the
                repercussions of moral erosion and spiritual neglect. The
                fractures within our societal framework, manifested in broken
                homes and disarrayed families, underscore the urgency of
                restoring the primacy of family-centered faith.
              </ParagraphArticle>
              <ParagraphArticle>
                The family unit holds unparalleled significance. It serves as
                the crucible where children forge their identities and
                internalize values that shape their worldview and actions.
                Beyond providing physical shelter and sustenance, the family
                cultivates an environment where faith is not merely professed
                but lived. It is within these sanctified spaces that the seeds
                of enduring principles are sown, nurturing the moral and
                spiritual fabric of future generations.
              </ParagraphArticle>
              <ParagraphArticle>
                Yet, the responsibility for nurturing family-centered faith
                extends beyond individual households; it is a collective
                societal imperative. We must shift our focus from external
                challenges to the internal cultivation of spiritual growth,
                recognizing that true transformation begins within the family
                unit. This resurgence of family-centered faith is not a
                regression to antiquated norms but a timeless reaffirmation of
                enduring values. It is about anchoring progress in principles
                that transcend temporal trends and embracing unity amidst
                diversity.
              </ParagraphArticle>
              <ParagraphArticle>
                The role of the church in this endeavor is paramount. Beyond
                addressing social issues, the church must lead in spiritual
                edification, nurturing faith within the hearts and homes of its
                congregants. Efforts to empower parents and emphasize the
                pivotal role of the family in spiritual formation are integral
                to this renewal. It is a call to equip families with the tools
                and resources necessary to serve as bastions of enduring values,
                shaping the moral and spiritual landscape of society. Now, more
                than ever, it is imperative to invest in family-centered faith.
                It serves as a potent elixir for societal healing, fortifying
                the very foundation upon which our nation’s strength and
                resilience rest. The revival of family-centered faith is not a
                distant aspiration but an achievable reality awaiting
                realization through intentional, purposeful, and committed
                efforts.
              </ParagraphArticle>
            </article>
            <RecentPosts>
              <Heading> Recent Posts</Heading>
              <ul>
                <List>Victorious News!</List>
                <List>“Overcome”: Challenges of Christian Parents</List>
                <List>The Vitality of Family-Centered Faith</List>
                <List>Reigniting family-centered faith</List>
                <List>Family Discipleship Institute Empowers Future</List>
              </ul>
            </RecentPosts>
          </HeaderMain>
        </SingleBlog>
      )}

      <Divider></Divider>
      <Footer></Footer>
    </Main>
  );
}

export default Blogs;
