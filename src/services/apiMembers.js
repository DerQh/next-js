import supabase from "./supabase";
const date = new Date().toISOString();

export async function getMembers(group) {
  let { data: members, error } = await supabase
    .from("group members")
    .select("*")
    .eq("group_name", group);
  if (error) throw new Error(error);
  // get admins array IDs
  let { data: admins, error: adminError } = await supabase
    .from("group")
    .select("admins")
    .eq("group_name", group);
  if (adminError) throw new Error(adminError);
  // filter members and remove the ones with IDs == admins
  const adminsArray = admins[0].admins;
  const membersFilteredArray = members.filter((member) => {
    return !adminsArray.includes(member.user_id);
  });

  const adminsFilteredArray = members.filter((member) => {
    return adminsArray.includes(member.user_id);
  });
  // console.log(membersFilteredArray, adminsFilteredArray);
  members = { membersFilteredArray, adminsFilteredArray, members };
  return members;
}

export async function getAdmins(group) {
  let { data, error } = await supabase
    .from("group")
    .select("*")
    .eq("group_name", group);
  if (error) throw new Error(error);
  // console.log("admins: ", data[0].admins);
  return data;
}

export async function updateMember({ memberId, userId }) {
  let { data, error } = await supabase
    .from("group members")
    .update({
      status: "approved",
      is_member: true,
      approved_by: userId,
      approval_date: date,
    })
    .eq("id", memberId)
    .select();

  if (error) throw new Error(error);
  //   console.log(data);
  return data;
}

export async function rejectMember({ memberId, userId }) {
  // console.log(memberId, userId);
  let { data, error } = await supabase
    .from("group members")
    .update({
      status: "rejected",
      approved_by: userId,
      approval_date: date,
    })
    .eq("id", memberId)
    .select();

  if (error) throw new Error(error);
  //   console.log(data);
  return data;
}
