"use client";
import { useState } from "react";
import { Search, UserPlus, UserCheck, Clock, UserX } from "lucide-react";

// --- Types for placeholder data ---
type FriendStatus = "friends" | "pending" | "not_friends";

type User = {
  id: number;
  username: string;
  avatarUrl: string;
  isOnline: boolean;
  status: FriendStatus;
};

type FriendsProps = {
  addfriend: Boolean; // or your actual type
};

// --- Placeholder Data ---
const myFriends: User[] = [
  {
    id: 1,
    username: "Alice",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    isOnline: true,
    status: "friends",
  },
  {
    id: 2,
    username: "Bob",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
    isOnline: true,
    status: "friends",
  },
  {
    id: 3,
    username: "Charlie",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704b",
    isOnline: false,
    status: "friends",
  },
];

const searchResults: User[] = [
  {
    id: 4,
    username: "CodeSlayer",
    avatarUrl: "https://i.pravatar.cc/150?u=codeslayer",
    isOnline: true,
    status: "not_friends",
  },
  {
    id: 5,
    username: "JaneDev",
    avatarUrl: "https://i.pravatar.cc/150?u=janedev",
    isOnline: false,
    status: "pending",
  },
  {
    id: 1,
    username: "Alice",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    isOnline: true,
    status: "friends",
  },
];

// --- Helper Components ---
const UserCard = ({ user }: { user: User }) => {
  const getStatusButton = (status: FriendStatus) => {
    switch (status) {
      case "friends":
        return (
          <button className="flex items-center text-sm bg-zinc-700 text-green-400 font-semibold px-3 py-1.5 rounded-md">
            <UserCheck size={16} className="mr-2" /> Friends
          </button>
        );
      case "pending":
        return (
          <button className="flex items-center text-sm bg-zinc-700 text-yellow-400 font-semibold px-3 py-1.5 rounded-md cursor-not-allowed">
            <Clock size={16} className="mr-2" /> Pending
          </button>
        );
      case "not_friends":
      default:
        return (
          <button className="flex items-center text-sm bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1.5 rounded-md transition-colors">
            <UserPlus size={16} className="mr-2" /> Add Friend
          </button>
        );
    }
  };

  return (
    <div className="flex items-center justify-between bg-[#1E1E1E] p-4 rounded-lg">
      <div className="flex items-center">
        <div className="relative">
          <img
            src={user.avatarUrl}
            alt={user.username}
            className="w-12 h-12 rounded-full"
          />
          {user.isOnline && (
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-[#1E1E1E]"></span>
          )}
        </div>
        <p className="ml-4 font-bold">{user.username}</p>
      </div>
      {getStatusButton(user.status)}
    </div>
  );
};

export default function FriendsPage(props : FriendsProps) {
  const [activeTab, setActiveTab] = useState<"my_friends" | "add_friends">(props.addfriend ? "add_friends" : "my_friends");

  return (
    <div className="w-full bg-[#121212] text-white h-full p-8 font-sans">
      <div className=" mx-auto">
        <h1 className="text-3xl font-bold mb-6">Friends</h1>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-700 mb-6">
          <button
            onClick={() => setActiveTab("my_friends")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "my_friends"
                ? "text-white border-b-2 border-red-500"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Friends
          </button>
          <button
            onClick={() => setActiveTab("add_friends")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "add_friends"
                ? "text-white border-b-2 border-red-500"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Add Friends
          </button>
        </div>

        {/* Conditional Content based on Tab */}
        <div>
          {activeTab === "my_friends" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">
                Your Friends ({myFriends.length})
              </h2>
              {myFriends.map((friend) => (
                <UserCard key={friend.id} user={friend} />
              ))}
            </div>
          )}

          {activeTab === "add_friends" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Find New Friends</h2>
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search by username or UID"
                  className="w-full bg-[#1E1E1E] border border-zinc-700 rounded-lg pl-12 pr-4 py-3 text-md text-white focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="space-y-4">
                {/* Search results would dynamically appear here */}
                {searchResults.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
