import { useMutation } from "@tanstack/react-query";
import { addUser, createGroupApi } from "../../services/apiGroups";
import { joinGroupApi } from "../../services/apiJoinGroup";

// -------------------------------------------- CREATE GROUP
export function useCreateGroup() {
  const {
    mutate: createGroup,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: createGroupApi,
  });

  return { createGroup, isLoading, isSuccess };
}

// ------------------------------------------- JOIN GROUP
export function useJoinGroup() {
  const {
    mutate: joinGroup,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: joinGroupApi,
  });

  return { joinGroup, isLoading, isSuccess };
}

// ------------------------------------------- ADD USER TO  TABLE
export function useAddUserToTable() {
  const { mutate, isLoading } = useMutation({
    mutationFn: addUser,
  });

  return { mutate, isLoading };
}
