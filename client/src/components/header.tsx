export default function Header() {
  return (
    <header className=" top-0 z-50 bg-black  supports-[backdrop-filter]:bg-none backdrop-blur font-sans text-sm text-white p-4 shadow-lg ">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <div className="w-2/5 ">
          <h1 className="text-md font-bold tracking-tight ">BattleCode</h1>
        </div>
        <div className="flex-grow">
          {/* navigation */}
          <nav className="flex space-x-6">
            <a href="#" className=" hover:text-neutral-900 transition-colors">
              Home
            </a>
            <a href="#" className=" hover:text-neutral-900 transition-colors">
              Battles
            </a>
            <a href="#" className=" hover:text-neutral-900 transition-colors">
              Leaderboard
            </a>
            <a href="#" className=" hover:text-neutral-900 transition-colors">
              Profile
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
