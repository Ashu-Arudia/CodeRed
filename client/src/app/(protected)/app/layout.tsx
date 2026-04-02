"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWebSocketStore } from "@/store/webSocketStore";
import Loader from "@/components/GameLoader";
import { useUserDetails } from "@/features/auth/queries";
import ResumeMatchModal from "@/components/resume_match/resume_match";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const connect = useWebSocketStore((s) => s.connect);
  const sendEvent = useWebSocketStore((s) => s.sendEvent);
  const connected = useWebSocketStore((s) => s.connected);
  const disconnect = useWebSocketStore((s) => s.disconnect);

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useUserDetails();

  //check user is valid or not
  useEffect(() => {
    if (userError) {
      console.log("User error in login page")
      router.replace("/login");
    }
  }, [userError,router]);

  //if user valid then connect websocket
  useEffect(() => {
    if (user && !userLoading) {
      connect();
    }
  }, [user, userLoading]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (connected) {
      sendEvent({ type: "resume_match" });
    }
  }, [connected,router]);

  //if user not complete their user info then route to profile page
  useEffect(() => {
    if (!userLoading && user && user.profile_complete === false) {
      router.replace("/app/profile");
    }
  }, [userLoading, user]);

  if (userLoading) return <Loader />;

  return (
    <>
      <ResumeMatchModal />
      {children}
    </>
  );
}
