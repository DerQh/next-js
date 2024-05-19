import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LogInApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import supabase from "../../services/supabase";

export function useLogIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => LogInApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("LOG IN SUCESS!");

      navigate("/group");
    },
    onError: (err) => {
      console.log(err);
      toast.error("There is an issue logggig in !");
    },
  });
  return { login, isLoading };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null; // means there is no user from supabase
  const { data, error } = await supabase.auth.getUser();
  // console.log(data.user);
  if (error) throw new Error(error.message);
  return data?.user;
}
