// You can place this code in a file like `app/profile/[username]/page.tsx`
import { BarChart2, Swords, Target, TrendingUp, Code } from "lucide-react";
import { ReactNode, useEffect } from "react";

// --- Types for placeholder data ---
type Match = {
  id: number;
  opponent: { name: string; avatarUrl: string };
  result: "WIN" | "LOSS";
  pointsChange: number;
  timestamp: string;
};

type LanguageStat = {
  lang: string;
  percentage: number;
  color: string; // Tailwind color class e.g., 'text-blue-500'
};

type PerformancePoint = {
  day: number;
  points: number;
};

type PlayerStats = {
  username: string;
  avatarUrl: string;
  joinDate: string;
  globalRank: number;
  totalPoints: number;
  currentRank: string;
  nextRank: string;
  pointsForNextRank: number;
  totalMatches: number;
  seasonWinRate: number;
  languageStats: LanguageStat[];
  matchHistory: Match[];
  performanceHistory: PerformancePoint[];
};

// --- Updated Placeholder Data ---
const playerStats: PlayerStats = {
  username: "Hunter07",
  avatarUrl: "https://i.pravatar.cc/150?u=hunter07",
  joinDate: "October 11, 2025",
  globalRank: 102,
  totalPoints: 1400,
  currentRank: "Grandmaster",
  nextRank: "Legend",
  pointsForNextRank: 2000,
  totalMatches: 86,
  seasonWinRate: 62,
  languageStats: [
    { lang: "C++", percentage: 75, color: "text-blue-500" },
    { lang: "Python", percentage: 20, color: "text-yellow-400" },
    { lang: "JavaScript", percentage: 5, color: "text-green-500" },
  ],
  performanceHistory: [
    { day: 0, points: 1200 },
    { day: 5, points: 1250 },
    { day: 10, points: 1220 },
    { day: 15, points: 1300 },
    { day: 20, points: 1380 },
    { day: 25, points: 1350 },
    { day: 30, points: 1400 },
  ],
  matchHistory: [
    {
      id: 1,
      opponent: {
        name: "CodeSlayer",
        avatarUrl: "https://i.pravatar.cc/150?u=codeslayer",
      },
      result: "WIN",
      pointsChange: 25,
      timestamp: "5 min ago",
    },
    {
      id: 2,
      opponent: {
        name: "JaneDev",
        avatarUrl: "https://i.pravatar.cc/150?u=janedev",
      },
      result: "LOSS",
      pointsChange: -15,
      timestamp: "45 min ago",
    },
    {
      id: 3,
      opponent: {
        name: "AlgoMaster",
        avatarUrl: "https://i.pravatar.cc/150?u=algomaster",
      },
      result: "WIN",
      pointsChange: 21,
      timestamp: "2 hours ago",
    },
    {
      id: 4,
      opponent: {
        name: "BinaryBob",
        avatarUrl: "https://i.pravatar.cc/150?u=binarybob",
      },
      result: "WIN",
      pointsChange: 18,
      timestamp: "5 hours ago",
    },
  ],
};

// --- NEW & Revamped Helper Components ---

// Define the type for the RankProgressBar's props
type RankProgressBarProps = {
  currentPoints: number;
  nextRankPoints: number;
  currentRank: string;
  nextRank: string;
};

const RankProgressBar = ({
  currentPoints,
  nextRankPoints,
  currentRank,
  nextRank,
}: RankProgressBarProps) => {
  const progress = Math.min((currentPoints / nextRankPoints) * 100, 100);
  return (
    <div>
      <div className="flex justify-between items-end mb-1">
        <div className="text-left">
          <p className="text-sm text-zinc-400">Current Rank</p>
          <p className="text-lg font-bold text-white">{currentRank}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-zinc-400">Next Rank</p>
          <p className="text-lg font-bold text-red-500">{nextRank}</p>
        </div>
      </div>
      <div className="w-full bg-zinc-700 rounded-full h-2.5">
        <div
          className="bg-red-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-zinc-400 mt-1">
        <span>{currentPoints.toLocaleString()} PTS</span>
        <span>{nextRankPoints.toLocaleString()} PTS</span>
      </div>
    </div>
  );
};

