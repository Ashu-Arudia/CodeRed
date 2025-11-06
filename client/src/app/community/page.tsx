// You can place this code in a file like `app/community/page.tsx`
import { Search, Users, BarChart, Tv } from "lucide-react";

// --- Types for our placeholder data ---
type Clan = {
  name: string;
  avatarUrl: string;
  members: number;
  points: number;
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
];

const communityFeed: FeedItem[] = [
  {
    id: 1,
    author: {
      name: "Aarav",
      avatarUrl: "https://i.pravatar.cc/150?u=user_aarav",
    },
    action: "achieved the rank of Grandmaster!",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    author: {
      name: "Himanshu",
      avatarUrl: "https://i.pravatar.cc/150?u=user_himanshu",
    },
    action: "posted in #general-discussion",
    content:
      "Just solved the 'Fastest Debugger' challenge in under 5 minutes. That was intense!",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    author: {
      name: "Alice",
      avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    action: "created a new clan: The Null Pointers",
    timestamp: "1 day ago",
  },
];

export default function CommunityPage() {
  return (
    <div className="bg-black text-white min-h-screen p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header and Search */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Empire</h1>
          <p className="text-zinc-400 mt-2">
            Find players, join empire, and see what's happening.
          </p>
          <div className="relative mt-6 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search for players or clans..."
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Top Clans Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Top Empires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topClans.map((clan) => (
              <div
                key={clan.name}
                className="bg-[#1E1E1E] p-5 rounded-lg shadow-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={clan.avatarUrl}
                    alt={`${clan.name} avatar`}
                    className="w-12 h-12 rounded-full"
                  />
                  <h3 className="font-bold text-lg">{clan.name}</h3>
                </div>
                <div className="flex justify-between text-sm text-zinc-400">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {clan.members} Members
                  </div>
                  <div className="flex items-center">
                    <BarChart className="w-4 h-4 mr-2" />
                    {clan.points.toLocaleString()} PTS
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Feed Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Activity Feed</h2>
          <div className="space-y-4">
            {communityFeed.map((item) => (
              <div
                key={item.id}
                className="bg-[#1E1E1E] p-5 rounded-lg shadow-lg flex items-start space-x-4"
              >
                <img
                  src={item.author.avatarUrl}
                  alt={`${item.author.name} avatar`}
                  className="w-10 h-10 rounded-full mt-1"
                />
                <div className="flex-1">
                  <p className="text-sm">
                    <strong className="text-white cursor-pointer hover:underline">
                      {item.author.name}
                    </strong>
                    <span className="text-zinc-400 ml-1">{item.action}</span>
                  </p>
                  {item.content && (
                    <div className="mt-2 p-3 bg-zinc-900 rounded-md text-sm text-zinc-300 border border-zinc-700">
                      {item.content}
                    </div>
                  )}
                  <p className="text-xs text-zinc-500 mt-2">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
