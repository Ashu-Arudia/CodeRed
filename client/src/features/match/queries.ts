import { fetchQuestionApi } from "@/features/match/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchQuestion = () =>
  useQuery({
    queryKey: ["Question"],
    queryFn: fetchQuestionApi
  })