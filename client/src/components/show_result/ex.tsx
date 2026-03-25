"use client";

import { useEffect, useState } from "react";
import { useWebSocketStore } from "@/store/webSocketStore";
import { useFetchOtherUserDetails } from "@/features/friends/mutations";
import { useUserDetails } from "@/features/auth/queries";


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

type User = {
  user_id: number;
  username: string;
  profile_picture: string;
  current_rating: number;
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface MatchResultsProps {
  matchData: MatchResult;
  currentUserDetails: User;
  otherUserDetails: User | null;
  /** Wire this to your resultEnd() function */
  onClose: () => void;
}

// ─── Verdict helpers ──────────────────────────────────────────────────────────

function getVerdictMeta(verdict: string): {
  label: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
} {
  const v = verdict.toLowerCase().trim();
  if (v === "accepted" || v === "ac" || v === "pass")
    return {
      label: "Accepted",
      icon: "check_circle",
      colorClass: "text-primary",
      bgClass: "bg-primary/10",
      borderClass: "border-primary",
    };
  if (v === "time_limit_exceeded" || v === "tle" || v === "time limit exceeded")
    return {
      label: "Time Limit Exceeded",
      icon: "timer_off",
      colorClass: "text-tertiary",
      bgClass: "bg-tertiary/10",
      borderClass: "border-tertiary",
    };
  if (
    v === "memory_limit_exceeded" ||
    v === "mle" ||
    v === "memory limit exceeded"
  )
    return {
      label: "Memory Limit Exceeded",
      icon: "memory",
      colorClass: "text-tertiary",
      bgClass: "bg-tertiary/10",
      borderClass: "border-tertiary",
    };
  if (v === "runtime_error" || v === "re" || v === "runtime error")
    return {
      label: "Runtime Error",
      icon: "bug_report",
      colorClass: "text-secondary",
      bgClass: "bg-secondary/10",
      borderClass: "border-secondary",
    };
  // Default → Wrong Answer
  return {
    label: "Wrong Answer",
    icon: "cancel",
    colorClass: "text-secondary",
    bgClass: "bg-secondary/10",
    borderClass: "border-secondary",
  };
}

// ─── Derived stats ────────────────────────────────────────────────────────────

/** Sum of execution_time across all results, formatted as mm:ss */
function formatTotalTime(results: SubmissionResult[]): string {
  const totalMs = results.reduce((sum, r) => sum + (r.execution_time ?? 0), 0);
  const totalSec = Math.floor(totalMs / 1000);
  const mm = Math.floor(totalSec / 60)
    .toString()
    .padStart(2, "0");
  const ss = (totalSec % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

/** Average execution_time across all results */
function avgExecTime(results: SubmissionResult[]): string {
  if (!results.length) return "—";
  const avg =
    results.reduce((sum, r) => sum + (r.execution_time ?? 0), 0) /
    results.length;
  return `${Math.round(avg)}ms`;
}

// ─── StatCell ─────────────────────────────────────────────────────────────────

function StatCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-tighter">
        {label}
      </span>
      <span className="font-headline font-medium">{value}</span>
    </div>
  );
}

// ─── Expanded submission detail panel ────────────────────────────────────────

function SubmissionExpanded({ submission }: { submission: SubmissionResult }) {
  const tabs = ["Summary", "Code", "Details"] as const;
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Summary");

  return (
    <div className="bg-surface-container-low p-8">
      {/* Tabs */}
      <div className="flex gap-8 border-b border-outline-variant/10 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-xs font-label font-bold uppercase tracking-widest transition-colors relative group ${
              activeTab === tab
                ? "text-on-surface border-b-2 border-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute inset-0 bg-primary/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        ))}
      </div>

      {/* Summary */}
      {activeTab === "Summary" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {submission.output_mismatch && (
              <div className="space-y-2">
                <h4 className="text-xs font-label font-bold uppercase text-on-surface-variant tracking-widest">
                  Output Mismatch
                </h4>
                <div className="bg-surface-container-lowest p-4 rounded-lg font-mono text-sm border border-outline-variant/10 overflow-x-auto whitespace-pre-wrap">
                  <span className="text-secondary">Mismatch: </span>
                  {submission.output_mismatch}
                </div>
              </div>
            )}
            {submission.stderr && (
              <div className="space-y-2">
                <h4 className="text-xs font-label font-bold uppercase text-on-surface-variant tracking-widest">
                  Standard Error
                </h4>
                <div className="bg-surface-container-lowest p-4 rounded-lg font-mono text-xs text-secondary-dim/80 italic border border-outline-variant/10 whitespace-pre-wrap">
                  {submission.stderr}
                </div>
              </div>
            )}
            {!submission.output_mismatch && !submission.stderr && (
              <p className="text-on-surface-variant text-sm font-mono italic">
                No diagnostics available.
              </p>
            )}
          </div>

          {/* Complexity */}
          {(submission.time_complexity || submission.space_complexity) && (
            <div className="space-y-3">
              <h4 className="text-xs font-label font-bold uppercase text-on-surface-variant tracking-widest">
                Complexity
              </h4>
              {submission.time_complexity && (
                <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/10 flex justify-between items-center">
                  <span className="text-xs text-on-surface-variant font-mono uppercase tracking-widest">
                    Time
                  </span>
                  <span className="font-mono text-primary text-sm">
                    {submission.time_complexity}
                  </span>
                </div>
              )}
              {submission.space_complexity && (
                <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/10 flex justify-between items-center">
                  <span className="text-xs text-on-surface-variant font-mono uppercase tracking-widest">
                    Space
                  </span>
                  <span className="font-mono text-primary text-sm">
                    {submission.space_complexity}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Code */}
      {activeTab === "Code" && (
        <div className="space-y-2">
          <h4 className="text-xs font-label font-bold uppercase text-on-surface-variant tracking-widest">
            Source Code
          </h4>
          {submission.source_code ? (
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 overflow-hidden">
              <div className="bg-surface-container-high px-4 py-2 border-b border-outline-variant/10 flex justify-between items-center">
                <span className="text-[10px] font-mono text-on-surface-variant">
                  submission_{submission.submission_id ?? "unknown"}
                </span>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(submission.source_code ?? "")
                  }
                  className="text-on-surface-variant cursor-pointer hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-xs">
                    content_copy
                  </span>
                </button>
              </div>
              <pre className="p-4 font-mono text-sm overflow-y-auto max-h-64 leading-relaxed whitespace-pre-wrap">
                {submission.source_code}
              </pre>
            </div>
          ) : (
            <p className="text-on-surface-variant text-sm font-mono italic">
              Source code not available.
            </p>
          )}
        </div>
      )}

      {/* Details */}
      {activeTab === "Details" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Submission ID",
              value: `#${submission.submission_id ?? "—"}`,
            },
            { label: "Problem ID", value: `#${submission.problem_id ?? "—"}` },
            {
              label: "Execution Time",
              value: `${submission.execution_time}ms`,
            },
            {
              label: "Memory Used",
              value: `${(submission.memory_used / 1024).toFixed(1)} MB`,
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/10"
            >
              <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest block mb-1">
                {label}
              </span>
              <span className="font-mono text-sm text-primary">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Submission row card ──────────────────────────────────────────────────────

function SubmissionCard({
  submission,
  index,
}: {
  submission: SubmissionResult;
  index: number;
}) {
  const isFailure =
    submission.verdict?.toLowerCase() !== "accepted" &&
    submission.verdict?.toLowerCase() !== "ac";
  const [expanded, setExpanded] = useState(isFailure);
  const meta = getVerdictMeta(submission.verdict);
  const isTLE =
    submission.verdict?.toLowerCase() === "tle" ||
    submission.verdict?.toLowerCase() === "time_limit_exceeded";

  const timeDisplay = isTLE ? (
    <span className="font-headline font-medium text-secondary">
      &gt; 2000 ms
    </span>
  ) : (
    <span className="font-headline font-medium">
      {submission.execution_time} ms
    </span>
  );

  return (
    <div
      className={`rounded-xl overflow-hidden border-l-4 ${meta.borderClass} ${
        expanded
          ? "bg-surface-container-highest shadow-lg"
          : "bg-surface-container"
      } group transition-all`}
    >
      <div
        className={`p-6 flex flex-wrap items-center gap-8 ${
          expanded ? "border-b border-outline-variant/10" : ""
        }`}
      >
        {/* Verdict */}
        <div className="flex items-center gap-4 min-w-[140px]">
          <span
            className={`material-symbols-outlined ${meta.colorClass} ${meta.bgClass} p-2 rounded-lg`}
          >
            {meta.icon}
          </span>
          <div>
            <div
              className={`font-bold font-headline ${meta.colorClass} uppercase text-sm tracking-widest`}
            >
              {meta.label}
            </div>
            <div className="text-xs text-on-surface-variant font-mono">
              Problem #{submission.problem_id ?? index + 1}
            </div>
          </div>
        </div>

        <StatCell
          label="Test Cases"
          value={`${submission.test_cases_passed} / ${submission.total_test_cases}`}
        />
        <StatCell label="Time" value={timeDisplay} />
        <StatCell
          label="Memory"
          value={`${(submission.memory_used / 1024).toFixed(1)} MB`}
        />

        <button
          onClick={() => setExpanded((v) => !v)}
          className={`ml-auto flex items-center gap-1 transition-colors ${
            expanded
              ? "text-primary"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span className="text-xs font-label font-bold uppercase tracking-widest">
            {expanded ? "Collapse" : "View Details"}
          </span>
          <span className="material-symbols-outlined text-sm">
            {expanded ? "expand_less" : "expand_more"}
          </span>
        </button>
      </div>

      {expanded && <SubmissionExpanded submission={submission} />}
    </div>
  );
}

// ─── Player card ──────────────────────────────────────────────────────────────

function PlayerCard({ user, isWinner }: { user: User; isWinner: boolean }) {
  return (
    <div
      className={`relative p-6 rounded-xl bg-surface-container border-l-4 flex items-center gap-6 transition-colors ${
        isWinner
          ? "border-primary neon-glow-primary group hover:bg-surface-container-highest"
          : "border-outline-variant"
      }`}
    >
      <div className="relative">
        <img
          src={user.profile_picture}
          alt={`${user.username} profile`}
          className={`w-20 h-20 rounded-full object-cover border-2 ${
            isWinner
              ? "grayscale group-hover:grayscale-0 transition-all border-primary/50"
              : "grayscale opacity-60 border-transparent"
          }`}
        />
        {isWinner && (
          <div className="absolute -top-2 -right-2 bg-primary text-on-primary text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
            Winner
          </div>
        )}
      </div>
      <div>
        <h3
          className={`font-headline text-xl font-bold ${
            isWinner ? "text-on-surface" : "text-on-surface-variant"
          }`}
        >
          {user.username}
        </h3>
        <p
          className={`font-mono text-sm tracking-widest ${
            isWinner ? "text-primary" : "text-on-surface-variant"
          }`}
        >
          {user.current_rating} ELO
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MatchResults(){
  const [matchData, setMatchData] = useState<MatchResult | null>(null);
  const showResult = useWebSocketStore((s) => s.matchResult);
  const ResultErase = useWebSocketStore((s) => s.setResultErase);
  const [otherUserDetails, setOtherUserDetail] = useState<User | null>(null);
  const userDetails = useFetchOtherUserDetails(setOtherUserDetail);

  const { data } = useUserDetails();
  const currentUserDetails = data;

  useEffect(() => {
      if (!showResult || !data) return;

      const id =
        data.user_id === showResult.winner_id
          ? showResult.losser_id
          : showResult.winner_id;

      userDetails.mutate(id);
      setMatchData(showResult);
  }, [showResult, data]);

  const onClose = () => {
    setMatchData(null);
    ResultErase();
  };

  const [compareSideBySide, setCompareSideBySide] = useState(false);

  if (!matchData || !matchData.results) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4 block">
            hourglass_empty
          </span>
          <p className="text-xl font-medium text-on-surface mb-2">
            Loading match results...
          </p>
          <p className="text-on-surface-variant">
            Please wait while we process the competition.
          </p>
        </div>
      </div>
    );
  }

  const currentUserIsWinner =
    currentUserDetails?.user_id === matchData?.winner_id;
  const winnerName = currentUserIsWinner
    ? currentUserDetails?.username
    : otherUserDetails?.username ?? "Opponent";

  const totalTime = formatTotalTime(matchData.results);
  const avgExec = avgExecTime(matchData.results);

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl w-full glass-panel rounded-xl overflow-hidden shadow-2xl relative">
        {/* Header */}
        <header className="flex justify-between items-center px-8 h-20 border-b border-outline-variant/15 bg-surface-container/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary">
              terminal
            </span>
            <h1 className="font-headline text-2xl font-bold tracking-tighter uppercase text-on-surface">
              Match Results
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-surface-container-low px-4 py-1.5 rounded-full border border-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-label font-medium uppercase tracking-widest text-on-surface-variant">
                Live_Feed_Active
              </span>
            </div>
            {/* Calls resultEnd() via onClose prop */}
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-all text-on-surface-variant hover:text-on-surface group"
            >
              <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">
                close
              </span>
            </button>
          </div>
        </header>

        <main className="p-6 md:p-10 space-y-10">
          {/* Players */}
          <section className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <PlayerCard
              user={currentUserDetails}
              isWinner={currentUserIsWinner}
            />
            <div className="flex flex-col items-center">
              <div className="h-10 w-px bg-outline-variant/30 hidden md:block" />
              <div className="p-3 font-headline font-black text-2xl text-outline-variant italic">
                VS
              </div>
              <div className="h-10 w-px bg-outline-variant/30 hidden md:block" />
            </div>
            {/* Skeleton while otherUserDetails is loading */}
            {otherUserDetails ? (
              <PlayerCard
                user={otherUserDetails}
                isWinner={!currentUserIsWinner}
              />
            ) : (
              <div className="p-6 rounded-xl bg-surface-container border-l-4 border-outline-variant flex items-center gap-6 animate-pulse">
                <div className="w-20 h-20 rounded-full bg-surface-container-high" />
                <div className="space-y-2">
                  <div className="h-4 w-28 bg-surface-container-high rounded" />
                  <div className="h-3 w-20 bg-surface-container-high rounded" />
                </div>
              </div>
            )}
          </section>

          {/* Victory Analysis */}
          <section className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    verified
                  </span>
                  <h2 className="font-headline text-2xl font-bold">
                    Victory Analysis
                  </h2>
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  <span className="text-on-surface font-semibold">
                    {winnerName}
                  </span>{" "}
                  won the match. Win condition:{" "}
                  <span className="text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">
                    {matchData.reason}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container p-4 rounded-lg border-t border-outline-variant/10">
                  <span className="text-[10px] uppercase font-label tracking-widest text-on-surface-variant block mb-2">
                    Total Exec Time
                  </span>
                  <span className="text-2xl font-headline font-bold text-primary">
                    {totalTime}
                  </span>
                </div>
                <div className="bg-surface-container p-4 rounded-lg border-t border-outline-variant/10">
                  <span className="text-[10px] uppercase font-label tracking-widest text-on-surface-variant block mb-2">
                    Avg Execution
                  </span>
                  <span className="text-2xl font-headline font-bold text-primary">
                    {avgExec}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Submissions */}
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="font-headline text-xl font-bold flex items-center gap-2">
                Submission Breakdown
                <span className="text-xs font-mono font-normal bg-surface-container-highest px-3 py-1 rounded-full text-on-surface-variant">
                  {matchData.results.length} ENTRIES
                </span>
              </h2>
              <label className="flex items-center cursor-pointer gap-2 group">
                <span className="text-xs font-label font-medium text-on-surface-variant uppercase tracking-wider group-hover:text-primary transition-colors">
                  Compare side by side
                </span>
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={compareSideBySide}
                    onChange={(e) => setCompareSideBySide(e.target.checked)}
                  />
                  <div className="w-10 h-5 bg-surface-container-highest rounded-full peer peer-checked:bg-primary transition-colors" />
                  <div className="absolute left-1 top-1 bg-on-surface-variant peer-checked:bg-on-primary w-3 h-3 rounded-full transition-all peer-checked:translate-x-5" />
                </div>
              </label>
            </div>
            <div className="space-y-4">
              {matchData.results.map((submission, i) => (
                <SubmissionCard
                  key={submission.submission_id ?? `submission-${i}`}
                  submission={submission}
                  index={i}
                />
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="p-8 border-t border-outline-variant/15 flex flex-col md:flex-row justify-between items-center gap-6 bg-surface-container/30">
          <div className="flex items-center gap-4">
            <button className="bg-surface-container-highest px-6 py-2.5 rounded-lg text-sm font-label font-bold uppercase tracking-widest text-on-surface hover:bg-outline-variant transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">share</span>
              Share Result
            </button>
            <button className="bg-surface-container-highest px-6 py-2.5 rounded-lg text-sm font-label font-bold uppercase tracking-widest text-on-surface hover:bg-outline-variant transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">
                download
              </span>
              Export Log
            </button>
          </div>
          {/* Also calls resultEnd() */}
          <button
            onClick={onClose}
            className="w-full md:w-auto bg-gradient-to-tr from-primary-container to-primary px-10 py-3 rounded-lg text-sm font-headline font-black uppercase tracking-[0.2em] text-on-primary hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Continue to Dashboard
          </button>
        </footer>
      </div>
    </div>
  );
}
