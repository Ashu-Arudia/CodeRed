import { useQuery } from "@tanstack/react-query";
import { userDetails } from "./api";

export const useUserDetails = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: userDetails,
  });
