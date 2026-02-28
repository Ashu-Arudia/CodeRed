import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { completeProfile , Signup, Login} from "./api";

export const useCompleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: Signup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: Login,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
