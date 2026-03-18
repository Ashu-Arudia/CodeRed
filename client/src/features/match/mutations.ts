import { runCodeApi,submitCodeApi } from "@/features/match/api";
import { useMutation } from "@tanstack/react-query";

export const useRunCodeMutation = (setResult: any) => {
  return useMutation({
    mutationFn: runCodeApi,

    onSuccess: (data) => {
      console.log("Result from backend:", data);
      setResult(data.results);
    },
  });
};
export const useSubmitCodeMutation = (setResult: any) => {
  return useMutation({
    mutationFn: submitCodeApi,

    onSuccess: (data) => {
      console.log("Result from submit backend:", data);
      setResult(data);
    },
  });
};