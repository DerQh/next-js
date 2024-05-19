import { useQuery } from "@tanstack/react-query";
import {
  getTransaction,
  getTransactions,
  getUserTransaction,
} from "../../services/apiTransactions";
import { useParams } from "react-router-dom";
import useUser from "../authentification/useUser";

function useTransaction() {
  const group = JSON.parse(localStorage.getItem("group"));
  const {
    data: transactions,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ["transactions", group],
    queryFn: () => getTransactions(group),
    enabled: false,
  });

  return { transactions, isLoading, refetch, isSuccess };
}

// test for real data , abiove //

export function useTransactionTest() {
  const group = JSON.parse(localStorage.getItem("group"));
  const {
    data: transaction,
    isLoading,
    // refetch,
    isSuccess,
  } = useQuery({
    queryKey: ["transactions", group],
    queryFn: () => getTransactions(group),
    // enabled: false,
  });

  return { transaction, isLoading, refetch, isSuccess };
}

export function useGetTransaction() {
  const { id } = useParams();
  const { data: transactionfn, isLoading } = useQuery({
    queryKey: ["transaction", id], // the ID helps in refetching the data thus creating a new data on each call
    queryFn: () => getTransaction(id),
  });

  return { transactionfn, isLoading };
}

export function useUserTransactions() {
  const { user } = useUser();
  const { data: getUserTransactions, isLoading } = useQuery({
    queryKey: ["userTransactions"],
    queryFn: () => getUserTransaction(user.id),
  });

  return { getUserTransactions, isLoading };
}
export default useTransaction;
