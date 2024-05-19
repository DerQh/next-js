import { useQuery } from "@tanstack/react-query";
import { groupApi } from "../../services/apiGroups";

export function useGroup() {
  const group = JSON.parse(localStorage.getItem("group"));
  const {
    isLoading: isLoadinGroup,
    data: groupData,
    isSuccess,
  } = useQuery({
    queryKey: ["singelGroup", group],
    queryFn: () => groupApi(group),
    retry: false,
  });

  return { isLoadinGroup, groupData, isSuccess };
}
