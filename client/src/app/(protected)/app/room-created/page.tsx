"use client";
import React, { useState } from "react";

// Single-file demo page: create tournaments and open tournament lobby view (no routing required)
// Drop this file into a Next.js / React app and render it (e.g. pages/demo.tsx or app/demo/page.tsx)

type Tournament = {
  id: string;
  title: string;
  description?: string;
  maxPlayers: number;
  tags: string[];
  languages: string[];
  durationMinutes?: number | null;
  hintAllowed?: boolean;
  minRank?: string | null;
  levels?: string[];
  mode?: "Single" | "Duo" | "Squad";
  questionLevel?: string | null;
  perQuestionTime?: number | null;
  numQuestions?: number | null;
  questionTypes?: string[];
};

export default function TournamentSinglePageDemo() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [openTournamentId, setOpenTournamentId] = useState<string | null>(null);

  // simple create form state (keeps UI compact)
  const emptyForm: Partial<Tournament> = {
    title: "",
    description: "",
    tags: ["casual"],
    maxPlayers: 20,
    languages: ["JavaScript"],
    durationMinutes: 15,
    hintAllowed: false,
    minRank: "Bronze",
    levels: ["<10"],
    mode: "Single",
    questionLevel: "Medium",
    perQuestionTime: 15,
    numQuestions: 1,
    questionTypes: ["DSA"],
  };

  const [form, setForm] = useState<Partial<Tournament>>(emptyForm);

  function resetForm() {
    setForm({ ...emptyForm });
  }

  function createDemoTournament() {
    setCreating(true);
    setTimeout(() => {
      const id = `t-${Math.random().toString(36).slice(2, 8)}`;
      const newT: Tournament = {
        id,
        title: form.title?.trim() || `Untitled ${tournaments.length + 1}`,
        description: form.description || "",
        maxPlayers: form.maxPlayers || 20,
        tags: (form.tags && form.tags.length
          ? form.tags
          : ["casual"]) as string[],
        languages: (form.languages && form.languages.length
          ? form.languages
          : ["JavaScript"]) as string[],
        durationMinutes: form.durationMinutes ?? 15,
        hintAllowed: form.hintAllowed ?? false,
        minRank: form.minRank ?? "Bronze",
        levels: (form.levels && form.levels.length
          ? form.levels
          : ["<10"]) as string[],
        mode: (form.mode as any) || "Single",
        questionLevel: form.questionLevel ?? "Medium",
        perQuestionTime: form.perQuestionTime ?? 15,
        numQuestions: form.numQuestions ?? 1,
        questionTypes: (form.questionTypes && form.questionTypes.length
          ? form.questionTypes
          : ["DSA"]) as string[],
      };
      setTournaments((s) => [newT, ...s]);
      setCreating(false);
      setShowCreate(false);
      resetForm();
      // open the tournament view to demo
      setOpenTournamentId(id);
    }, 450);
  }

  // Demo seats tracking (client-only)
  const [occupiedSeatsMap, setOccupiedSeatsMap] = useState<
    Record<string, boolean[]>
  >({});

  function getSeatsFor(t: Tournament) {
    if (!occupiedSeatsMap[t.id]) {
      const arr = new Array(t.maxPlayers).fill(false);
      // occupy a few seats for demo
      for (let i = 0; i < Math.min(3, t.maxPlayers); i++) arr[i] = true;
      setOccupiedSeatsMap((s) => ({ ...s, [t.id]: arr }));
      return arr;
    }
    return occupiedSeatsMap[t.id];
  }

  function joinSeat(tid: string, idx: number) {
    setOccupiedSeatsMap((s) => {
      const copy = { ...s };
      const arr = copy[tid] ? [...copy[tid]] : [];
      if (!arr[idx]) arr[idx] = true;
      copy[tid] = arr;
      return copy;
    });
  }

  // small UI helpers
  const langOptions = [
    "JavaScript",
    "TypeScript",
    "Python",
    "C++",
    "Java",
    "Go",
    "Rust",
  ];
  const levelBuckets = ["<10", "10-20", "20-30", ">30"];
  const durations = [15, 20, 50, 60, 90, 120];
  const playerOptions = [20, 30, 40, 50];
  const rankOptions = [
    "Bronze",
    "Silver",
    "Gold",
    "Grandmaster",
    "CodeRed Champion",
  ];

  return (
    <div className="p-6 min-h-screen bg-[#0b0b0d] text-white">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Code Red — Tournament Demo</h1>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded bg-emerald-500 text-black"
              onClick={() => {
                setShowCreate(true);
              }}
            >
              Create Tournament
            </button>
            <button
              className="px-4 py-2 rounded border"
              onClick={() => {
                setTournaments(sampleData());
                setOpenTournamentId(null);
              }}
            >
              Load Sample
            </button>
          </div>
        </header>

        {/* Lobby */}
        {!openTournamentId && (
          <div>
            {tournaments.length === 0 ? (
              <div className="p-8 bg-zinc-900 rounded">
                No tournaments yet. Click Create Tournament to try the demo.
              </div>
            ) : (
              <div className="grid gap-4">
                {tournaments.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 bg-zinc-900 rounded flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold">{t.title}</div>
                      <div className="text-sm text-zinc-400">
                        {t.tags.join(", ")} • {t.languages.join(", ")}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-zinc-300">
                        {t.maxPlayers} seats
                      </div>
                      <button
                        className="px-3 py-1 rounded bg-amber-500 text-black"
                        onClick={() => setOpenTournamentId(t.id)}
                      >
                        Open
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Create modal */}
        {showCreate && (
          <div className="fixed inset-0 z-40 flex items-start justify-center p-8">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setShowCreate(false)}
            />
            <div className="relative z-50 w-full max-w-3xl bg-zinc-900 p-6 rounded shadow-lg">
              <h2 className="text-lg font-semibold mb-3">Create Tournament</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-zinc-400">Title</label>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, title: e.target.value }))
                    }
                    className="w-full bg-zinc-800 px-3 py-2 rounded mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-zinc-400">Players</label>
                  <select
                    value={form.maxPlayers}
                    onChange={(e) =>
                      setForm((s) => ({
                        ...s,
                        maxPlayers: Number(e.target.value),
                      }))
                    }
                    className="w-full bg-zinc-800 px-3 py-2 rounded mt-1"
                  >
                    {playerOptions.map((p) => (
                      <option key={p} value={p}>
                        {p} players
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label className="text-sm text-zinc-400">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, description: e.target.value }))
                  }
                  className="w-full bg-zinc-800 px-3 py-2 rounded mt-1 min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 mt-3">
                <div>
                  <label className="text-sm text-zinc-400">Duration</label>
                  <select
                    value={form.durationMinutes?? ""}
                    onChange={(e) =>
                      setForm((s) => ({
                        ...s,
                        durationMinutes: Number(e.target.value),
                      }))
                    }
                    className="w-full bg-zinc-800 px-3 py-2 rounded mt-1"
                  >
                    {durations.map((d) => (
                      <option key={d} value={d}>
                        {d} min
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-zinc-400">Minimum rank</label>
                  <select
                    value={form.minRank ?? ""}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, minRank: e.target.value }))
                    }
                    className="w-full bg-zinc-800 px-3 py-2 rounded mt-1"
                  >
                    {rankOptions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-zinc-400">Mode</label>
                  <select
                    value={form.mode}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, mode: e.target.value as any }))
                    }
                    className="w-full bg-zinc-800 px-3 py-2 rounded mt-1"
                  >
                    {["Single", "Duo", "Squad"].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label className="text-sm text-zinc-400">
                  Languages (multi)
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {langOptions.map((l) => {
                    const active = (form.languages || []).includes(l);
                    return (
                      <button
                        key={l}
                        type="button"
                        onClick={() =>
                          setForm((s) => ({
                            ...s,
                            languages: toggle(s.languages || [], l),
                          }))
                        }
                        className={`px-3 py-1 rounded border ${
                          active ? "bg-amber-400 text-black" : "border-zinc-700"
                        }`}
                      >
                        {l}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded border"
                  onClick={() => {
                    setShowCreate(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-amber-500 text-black"
                  onClick={createDemoTournament}
                  disabled={creating}
                >
                  {creating ? "Creating..." : "Create & Open"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tournament view (single page) */}
        {openTournamentId && (
          <TournamentView
            tournament={tournaments.find((x) => x.id === openTournamentId)!}
            seats={getSeatsFor(
              tournaments.find((x) => x.id === openTournamentId)!
            )}
            onJoin={(idx) => joinSeat(openTournamentId, idx)}
            onBack={() => setOpenTournamentId(null)}
          />
        )}
      </div>
    </div>
  );
}

function toggle<T>(arr: T[], v: T) {
  if (!arr) return [v];
  if (arr.includes(v)) return arr.filter((x) => x !== v);
  return [...arr, v];
}

function sampleData(): Tournament[] {
  return [
    {
      id: "t-demo-1",
      title: "C++ Virtual Storm",
      description: "Championship style tournament focused on C++ algorithms.",
      maxPlayers: 20,
      tags: ["ranked", "algorithms"],
      languages: ["C++"],
      durationMinutes: 50,
      hintAllowed: false,
      minRank: "Gold",
      levels: ["10-20"],
      mode: "Single",
      questionLevel: "Medium",
      perQuestionTime: 20,
      numQuestions: 3,
      questionTypes: ["DSA"],
    },
    {
      id: "t-demo-2",
      title: "Fastest Debugger",
      description: "Quick debugging rounds for speed and finesse.",
      maxPlayers: 20,
      tags: ["casual", "debugging"],
      languages: ["JavaScript"],
      durationMinutes: 15,
      hintAllowed: true,
      minRank: "Bronze",
      levels: ["<10"],
      mode: "Duo",
      questionLevel: "Easy",
      perQuestionTime: 15,
      numQuestions: 2,
      questionTypes: ["Programming"],
    },
  ];
}

function TournamentView({
  tournament,
  seats,
  onJoin,
  onBack,
}: {
  tournament: Tournament;
  seats: boolean[];
  onJoin: (i: number) => void;
  onBack: () => void;
}) {
  if (!tournament) return null;
  const occupied = seats.filter(Boolean).length;
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{tournament.title}</h2>
          <div className="text-sm text-zinc-400">
            Room ID: <span className="font-mono">{tournament.id}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-zinc-300">Players</div>
          <div className="text-lg font-semibold">
            {occupied}/{tournament.maxPlayers}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 bg-zinc-900 p-4 rounded">
          <h3 className="font-semibold">Description</h3>
          <p className="text-zinc-300 mt-2 whitespace-pre-wrap">
            {tournament.description}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-zinc-400">
            <div>
              Mode: <span className="text-white ml-2">{tournament.mode}</span>
            </div>
            <div>
              Duration:{" "}
              <span className="text-white ml-2">
                {tournament.durationMinutes} min
              </span>
            </div>
            <div>
              Min Rank:{" "}
              <span className="text-white ml-2">{tournament.minRank}</span>
            </div>
            <div>
              Question level:{" "}
              <span className="text-white ml-2">
                {tournament.questionLevel}
              </span>
            </div>
            <div>
              Per question:{" "}
              <span className="text-white ml-2">
                {tournament.perQuestionTime} min
              </span>
            </div>
            <div>
              Question types:{" "}
              <span className="text-white ml-2">
                {(tournament.questionTypes || []).join(", ")}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 p-4 rounded">
          <h4 className="font-semibold">Seats</h4>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {seats.map((occ, i) => (
              <div
                key={i}
                className={`p-2 rounded text-center ${
                  occ
                    ? "bg-emerald-500 text-black"
                    : "bg-zinc-800 text-zinc-200"
                }`}
              >
                <div className="font-mono">#{i + 1}</div>
                <div className="text-xs mt-1">{occ ? "Taken" : "Open"}</div>
                {!occ && (
                  <button
                    className="mt-2 text-xs px-2 py-1 rounded bg-amber-500 text-black"
                    onClick={() => onJoin(i)}
                  >
                    Join
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-zinc-400">
            Share Room ID:{" "}
            <span className="font-mono text-white">{tournament.id}</span>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={onBack} className="px-3 py-2 rounded border">
              Back to lobby
            </button>
            <button className="px-3 py-2 rounded bg-emerald-500 text-black">
              Start (demo)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
