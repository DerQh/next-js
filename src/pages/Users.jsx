import styled from "styled-components";
import useUser from "../features/authentification/useUser";
import { checkGroupDelete } from "../services/apiGroupDelete";

const Main = styled.div`
  background-color: #fff;
  color: #000;
  height: 100dvh;
  width: 100dvw;
`;

function Users() {
  const { user: userData, isLoading: useLoading } = useUser();
  const user_id = userData?.id;
  // this is the uuid of the user generated from the user UID (Supabase -> authentification -> Users)
  // const user_id = "53c11bbc-92cb-414c-b1b5-f0825deb9238";

  function checkGroup() {
    console.log("Group chekced ");
    checkGroupDelete(user_id);
  }
  return (
    <Main>
      <div>
        <h1>here</h1>
        <div>
          <button onClick={checkGroup}>Check group delete </button>
        </div>
      </div>
    </Main>
  );
}

export default Users;
