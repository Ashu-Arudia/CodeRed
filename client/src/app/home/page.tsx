"use client";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFire, FaUsers } from "react-icons/fa";
import Card from "../component/login-card";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [verified, setVerified] = useState<string | null>(null);

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const tokenParam = searchParams.get("token");
    const verifiedParam = searchParams.get("verified");
    setVerified(verifiedParam);
    if (tokenParam) {
      setToken(tokenParam);
      localStorage.setItem("token", tokenParam);
    }
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        setScrollY(mainRef.current.scrollTop);
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
      return () => mainElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Auto-carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMatches.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuredMatches = [
    {
      title: "C++ VIRTUAL STORM",
      subtitle: "CHAMPIONSHIP FINALS",
      desc: "",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1400&auto=format&fit=crop",
      prize: "240 Pts",
      participants: 2847,
      timeLeft: "2h 45m",
      status: "LIVE",
      mapName: "Neural Complex",
    },
    {
      title: "PYTHON WORLD SERIES",
      subtitle: "RANKED CHAMPIONSHIP",
      desc: "",
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1400&auto=format&fit=crop",
      prize: "210 Pts",
      participants: 1456,
      timeLeft: "45m",
      status: "STARTING",
      mapName: "Cyber Fortress",
    },
    {
      title: "JAVA ADVANCED BATTLE",
      subtitle: "SQUAD WARFARE",
      desc: "",
      img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1400&auto=format&fit=crop",
      prize: "260 Pts",
      participants: 890,
      timeLeft: "1h 20m",
      status: "WARMUP",
      mapName: "Urban Conflict",
    },
  ];

  const tournaments = [
    {
      title: "1 V 1",
      mode: "2 CODING QUESTIONS",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
      participants: 100,
      prize: "30 Pts",
      tier: "EXPERT",
      timeLeft: "3 days",
      difficulty: 5,
    },
    {
      title: "2 V 2",
      mode: "3 CODING QUESTIONS",
      img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop",
      participants: 150,
      prize: "40 Pts",
      tier: "MEDIUM",
      timeLeft: "12 hours",
      difficulty: 4,
    },
    {
      title: "FASTEST DEBUGGER",
      mode: "4 MCQ BASED QUESTIONS",
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=600&auto=format&fit=crop",
      participants: 85,
      prize: "35 Pts",
      tier: "EXPERT",
      timeLeft: "2 days",
      difficulty: 4,
    },
    {
      title: "C++ COMPETITIVE PROGRAMMING",
      mode: "3 BOTH TYPE OF QUESTIONS",
      img: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=600&auto=format&fit=crop",
      participants: 20,
      prize: "100",
      tier: "EASY",
      timeLeft: "6 hours",
      difficulty: 2,
    },
  ];

  const friends = [
    {
      name: "Shadow_Viper",
      status: "In Match",
      rank: "Supreme",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      online: true,
      game: "de_dust2",
    },
    {
      name: "Night_Hawk",
      status: "Lobby",
      rank: "Global Elite",
      img: "https://randomuser.me/api/portraits/women/45.jpg",
      online: true,
      game: "Waiting",
    },
    {
      name: "Storm_Rider",
      status: "Offline",
      rank: "Legendary Eagle",
      img: "https://randomuser.me/api/portraits/men/67.jpg",
      online: false,
      game: "Last seen 2h",
    },
    {
      name: "Frost_Bite",
      status: "In Match",
      rank: "Master Guardian",
      img: "https://randomuser.me/api/portraits/women/23.jpg",
      online: true,
      game: "de_mirage",
    },
  ];

  const leaderboard = [
    {
      name: "APEX_PREDATOR",
      points: 2120,
      rank: 1,
      change: "+12",
      img: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      name: "DIGITAL_GHOST",
      points: 2102,
      rank: 2,
      change: "-1",
      img: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "CYBER_NINJA",
      points: 1908,
      rank: 3,
      change: "+3",
      img: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
      name: "NEON_STRIKER",
      points: 1984,
      rank: 4,
      change: "+1",
      img: "https://randomuser.me/api/portraits/women/67.jpg",
    },
    {
      name: "VOID_HUNTER",
      points: 1899,
      rank: 5,
      change: "-2",
      img: "https://randomuser.me/api/portraits/men/28.jpg",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMatches.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredMatches.length) % featuredMatches.length
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {verified && <Card />}
      <div className="relative grid grid-cols-[50px_1fr_250px] min-h-full">
        {/* LEFT SIDEBAR */}
        {/* for drawer */}
        <div>
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">{/* Page content here */}</div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-screen w-60 p-4">
                {/* Sidebar content here */}
                <li>
                  <a>ACCOUNT</a>
                </li>
                <li>
                  <a>FRIENDS</a>
                </li>
              </ul>
            </div>
          </div>

          <ul className="menu bg-base-200 rounded-box h-screen">
            <li>
              <label
                htmlFor="my-drawer"
                className="tooltip tooltip-right cursor-pointer btn btn-circle swap swap-rotate"
                data-tip="Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
              </label>
            </li>

            <li className="indicator mt-3">
              <span className="indicator-item badge badge-secondary text-xs">
                12
              </span>
              <a className="tooltip tooltip-right" data-tip="Leaderboard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </a>
            </li>

            <li className="mt-3">
              <a className="tooltip tooltip-right" data-tip="About Us">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>
            </li>

            <li className="mt-3">
              <a className="tooltip tooltip-right" data-tip="Settings">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.983 13.977a2.993 2.993 0 110-5.986 2.993 2.993 0 010 5.986zM19.428 12.593a7.948 7.948 0 000-1.186l2.078-1.602a.5.5 0 00.12-.65l-1.97-3.414a.5.5 0 00-.607-.22l-2.449.98a7.963 7.963 0 00-1.027-.594l-.37-2.6a.5.5 0 00-.496-.424h-3.94a.5.5 0 00-.496.424l-.37 2.6c-.36.168-.703.365-1.027.594l-2.449-.98a.5.5 0 00-.607.22L2.374 9.155a.5.5 0 00.12.65l2.078 1.602a7.948 7.948 0 000 1.186l-2.078 1.602a.5.5 0 00-.12.65l1.97 3.414a.5.5 0 00.607.22l2.449-.98c.324.229.667.426 1.027.594l.37 2.6a.5.5 0 00.496.424h3.94a.5.5 0 00.496-.424l.37-2.6c.36-.168.703-.365 1.027-.594l2.449.98a.5.5 0 00.607-.22l1.97-3.414a.5.5 0 00-.12-.65l-2.078-1.602z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* MAIN CONTENT */}
        <main
          ref={mainRef}
          className="bg-black/60 backdrop-blur-sm overflow-y-auto h-screen relative"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style jsx>{`
            main::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Hero Carousel */}
          <div className="relative h-96 overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              ref={carouselRef}
            >
              {featuredMatches.map((match, idx) => (
                <div key={idx} className="min-w-full relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${match.img})`,
                      transform: `translateY(${scrollY * 0.3}px)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="relative z-10 h-full flex items-center p-12">
                    <div className="max-w-2xl">
                      <h1 className="text-5xl font-black mb-6 text-white tracking-wider">
                        {match.title}
                      </h1>
                      <h2 className="text-xl font-bold text-orange-400 mb-6 font-mono tracking-wide">
                        {match.subtitle}
                      </h2>
                      <div className="flex items-center gap-8 mb-8">
                        <div className="flex items-center gap-2">
                          {/* <FaTrophy className="text-yellow-400" /> */}
                          <span className="font-mono font-bold text-lg text-white">
                            {match.prize}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaUsers className="text-white-400 border-2" />
                          <span className="font-mono text-white-400">
                            {match.participants.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaFire className="border-2 " />
                          <span className="font-mono text-white">
                            {match.timeLeft}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button className="btn btn-outline btn-warning rounded-sm">
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-none hover:bg-gray-500  hover:rounded-3xl flex items-center justify-center transition-all duration-300"
            >
              <FaChevronLeft className="text-white font-bold" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-none hover:bg-gray-500  hover:rounded-3xl flex items-center justify-center transition-all duration-300"
            >
              <FaChevronRight className="text-white font-bold" />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {featuredMatches.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? "bg-white w-8"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Tournament Grid */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black tracking-wider text-white mb-2">
                  AVAILABLE ARENAS
                </h2>
                <p className="text-gray-400 font-sans">Select your Category</p>
              </div>
              <div role="tablist" className="tabs tabs-border">
                <a role="tab" className="tab tab-active">
                  RANKED
                </a>
                <a role="tab" className="tab mx-4 ">
                  NORMAL
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {tournaments.map((tournament, idx) => (
                <div
                  key={idx}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`card relative h-80 rounded-2xl overflow-hidden border transition-all duration-500 shadow-2xl ${
                      hoveredCard === idx
                        ? "border-black  transform scale-105"
                        : "border-gray-800"
                    }`}
                  >
                    {/* Full background image */}
                    <div className="absolute inset-0">
                      <img
                        src={tournament.img}
                        alt={tournament.title}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          hoveredCard === idx
                            ? "scale-110 brightness-75"
                            : "scale-100 brightness-60"
                        }`}
                      />

                      {/* Luxury dark overlay with subtle gold tint */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40"></div>
                    </div>

                    {/* Content overlay */}
                    <div className="card-body relative z-10 p-6 h-full flex flex-col justify-between">
                      {/* Top section - Title and Badge */}
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between">
                          <h3 className="text-2xl font-bold text-white drop-shadow-2xl leading-tight tracking-wide">
                            {tournament.title}
                          </h3>
                        </div>
                      </div>

                      {/* Middle section - Stats with luxury glass effect */}
                      <div className="grid grid-cols-2 gap-4 p-5 rounded-xl bg-none shadow-xl">
                        <div className="text-center">
                          <div className="text-yellow-200/80 font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
                            MIN. POINTS
                          </div>
                          <div className="text-2xl font-bold text-yellow-300 drop-shadow-lg">
                            {tournament.prize}
                          </div>
                        </div>
                        <div className="text-center border-l border-yellow-300/20 pl-4">
                          <div className="text-yellow-200/80 font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
                            Players Online
                          </div>
                          <div className="text-2xl font-bold text-white drop-shadow-lg">
                            {tournament.participants.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Bottom section - Luxury action buttons */}
                      <div className="card-actions justify-between gap-4">
                        <button
                          className={`btn flex-1 font-bold transition-all duration-300 shadow-xl border-0 tracking-wide
                              bg-white text-black shadow-black/50"
                          `}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                          START MATCH
                        </button>
                        <button
                          className={`btn backdrop-blur-sm bg-black/50 border-2 border-white/80 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-lg `}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="bg-[#191E24]  rounded-tl-2xl rounded-bl-2xl p-6 overflow-y-auto h-screen scrollbar-hide">
          {/* Squad Members */}
          <div>
            <div className="flex items-center justify-between mb-4  ">
              <div className="flex items-center gap-2 ">
                <h3 className="font-black text-md tracking-wider">FRIENDS</h3>
              </div>
            </div>

            <div className="space-y-3">
              {friends.map((friend, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-1 bg-none cursor-pointer group rounded-tl-2xl rounded-bl-2xl"
                >
                  <div className="relative">
                    <div className="avatar avatar-online">
                      <div className="w-11 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="font-[var(--font-poppins)] text-xs text-white">
                      {friend.name}
                    </div>
                    <div className="font-light italic text-xs text-gray-400">
                      {friend.rank}
                    </div>
                  </div>

                  {
                    <div className="dropdown dropdown-bottom dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn-ghost p-1  font-bold"
                      >
                        :
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu rounded-box z-1 w-52 p-2 shadow-sm bg-black"
                      >
                        <li>
                          <a>Invite</a>
                        </li>
                        <li>
                          <a>Delete User</a>
                        </li>
                      </ul>
                    </div>
                  }
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
