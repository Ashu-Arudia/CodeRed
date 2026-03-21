import axios from 'axios'
const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export const runCodeApi = async ({
  source_code,
  language_id,
  problem_id,
}: any) => {
  const res = await axios.post(
    `${backendUrl}/api/v2/execution/run`,
    {
      source_code,
      language_id,
      problem_id,
    },
    {
      withCredentials: true,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }
  );
  return res.data;
};
export const submitCodeApi = async ({
  source_code,
  language_id,
  problem_id,
  match_id
}: any) => {
  const res = await axios.post(
    `${backendUrl}/api/v2/execution/submit`,
    {
      source_code,
      language_id,
      problem_id,
      match_id
    },
    {
      withCredentials: true,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }
  );
  return res.data;
};

export const fetchQuestionApi = async (question_no : number) => {
  const res = await axios.get(`${backendUrl}/api/v1/problems/${question_no}`, {
    withCredentials: true,
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return res.data;
}