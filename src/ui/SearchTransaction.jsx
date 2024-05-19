import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  font-size: 12px;
  padding: 8px 10px;
  width: 85%;
  border-radius: 5px;
  background-color: #eff0f0;
  border: none;
`;
const Button = styled(FontAwesomeIcon)`
  font-size: 20px;
  padding: 0px 10px;
  color: #7e7a7a;
  cursor: pointer;
`;

function SearchTransaction({}) {
  return (
    <Form
      onChange={(event) => {
        event.currentTarget;
      }}
    >
      <Input type="text" name="search" placeholder="Search Transaction " />
      <Button type="submit" icon={faMagnifyingGlass} />
    </Form>
  );
}

export default SearchTransaction;
