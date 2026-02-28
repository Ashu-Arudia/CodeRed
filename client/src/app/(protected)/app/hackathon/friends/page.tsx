"use client";

import { Clock, Search, UserCheck, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFetchFriends, useFetchUserFriends } from "@/features/friends/queries";

/* ---------------- TYPES ---------------- */

type FriendStatus = "friends" | "pending" | "not_friends";

type userFriends = {
  friend_id: number;
  friend_username: string;
  avatarUrl: string;
  isOnline: boolean;
  status: FriendStatus;
};

type friends = {
  user_id: number;
  username: string;
  avatarUrl: string;
  isOnline: boolean;
  status: FriendStatus;
};

type FriendsProps = {
  addfriend: Boolean;
};

const backendUrl = process.env.NEXT_PUBLIC_API_URL;
/* ---------------- USER CARD ---------------- */

const UserFriendCard = ({ user }: { user: userFriends }) => {
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
            alt={user.friend_username}
            className="w-12 h-12 rounded-full"
          />
          {user.isOnline && (
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-[#1E1E1E]" />
          )}
        </div>
          <p className="ml-4 text-white">{user.friend_username}</p>
      </div>
      {getStatusButton(user.status)}
    </div>
  );
};
const FriendCard = ({ user }: { user: friends }) => {
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
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-[#1E1E1E]" />
          )}
        </div>
          <p className="ml-4 text-white">{user.username}</p>
      </div>
      {getStatusButton(user.status)}
    </div>
  );
};

export default function FriendsPage({ addfriend }: FriendsProps) {
  const [myFriends, setMyFriends] = useState<userFriends[]>([]);
  const [friends, setFriends] = useState<friends[]>([]);
  const [friendsLoading, setFriendsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"my_friends" | "add_friends">(
    addfriend ? "add_friends" : "my_friends"
  );
  const {
    data: friendData,
    isLoading: friendLoading,
    isError: friendError,
  } = useFetchFriends();
  const {
    data: userfriendData,
    isLoading: userfriendLoading,
    isError: userfriendError,
  } = useFetchUserFriends();


  // const fetchMyFriends = async () => {
  //   try {
  //     setFriendsLoading(true);

  //     const res = await axios.get<FriendFromApi[]>(
  //       `${backendUrl}/api/v1/friends/friendlist`,
  //       { withCredentials: true }
  //     );
  //     console.log("rsponse from backend: ", res.data);

  //     const mappedFriends: userFriends[] =

  //     setMyFriends(mappedFriends);
  //   } catch (err) {
  //     console.error("Failed to fetch friends", err);
  //   } finally {
  //     setFriendsLoading(false);
  //   }
  // };
  useEffect(() => {
    if (userfriendData) {
      setMyFriends(userfriendData);
    }
  }, [userfriendData]);
  useEffect(() => {
    if (friendData) {
      setFriends(friendData)
    }
  }, [friendData]);


  // const fetchUsers = async () => {
  //   try {
  //     setFriendsLoading(true);

  //     const res = await axios.get<UserFromApi[]>(
  //       `${backendUrl}/api/v1/friends/add-friend`,
  //       { withCredentials: true }
  //     );
  //     console.log("rsponse from backend: ", res.data);

  //     const mappedFriends: User[] = res.data.map((f) => ({
  //       id: f.user_id,
  //       username: f.username,
  //       avatarUrl: `https://i.pravatar.cc/150?u=${f.username}`,
  //       isOnline: true,
  //       status: "friends",
  //     }));

  //     setMyFriends(mappedFriends);
  //   } catch (err) {
  //     console.error("Failed to fetch friends", err);
  //   } finally {
  //     setFriendsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (activeTab === "my_friends") {
  //     fetchMyFriends();
  //   }
  //   else {
  //     fetchUsers();
  //   }
  // }, [activeTab]);

  return (
    <div className="w-full bg-[#121212] text-white h-full p-8 font-sans rounded-lg">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-6">Friends</h1>

        {/* Tabs */}
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

        {/* Content */}
        {activeTab === "my_friends" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Your Friends</h2>

            {friendsLoading && (
              <p className="text-zinc-400 text-sm">Loading your friends...</p>
            )}

            {!friendsLoading && myFriends.length === 0 && (
              <p className="text-zinc-400 text-sm">
                You don’t have any friends yet
              </p>
            )}

            {!friendsLoading &&
              myFriends.map((friend) => (
                <UserFriendCard key={friend.friend_id} user={friend} />
              ))}
          </div>
        )}

        {activeTab === "add_friends" && (
          <div className="space-y-4 ">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search by username"
                className="w-full bg-[#1E1E1E] border border-zinc-700 rounded-lg pl-12 pr-4 py-3 text-md text-white"
              />
            </div>

            {friends.map((friend) => (
                <FriendCard key={friend.user_id} user={friend} />
            ))}

          </div>
        )}
      </div>
    </div>
  );
}
