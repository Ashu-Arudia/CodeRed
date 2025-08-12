"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaFire,
  FaGamepad,
  FaMedal,
  FaPlay,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import { FaShield, FaBullseye as FaTarget } from "react-icons/fa6";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

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
      tier: "LEGENDARY",
      timeLeft: "3 days",
      difficulty: 5,
    },
    {
      title: "2 V 2",
      mode: "3 CODING QUESTIONS",
      img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop",
      participants: 150,
      prize: "40 Pts",
      tier: "MASTER",
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
      tier: "ROOKIE",
      timeLeft: "6 hours",
      difficulty: 2,
    },
  ];

  const friends = [
    {
      name: "SHADOW_VIPER",
      status: "In Match",
      rank: "Supreme",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      online: true,
      game: "de_dust2",
    },
    {
      name: "NIGHT_HAWK",
      status: "Lobby",
      rank: "Global Elite",
      img: "https://randomuser.me/api/portraits/women/45.jpg",
      online: true,
      game: "Waiting",
    },
    {
      name: "STORM_RIDER",
      status: "Offline",
      rank: "Legendary Eagle",
      img: "https://randomuser.me/api/portraits/men/67.jpg",
      online: false,
      game: "Last seen 2h",
    },
    {
      name: "FROST_BITE",
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
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-500 rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute top-2/3 left-1/5 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping animation-delay-2000"></div>
      </div>

      <div className="relative z-10 grid grid-cols-[220px_1fr_280px] min-h-screen">
        {/* LEFT SIDEBAR - Military Style */}
        <aside className="bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-r border-orange-500/30 shadow-2xl h-screen overflow-y-auto scrollbar-hide">
          {/* Header */}
          {/* <div className="p-6 border-b border-gray-700/50">

            <div className="grid grid-cols-2 gap-3">
              {gameStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-black/60 p-1 rounded-lg border border-gray-700/50"
                >
                  <div className="text-xs text-gray-400 font-mono">
                    {stat.label}
                  </div>
                  <div className={`text-xs font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Navigation */}
          <nav className="p-2 space-y-2">
            {[
              { icon: FaTarget, label: "GAMEATHONS", active: true, badge: "3" },
              { icon: FaTrophy, label: "TOURNAMENTS", badge: "12" },
              { icon: FaGamepad, label: "QUICK MATCH" },
              { icon: FaShield, label: "ONLINE", badge: "NEW" },
              { icon: FaUsers, label: "SQUAD", badge: "4" },
              { icon: FaMedal, label: "ACHIEVEMENTS" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 cursor-pointer group ${
                  item.active
                    ? "bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/50"
                    : "hover:bg-gray-800/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={`text-lg ${
                      item.active
                        ? "text-orange-400"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                  <span
                    className={`font-mono font-semibold text-sm ${
                      item.active
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {item.badge && (
                  <span className="bg-red-600 text-xs px-2 py-1 rounded font-mono font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </nav>
        </aside>

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
                      <div className="flex items-center gap-4 mb-4">
                        <span
                          className={`px-3 py-1 text-xs font-black font-mono rounded ${
                            match.status === "LIVE"
                              ? "bg-red-600 animate-pulse"
                              : match.status === "STARTING"
                              ? "bg-yellow-600"
                              : "bg-blue-600"
                          }`}
                        >
                          {match.status}
                        </span>
                      </div>

                      <h1 className="text-5xl font-black mb-6 text-white tracking-wider">
                        {match.title}
                      </h1>
                      <h2 className="text-xl font-bold text-orange-400 mb-6 font-mono tracking-wide">
                        {match.subtitle}
                      </h2>
                      <div className="flex items-center gap-8 mb-8">
                        <div className="flex items-center gap-2">
                          <FaTrophy className="text-yellow-400" />
                          <span className="font-mono font-bold text-xl text-yellow-400">
                            {match.prize}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaUsers className="text-blue-400" />
                          <span className="font-mono text-blue-400">
                            {match.participants.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaFire className="text-orange-400" />
                          <span className="font-mono text-orange-400">
                            {match.timeLeft}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button className="px-8 py-3 bg-gradient-to-r from-pink-600 to-red-700 rounded-lg font-black font-mono tracking-wider hover:from-orange-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-600/25">
                          JOIN BATTLE
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
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 border border-orange-500/50 rounded-lg flex items-center justify-center transition-all duration-300"
            >
              <FaChevronLeft className="text-orange-400" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 border border-orange-500/50 rounded-lg flex items-center justify-center transition-all duration-300"
            >
              <FaChevronRight className="text-orange-400" />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {featuredMatches.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? "bg-orange-500 w-8"
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
                  ONLINE RANKED GAMES
                </h2>
                <p className="text-gray-400 font-mono">Select your Category</p>
              </div>
              <div className="flex gap-2">
                {["ALL", "RANKED", "NO RANKED"].map((filter) => (
                  <button
                    key={filter}
                    className="px-4 py-2 font-mono text-sm font-bold bg-gray-800 hover:bg-orange-600 transition-colors duration-300 rounded"
                  >
                    {filter}
                  </button>
                ))}
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
                    className={`bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-xl overflow-hidden border-2 transition-all duration-500 ${
                      hoveredCard === idx
                        ? "border-orange-500 shadow-2xl shadow-orange-500/20 transform scale-105"
                        : "border-gray-700/50"
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={tournament.img}
                        alt={tournament.title}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          hoveredCard === idx
                            ? "scale-110 brightness-110"
                            : "scale-100"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                      {/* Tier Badge */}
                      <div
                        className={`absolute top-4 left-4 px-3 py-1 font-mono font-black text-xs rounded ${
                          tournament.tier === "LEGENDARY"
                            ? "bg-gradient-to-r from-yellow-600 to-orange-600"
                            : tournament.tier === "MASTER"
                            ? "bg-gradient-to-r from-purple-600 to-blue-600"
                            : tournament.tier === "EXPERT"
                            ? "bg-gradient-to-r from-green-600 to-teal-600"
                            : "bg-gradient-to-r from-gray-600 to-gray-700"
                        }`}
                      >
                        {tournament.tier}
                      </div>

                      {/* Difficulty Stars */}
                      <div className="absolute top-4 right-4 flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < tournament.difficulty
                                ? "bg-orange-500"
                                : "bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-black text-white mb-3 tracking-wider">
                          {tournament.title}
                        </h3>
                        <p className="text-orange-400 font-mono text-sm">
                          {tournament.mode}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                        <div>
                          <div className="text-gray-400 font-mono text-xs">
                            PRIZE POOL
                          </div>
                          <div className="text-yellow-400 font-bold">
                            {tournament.prize}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400 font-mono text-xs">
                            ONLINE PLAYERS
                          </div>
                          <div className="text-blue-400 font-bold">
                            {tournament.participants.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          {/* <div className="text-gray-400 font-mono text-xs">
                            TIME LEFT
                          </div>
                          <div className="text-green-400 font-bold">
                            {tournament.timeLeft}
                          </div> */}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 py-3 bg-gradient-to-r from-orange-600 to-red-700 rounded-lg font-mono font-black text-sm hover:from-orange-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105">
                          START MATCH
                        </button>
                        <button className="px-6 py-3 border border-orange-500 rounded-lg font-mono font-bold text-orange-400 hover:bg-orange-500 hover:text-black transition-all duration-300">
                          INFO
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
        <aside className="bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-l border-orange-500/30 p-6 overflow-y-auto h-screen scrollbar-hide">
          {/* Leaderboard */}
          <div className="mb-8 border-b border-yellow-400">
            <div className="flex items-center gap-2 mb-4 border-b border-yellow-400">
              {/* <FaTrophy className="text-yellow-400 text-lg" /> */}
              <h3 className="font-mono font-black text-lg tracking-wider">
                GLOBAL RANKINGS
              </h3>
            </div>

            <div className="space-y-3">
              {leaderboard.map((player, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-1 rounded-lg transition-all duration-300 cursor-pointer ${
                    idx < 3
                      ? "bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30"
                      : "bg-black/40 hover:bg-gray-800/50"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="font-mono font-black text-lg">
                      {player.rank}
                    </span>
                  </div>

                  <div className="w-6 h-6 rounded-lg overflow-hidden border-2 border-orange-500/50">
                    <img
                      src={player.img}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="font-mono font-bold text-sm text-white">
                      {player.name}
                    </div>
                    <div className="font-mono text-xs text-orange-400">
                      {player.points.toLocaleString()} Pts
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Squad Members */}
          <div>
            <div className="flex items-center justify-between mb-4 ">
              <div className="flex items-center gap-2 ">
                {/* <FaUsers className="text-blue-400 text-lg" /> */}
                <h3 className="font-mono font-black text-lg tracking-wider">
                  FRIENDS
                </h3>
              </div>
              <div className="bg-green-600/20 text-green-400 px-2 py-1 rounded font-mono text-xs font-bold">
                {friends.filter((f) => f.online).length} ONLINE
              </div>
            </div>

            <div className="space-y-3">
              {friends.map((friend, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-1 bg-black/40 rounded-lg hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-gray-600">
                      <img
                        src={friend.img}
                        alt={friend.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${
                        friend.online
                          ? "bg-green-500 animate-pulse"
                          : "bg-gray-500"
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="font-mono font-bold text-sm text-white">
                      {friend.name}
                    </div>
                    <div className="font-mono text-xs text-gray-400">
                      {friend.rank}
                    </div>
                    <div
                      className={`font-mono text-xs ${
                        friend.online ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {friend.game}
                    </div>
                  </div>

                  {friend.online && (
                    <button className="w-8 h-8 bg-orange-600 hover:bg-orange-700 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <FaPlay className="text-xs" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
