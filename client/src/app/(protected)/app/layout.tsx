"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/UserDetails";
import { useWebSocketStore } from "@/store/webSocketStore";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const connect = useWebSocketStore((s) => s.connect);
  const disconnect = useWebSocketStore((s) => s.disconnect);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/auth/me`, {
          withCredentials: true,
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        setUser(response.data);

        connect();

        setLoading(false);
      } catch (error) {
        router.push("/login");
      }
    };

    checkAuth();

    return () => {
      disconnect();
    };
  }, []);

  if (loading) return null;

  return <>{children}</>;
}
