import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOtherUserDetails } from "@/features/friends/api";
import { use } from "react";

export const useFetchOtherUserDetails = (setUserDetails : any) => {
  return useMutation({
    mutationFn: fetchOtherUserDetails,
    onSuccess: (data) => {
      setUserDetails(data)
      console.log("Other user details: ", data);
    }
      });
  }