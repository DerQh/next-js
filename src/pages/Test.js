import styled from "styled-components";
import useUser from "../features/authentification/useUser";
import {
  getTotal,
  getTransactions,
  insertTransaction,
} from "../services/apiTransactions";
import supabase from "../services/supabase";

const Main = styled.div`
  background-color: #fff;
  color: #000;
  height: 100dvh;
  width: 100dvw;
`;

function Users() {
  const { user: userData, isLoading: useLoading } = useUser();
  const { email, firstName, lastName } = userData?.user_metadata;
  const user_id = userData?.id;
  const fullName = `${firstName} ${lastName}`;
  // this is the uuid of the user generated from the user UID (Supabase -> authentification -> Users)
  // const user_id = "53c11bbc-92cb-414c-b1b5-f0825deb9238";

  async function getAlltransactions() {
    try {
      let { data: transactions, error } = await supabase
        .from("transactions")
        .select("*");
      if (transactions) {
        console.log(transactions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getSingleransactions() {
    try {
      let { data: transactions, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("client_id", user_id);
      if (transactions) {
        console.log(transactions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function insertOrder() {
    try {
      let { data: transactions, error } = await supabase
        .from("transactions")
        .insert([
          {
            name: "Susan Akinyi",
            status: "Inserted as mMock up ",
            price: 56354,
            zip_code: "Karianddud Kisumu 2",
            city: "Mbokalisation",
            client_id: user_id,
            email: "ththihr@gmail.com",
          },
        ]);

      if (transactions) {
        console.log(transactions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function retrieveTransactions() {
    try {
      let { data: transactions, error } = await supabase
        .from("transactions")
        .select("*");

      if (transactions) {
        console.log(transactions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateOrder() {
    try {
      let { data, error } = await supabase
        .from("transactions")
        .update({ status: ["Ondusi Damba in Alendu ", "Also"] })
        .eq("id", "b8a29c02-98b2-41d3-a760-765cca0bbb0b");

      console.log("data");
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteOrder() {
    try {
      let { data, error } = await supabase
        .from("transactions")
        .delete()
        .eq("client_id", user_id);

      console.log("data");
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateUser() {
    // only works if the uuid matches the user id -
    try {
      let { data, error } = await supabase
        .from("users")
        .update({ groups: ["omindi", "Nyolworo", "Buch Alendu"] })
        .eq("user_id", user_id);
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getUser() {
    // only works if the uuid matches the user id -
    try {
      let { data, error } = await supabase.from("users").select("*");
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function insertUser() {
    try {
      let { data, error } = await supabase.from("users").insert([
        {
          email: "steve@gmail.com",
          is_admin: false,
          user_id: user_id,
          groups: ["alendu", "sitra"],
        },
      ]);
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //  ----GROUPS ----//

  async function getGroups() {
    try {
      const { data, error } = await supabase.from("group").select("*");
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function insertGroup() {
    try {
      const { data, error } = await supabase
        .from("group")
        .insert([
          {
            group_name: "omindi",
            user_id: user_id,
            admins: [user_id],
            creator_name: fullName,
          },
        ])
        .select();
      if (data) {
        console.log(data);
      }

      // create a member
      // const { data: members, error: membererror } = await supabase
      //   .from("group members")
      //   .insert([
      //     {
      //       group_name: "omindi",
      //       user_id: user_id,
      //       admins: [user_id],
      //       creator_name: fullName,
      //     },
      //   ])
      //   .select();
      // if (members) {
      //   console.log(members);
      // }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateGroup() {
    try {
      const { data, error } = await supabase
        .from("group")
        .update([
          {
            creator_name: "JaDamba",
          },
        ])
        .eq("group_name", "omindi");

      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createGroup() {
    try {
      // check if group exists
      const { data: groupData, error: groudError } = await supabase
        .from("group")
        .select("*")
        .eq("group_name", "omindi");
      if (groudError) throw new Error(groudError);

      // check if user has created more than 3 groups
      const { data: userGroupsCount, error: userGroupError } = await supabase
        .from("group")
        .select("*")
        .eq("user_id", user_id);
      if (userGroupError) throw new Error(userGroupError);

      console.log(userGroupsCount);
      if (userGroupsCount.length > 3) {
        return userGroupsCount;
      }

      if (groupData.length > 0 || groupData.length > 2) {
        // if group exists return
        console.log(groupData);
        return groupData;
      }

      if (groupData.length == 0) {
        // create new Group
        const { data, error } = await supabase.from("group").insert([
          {
            group_name: "final",
            user_id: user_id,
            admins: [user_id],
            creator_name: fullName,
          },
        ]);

        if (error) throw new Error(error);
      }

      // check if user exists ?
      const { data: uuid, error: uuidError } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user_id);

      console.log(uuid.length == 0);

      if (uuidError) throw new Error(uuidError);

      // if user doesnt exist >>>>
      if (uuid.length == 0) {
        const { data, error } = await supabase
          .from("users")
          .insert([
            {
              email: email,
              full_name: fullName,
              is_admin: false,
              groups: [""],
              user_id: user_id,
            },
          ])
          .select();
        if (data) {
          console.log(data);
        }
        if (error) throw new Error(error);
        return uuid;
      }

      // if user exists , check group array and add the new group name to the array
      if (uuid.length > 0) {
        const { data, error } = await supabase
          .from("users")
          .select("groups")
          .eq("user_id", user_id);

        if (data) {
          console.log(data);
        }
        if (error) throw new Error(error);

        return uuid;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function testTransact() {
    const amount = 2456;
    const group = "omindi";
    const name = "fred omindi";
    const email = "test@gmail.com";
    // getTransactions();
    insertTransaction({ user_id, amount, group, email, name });
  }

  function checkGroupDelete() {
    checkGroupDelete(user_id);
  }

  // async function insertTransaction() {
  //   try {
  //     let { data: transactions, error } = await supabase
  //       .from("transactions")
  //       .insert([
  //         {
  //           name: "Sharon ",
  //           status: "pending",
  //           amount: 56354,
  //           user_id: user_id,
  //           email: "fredrick@gmail.com",
  //           group: "omindi",
  //         },
  //       ]);

  //     if (transactions) {
  //       console.log(transactions);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // getTotal('omindi')/*  */
  return (
    <Main>
      {/* <h1>FAMILY MEMBERS HERE </h1>
      <button onClick={updateOrder}>Update order </button>
      <button onClick={insertOrder}>Insert Order </button>
      <div>
        <button onClick={updateUser}>update user data </button>
      </div>
      <div>
        <button onClick={getAlltransactions}>get all transactions </button>
      </div>
      <div>
        <button onClick={deleteOrder}>delete order </button>
      </div>
      <div>
        <button onClick={getUser}>get user </button>
      </div>
      <div>
        <button onClick={insertUser}>Create user </button>
      </div>
      <div>
        <button onClick={getSingleransactions}>
          Get logged User Transaction
        </button>
      </div>
      <h1>GROUPS</h1>

      <div>
        <button onClick={getGroups}>GET ALL GROUPS</button>
      </div>
      <div>
        <button onClick={insertGroup}>CREATE A GROUP</button>
      </div>
      <div>
        <button onClick={updateGroup}>UPDATE A GROUP</button>
      </div>
      <div>
        <button onClick={createGroup}>CREATE GROUP FUNCTION</button>
      </div>

      <h1>TRANSACTIONS </h1>

      <div>
        <button onClick={testTransact}>TEST insert transaction FUNCTION</button>
      </div> */}
      <div>
        <h1>here</h1>
        <div>
          <button onClick={checkGroupDelete}>Check group delete </button>
        </div>
      </div>
    </Main>
  );
}

export default Users;
