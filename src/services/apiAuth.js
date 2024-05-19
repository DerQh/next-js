import supabase from "./supabase";

export async function LoginWithGoogle() {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}

export async function logOutApi() {
  let { error } = await supabase.auth.signOut();
}

export async function signUpApi({ firstName, lastName, email, password }) {
  console.log(firstName, lastName, email, password);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { firstName, lastName, avatar: "", password },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function userId() {
  const currentUser = supabase.auth.user();
  if (currentUser) {
    const userId = currentUser.id;
  }
}

export async function LogInApi({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

// ---- TEST FUNCTION---- //
// export async function joinGroupTest({
//   inPutValue,
//   id,
//   firstName,
//   lastName,
//   email,
// }) {
//   console.log(inPutValue, id, firstName, lastName, email);
//   try {
//     // ----check if group is registered
//     let { data: user_groups, error } = await supabase
//       .from("user_groups")
//       .select("group_name")
//       .eq("group_name", inPutValue);
//     if (error) throw new Error(error);

//     const { data: uuid, error: uuidError } = await supabase
//       .from("profiles")
//       .select("*")
//       .eq("id", id);
//     if (uuidError) throw new Error(uuidError);

//     //----- if there is no registered group return
//     if (user_groups.length == 0) {
//       toast(`${inPutValue} is not registered`, {
//         autoClose: 1000,
//       });
//       return null;
//     }

//     // check if the user in userProfiles list, if so, log them in,  if not ..NEXT STEP
//     console.log(uuid);
//     console.log(uuid[0].groups.groups.includes(inPutValue));

//     // if user has already registered to this group
//     if (uuid[0].groups.groups.includes(inPutValue)) {
//       toast(` Already a Member of: ${uuid[0].group.toUpperCase()} `, {
//         autoClose: 2000,
//       });
//       return null;
//     }

//     // user already a member - JOIN
//     // add user to group as a new member
//     console.log(uuid[0].groups.groups.push(inPutValue));

//     // if (uuid.length > 0) {
//     //   toast(` Already a Member of: ${uuid[0].group.toUpperCase()} `, {
//     //     autoClose: 2000,
//     //   });
//     //   return null;
//     // }

//     // CREATE THE USER PROFILE AND ADD THEM TO THE GROUP THEY ENTERED
//     // if (uuid.length == 0) {
//     const { data, error: profileErr } = await supabase.from("profiles").update([
//       {
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         lastName: lastName,
//         is_admin: true,
//         group: inPutValue,
//         id: id,
//       },
//     ]);
//     if (error) throw new Error(error);

//     // LOGG USER IN AS MEMBER OF ENTERED GROUP
//     toast(`Hello, ${firstName}`, {
//       autoClose: 2000,
//     });
//     return user_groups;
//     // }
//     //  else {
//     //   toast(`${inPutValue} is not a registered group, `, {
//     //     autoClose: 2000,
//     //   });
//     //   throw new Error(`${inPutValue} is not in our registry`);
//     // }
//   } catch (error) {
//     // toast(`There was an issue signing in `);
//     throw error;
//   }
// }

export async function getProfile(id) {
  const { data: userProfileData, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id);
  if (error) throw new Error(error);
  return userProfileData;
}

export async function testFuntionSupabsae(id) {
  const { data: userProfileData, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id);
  if (error) throw new Error(error);
  return userProfileData;
}
