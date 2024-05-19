import { toast } from "react-toastify";
import supabase from "./supabase";

// Check if a group exists and is active
async function checkGroupExists(inPutValue) {
  const { data, error } = await supabase
    .from("group")
    .select("*")
    .eq("is_active", true)
    .eq("group_name", inPutValue.toLowerCase());
  if (error) throw new Error(error);
  return data.length > 0;
}

// Get user data by ID
async function getUserData(id) {
  const { data, error } = await supabase
    .from("users")
    .select("groups")
    .eq("user_id", id);
  if (error) throw new Error(error);
  return data[0];
}

// Check if user is already a member of the group
function isMemberOfGroup(userData, groupName) {
  return userData?.groups.includes(groupName);
}
// check if use is already a group member before and status is active
async function checkGroupStatus(id, groupName) {
  const { data, error } = await supabase
    .from("group members")
    .select("*")
    .eq("user_id", id)
    .eq("group_name", groupName);
  if (error) throw new Error(error);
  return data.length > 0;
}

// update user member status if he was already registered
async function updateStatus(id, groupName) {
  const { data, error } = await supabase
    .from("group members")
    .update([{ is_member: true }])
    .eq("user_id", id)
    .eq("group_name", groupName);
  if (error) throw new Error(error);
}

// Add user to a group
async function addUserToGroup(id, groupName, fullName) {
  const { data, error } = await supabase
    .from("group members")
    .insert([{ user_id: id, group_name: groupName, member_name: fullName }])
    .select();
  console.log(data);
  if (error) throw new Error(error);
}

// Update user's groups array
async function updateUserGroups(id, groupsArray) {
  const { error } = await supabase
    .from("users")
    .update([{ groups: groupsArray }])
    .eq("user_id", id);
  if (error) throw new Error("Group can't be added to group array");
}

// Main function to join a group
export async function joinGroupApi({ inPutValue, id, fullName }) {
  try {
    const groupExists = await checkGroupExists(inPutValue);
    if (!groupExists) {
      toast("Group Doesn't exist !");
      return;
    }

    const userData = await getUserData(id);

    if (isMemberOfGroup(userData, inPutValue)) {
      toast("Already a member");
      return userData;
    }

    if (userData.groups.length > 2) {
      toast("Group Limit Reached");
      return userData;
    }

    const reJoining = await checkGroupStatus(id, inPutValue);

    if (reJoining) {
      await updateStatus(id, inPutValue);
      toast(`Rejoined ${inPutValue.toUpperCase()} group`);
      userData.groups.push(inPutValue);
      await updateUserGroups(id, userData.groups);
      return userData;
    }

    userData.groups.push(inPutValue);
    await updateUserGroups(id, userData.groups);

    toast(`Added to ${inPutValue.toUpperCase()} group`);

    await addUserToGroup(id, inPutValue, fullName);

    // Return group data
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
}
