import supabase from "./supabase";


export async function checkGroupDelete(id) {
  // console.log("checkGroups called");
  // Fetch user groups
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("groups")
    .eq("user_id", id);
  if (userError) throw new Error(userError);

  const userGroups = userData[0].groups;

  // Fetch active group names
  const { data: activeGroups, error: groupError } = await supabase
    .from("group")
    .select("group_name")
    .eq("is_active", true);
  if (groupError) throw new Error(groupError);

  const activeGroupNames = activeGroups.map((group) => group.group_name);

  // Filter out inactive groups from user's groups
  const updatedGroups = userGroups.filter((group) =>
    activeGroupNames.includes(group)
  );

  // Update user's groups
  const { data: updatedUserData, error: updateError } = await supabase
    .from("users")
    .update({ groups: updatedGroups })
    .eq("user_id", id)
    .select();
  if (updateError) throw new Error(updateError);

  return updatedUserData;
}

export async function deleteGroup(id) {
  const group = JSON.parse(localStorage.getItem("group"));
  // get userGroups
  const { data, error } = await supabase
    .from("users")
    .select("groups")
    .eq("user_id", id);
  if (error) throw new Error(error);

  let newGroups = data[0].groups;
  newGroups = newGroups.filter((grp) => grp !== group);
  //   console.log(newGroups);
  // push updated newGroup to the server
  const { data: groupUpdate, error: updateError } = await supabase
    .from("users")
    .update([
      {
        groups: [...newGroups],
      },
    ])
    .eq("user_id", id)
    .select();
  if (updateError) throw new Error(updateError);

  const { data: goupData, error: memberError } = await supabase
    .from("group members")
    .update({ is_member: false })
    .eq("group_name", group)
    .eq("user_id", id)
    .select();
  if (memberError) throw new Error(memberError);

  // delete(set isActive to false) group in groups table
  const { data: updateData, error: groupupdateError } = await supabase
    .from("group")
    .update([
      {
        is_active: false,
      },
    ])
    .eq("group_name", group);
  if (groupupdateError) throw new Error(groupupdateError);

  return data;
}

export async function exitGroup(id) {
  const group = JSON.parse(localStorage.getItem("group"));
  // get userGroups
  const { data, error } = await supabase
    .from("users")
    .select("groups")
    .eq("user_id", id);
  if (error) throw new Error(error);

  let newGroups = data[0].groups;
  newGroups = newGroups.filter((grp) => grp !== group);
  //   console.log(newGroups);
  // push updated newGroup to the server
  const { data: groupUpdate, error: updateError } = await supabase
    .from("users")
    .update([
      {
        groups: [...newGroups],
      },
    ])
    .eq("user_id", id)
    .select();
  if (updateError) throw new Error(updateError);

  const { data: goupData, error: memberError } = await supabase
    .from("group members")
    .update({ is_member: false })
    .eq("group_name", group)
    .eq("user_id", id)
    .select();
  if (memberError) throw new Error(memberError);

  return data;
}
