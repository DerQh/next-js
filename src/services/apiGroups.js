import { toast } from "react-toastify";
import supabase from "./supabase";

// --------------------------------------------------------------------------- CREATE GROUP-----------//
const date = new Date().toISOString();

export async function createGroupApi({
  inPutValue,
  id,
  fullName,
  email,
  description,
}) {
  try {
    // check if group exists
    const { data: groupData, error: groudError } = await supabase
      .from("group")
      .select("*")
      .eq("group_name", inPutValue);
    if (groudError) throw new Error(groudError);

    // check if user has created more than 3 groups
    const { data: userGroupData, error: userGroupError } = await supabase
      .from("group")
      .select("*")
      .eq("is_active", true)
      .eq("user_id", id);
    if (userGroupError) throw new Error(userGroupError);

    if (groupData.length > 0) {
      // if group exists return
      toast("Group Exists");
      throw new Error("Group Exists");
      return groupData;
    }

    // console.log(userGroupData.length);
    if (userGroupData.length > 2) {
      // if user has more thann 3 groups , return
      toast("Group Creation Limit Exceeded");
      throw new Error("Group Creation Limit Exceeded");
    }

    if (groupData.length == 0) {
      // ----------create new Group
      const { data, error } = await supabase.from("group").insert([
        {
          group_name: inPutValue,
          user_id: id,
          admins: [id],
          creator_name: fullName,
          description: description,
        },
      ]);

      if (error) throw new Error(error);
      toast("Group Created Sucessfully");

      // -------add user to group members table
      const { data: memberData, error: memberError } = await supabase
        .from("group members")
        .insert([
          {
            user_id: id,
            group_name: inPutValue,
            member_name: fullName,
            is_member: true,
            status: "approved",
            approved_by: id,
            approval_date: data,
          },
        ])
        .select();

      if (memberError) throw new Error(memberError);
    }

    // check if user exists ?
    const { data: uuid, error: uuidError } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", id);

    // console.log(uuid.length == 0);
    if (uuidError) throw new Error(uuidError);

    // if user doesnt exist >>>>
    if (uuid.length == 0) {
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            email: email,
            full_name: fullName,
            is_admin: true,
            groups: [inPutValue],
            user_id: id,
          },
        ])
        .select();

      if (data) {
        // console.log(data);
      }
      if (error) throw new Error(error);
    }
    // if user exists , check group array and add the new group name to the array
    if (uuid.length > 0) {
      const { data, error } = await supabase
        .from("users")
        .select("groups")
        .eq("user_id", id);
      // add Input Value(new group name) to the groups array of the user
      if (data) {
        const groupsArray = data[0].groups;
        groupsArray.push(inPutValue);
        console.log(groupsArray);
        const { data: arrayData, error: arrayError } = await supabase
          .from("users")
          .update([
            {
              groups: groupsArray,
            },
          ])
          .eq("user_id", id);
        if (arrayError) throw new Error("Group can't be added to group array");
      }
      if (error) throw new Error(error);
      return uuid;
    }
    return uuid;
  } catch (error) {
    throw error;
  }
}

// --------------------------------ADD USER TO USER TABLE

export async function addUser({ id, email, fullName }) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", id);
  if (error) throw new Error(error);
  // console.log(data);
  if (data.length == 0) {
    // console.log(data, id, email, fullName);
    const { data: userAdd, error } = await supabase
      .from("users")
      .insert([
        {
          email: email,
          user_id: id,
          groups: [],
          full_name: fullName,
          is_admin: false,
        },
      ])
      .select();
    if (error) throw new Error(error);
  }

  return data;
}

// --------------------------------------- GET GROUPS ---------------

export async function userGroupsAPi({ id }) {
  const { data, error } = await supabase
    .from("users")
    .select("groups")
    .eq("user_id", id);
  if (error) throw new Error(error);

  // Retrieve details of each group name
  const groupDataArray = [];
  for (const groupName of data[0].groups) {
    const { data: userGroupData, error: userGroupError } = await supabase
      .from("group")
      .select("*")
      .eq("group_name", groupName);
    if (userGroupError) throw new Error(userGroupError);
    groupDataArray.push(userGroupData[0]);
  }
  // console.log(groupDataArray);
  return groupDataArray;
}

export async function groupApi(group) {
  const { data, error } = await supabase
    .from("group")
    .select("*")
    .eq("group_name", group);
  if (error) throw new Error(error);
  return data;
}
