import { useMutation } from "@tanstack/react-query";
import { rejectMember as reject } from "../../services/apiMembers";

export function useRejectMember() {
  const {
    mutate: rejectMember,
    isLoading: isRejectingMember,
    isSuccess: isRejectMemberSucess,
    isError,
  } = useMutation({
    mutationFn: reject,
  });

  return { rejectMember, isRejectingMember, isRejectMemberSucess };
}
