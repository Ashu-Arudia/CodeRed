"use client";

import { create } from "zustand";

type WSEvent = {
  type: string;
  payload?: any;
};

type Opponent = {
  id: number;
  username: string;
  avatar?: string;
  rank: string;
};

type SubmissionResult = {
  submission_id: number | null;
  passed: boolean | null;
  problem_id: number | null;
  verdict: string;
  execution_time: number;
  memory_used: number;
  output_mismatch: string | null;
  stderr: string | null;
  test_cases_passed: number;
  total_test_cases: number;
  time_complexity: string | null;
  space_complexity: string | null;
  source_code: string | null;
};

type MatchResult = {
  results: SubmissionResult[];
  winner_id: number;
  losser_id: number;
  reason: string;
};

interface WebSocketState {
  socket: WebSocket | null;
  connected: boolean;
  reconnectAttempts: number;
  manualClose: boolean;
  matchSource: "found" | "resume" | null;

  matchId: string | null;
  question_no: number;

  pendingEvents: WSEvent[];

  opponent_info: Opponent | null;
  matchResult: MatchResult | null;
  playerSubmit: Boolean;
  setPlayerSubmit: () => void;
  setMatchEnd: () => void;

  connect: () => void;
  disconnect: () => void;
  sendEvent: (event: WSEvent) => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  socket: null,
  connected: false,
  reconnectAttempts: 0,
  manualClose: false,
  matchSource: null,
  playerSubmit:false,
  matchId: null,
  question_no:-1,

  pendingEvents: [],
  opponent_info: null,
  matchResult: null,

  setPlayerSubmit: () => {
    set({
      playerSubmit:true
    })
  },

  setMatchEnd: () => {
    if (typeof window === "undefined") return;
    set({
      matchId: null,
      question_no: -1,
      opponent_info: null,
      matchSource: null,
    });
  },

  connect: () => {
    if (typeof window === "undefined") return;

    const existing = get().socket;

    if (
      existing &&
      (existing.readyState === WebSocket.OPEN ||
        existing.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_API_URL}/ws`);

    let pingInterval: NodeJS.Timeout;
    let pongTimeout: NodeJS.Timeout;

    ws.onopen = () => {
      console.log("WebSocket Connected");

      // flush queued events
      get().pendingEvents.forEach((event) => {
        ws.send(JSON.stringify(event));
      });

      set({
        connected: true,
        reconnectAttempts: 0,
        pendingEvents: [],
        manualClose: false,
      });

      // heartbeat
      pingInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: "ping" }));

          clearTimeout(pongTimeout);

          pongTimeout = setTimeout(() => {
            console.warn("Pong not received. Closing socket.");
            ws.close();
          }, 5000);
        }
      }, 10000);
    };

    ws.onmessage = (event) => {
      const data: WSEvent = JSON.parse(event.data);

      switch (data.type) {
        case "authenticated":
          console.log("Authenticated socket");
          break;

        case "match_found":
          set({
            matchId: data.payload.match_id,
            matchSource: data.payload.matchSource,
            question_no: data.payload?.question_no,
            opponent_info: {
              id: data.payload?.opponent?.id,
              username: data.payload?.opponent?.username,
              avatar: data.payload?.opponent?.avatar,
              rank: data.payload?.opponent?.rank,
            },
          });
          break;

        case "player_submit":
          console.log("Player has submitted!!:  ",data.payload?.player_submit)
          set({
            playerSubmit: data.payload?.player_submit
          })
          break;

        case "resume_match":
          console.log("resume match found:: ",data.payload)
          set({
            matchId: data.payload?.match_id,
            matchSource: data.payload?.matchSource,
            question_no: data.payload?.question_no,
            playerSubmit: (data.payload?.player1_submit || data.payload?.player2_submit),
            opponent_info: {
              id: data.payload?.opponent?.id,
              username: data.payload?.opponent?.username,
              avatar: data.payload?.opponent?.avatar,
              rank: data.payload?.opponent?.rank,
            },
          });
          break

        case "resume_match_not_found":
          set({
            matchId: null,
            opponent_info: null,
            matchSource: null
          });
          break;

        case "match_end":
          console.log("match end here:: ",data)
          set({
            matchResult: data.payload,
            matchId: null,
            opponent_info: null,
            matchSource: null,
          });
          break;

        case "submit_successful":
          console.log("Submit successful!!")
          set({
            matchId: null,
            opponent_info: null,
            matchSource: null
           });
          break;

        case "opponent_submitted":
          console.log("Opponent has submitted!!")
          break;

        case "opponent_progress":
          console.log("Opponent progress:", data.payload.progress);
          break;

        case "pong":
          if (pongTimeout) clearTimeout(pongTimeout);
          break;

        default:
          console.warn("Unknown WS event:", data.type);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");

      clearInterval(pingInterval);
      clearTimeout(pongTimeout);

      set({
        socket: null,
        connected: false,
      });

      if (get().manualClose) return;

      const attempts = get().reconnectAttempts + 1;

      if (attempts > 10) {
        console.error("Max reconnect attempts reached");
        return;
      }

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

    set({ manualClose: true });

    socket?.close();

    set({
      socket: null,
      connected: false,
      reconnectAttempts: 0,
    });
  },

  sendEvent: (event: WSEvent) => {
    const socket = get().socket;

    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(event));
    } else {
      set((state) => ({
        pendingEvents: [...state.pendingEvents, event],
      }));
    }
  },
}));
