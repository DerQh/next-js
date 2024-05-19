import { useMutation } from "@tanstack/react-query";
import { exitGroup as exitApi } from "../../services/apiGroupDelete";

export function useExitGroup() {
  const {
    mutate: exitGroup,
    isLoading: isExiting,
    isSuccess: isExitSucess,
  } = useMutation({
    mutationFn: exitApi,
    onSuccess: () => {},
  });
  return { isExitSucess, isExiting, exitGroup };
}
