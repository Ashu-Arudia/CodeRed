"use client";
import React, { useState } from "react";
import AnimatedList from "../../components/AnimatedList";

type Room = {
  id: string;
  title: string;
  players: number;
  maxPlayers: number;
  viewers: number;
  timeLeft: string;
  status: "open" | "in-progress" | "closed";
  tags: string[];
  languages?: string[];
  durationMinutes?: number | null;
  hintAllowed?: boolean;
  minRank?: string | null;
  levels?: string[]; // multi-select buckets like "<10", "10-20"
  description?: string;
  // settings
  mode?: "Single" | "Duo" | "Squad";
  questionLevel?: "Easy" | "Medium" | "Hard" | "Legend";
  perQuestionTime?: number | null;
  numQuestions?: number | null;
  questionTypes?: string[];
};

export default function HackathonLobby() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);

  const [rooms, setRooms] = useState<Room[]>([
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
      (r.description || "").toLowerCase().includes(q)
    );
  });

  // Form shape
  type HackathonForm = {
    title: string;
    description: string;
    tags: string;
    maxPlayers: number;
    durationMinutes?: number | null;
    minRank?: string | null;
    levels?: string[]; // multi-select

    // settings moved here
    languages: string[];
    hintAllowed?: boolean;
    mode?: "Single" | "Duo" | "Squad";

    // settings tab (existing)
    questionLevel?: "Easy" | "Medium" | "Hard" | "Legend";
    perQuestionTime?: number | null;
    numQuestions?: number | null;
    questionTypes?: string[];
  };

  async function createHackathon(form: HackathonForm) {
    setCreating(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        maxPlayers: Number(form.maxPlayers) || 20,
        languages: form.languages,
        durationMinutes: form.durationMinutes ?? null,
        hintAllowed: !!form.hintAllowed,
        minRank: form.minRank ?? null,
        levels: form.levels ?? [],
        mode: form.mode ?? "Single",
        questionLevel: form.questionLevel ?? null,
        perQuestionTime: form.perQuestionTime ?? null,
        numQuestions: form.numQuestions ?? null,
        questionTypes: form.questionTypes ?? [],
      };

      // POST - change to your endpoint
      await fetch("/api/hackathons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // optimistic UI add
      setRooms((s) => [
        {
          id: `h-${Math.random().toString(36).slice(2, 7)}`,
          title: payload.title,
          players: 1,
          maxPlayers: payload.maxPlayers,
          viewers: 0,
          timeLeft: "--",
          status: "open",
          tags: payload.tags,
          languages: payload.languages,
          durationMinutes: payload.durationMinutes,
          hintAllowed: payload.hintAllowed,
          minRank: payload.minRank ?? undefined,
          levels: payload.levels,
          description: payload.description,
          mode: payload.mode as Room["mode"],
          questionLevel: payload.questionLevel ?? undefined,
          perQuestionTime: payload.perQuestionTime ?? undefined,
          numQuestions: payload.numQuestions ?? undefined,
          questionTypes: payload.questionTypes,
        },
        ...s,
      ]);

      setShowCreate(false);
    } catch (err) {
      console.error(err);
      alert(
        "Failed to create tournament — check console and your backend URL."
      );
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
              placeholder="Search tournaments or descriptions..."
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
              className="cursor-pointer text-4xl flex px-3 rounded-md placeholder:text-zinc-500 outline-none"
              onClick={() => {
                setShowCreate(true);
              }}
              title="Create tournament"
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
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCreate(false)}
          />
          <div className="relative z-10 p-6 bg-zinc-900 rounded-lg w-full h-full overflow-auto">
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
  onSubmit: (form: HackathonForm) => void;
  loading: boolean;
  onCancel: () => void;
};

