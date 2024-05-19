import { useNavigate } from "react-router-dom";
import { insertTransaction } from "../../services/apiTransactions";
import { useMutation } from "@tanstack/react-query";

function useDepositTransaction() {
  const navigate = useNavigate();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: insertTransaction,
    onSuccess: () => {
      navigate(`/transactions`);
    },
  });

  return { mutate, isLoading, isSuccess };
}

export default useDepositTransaction;
