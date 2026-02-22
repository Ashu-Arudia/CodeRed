"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// --- TYPE DEFINITIONS ---
interface Player {
  username: string;
  avatar: string;
  rank: string;
}

// --- DUMMY DATA ---
// 1. The current user
const currentUser: Player = {
  username: "CodeNinja",
  avatar: "https://i.pravatar.cc/150?u=user1",
  rank: "Gold III",
};

// 2. The opponent who will be "found"
const foundOpponent: Player = {
  username: "SyntaxSlayer",
  avatar: "https://i.pravatar.cc/150?u=user2",
  rank: "Gold I",
};

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

// --- MAIN PAGE COMPONENT ---
export default function MatchmakingProPage() {
  const [isSearching, setIsSearching] = useState(true);
  const [status, setStatus] = useState("Connecting to matchmaking...");
  const router = useRouter();

  useEffect(() => {

    setStatus("Searching for opponent...");

    const findMatchTimer = setTimeout(() => {
      setIsSearching(false);
      setStatus("Opponent found! Finalizing...");
    }, 10000);

    const countdownTimer = setTimeout(() => {
      setStatus("Match starting in 3...");
    }, 12000);

    const startMatchTimer = setTimeout(() => {
      setStatus("Let's Go!");
      // router.push('/match');
      console.log("Redirecting to match...");
    }, 15000);

    return () => {
      clearTimeout(findMatchTimer);
      clearTimeout(countdownTimer);
      clearTimeout(startMatchTimer);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white p-8 font-sans overflow-hidden">
      <div className="w-full max-w-5xl flex items-center justify-around">

        <Player1Card player={currentUser} />

        <div className="text-7xl font-extrabold  mx-8 flex gap-1">
          <div className="">V</div>
          <div className="text-red-600 ">S</div>
        </div>

        {/* === PLAYER 2 (DYNAMIC REEL) === */}
        <OpponentSlot isSearching={isSearching} opponent={foundOpponent} />
      </div>

      {/* === STATUS BAR === */}
      <div className="w-full max-w-xl mt-16">
        <div className="text-center text-xl text-gray-400 mb-3">{status}</div>
        <div className="w-full bg-gray-700 rounded-full h-2.5 shadow-inner overflow-hidden">
          <div
            className={`h-2.5 rounded-full ${
              isSearching ? "animate-loading-bar" : "w-full bg-red-600"
            }`}
            style={isSearching ? {} : { transition: "width 0.5s ease-out" }}
          ></div>
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

const OpponentSlot: React.FC<{ isSearching: boolean; opponent: Player }> = ({
  isSearching,
  opponent,
}) => (
  <div className="w-96 h-64 relative">
    {" "}

    <div className="absolute inset-0 h-full w-full  overflow-hidden">
      {isSearching ? <SpinningReel /> : <FoundOpponentCard player={opponent} />}
    </div>
  </div>
);


const SpinningReel = () => (
  <div className="w-full animate-reel">
    {" "}
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
