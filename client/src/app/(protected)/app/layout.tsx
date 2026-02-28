"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWebSocketStore } from "@/store/webSocketStore";
import Loader from "@/components/GameLoader";
import { useUserDetails } from "@/features/auth/queries";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const connect = useWebSocketStore((s) => s.connect);
  const disconnect = useWebSocketStore((s) => s.disconnect);

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useUserDetails();

  //check user is valid or not
  useEffect(() => {
    if (userError) {
      router.replace("/login");
    }
  }, [userError]);

  //if user valid then connect websokcet
  useEffect(() => {
    if (!userLoading) console.log("User: ", user);
    if (user && !userLoading) {
      connect();
    }
    if (!userLoading && !user)
    {
      router.replace("/login");
    }

    return () => {
      disconnect();
    };
  }, [user]);

  //if user not complete their user info then route to profile page
  useEffect(() => {
    if (!userLoading && user && user.profile_complete === false) {
      router.replace("/app/profile");
    }
  }, [userLoading, user]);

  if (userLoading) return <Loader />;

  return <>{children}</>;
}
