import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMetadata, updateUser } from "../../services/apiUserUpdate";
import { toast } from "react-toastify";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: isUpdating,
    mutate: updateCurrentUser,
    isSuccess,
  } = useMutation({
    mutationFn: updateUser,
    onSuccess: ({ user }) => {
      toast.success("User Account Sucessfully updated");
      queryClient.setQueryData(["userUpdate"], user);
      queryClient.invalidateQueries({
        queryKey: ["userUpdate"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCurrentUser, isUpdating, isSuccess, data };
}

export function useUpdateMeta() {
  const { isLoading: isUpdatinMeta, mutate: upDateMetadata } = useMutation({
    mutationFn: updateMetadata,
    onSuccess: () => {
      toast.success("User Account Sucessfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { upDateMetadata, isUpdatinMeta };
}
