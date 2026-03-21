"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWebSocketStore } from "@/store/webSocketStore";
import { useUserDetails } from "@/features/auth/queries";
import { motion } from "framer-motion";

interface Player {
  username: string;
  avatar: string;
  rank: string;
  level?: number;
  specialty?: string;
  region?: string;
}

export default function MatchmakingProPage() {
  const router = useRouter();
  const matchId = useWebSocketStore((s) => s.matchId);
  const opponentInfo = useWebSocketStore((s) => s.opponent_info);

  const { data: userData, isLoading } = useUserDetails();

  const currentUser: Player | null = userData
    ? {
        username: userData.username,
        avatar: userData.profile_picture,
        rank: userData.current_rank,
        level: userData.level,
        specialty: userData.specialty,
        region: userData.region,
      }
    : null;

  const opponent: Player | null = opponentInfo
    ? {
        username: opponentInfo.username,
        avatar: opponentInfo.avatar ?? "",
        rank: opponentInfo.rank,
        level: 1,
        specialty: "C++",
        region: "India",
      }
    : null;

  useEffect(() => {
    if (!matchId) return;
    const timer = setTimeout(() => {
      router.replace(`match/${matchId}`);
    }, 10000);
    return () => clearTimeout(timer);
  }, [matchId, router]);

  if (isLoading || !currentUser || !opponent) return null;

  return (
    <div className="min-h-screen bg-[#0d0e12] text-white flex flex-col items-center  relative overflow-hidden font-[Barlow_Condensed]">
      {/* LIGHT GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] left-[-100px] top-[20%]" />
      <div className="absolute w-[600px] h-[600px] bg-red-500/10 blur-[120px] right-[-100px] top-[40%]" />

      {/* TIMER */}
      <div className="text-[clamp(3rem,8vw,5rem)] font-bold font-[Rajdhani] mb-6 animate-fadeIn">
        <CountdownTimer seconds={10} />
      </div>

      {/* ARENA */}
      <div className="flex items-center justify-center w-full max-w-6xl px-6 animate-fadeIn">
        {/* PLAYER */}
        <PlayerCard player={currentUser} side="left" />

        {/* VS */}
        <div className="mx-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border border-white/10 bg-zinc-900 flex items-center justify-center font-[Rajdhani] tracking-widest text-white/60 relative">
            VS
            <div className="absolute -top-16 w-[1px] h-14 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="absolute -bottom-16 w-[1px] h-14 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </div>
        </div>

        {/* OPPONENT */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <PlayerCard player={opponent} side="right" />
        </motion.div>
      </div>

      <div className="flex-1 justify-end flex items-center">
        <p>Bonus Tip: Submit Code every time even if some test case are failing</p>
      </div>
    </div>
  );
}

function PlayerCard({ player, side }: any) {
  const isRight = side === "right";

  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 120 : -120, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-[320px]"
    >
      <div className="relative rounded-xl">

        {/* 🔥 BASE BORDER */}
        <div className="absolute inset-0 rounded-xl border border-white/10" />

        <motion.div

          className="relative h-[380px] rounded-xl overflow-hidden bg-zinc-900 backdrop-blur-xl"
        >
          {/* IMAGE */}
          <img
            src={player.avatar}
            className="w-full h-full object-cover object-top opacity-60"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />

          {/* INFO */}
          <div className="absolute bottom-0 p-4 w-full bg-black/25">
            <div className="text-xl font-bold font-[Rajdhani]">
              {player.username}
            </div>

            <div className="text-xs mt-2 space-y-1 flex gap-3">
              <div>
                <span className="text-gray-400">Skill:</span>{" "}
                {player.specialty}
              </div>
              <div>
                <span className="text-gray-400">Rank:</span>{" "}
                <span className="text-blue-400">{player.rank}</span>
              </div>
              <div>
                <span className="text-gray-400">Region:</span>{" "}
                {player.region}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
/* ── Countdown ── */
function CountdownTimer({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = React.useState(seconds);

  useEffect(() => {
    if (remaining <= 0) return;
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  return (
    <span>
      <span className="mm-timer-num">{m}</span>:
      <span className="mm-timer-num">{String(s).padStart(2, "0")}</span>
    </span>
  );
}

/* ── Small terminal icon ── */
function TerminalIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}
