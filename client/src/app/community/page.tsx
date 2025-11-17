"use client";
import {
  Search,
  Users,
  BarChart,
  Tv,
  Trophy,
  Target,
  Settings as SettingsIcon,
  Gift,
  Shield,
  Bell,
  LogOut,
} from "lucide-react";
import userState from "../home/store/stateStore";
import { useState } from "react";
import ElectricBorder from "../../components/ElectricBorder";

// --- Types ---
type Clan = {
  name: string;
  avatarUrl: string;
  members: number;
  points: number;
  rank?: number;
};

type FeedItem = {
  id: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  action: string;
  content?: string;
  timestamp: string;
};

type Reward = {
  id: number;
  title: string;
  cost: number;
  image: string;
  description: string;
};

// --- Placeholder Data ---
const topClans: Clan[] = [
  {
    name: "Syntax Assassins",
    avatarUrl: "https://i.pravatar.cc/150?u=clan1",
    members: 128,
    points: 154000,
  },
  {
    name: "Binary Bandits",
    avatarUrl: "https://i.pravatar.cc/150?u=clan2",
    members: 95,
    points: 123000,
  },
  {
    name: "The Null Pointers",
    avatarUrl: "https://i.pravatar.cc/150?u=clan3",
    members: 210,
    points: 98000,
  },
  {
    name: "Code Crusaders",
    avatarUrl: "https://i.pravatar.cc/150?u=clan4",
    members: 76,
    points: 81000,
  },
  {
    name: "Recursion Rebels",
    avatarUrl: "https://i.pravatar.cc/150?u=clan5",
    members: 45,
    points: 65000,
  },
];

