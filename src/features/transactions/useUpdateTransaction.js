import { useMutation } from "@tanstack/react-query";
import { updateTransaction as update } from "../../services/apiTransactions";

export function useUpdateTransaction() {
  const {
    mutate: updateTransaction,
    isLoading: isUpdating,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: update,
    onSuccess: (data) => {},
    onError: (error) => {},
  });

  return { updateTransaction, isUpdating, isSuccess, isError};
}
