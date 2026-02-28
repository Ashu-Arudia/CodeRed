export default function Load() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('/assets/img.jpeg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
        {/* Glowing Spinner */}
        <div className="relative">
          <div className="w-28 h-28 border-4 border-red-500 border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(239,68,68,0.8)]"></div>
        </div>

        {/* Text */}
        <h1 className="mt-10 text-3xl font-bold tracking-widest animate-pulse">
          INITIALIZING BATTLE ARENA...
        </h1>


      </div>
    </div>
  );
}
