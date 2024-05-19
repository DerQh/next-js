import { useQuery } from "@tanstack/react-query";
import { getTotal as apiTotal } from "../../services/apiTransactions";

export default function useGetTotal() {
  const group = JSON.parse(localStorage.getItem("group"));
  
  const {
    data: getTotal,
    isLoading: isLoadingTotal,
    refetch: refetchTotal,
  } = useQuery({
    queryKey: ["total", group],
    queryFn: () => apiTotal(group),
    enabled: false,
  });

  return { getTotal, isLoadingTotal, refetchTotal };
}
