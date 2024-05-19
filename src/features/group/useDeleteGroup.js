import { useMutation } from "@tanstack/react-query";
import {
  checkGroupDelete as apiCheckdelete,
  deleteGroup as deleteApi,
} from "../../services/apiGroupDelete";

export function useDeleteGroup() {
  const {
    mutate: deleteGroup,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: deleteApi,
    onSuccess: () => {},
  });
  return { isLoading, isSuccess, deleteGroup };
}

// check if goup is deleted
export function useCheckGroupDelete() {
  const {
    mutate: checkGroupDelete,
    isLoading: isLoadingCheck,
    isSuccess: isCheckSucess,
  } = useMutation({
    mutationFn: apiCheckdelete,
    onSuccess: () => {},
  });
  return { isLoadingCheck, isCheckSucess, checkGroupDelete };
}