const LanguageDonutChart = ({ stats }: { stats: LanguageStat[] }) => {
  const circumference = 2 * Math.PI * 45; // 2 * pi * radius
  let offset = 0;

  return (
    <div className="flex items-center justify-around">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {stats.map((stat, index) => {
            const dasharray = (stat.percentage / 100) * circumference;
            const strokeDashoffset = offset;
            offset -= dasharray;
            return (
              <circle
                key={index}
                className={`stroke-current ${stat.color} transition-all duration-500`}
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                strokeWidth="10"
                strokeDasharray={`${dasharray} ${circumference}`}
                transform="rotate(-90 50 50)"
                style={{ strokeDashoffset }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Code className="w-10 h-10 text-zinc-500" />
        </div>
      </div>
      <div className="space-y-2 text-sm">
        {stats.map((stat) => (
          <div key={stat.lang} className="flex items-center">
            <span
              className={`w-3 h-3 rounded-full mr-2 ${stat.color.replace(
                "text-",
                "bg-"
              )}`}
            ></span>
            <span>
              {stat.lang}: {stat.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PerformanceGraph = ({ data }: { data: PerformancePoint[] }) => {
  const maxX = Math.max(...data.map((p) => p.day));
  const maxY = Math.max(...data.map((p) => p.points));
  const minY = Math.min(...data.map((p) => p.points));
  const points = data
    .map(
      (p) =>
        `${(p.day / maxX) * 280},${
          90 - ((p.points - minY) / (maxY - minY)) * 80
        }`
    )
    .join(" ");

  return (
    <svg viewBox="0 0 280 100" className="w-full h-auto">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "rgba(239, 68, 68, 0.4)" }} />
          <stop offset="100%" style={{ stopColor: "rgba(239, 68, 68, 0)" }} />
        </linearGradient>
      </defs>
      <polyline
        fill="url(#gradient)"
        stroke="#ef4444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

const MatchHistoryItem = ({ match }: { match: Match }) => (
  <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
    <div className="flex items-center">
      <img
        src={match.opponent.avatarUrl}
        alt={match.opponent.name}
        className="w-10 h-10 rounded-full"
      />
      <div className="ml-4">
        <p className="text-sm font-semibold">vs. {match.opponent.name}</p>
        <p className="text-xs text-zinc-400">{match.timestamp}</p>
      </div>
    </div>
    <div
      className={`text-right ${
        match.result === "WIN" ? "text-green-500" : "text-red-500"
      }`}
    >
      <p className="text-sm font-bold">{match.result}</p>
      <p className="text-xs font-semibold">
        {match.result === "WIN" ? `+${match.pointsChange}` : match.pointsChange}{" "}
        PTS
      </p>
    </div>
  </div>
);

export default function PlayerStatsPage({ user }: any) {

  const {
    username,
    avatarUrl,
    joinDate,
    globalRank,
    totalPoints,
    currentRank,
    nextRank,
    pointsForNextRank,
    totalMatches,
    seasonWinRate,
    languageStats,
    matchHistory,
    performanceHistory,
  } = playerStats;

  return (
    <div className="bg-[#121212] text-white h-full w-full p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-10">
          <img
            src={avatarUrl}
            alt={`${username}'s avatar`}
            className="w-32 h-32 rounded-full ring-4 ring-red-500 shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{user.username}</h1>
            <p className="text-zinc-400 mt-1">
              Global Rank: #{globalRank} | Member since {joinDate}
            </p>
            <div className="mt-3 text-2xl font-bold text-red-400">
              {user.current_rating} PTS
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Key Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Rank Progression
              </h2>
              <RankProgressBar
                currentPoints={totalPoints}
                nextRankPoints={pointsForNextRank}
                currentRank={user.current_rank}
                nextRank={nextRank}
              />
            </div>
            <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Language Dominance</h2>
              <LanguageDonutChart stats={languageStats} />
            </div>
          </div>

          {/* Center Column: Performance Graph */}
          <div className="lg:col-span-1 bg-[#1E1E1E] p-6 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Performance History</h2>
            <p className="text-sm text-zinc-400 mb-4">Last 30 Days</p>
            <div className="flex-grow flex items-center justify-center">
              <PerformanceGraph data={performanceHistory} />
            </div>
          </div>

          {/* Right Column: Match History */}
          <div className="lg:col-span-1 bg-[#1E1E1E] p-6 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Recent Matches</h2>
            <div className="space-y-3 flex-grow overflow-y-auto pr-2 scrollbar-hide">
              {matchHistory.map((match) => (
                <MatchHistoryItem key={match.id} match={match} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