const communityFeed: FeedItem[] = [
  {
    id: 1,
    author: {
      name: "Aarav",
      avatarUrl: "https://i.pravatar.cc/150?u=user_aarav",
    },
    action: "achieved rank Grandmaster!",
    timestamp: "2h ago",
  },
  {
    id: 2,
    author: {
      name: "Himanshu",
      avatarUrl: "https://i.pravatar.cc/150?u=user_himanshu",
    },
    action: "posted in #general",
    content: "Just solved 'Fastest Debugger' in 5 mins!",
    timestamp: "5h ago",
  },
  {
    id: 3,
    author: {
      name: "Alice",
      avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    action: "joined the clan",
    timestamp: "1d ago",
  },
];

const rewardsData: Reward[] = [
  {
    id: 1,
    title: "Neon Syntax Theme",
    cost: 500,
    image: "🎨",
    description: "Glow in the dark editor theme.",
  },
  {
    id: 2,
    title: "Double XP Token",
    cost: 1200,
    image: "⚡",
    description: "2x XP for the next 24 hours.",
  },
  {
    id: 3,
    title: "Grandmaster Frame",
    cost: 5000,
    image: "🖼️",
    description: "Gold profile border.",
  },
  {
    id: 4,
    title: "Custom Clan Tag",
    cost: 2500,
    image: "🏷️",
    description: "Change your clan tag color.",
  },
];

export default function CommunityPage() {
  const setCommunity = userState((s) => s.setCommunityState);
  const [menu, setMenu] = useState<
    "Clan" | "Settings" | "Rewards" | "Leaderboard"
  >("Clan");


  const ClanView = () => (
    <div className="flex gap-6 h-full">
      {/* Clan Header */}

        <div className="bg-zinc-800 p-6 rounded-xl flex items-center gap-6 border border-zinc-700 shadow-lg">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-3xl shadow-inner">
            SA
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Syntax Assassins</h2>
            <p className="text-zinc-400">Rank #1 • Level 45</p>
            <div className="flex gap-4 mt-3">
              <div className="bg-zinc-900 px-3 py-1 rounded-md text-sm text-zinc-300 border border-zinc-700 flex items-center gap-2">
                <Users size={14} /> 128 Members
              </div>
              <div className="bg-zinc-900 px-3 py-1 rounded-md text-sm text-yellow-500 border border-zinc-700 flex items-center gap-2">
                <Trophy size={14} /> 154,000 Pts
              </div>
            </div>
          </div>

        </div>

      <div className="flex flex-col gap-6 flex-1 min-h-0">
        {/* Feed */}
        <div className="lg:col-span-2 bg-zinc-800 rounded-xl border border-zinc-700 p-4 overflow-y-auto scrollbar-hide">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Tv size={18} className="text-green-400" /> Clan Activity
          </h3>
          <div className="space-y-4">
            {communityFeed.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 bg-zinc-900/50 rounded-lg border border-zinc-700/50 hover:border-zinc-600 transition-colors"
              >
                <img
                  src={item.author.avatarUrl}
                  alt={item.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm text-zinc-200">
                    <span className="font-bold text-white">
                      {item.author.name}
                    </span>{" "}
                    {item.action}
                  </p>
                  {item.content && (
                    <p className="text-zinc-400 text-sm mt-1 italic">
                      "{item.content}"
                    </p>
                  )}
                  <p className="text-xs text-zinc-500 mt-1">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Contributors (Mini Leaderboard) */}
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-4">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Top Contributors
          </h3>
          <ul className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 text-center font-mono ${
                      i === 1 ? "text-yellow-400" : "text-zinc-500"
                    }`}
                  >
                    {i}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-zinc-600"></div>
                  <span className="text-zinc-300">Player_{i}</span>
                </div>
                <span className="text-zinc-400 font-mono">
                  {1000 - i * 50} pts
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const LeaderboardView = () => (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BarChart className="text-yellow-500" /> Global Leaderboard
      </h2>
      <div className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden flex-1">
        <div className="grid grid-cols-12 bg-zinc-900/80 p-4 text-sm font-medium text-zinc-400 border-b border-zinc-700">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Clan Name</div>
          <div className="col-span-3 text-center">Members</div>
          <div className="col-span-3 text-right">Total Points</div>
        </div>
        <div className="overflow-y-auto h-[calc(100%-56px)] scrollbar-hide">
          {topClans.map((clan, index) => (
            <div
              key={index}
              className="grid grid-cols-12 p-4 items-center border-b border-zinc-700/50 hover:bg-zinc-700/30 transition-colors"
            >
              <div className="col-span-1 font-mono text-zinc-500 font-bold">
                {index + 1 === 1
                  ? "🥇"
                  : index + 1 === 2
                  ? "🥈"
                  : index + 1 === 3
                  ? "🥉"
                  : index + 1}
              </div>
              <div className="col-span-5 flex items-center gap-3">
                <img
                  src={clan.avatarUrl}
                  alt={clan.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-white">{clan.name}</span>
              </div>
              <div className="col-span-3 text-center text-zinc-400 text-sm">
                {clan.members}
              </div>
              <div className="col-span-3 text-right text-yellow-500 font-mono font-bold">
                {clan.points.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const RewardsView = () => (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Gift className="text-purple-400" /> Rewards Shop
        </h2>
        <div className="bg-zinc-800 px-4 py-2 rounded-full border border-zinc-600 text-yellow-400 font-mono font-bold">
          🪙 2,450
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {rewardsData.map((reward) => (
          <div
            key={reward.id}
            className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 flex flex-col gap-3 hover:border-purple-500/50 transition-all group"
          >
            <div className="h-32 bg-zinc-900/50 rounded-lg flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
              {reward.image}
            </div>
            <div>
              <h3 className="font-bold text-lg">{reward.title}</h3>
              <p className="text-sm text-zinc-400">{reward.description}</p>
            </div>
            <button className="mt-auto w-full py-2 bg-zinc-700 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <span>Purchase</span>
              <span className="text-yellow-400 font-mono text-sm">
                {reward.cost}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="h-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <SettingsIcon className="text-zinc-400" /> Clan Settings
      </h2>

      <div className="space-y-6">
        {/* Profile Section */}
        <section className="bg-zinc-800 p-5 rounded-xl border border-zinc-700">
          <h3 className="text-lg font-semibold mb-4 border-b border-zinc-700 pb-2">
            General
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Clan Visibility</p>
                <p className="text-xs text-zinc-500">
                  Allow others to find your clan
                </p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-success"
                defaultChecked
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Join Requirements</p>
                <p className="text-xs text-zinc-500">
                  Only allow rank Diamond+
                </p>
              </div>
              <input type="checkbox" className="toggle toggle-success" />
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-zinc-800 p-5 rounded-xl border border-zinc-700">
          <h3 className="text-lg font-semibold mb-4 border-b border-zinc-700 pb-2 flex gap-2 items-center">
            <Bell size={18} /> Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-zinc-300">New Member Alerts</p>
              <div className="w-10 h-5 bg-green-600 rounded-full relative cursor-pointer">
                <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-zinc-300">War Updates</p>
              <div className="w-10 h-5 bg-zinc-600 rounded-full relative cursor-pointer">
                <div className="w-3 h-3 bg-white rounded-full absolute left-1 top-1"></div>
              </div>
            </div>
          </div>
        </section>

        <button className="w-full py-3 rounded-lg border border-red-900/50 text-red-500 hover:bg-red-900/20 flex items-center justify-center gap-2 transition-colors">
          <LogOut size={18} /> Leave Clan
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full px-5 py-3 bg-zinc-900 rounded-lg flex flex-col">
      {/* Close Button */}
      <div className="w-full flex justify-end items-start mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="cursor-pointer text-zinc-500 hover:text-white transition-colors"
          onClick={() => setCommunity(false)}
        >
          <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
            <path d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06" />
            <path d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0" />
          </g>
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="bg-zinc-900 text-white h-full w-full overflow-hidden font-sans flex gap-6">
        {/* Left Side - Menu */}
        <div className="h-full pt-4">
          <ul className="menu h-full bg-zinc-900 w-56 gap-2">
            <li onClick={() => setMenu("Clan")}>
              <a
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  menu === "Clan"
                    ? "bg-zinc-800 text-white font-medium shadow-sm"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                }`}
              >
                <Shield size={18} /> My Clan
              </a>
            </li>
            <li onClick={() => setMenu("Leaderboard")}>
              <a
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  menu === "Leaderboard"
                    ? "bg-zinc-800 text-white font-medium shadow-sm"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                }`}
              >
                <BarChart size={18} /> Leaderboard
              </a>
            </li>
            <li onClick={() => setMenu("Rewards")}>
              <a
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  menu === "Rewards"
                    ? "bg-zinc-800 text-white font-medium shadow-sm"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                }`}
              >
                <Gift size={18} /> Rewards
              </a>
            </li>
            <li onClick={() => setMenu("Settings")}>
              <a
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  menu === "Settings"
                    ? "bg-zinc-800 text-white font-medium shadow-sm"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                }`}
              >
                <SettingsIcon size={18} /> Settings
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side - Dynamic Content */}
        <div className="flex-1 h-full p-4 bg-zinc-900/50 overflow-hidden">
          {menu === "Clan" && <ClanView />}
          {menu === "Leaderboard" && <LeaderboardView />}
          {menu === "Rewards" && <RewardsView />}
          {menu === "Settings" && <SettingsView />}
        </div>
      </div>
    </div>
  );
}
