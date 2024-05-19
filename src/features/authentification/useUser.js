import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./useLogIn";

function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });


  return { user, isLoading, isAuthenticated: user?.aud === "authenticated" };
}

export default useUser;
