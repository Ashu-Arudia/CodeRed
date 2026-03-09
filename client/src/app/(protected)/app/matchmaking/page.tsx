"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWebSocketStore } from "@/store/webSocketStore";
import { useUserDetails } from "@/features/auth/queries";

interface Player {
  username: string;
  avatar: string;
  rank: string;
}

const dummyOpponents: Player[] = [
  {
    username: "ByteProwler",
    avatar: "https://i.pravatar.cc/150?u=user3",
    rank: "Silver II",
  },
  {
    username: "GlitchHop",
    avatar: "https://i.pravatar.cc/150?u=user4",
    rank: "Platinum I",
  },
  {
    username: "DataWraith",
    avatar: "https://i.pravatar.cc/150?u=user5",
    rank: "Gold IV",
  },
  {
    username: "NullPointer",
    avatar: "https://i.pravatar.cc/150?u=user6",
    rank: "Bronze I",
  },
];

export default function MatchmakingProPage() {
  const router = useRouter();

  const sendEvent = useWebSocketStore((s) => s.sendEvent);
  const matchId = useWebSocketStore((s) => s.matchId);
  const connected = useWebSocketStore((s) => s.connected);
  const opponentInfo = useWebSocketStore((s) => s.opponent_info);

  const [isSearching, setIsSearching] = useState(true);
  const [status, setStatus] = useState("Connecting to matchmaking...");
  const [opponent, setOpponent] = useState<Player | null>(null);

  const { data: userData, isLoading } = useUserDetails();

  const currentUser: Player | null = userData
    ? {
        username: userData.username,
        avatar: userData.profile_picture,
        rank: userData.current_rank,
      }
    : null;

  // send matchmaking request
  useEffect(() => {
    if (!connected) return;

    setStatus("Searching for opponent...");

    sendEvent({
      type: "join_queue",
      payload: { mode: "ranked" },
    });
  }, [connected, sendEvent]);

  // set opponent from websocket
  useEffect(() => {
    if (!opponentInfo) return;

    setOpponent({
      username: opponentInfo.username,
      avatar: opponentInfo.avatar ?? "",
      rank: opponentInfo.rank,
    });
  }, [opponentInfo]);

  // when match found
  useEffect(() => {
    if (!matchId) return;

    setIsSearching(false);
    setStatus("Opponent found! Preparing match...");

    const timer = setTimeout(() => {
      router.push(`match/${matchId}`);
    }, 5000);

    return () => clearTimeout(timer);
  }, [matchId, router]);

  if (isLoading || !currentUser) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white p-8 font-sans overflow-hidden">
      <div className="w-full max-w-5xl flex items-center justify-around">
        <div className="border flex justify-center items-center rounded-lg bg-gray-500">
          <Player1Card player={currentUser} />
        </div>

        <div className="text-7xl font-extrabold mx-8 flex gap-1">
          <div>V</div>
          <div className="text-red-600">S</div>
        </div>

        <OpponentSlot isSearching={isSearching} opponent={opponent} />
      </div>

      <div className="w-full max-w-xl mt-16">
        <div className="text-center text-xl text-gray-400 mb-3">{status}</div>

        <div className="w-full bg-gray-700 rounded-full h-2.5 shadow-inner overflow-hidden">
          <div
            className={`h-2.5 rounded-full ${
              isSearching ? "animate-loading-bar" : "w-full bg-red-600"
            }`}
            style={isSearching ? {} : { transition: "width 0.5s ease-out" }}
          />
        </div>
      </div>
    </div>
  );
}

const Player1Card: React.FC<{ player: Player }> = ({ player }) => (
  <div className="flex flex-col items-center p-6 w-96">
    <img
      src={player.avatar}
      alt={player.username}
      className="w-32 h-32 rounded-full border-4 border-cyan-500"
    />

    <div className="text-3xl font-bold mt-4">{player.username}</div>
    <div className="text-xl text-cyan-300 mt-1">{player.rank}</div>

    <div className="text-lg text-green-400 mt-4 font-semibold px-4 py-1 bg-gray-700 rounded-full">
      READY
    </div>
  </div>
);

const OpponentSlot: React.FC<{
  isSearching: boolean;
  opponent: Player | null;
}> = ({ isSearching, opponent }) => (
  <div className="w-96 h-64 relative">
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      {isSearching ? (
        <SpinningReel />
      ) : opponent ? (
        <FoundOpponentCard player={opponent} />
      ) : null}
    </div>
  </div>
);

const SpinningReel = () => (
  <div className="w-full animate-reel">
    {dummyOpponents.map((p) => (
      <ReelPlayerCard key={p.username} player={p} />
    ))}

    {dummyOpponents.map((p) => (
      <ReelPlayerCard key={`${p.username}-2`} player={p} />
    ))}
  </div>
);

const ReelPlayerCard: React.FC<{ player: Player }> = ({ player }) => (
  <div className="flex flex-col items-center justify-center w-full h-64 p-6 text-center">
    <img
      src={player.avatar}
      alt={player.username}
      className="w-24 h-24 rounded-full border-4 border-gray-600"
    />

    <div className="text-3xl font-bold mt-4 text-gray-400">
      {player.username}
    </div>

    <div className="text-xl text-gray-500 mt-1">{player.rank}</div>
  </div>
);

const FoundOpponentCard: React.FC<{ player: Player }> = ({ player }) => (
  <div className="flex flex-col items-center justify-center w-full h-64 p-6 text-center animate-land">
    <img
      src={player.avatar}
      alt={player.username}
      className="w-32 h-32 rounded-full border-4 border-red-500"
    />

    <div className="text-3xl font-bold mt-4">{player.username}</div>
    <div className="text-xl text-red-400 mt-1">{player.rank}</div>

    <div className="text-lg text-yellow-400 mt-4 font-semibold">
      OPPONENT FOUND
    </div>
  </div>
);
