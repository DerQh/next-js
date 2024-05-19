import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const navigate = useNavigate();
  // useMutation in React (creating, updating and deleting data )
  const { mutate: signup, isloading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      // console.log(data);
      toast("Account sucessfully created !");
      navigate("/login");
    },
  });

  return { signup, isloading };
}
