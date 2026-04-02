import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

//GET
export const userDetails = async () => {
  const res = await axios.get(`${backendUrl}/api/v1/auth/me`, {
    withCredentials: true,
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return res.data;
}

export const send_Otp = async ({ email }: any) => {
  const res = await axios.post(
    `${backendUrl}/api/v2/auth/send-otp`,
    {},
    {
      params: { email },
      withCredentials: true,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }
  );
  return res.data;
};

//POST
export const completeProfile = async (formData: FormData) => {
  const res = await axios.post(
    `${backendUrl}/api/v1/auth/complete-profile`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )
}
export const Signup = async ({ email, password }: { email: string, password: string }) => {
  const res = await axios.post(
    `${backendUrl}/api/v1/auth/register`,
    { email, password },
    {
      withCredentials: true,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }
  );
};
export const Login = async ({
  email,
  password,
}: {
  email: string,
  password: string
}) => {
  const res = await axios.post(
    `${backendUrl}/api/v1/auth/login`,
    { email, password },
    {
      withCredentials: true,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }
  );
};
export const verify_Otp = async ({ email,otp} : {email : string, otp : string}) => {
  const res = await axios.post(
    `${backendUrl}/api/v2/auth/verify-otp`,
    {},
    {
      params: { email,otp },
      withCredentials: true,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }
  );
};
