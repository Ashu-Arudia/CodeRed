"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";

type WSContextType = {
  socket: WebSocket | null;
};

const WSContext = createContext<WSContextType>({ socket: null });

export const useWebSocket = () => useContext(WSContext);

export function WebSocketProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`ws://localhost:8000/ws?token=${token}`);

    socketRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WS message:", data);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [token]);

  return (
    <WSContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </WSContext.Provider>
  );
}
