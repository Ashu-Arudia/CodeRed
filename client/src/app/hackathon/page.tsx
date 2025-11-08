"use client";
import React, { useState } from "react";

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
    <div className="w-full text-gray-100">
      {/* Hero / Featured area */}
      <div className="bg-gradient-to-r from-black/80 via-zinc-900 to-black/80 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold tracking-wide">
              Featured Hackathon
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              C++ Virtual Storm — Championship Finals
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="rounded-md border border-zinc-700 px-4 py-2 text-sm">
                240 Pts
              </div>
              <div className="rounded-md border border-zinc-700 px-4 py-2 text-sm">
                2,847 viewers
              </div>
              <div className="rounded-md border border-zinc-700 px-4 py-2 text-sm">
                2h 45m
              </div>
            </div>
            <div className="mt-6">
              <button className="px-5 py-2 rounded-md bg-amber-500 text-black font-semibold">
                Register
              </button>
            </div>
          </div>

          <div className="w-2/5 rounded-xl overflow-hidden relative">
            <div className="h-40 bg-gradient-to-br from-red-900 via-zinc-800 to-black flex items-center justify-center">
              {/* Placeholder for banner image or carousel */}
              <div className="text-center text-zinc-200">
                Banner / Carousel Area
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <input
            className="bg-zinc-900 px-4 py-2 rounded-md placeholder:text-zinc-500 outline-none"
            placeholder="Search hackathons, hosts or modes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            className="bg-zinc-900 px-3 py-2 rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="ranked">Ranked</option>
            <option value="casual">Casual</option>
            <option value="team">Team</option>
            <option value="algorithms">Algorithms</option>
          </select>

          <button
            className="px-4 py-2 rounded-md border border-zinc-700 text-sm"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
          >
            Reset
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-zinc-400 text-sm">Quick Match</div>
          <button
            className="px-4 py-2 rounded-md bg-red-600 text-white text-sm"
            onClick={() => alert("Quick-joining best open room...")}
          >
            Quick Join
          </button>
        </div>
      </div>

      {/* Rooms grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold tracking-tight">
                    {r.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    {r.mode} • Host: {r.host}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{r.prize}</div>
                  <div className="text-xs text-zinc-400">
                    {r.viewers} viewers
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 text-sm">
                <div className="px-3 py-1 bg-black/30 rounded-md">
                  {r.players}/{r.maxPlayers} players
                </div>
                <div className="px-3 py-1 bg-black/30 rounded-md">
                  {r.timeLeft}
                </div>
                <div
                  className={`px-3 py-1 rounded-md ${
                    r.status === "open" ? "bg-green-700/60" : "bg-red-700/50"
                  }`}
                >
                  {" "}
                  {r.status}
                </div>
              </div>

              <div className="mt-3 flex gap-2 flex-wrap">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-md border border-zinc-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="text-zinc-400 text-xs">Room ID: {r.id}</div>

              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-sm"
                  onClick={() => alert("Viewing details")}
                >
                  Details
                </button>
                <button
                  className="px-4 py-1 rounded-md bg-amber-500 text-black font-semibold"
                  onClick={() => alert(`Joining ${r.title}`)}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Create Button */}
      <button
        onClick={() => setShowCreate(true)}
        className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3"
        title="Create Hackathon"
      >
        + Create
      </button>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowCreate(false)}
          />
          <div className="relative z-10 w-[720px] max-w-[95%] bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-2xl font-bold mb-2">Create Hackathon</h3>
            <CreateForm
              onSubmit={createHackathon}
              loading={creating}
              onCancel={() => setShowCreate(false)}
            />
          </div>
        </div>
      )}
    </div>
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
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <input
          required
          className="bg-zinc-800 px-3 py-2 rounded-md"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
        />
        <input
          className="bg-zinc-800 px-3 py-2 rounded-md"
          placeholder="Mode (e.g. Ranked, Casual)"
          value={form.mode}
          onChange={(e) => setForm((s) => ({ ...s, mode: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <input
          className="bg-zinc-800 px-3 py-2 rounded-md"
          placeholder="Host"
          value={form.host}
          onChange={(e) => setForm((s) => ({ ...s, host: e.target.value }))}
        />
        <input
          className="bg-zinc-800 px-3 py-2 rounded-md"
          placeholder="Max Players"
          value={form.maxPlayers}
          onChange={(e) =>
            setForm((s) => ({ ...s, maxPlayers: e.target.value }))
          }
        />
        <input
          className="bg-zinc-800 px-3 py-2 rounded-md"
          placeholder="Prize"
          value={form.prize}
          onChange={(e) => setForm((s) => ({ ...s, prize: e.target.value }))}
        />
      </div>

      <input
        className="bg-zinc-800 px-3 py-2 rounded-md w-full"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={(e) => setForm((s) => ({ ...s, tags: e.target.value }))}
      />

      <div className="flex items-center justify-end gap-3">
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
