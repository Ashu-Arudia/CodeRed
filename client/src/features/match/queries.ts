import { fetchQuestionApi } from "@/features/match/api";
import { useQuery } from "@tanstack/react-query";

interface SampleTestCase {
  test_cases_id: number;
  input: string;
  output: string;
}

interface Question {
  title: string;
  description: string;
  difficulty_level: "easy" | "medium" | "hard";
  topic_id: number;
  time_Limit: number;
  sample_test_cases: SampleTestCase[];
}
export const useFetchQuestion = (question_no: number, options?: any) =>
  useQuery<Question>({
    queryKey: ["Question", question_no],
    queryFn: () => fetchQuestionApi(question_no),
    enabled: !!question_no,
    ...options,
  });