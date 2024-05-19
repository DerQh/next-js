import { faRunning, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useDeleteGroup } from "../features/group/useDeleteGroup";
import { useNavigate } from "react-router-dom";
import useUser from "../features/authentification/useUser";
import { useExitGroup } from "../features/group/useExitGroup";

const StyledDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.8);
  overflow: hidden;
  z-index: 999;
`;
const InnerDiv = styled.div`
  height: auto;
  max-width: 400px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Image = styled(FontAwesomeIcon)`
  width: 50px;
  height: 50px;
  color: red;
`;

const ImageExit = styled(FontAwesomeIcon)`
  width: 50px;
  height: 50px;
  color: red;
`;

const Content = styled.div`
  margin-top: 15px;
`;

const Title = styled.h5`
  margin-bottom: 5px;
  padding: 5px;
  font-weight: 500;
`;

const Description = styled.p`
  margin-bottom: 10px;
  font-size: 10px;
  font-weight: 300;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 9px 17px;
  background-color: #ff0000;
  color: #fff;
  border: 1px solid #ff0000;
  border-radius: 25px;
  font-size: 10px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
  }
`;
const ButtonTwo = styled.button`
  padding: 8px 15px;
  background-color: #fff;
  color: #ff0000;
  border: 1px solid red;
  border-radius: 25px;
  font-size: 10px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000000;
    border: 1px solid #2ea33b;
  }
`;

function GroupModal({
  exit,
  handleCancelClick,
  setGroupModal,
  setExitModal,
  setModalOpen,
}) {
  const innerDivRef = useRef(null);
  const { isLoading, isSuccess, deleteGroup } = useDeleteGroup();
  const { isExitSucess, isExiting, exitGroup } = useExitGroup();
  const { user: userData, isLoading: useLoading } = useUser();

  const navigate = useNavigate();
  const id = userData?.id;

  useEffect(() => {
    if (isSuccess || isExitSucess) {
      console.log("SUCESS");
      navigate("/group");
    }
    function handleClickOutside(event) {
      if (innerDivRef.current && !innerDivRef.current.contains(event.target)) {
        setGroupModal && setGroupModal();
        setExitModal && setExitModal();
        setModalOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setGroupModal, setExitModal, setModalOpen, isSuccess, isExitSucess]);

  //
  function handleCancel() {
    setGroupModal && setGroupModal();
    setExitModal && setExitModal();
    setModalOpen(false);
  }
  function handleDelete() {
    // delete group
    !exit && deleteGroup(id);
    // exit group
    exit && exitGroup(id);

    // exit ? exitGroup(id) : deleteGroup(id);
    // deleteGroup(id);
    // exit && exitGroup(id);
    // setGroupModal && setGroupModal();
    // setExitModal && setExitModal();
    // setModalOpen(false);
    // console.log(exit);
  }

  function handleInnerClick(event) {
    event.stopPropagation();
  }
  return (
    <>
      <StyledDiv>
        <InnerDiv ref={innerDivRef} onClick={handleInnerClick}>
          {exit ? <ImageExit icon={faRunning} /> : <Image icon={faTrash} />}

          <Content>
            <Title>{exit ? "Exit Group ?" : "Delete Group ?"}</Title>
            <Description>
              Once Done, this action can not be reversed
            </Description>
            <ButtonContainer>
              <Button disabled={isLoading} onClick={handleCancel}>
                Cancel
              </Button>
              <ButtonTwo disabled={isLoading} onClick={handleDelete}>
                Yes, {exit ? "Exit" : "Delete"}
              </ButtonTwo>
            </ButtonContainer>
          </Content>
        </InnerDiv>
      </StyledDiv>
    </>
  );
}

export default GroupModal;
