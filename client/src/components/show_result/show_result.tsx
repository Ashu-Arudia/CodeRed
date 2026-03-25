"use client";

import { useEffect, useState } from "react";
import { useWebSocketStore } from "@/store/webSocketStore";
import { useFetchOtherUserDetails } from "@/features/friends/mutations";
import { useUserDetails } from "@/features/auth/queries";

// --- Types ---

type SubmissionResult = {
  submission_id: number | null;
  user_id?: number;
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

type User = {
  user_id: number;
  username: string;
  profile_picture: string;
  current_rating: number;
};

// --- Verdict Helpers ---

function getVerdictMeta(verdict: string) {
  const v = verdict?.toLowerCase().trim() || "";
  if (v === "accepted" || v === "ac" || v === "pass")
    return {
      label: "Accepted",
      icon: "",
      colorClass: "text-emerald-400",
      bgClass: "bg-emerald-500/10",
      borderClass: "border-emerald-500",
    };
  if (v.includes("time_limit") || v === "tle")
    return {
      label: "TLE",
      icon: "timer_off",
      colorClass: "text-amber-400",
      bgClass: "bg-amber-500/10",
      borderClass: "border-amber-500",
    };
  if (v.includes("runtime_error") || v === "re")
    return {
      label: "Runtime Error",
      icon: "bug_report",
      colorClass: "text-rose-400",
      bgClass: "bg-rose-500/10",
      borderClass: "border-rose-500",
    };
  return {
    label: "Wrong Answer",
    icon: "",
    colorClass: "text-rose-500",
    bgClass: "bg-rose-500/10",
    borderClass: "border-rose-500",
  };
}

// --- Components ---

function StatCell({
  label,
  value,
  color = "text-zinc-100",
}: {
  label: string;
  value: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
        {label}
      </span>
      <span className={`font-mono text-sm font-semibold ${color}`}>
        {value}
      </span>
    </div>
  );
}

function SubmissionExpanded({ submission }: { submission: SubmissionResult }) {
  const tabs = ["Summary", "Code", "Details"] as const;
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Summary");

  return (
    <div className="bg-zinc-800/50 p-6 border-t border-zinc-700/50">
      <div className="flex gap-6 border-b border-zinc-700 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${
              activeTab === tab
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Summary" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {submission.output_mismatch && (
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">
                  Output Mismatch
                </h4>
                <pre className="bg-zinc-900 p-4 rounded-lg font-mono text-xs text-rose-400 border border-rose-500/20 whitespace-pre-wrap">
                  {submission.output_mismatch}
                </pre>
              </div>
            )}
            {submission.stderr && (
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">
                  Standard Error
                </h4>
                <pre className="bg-zinc-900 p-4 rounded-lg font-mono text-xs text-zinc-400 border border-zinc-700 whitespace-pre-wrap italic">
                  {submission.stderr}
                </pre>
              </div>
            )}
            {!submission.output_mismatch && !submission.stderr && (
              <p className="text-zinc-500 text-sm italic">
                No errors to display.
              </p>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">
              Complexity
            </h4>
            <div className="grid gap-2">
              <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-700 flex justify-between">
                <span className="text-xs text-zinc-500 uppercase">Time</span>
                <span className="text-xs font-mono text-blue-400">
                  {submission.time_complexity || "N/A"}
                </span>
              </div>
              <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-700 flex justify-between">
                <span className="text-xs text-zinc-500 uppercase">Space</span>
                <span className="text-xs font-mono text-blue-400">
                  {submission.space_complexity || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Code" && (
        <div className="rounded-lg border border-zinc-700 overflow-hidden bg-zinc-900">
          <div className="bg-zinc-800 px-4 py-2 border-b border-zinc-700 flex justify-between items-center">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">
              source_code
            </span>
            <button
              onClick={() =>
                navigator.clipboard.writeText(submission.source_code || "")
              }
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-sm">
                copy
              </span>
            </button>
          </div>
          <pre className="p-4 font-mono text-xs text-zinc-300 overflow-x-auto max-h-80 leading-relaxed">
            {submission.source_code || "// No source code available"}
          </pre>
        </div>
      )}

      {activeTab === "Details" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Submission ID",
              val: `#${submission.submission_id ?? "—"}`,
            },
            { label: "Problem ID", val: `#${submission.problem_id ?? "—"}` },
            { label: "Exec Time", val: `${submission.execution_time}ms` },
            {
              label: "Memory",
              val: `${(submission.memory_used / 1024).toFixed(2)} MB`,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-zinc-900 p-4 rounded-lg border border-zinc-700"
            >
              <span className="text-[9px] font-bold text-zinc-500 uppercase block mb-1">
                {item.label}
              </span>
              <span className="text-sm font-mono text-blue-400">
                {item.val}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SubmissionCard({
  submission,
  index,
  ownerName,
}: {
  submission: SubmissionResult;
  index: number;
  ownerName: string;
}) {
  const meta = getVerdictMeta(submission.verdict);
  const isFailure = meta.label !== "Accepted";
  const [expanded, setExpanded] = useState(isFailure);

  return (
    <div
      className={`rounded-xl overflow-hidden border-l-4 ${meta.borderClass} bg-zinc-800/40 hover:bg-zinc-800/60 transition-all`}
    >
      <div className="p-5 flex flex-wrap items-center gap-8">
        <div className="flex items-center gap-4 min-w-[220px]">
          <span
            className={`material-symbols-outlined ${meta.colorClass} ${meta.bgClass} p-2 rounded-lg text-2xl`}
          >
            {meta.icon}
          </span>
          <div>
            <div
              className={`font-bold text-xs uppercase tracking-tighter ${meta.colorClass}`}
            >
              {meta.label} BY{" "}
              <span className="underline decoration-zinc-700">{ownerName}</span>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono">
              PROBLEM #{submission.problem_id ?? index + 1}
            </div>
          </div>
        </div>

        <StatCell
          label="Test Cases"
          value={`${submission.test_cases_passed}/${submission.total_test_cases}`}
        />
        <StatCell
          label="Time"
          value={`${submission.execution_time.toFixed(2)} s`}
          color={
            submission.execution_time > 1000
              ? "text-amber-400"
              : "text-emerald-400"
          }
        />
        <StatCell
          label="Memory"
          value={`${(submission.memory_used / 1024).toFixed(1)} KB`}
        />

        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-auto text-zinc-500 hover:text-zinc-200 flex items-center gap-1 text-xs font-bold uppercase"
        >
          {expanded ? "Close" : "Details"}
        </button>
      </div>
      {expanded && <SubmissionExpanded submission={submission} />}
    </div>
  );
}

function PlayerCard({ user, isWinner }: { user: User; isWinner: boolean }) {
  return (
    <div
      className={`p-5 rounded-xl border ${
        isWinner
          ? "bg-blue-500/5 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
          : "bg-zinc-800/50 border-zinc-700"
      } flex items-center gap-5 transition-all`}
    >
      <div className="relative">
        <img
          src={user.profile_picture}
          alt={user.username}
          className={`w-16 h-16 rounded-full object-cover border-2 ${
            isWinner
              ? "border-blue-400 shadow-lg"
              : "border-zinc-600 opacity-60 grayscale"
          }`}
        />
        {isWinner && (
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-lg uppercase">
            Winner
          </div>
        )}
      </div>
      <div>
        <h3
          className={`font-bold text-lg ${
            isWinner ? "text-white" : "text-zinc-400"
          }`}
        >
          {user.username}
        </h3>
        <p className="text-xs font-mono text-blue-400 tracking-widest">
          {user.current_rating} Points
        </p>
      </div>
    </div>
  );
}

// --- Main Export ---

export default function MatchResults() {
  const [matchData, setMatchData] = useState<MatchResult | null>(null);
  const showResult = useWebSocketStore((s) => s.matchResult);
  const ResultErase = useWebSocketStore((s) => s.setResultErase);
  const [otherUserDetails, setOtherUserDetail] = useState<User | null>(null);
  const userDetails = useFetchOtherUserDetails(setOtherUserDetail);
  const { data: currentUserDetails } = useUserDetails();

  useEffect(() => {
    if (!showResult || !currentUserDetails) return;
    const opponentId =
      currentUserDetails.user_id === showResult.winner_id
        ? showResult.losser_id
        : showResult.winner_id;
    userDetails.mutate(opponentId);
    setMatchData(showResult);
  }, [showResult, currentUserDetails]);

  const onClose = () => {
    setMatchData(null);
    ResultErase();
  };

  if (!matchData || !currentUserDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-zinc-400">
        <div className="text-center animate-pulse">
          <span className="material-symbols-outlined text-5xl mb-4">
            analytics
          </span>
          <p className="text-lg font-medium">Processing Match Data...</p>
        </div>
      </div>
    );
  }

  const currentUserIsWinner =
    currentUserDetails.user_id === matchData.winner_id;

  return (
    <div className="max-h-[90vh] w-full overflow-y-auto bg-zinc-950 text-zinc-100 flex p-6 selection:bg-blue-500/30 ">
      <div className=" w-full bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden overflow-y-scroll">
        {/* Header */}
        <header className="px-8 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex flex-col items-center gap-1 p-6 justify-center w-full">
            <h1
              className={`text-3xl flex-col justify-center items-center font-black uppercase tracking-tighter flex gap-2 ${
                currentUserIsWinner ? "text-emerald-400" : "text-rose-500"
              }`}
            >
              <div className="text-white">MATCH RESULT DECLARED</div>
              {currentUserIsWinner ? "YOU WIN!" : "Sorry, next try!"}
            </h1>
            <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase">
              {matchData.reason || "Match Results Finalized"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute right-6 top-5 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">x</span>
          </button>
        </header>

        <main className="p-6 md:p-10 space-y-12 ">
          {/* Versus Section */}
          <section className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
            <PlayerCard
              user={currentUserDetails}
              isWinner={currentUserIsWinner}
            />
            <div className="text-zinc-800 font-black text-2xl italic text-center">
              VS
            </div>
            {otherUserDetails ? (
              <PlayerCard
                user={otherUserDetails}
                isWinner={!currentUserIsWinner}
              />
            ) : (
              <div className="h-24 rounded-xl bg-zinc-800/30 animate-pulse border border-zinc-800" />
            )}
          </section>

          {/* Submissions List */}
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-3">
              Submission Breakdown
              <span className="text-[9px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-500">
                {matchData.results.length} ENTRIES
              </span>
            </h2>
            <div className="space-y-4">
              {matchData.results.map((res, i) => {
                // LOGIC: Backend sends winner first (Index 0) and loser second (Index 1)
                const isWinnerSubmission = i === 0;

                // Determine name based on who won the match vs who is viewing the screen
                let ownerName = "";
                if (currentUserIsWinner) {
                  ownerName = isWinnerSubmission
                    ? "YOU"
                    : otherUserDetails?.username || "OPPONENT";
                } else {
                  ownerName = isWinnerSubmission
                    ? otherUserDetails?.username || "OPPONENT"
                    : "YOU";
                }

                return (
                  <SubmissionCard
                    key={res.submission_id ?? i}
                    submission={res}
                    index={i}
                    ownerName={ownerName}
                  />
                );
              })}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="p-8 border-t border-zinc-800 bg-zinc-900/50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex gap-4">
            <button className="px-5 py-2 rounded-lg bg-zinc-800 text-xs font-bold uppercase text-zinc-300 hover:bg-zinc-700 transition-all">
              Share Result
            </button>
          </div>
          <button
            onClick={onClose}
            className={`w-full md:w-auto px-10 py-3 ${
              currentUserIsWinner
                ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20"
                : "bg-blue-600 hover:bg-blue-500 shadow-blue-900/20"
            } text-white font-bold rounded-xl text-sm transition-all shadow-lg active:scale-95`}
          >
            CONTINUE
          </button>
        </footer>
      </div>
    </div>
  );
}
