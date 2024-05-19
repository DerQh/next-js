import styled from "styled-components";

const Main = styled.div`
  margin: 0 auto;
  background-color: #fff;
  color: #0d0c22;
  width: 100%;
  height: 100dvh;
  padding: 30px 30px;
  max-width: 450px;

  @media (min-width: 768px) {
    max-width: 768px;
    max-height: 100dvh;
    padding: 10px 50px;
  }

  @media (min-width: 1024px) {
    padding: 10px 50px;
    :root {
      --base-font-size: 10px;
    }
  }
`;

function Gallery() {
  return <Main>Photos hee arranges in one big div and other small divs </Main>;
}

export default Gallery;
