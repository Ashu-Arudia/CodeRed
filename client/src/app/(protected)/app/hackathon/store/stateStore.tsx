import { create } from "zustand";

export type Room = {
  id: string,
  title: string,
  players: number,
  maxPlayers: number,
  viewers: number,
  timeLeft: string,
  status: "open" | "in-progress" | "closed",
  tags: string[],
  languages?: string[],
  durationMinutes?: number | null,
  hintAllowed?: boolean,
  minRank?: string | null,
  levels?: string[],
  description?: string,
  mode?: "Single" | "Duo" | "Squad",
  questionLevel?: "Easy" | "Medium" | "Hard" | "Legend",
  perQuestionTime?: number | null,
  numQuestions?: number | null,
  questionTypes?: string[],
};

export type HackathonForm = {
  title: string,
  description: string,
  tags: string,
  maxPlayers: number,
  durationMinutes?: number | null,
  minRank?: string | null,
  levels?: string[],
  languages: string[],
  hintAllowed?: boolean,
  mode?: "Single" | "Duo" | "Squad",
  questionLevel?: "Easy" | "Medium" | "Hard" | "Legend",
  perQuestionTime?: number | null,
  numQuestions?: number | null,
  questionTypes?: string[],
};

type HackathonState = {
  query: string,
  filter: string,
  showCreate: boolean,
  creating: boolean,
  rooms: Room[],

  // actions
  setQuery: (q: string) => void,
  setFilter: (f: string) => void,
  setShowCreate: (v: boolean) => void,
  setCreating: (v: boolean) => void,
  addRoom: (room: Room) => void,
  setRooms: (rooms: Room[]) => void,
};

export const useHackathonStore =
  create <
  HackathonState >
  ((set) => ({
    query: "",
    filter: "all",
    showCreate: false,
    creating: false,
    rooms: [
      {
        id: "h-001",
        title: "C++ Virtual Storm",
        players: 12,
        maxPlayers: 16,
        viewers: 2847,
        timeLeft: "2h 45m",
        status: "open",
        tags: ["ranked", "algorithms"],
        languages: ["C++"],
        durationMinutes: 50,
        hintAllowed: false,
        minRank: "Gold",
        levels: ["10-20"],
        description: "Championship style tournament focused on C++ algorithms.",
        mode: "Single",
        questionLevel: "Medium",
        perQuestionTime: 20,
        numQuestions: 3,
        questionTypes: ["DSA"],
      },
      {
        id: "h-002",
        title: "Fastest Debugger",
        players: 4,
        maxPlayers: 8,
        viewers: 312,
        timeLeft: "1h 10m",
        status: "open",
        tags: ["casual", "debugging"],
        languages: ["JavaScript"],
        durationMinutes: 15,
        hintAllowed: true,
        minRank: "Bronze",
        levels: ["<10"],
        description: "Quick debugging rounds for speed and finesse.",
        mode: "Duo",
        questionLevel: "Easy",
        perQuestionTime: 15,
        numQuestions: 2,
        questionTypes: ["Programming"],
      },
    ],

    setQuery: (query) => set({ query }),
    setFilter: (filter) => set({ filter }),
    setShowCreate: (showCreate) => set({ showCreate }),
    setCreating: (creating) => set({ creating }),
    addRoom: (room) =>
      set((state) => ({
        rooms: [room, ...state.rooms],
      })),
    setRooms: (rooms) => set({ rooms }),
  }));
