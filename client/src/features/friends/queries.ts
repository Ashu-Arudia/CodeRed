import { useQuery } from "@tanstack/react-query";
import { fetchFriends,fetchUserFriends } from "./api";

export const useFetchFriends = () =>
  useQuery({
    queryKey: ["Friends"],
    queryFn: fetchFriends,
  })

export const useFetchUserFriends = () => 
  useQuery({
    queryKey: ["UserFriends"],
    queryFn: fetchUserFriends,
  })
