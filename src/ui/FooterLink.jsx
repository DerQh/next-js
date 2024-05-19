import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLi = styled(Link)`
  text-decoration: none;
  text-align: start;
  color: inherit;
  padding: 8px 5px;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 200;

  &:hover {
    color: green;
    font-weight: 400;
  }
  @media (min-width: 768px) {
    font-size: 14px;
  }

  @media (min-width: 1024px) {
    font-size: 15px;
  }
`;
function FooterLink({ text, pathTo }) {
  return <StyledLi to={`/${pathTo}`}>{text}</StyledLi>;
}

export default FooterLink;
