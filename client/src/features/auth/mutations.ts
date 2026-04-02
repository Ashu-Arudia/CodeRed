import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { completeProfile , Signup, Login, verify_Otp, send_Otp} from "./api";

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

export const useVerifyOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verify_Otp
  });
}
export const useSendOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : send_Otp
  })
}
