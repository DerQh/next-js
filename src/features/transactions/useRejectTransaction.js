import { useMutation } from "@tanstack/react-query";
import { rejectTransaction as reject } from "../../services/apiTransactions";

export function useRejectTransaction() {
  const {
    mutate: rejectTransaction,
    isLoading: isRejecting,
    isSuccess: isRejectSucess,
    isError,
  } = useMutation({
    mutationFn: reject,
  });

  return { rejectTransaction, isRejecting, isRejectSucess, isError };
}
