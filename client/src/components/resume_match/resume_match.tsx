"use client";

import { usePathname, useRouter } from "next/navigation";
import { useWebSocketStore } from "@/store/webSocketStore";

export default function ResumeMatchModal() {
  const router = useRouter();
  const pathname = usePathname();

  const matchId = useWebSocketStore((s) => s.matchId);
  const opponent = useWebSocketStore((s) => s.opponent_info);
  const sendEvent = useWebSocketStore((s) => s.sendEvent);
  const matchSource = useWebSocketStore((s) => s.matchSource);

  if (!matchId) return null;

  const matchRoute = `/app/match/${matchId}`;

  if (pathname === matchRoute || matchSource === "found") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 ">
      <div className="bg-zinc-900 p-12 rounded-xl text-white shadow-xl w-xl h-2xl text-center">
        <h2 className="text-xl font-semibold mb-3 ">Resume Match?</h2>

        <p className="mb-5">
          You have an ongoing match with {opponent?.username}
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-white text-black  rounded"
            onClick={() => router.push(`/app/match/${matchId}`)}
          >
            Resume
          </button>

          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => {
              sendEvent({
                type: "end_match",
                payload: { match_id: matchId },
              });

              router.replace("/app/home");
            }}
          >
            End Match
          </button>
        </div>
      </div>
    </div>
  );
}
