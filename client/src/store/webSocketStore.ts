"use client";

import { create } from "zustand";

type WSEvent = {
  type: string;
  match_id?: string;
  payload?: any;
};

interface WebSocketState {
  socket: WebSocket | null;
  connected: boolean;
  reconnectAttempts: number;
  matchId: string | null;
  pendingEvents: WSEvent[];

  connect: () => void;
  disconnect: () => void;
  sendEvent: (event: WSEvent) => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  socket: null,
  connected: false,
  reconnectAttempts: 0,
  matchId: null,
  pendingEvents: [],

  connect: () => {
    if (typeof window === "undefined") return;
    if (get().socket) return;

    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/ws`);

    ws.onopen = () => {
      console.log("WebSocket Connected");

      get().pendingEvents.forEach((event) => {
        ws.send(JSON.stringify(event));
      });

      set({
        connected: true,
        reconnectAttempts: 0,
        pendingEvents: [],
      });

      ws.send(JSON.stringify({ type: "resume_request" }));
    };

    ws.onmessage = (event) => {
      const data: WSEvent = JSON.parse(event.data);

      switch (data.type) {
        case "match_found":
          set({ matchId: data.payload.match_id });
          break;

        case "match_resume":
          set({ matchId: data.payload.match_id });
          break;

        case "match_end":
          set({ matchId: null });
          break;

        case "opponent_progress":
          console.log("Opponent progress:", data.payload);
          break;

        default:
          console.warn("Unknown WS event:", data.type);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");

      set({ socket: null, connected: false });

      const attempts = get().reconnectAttempts + 1;
      const delay = Math.min(1000 * 2 ** attempts, 10000); 

      set({ reconnectAttempts: attempts });

      setTimeout(() => {
        console.log("Attempting reconnect...");
        get().connect();
      }, delay);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      ws.close();
    };

    set({ socket: ws });
  },

  disconnect: () => {
    const socket = get().socket;
    socket?.close();
    set({
      socket: null,
      connected: false,
      reconnectAttempts: 0,
    });
  },

  sendEvent: (event: WSEvent) => {
    const socket = get().socket;

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(event));
    } else {
      set((state) => ({
        pendingEvents: [...state.pendingEvents, event],
      }));
    }
  },
}));
