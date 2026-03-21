import { Metal_Mania, Oswald, Smooch_Sans } from "next/font/google";
const metalMania = Metal_Mania({
  subsets: ["latin"],
  weight: "400",
});
export default function Load() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 opacity-40"
        style={{ backgroundImage: "url('/assets/img.jpeg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />

      {/* Animated Grid (cyber feel) */}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        {/* Logo / Title */}

        {/* Multi-layer Loader */}
        <div className="relative flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute w-40 h-40 border border-red-500/30 rounded-full animate-ping" />

          {/* Middle rotating ring */}
          {/* <div className="w-32 h-32 border-4 border-red-500 border-t-transparent rounded-full animate-spin shadow-[0_0_25px_rgba(255,0,0,0.7)]" /> */}
          <div>
            <div
              className={`w-auto flex gap-2 text-6xl ${metalMania.className} relative `}
            >
              Code <p className="text-red-600">Red... </p>
            </div>

          </div>

          {/* Inner pulsing core */}
          {/* <div className="absolute w-10 h-10 bg-red-500 rounded-full blur-md animate-pulse" /> */}
        </div>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes loading {
          0% {
            width: 0%;
          }
          50% {
            width: 80%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