type HackathonForm = {
  title: string;
  description: string;
  tags: string;
  maxPlayers: number;
  durationMinutes?: number | null;
  minRank?: string | null;
  levels?: string[]; // multi-select

  // settings moved here
  languages: string[];
  hintAllowed?: boolean;
  mode?: "Single" | "Duo" | "Squad";

  // settings
  questionLevel?: "Easy" | "Medium" | "Hard" | "Legend";
  perQuestionTime?: number | null;
  numQuestions?: number | null;
  questionTypes?: string[];
};

function CreateForm({ onSubmit, loading, onCancel }: CreateFormProps) {
  const [activeTab, setActiveTab] = useState<"details" | "settings">("details");

  // defaults
  const [form, setForm] = useState<HackathonForm>({
    title: "",
    description: "",
    tags: "casual",
    maxPlayers: 20,
    durationMinutes: 15,
    minRank: "Bronze",
    levels: ["<10"],
    // moved defaults
    languages: ["JavaScript"],
    hintAllowed: false,
    mode: "Single",
    // settings defaults
    questionLevel: "Medium",
    perQuestionTime: 15,
    numQuestions: 1,
    questionTypes: ["DSA"],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const languagesList = [
    "JavaScript",
    "Python",
    "C++",
    "Java",
  ];

  const levelBuckets = ["<10", "10-20", "20-30", ">30"];
  const durations = [
    { label: "15 min", value: 15 },
    { label: "20 min", value: 20 },
    { label: "50 min", value: 50 },
    { label: "1 hour", value: 60 },
    { label: "1.5 hour", value: 90 },
    { label: "2 hour", value: 120 },
  ];
  const playerOptions = [20, 30, 40, 50];
  const rankOptions = [
    "Bronze",
    "Silver",
    "Gold",
    "Grandmaster",
    "CodeRed Champion",
  ];

  const questionLevelOptions = ["Easy", "Medium", "Hard", "Legend"] as const;
  const perQuestionTimeOptions = [15, 20, 30, 40];
  const numQuestionsOptions = [1, 2, 3, 4];
  const questionTypeOptions = ["DSA", "Programming"];
  const modeOptions: HackathonForm["mode"][] = ["Single", "Duo", "Squad"];

  function toggleLevel(level: string) {
    setForm((s) => {
      const has = s.levels?.includes(level);
      return {
        ...s,
        levels: has
          ? s.levels!.filter((l) => l !== level)
          : [...(s.levels || []), level],
      };
    });
  }

  function toggleQuestionType(t: string) {
    setForm((s) => {
      const has = s.questionTypes?.includes(t);
      return {
        ...s,
        questionTypes: has
          ? s.questionTypes!.filter((x) => x !== t)
          : [...(s.questionTypes || []), t],
      };
    });
  }

  function toggleLanguage(lang: string) {
    setForm((s) => {
      const has = s.languages.includes(lang);
      return {
        ...s,
        languages: has
          ? s.languages.filter((l) => l !== lang)
          : [...s.languages, lang],
      };
    });
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.maxPlayers || !playerOptions.includes(Number(form.maxPlayers)))
      e.maxPlayers = `Max players must be one of ${playerOptions.join(", ")}`;
    if (!form.levels || form.levels.length === 0)
      e.levels = "Choose at least one level bucket";
    // settings validation (languages/hint/mode moved to settings)
    if (!form.languages || form.languages.length === 0)
      e.languages = "Choose at least one language";
    if (!form.mode) e.mode = "Choose a tournament mode";
    // settings tab validation
    if (!form.questionLevel) e.questionLevel = "Choose a question level";
    if (
      !form.perQuestionTime ||
      !perQuestionTimeOptions.includes(Number(form.perQuestionTime))
    )
      e.perQuestionTime = `Choose per-question time from ${perQuestionTimeOptions.join(
        ", "
      )}`;
    if (
      !form.numQuestions ||
      !numQuestionsOptions.includes(Number(form.numQuestions))
    )
      e.numQuestions = "Choose number of questions";
    if (!form.questionTypes || form.questionTypes.length === 0)
      e.questionTypes = "Choose at least one question type";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // if validation fails in settings we switch tabs to show errors
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = validate();
    if (!ok) {
      // prefer showing settings tab if any settings-related errors exist
      const settingsKeys = [
        "languages",
        "mode",
        "questionLevel",
        "perQuestionTime",
        "numQuestions",
        "questionTypes",
      ];
      if (
        settingsKeys.some(
          (k) =>
            Object.keys(errors).includes(k) ||
            (k === "languages" && !form.languages.length)
        )
      ) {
        setActiveTab("settings");
      } else {
        setActiveTab("details");
      }
      return;
    }
    onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 h-full w-full flex flex-col"
    >
      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-2">
        <button
          type="button"
          className={`px-4 py-2 rounded-t-md ${
            activeTab === "details" ? "bg-zinc-800" : "bg-transparent"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Tournament Details
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-t-md ${
            activeTab === "settings" ? "bg-zinc-800" : "bg-transparent"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          Tournament Settings
        </button>
      </div>

      {/* DETAILS TAB */}
      {activeTab === "details" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-lg text-zinc-400">Title</label>
              <input
                className="bg-zinc-800 px-3 py-2 rounded-md w-full"
                placeholder="Tournament title"
                value={form.title}
                onChange={(e) =>
                  setForm((s) => ({ ...s, title: e.target.value }))
                }
              />
              {errors.title && (
                <div className="text-rose-400 text-sm mt-1">{errors.title}</div>
              )}
            </div>

            <div>
              <label className="text-lg text-zinc-400">Players</label>
              <select
                className="bg-zinc-800 px-3 py-2 rounded-md w-full"
                value={form.maxPlayers}
                onChange={(e) =>
                  setForm((s) => ({ ...s, maxPlayers: Number(e.target.value) }))
                }
              >
                {[20, 30, 40, 50].map((p) => (
                  <option key={p} value={p}>
                    {p} players
                  </option>
                ))}
              </select>
              {errors.maxPlayers && (
                <div className="text-rose-400 text-sm mt-1">
                  {errors.maxPlayers}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="text-lg text-zinc-400">Description</label>
            <textarea
              className="bg-zinc-800 px-3 py-2 rounded-md w-full min-h-[100px]"
              placeholder="Describe the tournament, rules, scoring, etc."
              value={form.description}
              onChange={(e) =>
                setForm((s) => ({ ...s, description: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-lg text-zinc-400">
                Tags (comma separated)
              </label>
              <input
                className="bg-zinc-800 px-3 py-2 rounded-md w-full"
                placeholder="e.g. Java,algorithms"
                value={form.tags}
                onChange={(e) =>
                  setForm((s) => ({ ...s, tags: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="text-lg text-zinc-400">Duration</label>
              <select
                className="bg-zinc-800 px-3 py-2 rounded-md w-full"
                value={form.durationMinutes ?? 15}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    durationMinutes: Number(e.target.value),
                  }))
                }
              >
                {[
                  { label: "15 min", value: 15 },
                  { label: "20 min", value: 20 },
                  { label: "50 min", value: 50 },
                  { label: "1 hour", value: 60 },
                  { label: "1.5 hour", value: 90 },
                  { label: "2 hour", value: 120 },
                ].map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-lg text-zinc-400">Minimum rank</label>
              <select
                className="bg-zinc-800 px-3 py-2 rounded-md w-full"
                value={form.minRank ?? "Bronze"}
                onChange={(e) =>
                  setForm((s) => ({ ...s, minRank: e.target.value }))
                }
              >
                {[
                  "Bronze",
                  "Silver",
                  "Gold",
                  "Grandmaster",
                  "CodeRed Champion",
                ].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-lg text-zinc-400">
              Minimum Level
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["<10", "10-20", "20-30", ">30"].map((lvl) => {
                const active = form.levels?.includes(lvl);
                return (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => {
                      const has = form.levels!.includes(lvl);
                      setForm((s) => ({
                        ...s,
                        levels: has
                          ? s.levels!.filter((l) => l !== lvl)
                          : [...(s.levels || []), lvl],
                      }));
                    }}
                    className={`px-3 py-1 rounded-md border ${
                      active ? "bg-amber-400 text-black" : "border-zinc-700"
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
            {errors.levels && (
              <div className="text-rose-400 text-sm mt-1">{errors.levels}</div>
            )}
          </div>
        </>
      )}

      {/* SETTINGS TAB */}
      {activeTab === "settings" && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-lg text-zinc-400">Languages</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {languagesList.map((lang) => {
                  const active = form.languages.includes(lang);
                  return (
                    <button
                      type="button"
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      className={`px-3 py-1 rounded-md border ${
                        active ? "bg-amber-400 text-black" : "border-zinc-700"
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
              {errors.languages && (
                <div className="text-rose-400 text-sm mt-1">
                  {errors.languages}
                </div>
              )}
            </div>

            <div>
              <label className="text-lg text-zinc-400">Allow hints</label>
              <div className="mt-2">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!form.hintAllowed}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, hintAllowed: e.target.checked }))
                    }
                  />
                  <span className="text-lg text-zinc-300">Enable hints</span>
                </label>
              </div>
            </div>

            <div>
              <label className="text-lg text-zinc-400">Tournament mode</label>
              <select
                className="bg-zinc-800 px-3 py-2 rounded-md w-full"
                value={form.mode ?? "Single"}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    mode: e.target.value as HackathonForm["mode"],
                  }))
                }
              >
                {["Single", "Duo", "Squad"].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {errors.mode && (
                <div className="text-rose-400 text-sm mt-1">{errors.mode}</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-lg text-zinc-400">Questions level</label>
              <select
                className="bg-zinc-800 px-3 py-2 rounded-md w-full"
                value={form.questionLevel}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    questionLevel: e.target
                      .value as HackathonForm["questionLevel"],
                  }))
                }
              >
                {["Easy", "Medium", "Hard", "Legend"].map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
              {errors.questionLevel && (
                <div className="text-rose-400 text-sm mt-1">
                  {errors.questionLevel}
                </div>
              )}
            </div>

            <div>
              <label className="text-lg text-zinc-400">
                Per-question time limit
              </label>
              <select
                className="bg-zinc-800 px-3 py-2 rounded-md w-full"
                value={form.perQuestionTime ?? 15}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    perQuestionTime: Number(e.target.value),
                  }))
                }
              >
                {[15, 20, 30, 40].map((t) => (
                  <option key={t} value={t}>
                    {t} min
                  </option>
                ))}
              </select>
              {errors.perQuestionTime && (
                <div className="text-rose-400 text-sm mt-1">
                  {errors.perQuestionTime}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-lg text-zinc-400">
                Number of questions
              </label>
              <select
                className="bg-zinc-800 px-3 py-2 rounded-md w-full"
                value={form.numQuestions ?? 1}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    numQuestions: Number(e.target.value),
                  }))
                }
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              {errors.numQuestions && (
                <div className="text-rose-400 text-sm mt-1">
                  {errors.numQuestions}
                </div>
              )}
            </div>

            <div>
              <label className="text-lg text-zinc-400">Type of questions</label>
              <div className="flex gap-2 mt-2">
                {["DSA", "Programming"].map((t) => {
                  const active = form.questionTypes?.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleQuestionType(t)}
                      className={`px-3 py-1 rounded-md border ${
                        active ? "bg-amber-400 text-black" : "border-zinc-700"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
              {errors.questionTypes && (
                <div className="text-rose-400 text-sm mt-1">
                  {errors.questionTypes}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div className="flex-1 flex items-end justify-end gap-3">
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
          className="px-5 py-2 rounded-md bg-amber-500 text-black font-semibold disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Tournament"}
        </button>
      </div>
    </form>
  );
}
