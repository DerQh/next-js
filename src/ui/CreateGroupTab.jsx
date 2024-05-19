import styled from "styled-components";

const Main = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const ImageDiv = styled.div`
  width: 100%;
  height: 25dvh;
  padding: 10px;
  background-image: url("/black.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CircleDiv = styled.div`
  margin-top: 5px;
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const GroupName = styled.div`
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
`;
const CircleDivInner = styled.div`
  position: absolute;
  width: 60%;
  height: 2px;
  background-color: #000;
  border-radius: 2px;
  transform: rotate(45deg);
  &:nth-child(2) {
    transform: rotate(-45deg);
  }
`;

const FormDiv = styled.div`
  padding: 15px;
`;

const Form = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  margin-top: 10px;
  padding: 5px 0;
  font-size: 12px;
  color: #636363;
  font-weight: 500;
`;
const Input = styled.input`
  padding: 8px;
  display: flex;
  flex-direction: column;
  font-size: 16.5px;
  &::placeholder {
    font-size: 11px;
  }
`;
const P = styled.p`
  padding: 25px 0;
  font-size: 10px;
  text-align: justify;
`;

const Button = styled.button`
  padding: 10px 0;
  font-size: 16px;
  text-align: center;
  background-color: #111f34;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
`;

const Span = styled.span`
  color: #111f34;
  font-weight: 650;
`;

//
function CreateGroupTab({
  handleCreateButton,
  setState,
  inPutValue,
  id,
  handleCreateClick,
  description,
}) {
  function handleClickSubmit() {
    // console.log(inPutValue, id);
    if (!inPutValue || !id) return;
    handleCreateClick();
    handleCreateButton();
  }
  return (
    <Main>
      <ImageDiv>
        <CircleDiv onClick={handleCreateButton}>
          <CircleDivInner></CircleDivInner>
          <CircleDivInner></CircleDivInner>
        </CircleDiv>
        <GroupName>Create New Group</GroupName>
      </ImageDiv>

      <FormDiv>
        <h5>Group Details</h5>
        <Form>
          <Label htmlFor="">Name of Group</Label>
          <Input
            placeholder="Enter Group name"
            type="text"
            name="createinput"
            id="joinGroup"
            value={inPutValue}
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                inPutValue: e.target.value.toLowerCase(),
              }))
            }
          />
          <Label htmlFor="">Group Description</Label>
          <Input
            id="description"
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                description: e.target.value.toLowerCase(),
              }))
            }
          />
          <P>
            *Groups can have a <Span>maximum of 100 members </Span>and in each
            group there can be a <Span> maximum of 3 Administrators</Span>. A
            user can <Span>only create 3 groups</Span> and can be a member of{" "}
            <Span>not more than 5 groups</Span>.
          </P>
          <Button onClick={handleClickSubmit}>Create Group</Button>
        </Form>
      </FormDiv>
    </Main>
  );
}

export default CreateGroupTab;
