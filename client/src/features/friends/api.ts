import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

//GET
export const fetchFriends = async () => {
  const res = await axios.get(`${backendUrl}/api/v1/friends/add-friend`, {
    withCredentials: true,
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return res.data;
}
export const fetchUserFriends = async () => {
  const res = await axios.get(`${backendUrl}/api/v1/friends/friendlist`, {
    withCredentials: true,
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return res.data;
}

// //POST
// export const completeProfile = async (formData: FormData) => {
//   console.log("Formdata: ",formData);
//   const res = await axios.post(
//     `${backendUrl}/api/v1/auth/complete-profile`,
//     formData,
//     {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   )
// }