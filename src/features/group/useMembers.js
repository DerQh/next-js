import { useQuery } from "@tanstack/react-query";
import { getAdmins, getMembers } from "../../services/apiMembers";

export function useMembers() {
  const group = JSON.parse(localStorage.getItem("group"));
  const {
    isLoading,
    data: members,
    error,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ["members", group],
    queryFn: () => getMembers(group),
    enabled: false,
  });

  return { isLoading, isSuccess, members, refetch };
}

export function useAdmins() {
  const group = JSON.parse(localStorage.getItem("group"));
  const {
    isLoading: isLoadinAdmin,
    data: admins,
    error: adminError,
  } = useQuery({
    queryKey: ["admins", group],
    queryFn: () => getAdmins(group),
    retry: false,
  });

  return { isLoadinAdmin, adminError, admins };
}
