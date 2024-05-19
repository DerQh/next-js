import { useMutation } from "@tanstack/react-query";
import { updateMember as update } from "../../services/apiMembers";

export function useUpdateMember() {
  const {
    mutate: updateMember,
    isLoading: isUpdatingMember,
    isSuccess: isUpdateMemberSucess,
    isError,
  } = useMutation({
    mutationFn: update,
  });

  return { updateMember, isUpdatingMember, isUpdateMemberSucess };
}
