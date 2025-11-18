"use client";
import React, { useState } from "react";
import AnimatedList from "../../components/AnimatedList";

export default function HackathonLobby() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);

  const [rooms, setRooms] = useState([
    {
      id: "h-001",
      title: "C++ Virtual Storm",
      mode: "Championship Finals",
      host: "XUser",
      players: 12,
      maxPlayers: 16,
      prize: "240 Pts",
      viewers: 2847,
      timeLeft: "2h 45m",
      status: "open",
      tags: ["ranked", "algorithms"],
    },
    {
      id: "h-002",
      title: "Fastest Debugger",
      mode: "Qualifier",
      host: "Alice",
      players: 4,
      maxPlayers: 8,
      prize: "50 Pts",
      viewers: 312,
      timeLeft: "1h 10m",
      status: "open",
      tags: ["casual", "debugging"],
    },
    {
      id: "h-003",
      title: "2v2 Code Clash",
      mode: "Ranked Match",
      host: "Bob",
      players: 8,
      maxPlayers: 8,
      prize: "120 Pts",
      viewers: 198,
      timeLeft: "15m",
      status: "in-progress",
      tags: ["ranked", "team"],
    },
  ]);

  const items = [
    "1     Coding Squads      25/80",
    "2     Coding Squads      25/80",
    "3     Coding Squads      25/80",
    "4     Coding Squads      25/80",
    "5     Coding Squads      25/80",
    "6     Coding Squads      25/80",
    "7     Coding Squads      25/80",
    "8     Coding Squads      25/80",
    "9     Coding Squads      25/80",
    "10     Coding Squads      25/80",
  ];

  // Simple filter + search
  const filtered = rooms.filter((r) => {
    if (filter !== "all" && !r.tags.includes(filter)) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.mode.toLowerCase().includes(q) ||
      r.host.toLowerCase().includes(q)
    );
  });

  interface HackathonForm {
    title: string;
    mode: string;
    host: string;
    maxPlayers: string | number;
    prize: string;
    tags: string;
  }

  async function createHackathon(form : HackathonForm) {
    setCreating(true);
    try {
      // Example POST — change URL to your backend endpoint
      const payload = {
        title: form.title,
        mode: form.mode,
        host: form.host,
        maxPlayers: Number(form.maxPlayers) || 16,
        prize: form.prize,
        tags: form.tags.split(",").map((tag) => tag.trim()),
      };

      // Send JSON to backend
      await fetch("/api/hackathons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Optimistic UI: add to rooms
      setRooms((s) => [
        {
          id: `h-${Math.random().toString(36).slice(2, 7)}`,
          title: payload.title,
          mode: payload.mode,
          host: payload.host,
          players: 1,
          maxPlayers: payload.maxPlayers,
          prize: payload.prize,
          viewers: 0,
          timeLeft: "--",
          status: "open",
          tags: payload.tags,
        },
        ...s,
      ]);

      setShowCreate(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create hackathon — check console and your backend URL.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <>
      <div className="w-full bg-[#121111] h-full p-3 rounded-t-lg text-gray-100 flex flex-col ">
        {/* Controls */}
        <div className="flex items-center w-full mb-6">
          <div className="flex items-center gap-3 w-full">
            <input
              className="bg-zinc-900 flex-1 flex px-4 py-2 rounded-md text-lg placeholder:text-zinc-500 outline-none"
              placeholder="Search hackathons, hosts or modes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <select
              className="bg-zinc-900 px-4 py-3 rounded-md"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="ranked">Ranked</option>
              <option value="casual">Casual</option>
              <option value="team">Team</option>
              <option value="algorithms">Algorithms</option>
            </select>

            <div
              className="cursor-pointer  text-4xl flex px-3 rounded-md placeholder:text-zinc-500 outline-none"
              onClick={() => {
                setShowCreate(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-1 min-h-0 ">
          <AnimatedList
            items={items}
            onItemSelect={(item: String, index: Number) =>
              console.log(item, index)
            }
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={true}
          />
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex p-16">
          <div className="p-6 bg-zinc-600 rounded-lg w-full h-full">
            <CreateForm
              onSubmit={createHackathon}
              loading={creating}
              onCancel={() => setShowCreate(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

type CreateFormProps = {
  onSubmit: (form: {
    title: string;
    mode: string;
    host: string;
    maxPlayers: string | number;
    prize: string;
    tags: string;
  }) => void;
  loading: boolean;
  onCancel: () => void;
};

function CreateForm({ onSubmit, loading, onCancel }: CreateFormProps) {
  const [form, setForm] = useState({
    title: "",
    mode: "Casual",
    host: "You",
    maxPlayers: "8",
    prize: "0 Pts",
    tags: "casual",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4 h-full w-full  flex-col flex"
    >

      <input
        className="bg-zinc-800 px-3 py-2 rounded-md w-full flex"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={(e) => setForm((s) => ({ ...s, tags: e.target.value }))}
      />

      <div className="flex-1 flex items-end p-5 justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-zinc-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-md bg-amber-500 text-black font-semibold"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
}
