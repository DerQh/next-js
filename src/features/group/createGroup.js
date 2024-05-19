import supabase from "../../services/supabase";
import { toast } from "react-toastify";

export default async function createGroupApi(groupName) {
  const { data: existingGroups, error } = await supabase
    .from("user_groups")
    .select("group_name")
    .eq("group_name", groupName);

  if (error) throw new Error(error.message);

  return data;
}
