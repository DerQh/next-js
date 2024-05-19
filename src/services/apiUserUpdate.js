import supabase, { supabaseUrl } from "./supabase";

export async function updateUser({ file, user_Id }) {
  // --------- 1. Update/ Upload the avatar image

  const fileName = `avatar-${user_Id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);
  if (storageError) throw new Error(storageError.message);

  // ------- 2. Use the avatar to update the user image

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);

  const newUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

  // ------- 3. Use the avatar to update the member  image
  let { data: memberData, error: memberError } = await supabase
    .from("group members")
    .update({
      profile_url: newUrl,
    })
    .eq("user_id", user_Id)
    .select("*");

  // ------- 4. Use the avatar to update all transaction
  let { data: transactioUpdate, error: transactionUpdateError } = await supabase
    .from("transactions")
    .update({
      profileUrl: newUrl,
    })
    .eq("user_id", user_Id)
    .select("*");
  if (transactionUpdateError) throw new Error(transactionUpdateError.message);
  return newUrl;
}

export async function updateMetadata({ firstName, lastName }) {
  //------------1.  update the other use details , name
  const { data, error } = await supabase.auth.updateUser({
    data: {
      firstName: firstName,
      lastName: lastName,
    },
  });
  if (error) throw new Error(error.message);
  return data;
}
