"use client";
import axios from "axios";
import { Metal_Mania, Oswald, Smooch_Sans } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFire, FaUsers } from "react-icons/fa";
import Logo from "../component/logo";
import { useRouter } from "next/navigation";
import Notification from "../component/notification/notific";
import Stats from "../component/stats/stat";
import Friends from "../friends/page";
import Settings from "../settings/setting";
import Hackathon from "../hackathon/page";
import userDetails from "../../store/UserDetails";
import Community from "../community/page";
import userState from "./store/stateStore";

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

const metalMania = Metal_Mania({
  subsets: ["latin"],
  weight: "400",
});

const smoochSans = Smooch_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-smooch-sans",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-oswald",
});


export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [notification, setNotification] = useState<Boolean>(false);
  const [stat, setStat] = useState<Boolean>(false);
  const [showFriends, setShowFriends] = useState<Boolean>(false);
  const [showSettings, setShowSettings] = useState<Boolean>(false);
  const router = useRouter();
  const [addfriends, setaddfriends] = useState<Boolean>(false);
  const [isranked, setIsranked] = useState<Boolean>(true);
  const [nav, setNav] = useState<"home" | "hackathon" | "bonus">("home");
  const [addedFriends, setAddedFriends] = useState<String[]>([]);


  //store
  const setUserDetail = userDetails((s) => s.setUser)
  const community = userState((s) => s.communityState);
  const setCommunity = userState((s) => s.setCommunityState);

  //User details
  const [user, setUser] = useState({
    bio: "I'm a codeRed champion",
    country: null,
    created_at: "",
    current_rank: "Grandmaster",
    current_rating: 1256,
    date_of_birth: "2024-12-10",
    email: "testuser@gmail.com",
    first_name: "Test",
    is_verified: true,
    last_login: null,
    last_name: "User",
    matches_won: 12,
    preferred_language: "Cpp",
    problems_solved: 10,
    profile_complete: true,
    timezone: "",
    total_matches: 23,
    user_id: 2,
    username: "XUser",
    win_rate: 45,
  });

  const inputclick = () => {
    inputRef.current?.click();
  };

  const setnav = (para : "home"| "hackathon" | "bonus") => {
    setNav(para);
  }

  const shownotification = () => {
    setNotification(true);
  }
  const dontshownotification = () => {
    setNotification(false);
  }
  const showstat = () => {
    setStat(true);
  }
  const dontshowstat = () => {
    setStat(false);
  }

  const showfriend = (add: boolean) => {
    setaddfriends(add);
    setShowFriends(true);
  }
  const dontshowfriend = () => {
    setShowFriends(false);
  }

  const showsettings = () => {
    setShowSettings(true);
  }
  const dontshowsettings = () => {
    setShowSettings(false);
  }
  const isrank = (para : Boolean) => {
    setIsranked(para);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Tokenn: ", token);
    if (!token) {
      router.replace("/login");
    }
    const fetchdata = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        };
        const url = `${backendUrl}/api/v1/auth/me`;
        const response = await axios.get(
          `${backendUrl}/api/v1/auth/me`,
          config
        );

        setUser((prevUser) => ({
          ...prevUser,
          ...response.data,
        }));
        setUserDetail(response.data);
        console.log("response from backend: ", response.data);
      } catch (err) {
        console.log("Error occured: ", err);
      }
    };
    fetchdata();

    setUserDetail(user);
  }, []);

  useEffect(() => {
    console.log("User state has been updated:", user);
  }, [user]);

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
    <>
      <div
        className={`flex-1 flex flex-col h-screen bg-black bg-no-repeat p-3 text-white ${smoochSans.className}`}
      >
        {/* header1  */}
        <div
          className={`gap-3 text-sm tracking-widest align-middle px-1 pb-2 h-fit w-full flex flex-row font-bold ${smoochSans.className}`}
        >
          <div className="cursor-pointer opacity-80  items-center flex">
            SUPPORT
          </div>
          <div className="cursor-pointer opacity-80 items-center flex">
            FAIR PLAY
          </div>
          <div className="cursor-pointer opacity-80 items-center flex">
            POLICIES
          </div>

          {/* Team members  */}
          <div className="flex-1 px-5 flex gap-2 justify-center items-center">
            {/* Player1  */}
            <div className="flex items-center gap-3 bg-zinc-900 w-fit rounded-lg">
              <div className="avatar avatar-online ">
                <div className="w-9 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="34"
                    viewBox="0 0 36 32"
                  >
                    <path
                      fill="currentColor"
                      d="M.5 31.983a.503.503 0 0 0 .612-.354c1.03-3.843 5.216-4.839 7.718-5.435c.627-.149 1.122-.267 1.444-.406c2.85-1.237 3.779-3.227 4.057-4.679a.5.5 0 0 0-.165-.473c-1.484-1.281-2.736-3.204-3.526-5.416a.5.5 0 0 0-.103-.171c-1.045-1.136-1.645-2.337-1.645-3.294c0-.559.211-.934.686-1.217a.5.5 0 0 0 .243-.408C10.042 5.036 13.67 1.026 18.12 1l.107.007c4.472.062 8.077 4.158 8.206 9.324a.5.5 0 0 0 .178.369c.313.265.459.601.459 1.057c0 .801-.427 1.786-1.201 2.772a.5.5 0 0 0-.084.158c-.8 2.536-2.236 4.775-3.938 6.145a.5.5 0 0 0-.178.483c.278 1.451 1.207 3.44 4.057 4.679c.337.146.86.26 1.523.403c2.477.536 6.622 1.435 7.639 5.232a.5.5 0 0 0 .966-.26c-1.175-4.387-5.871-5.404-8.393-5.95c-.585-.127-1.09-.236-1.336-.344c-1.86-.808-3.006-2.039-3.411-3.665c1.727-1.483 3.172-3.771 3.998-6.337c.877-1.14 1.359-2.314 1.359-3.317c0-.669-.216-1.227-.644-1.663C27.189 4.489 23.19.076 18.227.005l-.149-.002c-4.873.026-8.889 4.323-9.24 9.83c-.626.46-.944 1.105-.944 1.924c0 1.183.669 2.598 1.84 3.896c.809 2.223 2.063 4.176 3.556 5.543c-.403 1.632-1.55 2.867-3.414 3.676c-.241.105-.721.22-1.277.352c-2.541.604-7.269 1.729-8.453 6.147a.5.5 0 0 0 .354.612"
                    />
                  </svg>
                </div>
              </div>
              <div>{addedFriends?.[0] || "User"}</div>
              {!addedFriends?.[0] && (
                <div className="flex-1 justify-center flex cursor-pointer mx-3 rounded-full w-5 h-5"></div>
              )}
              {addedFriends?.[0] && (
                <div
                  className="flex-1 justify-center flex items-center  cursor-pointer mx-3 rounded-full w-5 h-5"
                  onClick={() => {
                    setAddedFriends((prev) =>
                      prev.filter((name) => name != addedFriends[0])
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#b50000"
                      d="M15.854 12.854L11 8l4.854-4.854a.503.503 0 0 0 0-.707L13.561.146a.5.5 0 0 0-.707 0L8 5L3.146.146a.5.5 0 0 0-.707 0L.146 2.439a.5.5 0 0 0 0 .707L5 8L.146 12.854a.5.5 0 0 0 0 .707l2.293 2.293a.5.5 0 0 0 .707 0L8 11l4.854 4.854a.5.5 0 0 0 .707 0l2.293-2.293a.5.5 0 0 0 0-.707"
                    />
                  </svg>
                </div>
              )}
            </div>
            {/* Player2  */}
            <div className="flex items-center gap-3 bg-zinc-900 w-fit rounded-lg pr-8">
              <div className="avatar avatar-offline">
                <div className="w-9 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="34"
                    viewBox="0 0 36 32"
                  >
                    <path
                      fill="currentColor"
                      d="M.5 31.983a.503.503 0 0 0 .612-.354c1.03-3.843 5.216-4.839 7.718-5.435c.627-.149 1.122-.267 1.444-.406c2.85-1.237 3.779-3.227 4.057-4.679a.5.5 0 0 0-.165-.473c-1.484-1.281-2.736-3.204-3.526-5.416a.5.5 0 0 0-.103-.171c-1.045-1.136-1.645-2.337-1.645-3.294c0-.559.211-.934.686-1.217a.5.5 0 0 0 .243-.408C10.042 5.036 13.67 1.026 18.12 1l.107.007c4.472.062 8.077 4.158 8.206 9.324a.5.5 0 0 0 .178.369c.313.265.459.601.459 1.057c0 .801-.427 1.786-1.201 2.772a.5.5 0 0 0-.084.158c-.8 2.536-2.236 4.775-3.938 6.145a.5.5 0 0 0-.178.483c.278 1.451 1.207 3.44 4.057 4.679c.337.146.86.26 1.523.403c2.477.536 6.622 1.435 7.639 5.232a.5.5 0 0 0 .966-.26c-1.175-4.387-5.871-5.404-8.393-5.95c-.585-.127-1.09-.236-1.336-.344c-1.86-.808-3.006-2.039-3.411-3.665c1.727-1.483 3.172-3.771 3.998-6.337c.877-1.14 1.359-2.314 1.359-3.317c0-.669-.216-1.227-.644-1.663C27.189 4.489 23.19.076 18.227.005l-.149-.002c-4.873.026-8.889 4.323-9.24 9.83c-.626.46-.944 1.105-.944 1.924c0 1.183.669 2.598 1.84 3.896c.809 2.223 2.063 4.176 3.556 5.543c-.403 1.632-1.55 2.867-3.414 3.676c-.241.105-.721.22-1.277.352c-2.541.604-7.269 1.729-8.453 6.147a.5.5 0 0 0 .354.612"
                    />
                  </svg>
                </div>
              </div>
              <div>User</div>
            </div>
            {/* Player3  */}
            <div className="flex items-center gap-3 bg-zinc-900 w-fit rounded-lg pr-15">
              <div className="avatar">
                <div className="w-9 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="34"
                    viewBox="0 0 36 32"
                  >
                    <path
                      fill="currentColor"
                      d="M.5 31.983a.503.503 0 0 0 .612-.354c1.03-3.843 5.216-4.839 7.718-5.435c.627-.149 1.122-.267 1.444-.406c2.85-1.237 3.779-3.227 4.057-4.679a.5.5 0 0 0-.165-.473c-1.484-1.281-2.736-3.204-3.526-5.416a.5.5 0 0 0-.103-.171c-1.045-1.136-1.645-2.337-1.645-3.294c0-.559.211-.934.686-1.217a.5.5 0 0 0 .243-.408C10.042 5.036 13.67 1.026 18.12 1l.107.007c4.472.062 8.077 4.158 8.206 9.324a.5.5 0 0 0 .178.369c.313.265.459.601.459 1.057c0 .801-.427 1.786-1.201 2.772a.5.5 0 0 0-.084.158c-.8 2.536-2.236 4.775-3.938 6.145a.5.5 0 0 0-.178.483c.278 1.451 1.207 3.44 4.057 4.679c.337.146.86.26 1.523.403c2.477.536 6.622 1.435 7.639 5.232a.5.5 0 0 0 .966-.26c-1.175-4.387-5.871-5.404-8.393-5.95c-.585-.127-1.09-.236-1.336-.344c-1.86-.808-3.006-2.039-3.411-3.665c1.727-1.483 3.172-3.771 3.998-6.337c.877-1.14 1.359-2.314 1.359-3.317c0-.669-.216-1.227-.644-1.663C27.189 4.489 23.19.076 18.227.005l-.149-.002c-4.873.026-8.889 4.323-9.24 9.83c-.626.46-.944 1.105-.944 1.924c0 1.183.669 2.598 1.84 3.896c.809 2.223 2.063 4.176 3.556 5.543c-.403 1.632-1.55 2.867-3.414 3.676c-.241.105-.721.22-1.277.352c-2.541.604-7.269 1.729-8.453 6.147a.5.5 0 0 0 .354.612"
                    />
                  </svg>
                </div>
              </div>
              <div></div>
            </div>
            {/* Player4  */}
            {/* <div className="flex items-center gap-3 bg-zinc-900 w-fit rounded-lg pr-15">
              <div className="avatar">
                <div className="w-9 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="34"
                    viewBox="0 0 36 32"
                  >
                    <path
                      fill="currentColor"
                      d="M.5 31.983a.503.503 0 0 0 .612-.354c1.03-3.843 5.216-4.839 7.718-5.435c.627-.149 1.122-.267 1.444-.406c2.85-1.237 3.779-3.227 4.057-4.679a.5.5 0 0 0-.165-.473c-1.484-1.281-2.736-3.204-3.526-5.416a.5.5 0 0 0-.103-.171c-1.045-1.136-1.645-2.337-1.645-3.294c0-.559.211-.934.686-1.217a.5.5 0 0 0 .243-.408C10.042 5.036 13.67 1.026 18.12 1l.107.007c4.472.062 8.077 4.158 8.206 9.324a.5.5 0 0 0 .178.369c.313.265.459.601.459 1.057c0 .801-.427 1.786-1.201 2.772a.5.5 0 0 0-.084.158c-.8 2.536-2.236 4.775-3.938 6.145a.5.5 0 0 0-.178.483c.278 1.451 1.207 3.44 4.057 4.679c.337.146.86.26 1.523.403c2.477.536 6.622 1.435 7.639 5.232a.5.5 0 0 0 .966-.26c-1.175-4.387-5.871-5.404-8.393-5.95c-.585-.127-1.09-.236-1.336-.344c-1.86-.808-3.006-2.039-3.411-3.665c1.727-1.483 3.172-3.771 3.998-6.337c.877-1.14 1.359-2.314 1.359-3.317c0-.669-.216-1.227-.644-1.663C27.189 4.489 23.19.076 18.227.005l-.149-.002c-4.873.026-8.889 4.323-9.24 9.83c-.626.46-.944 1.105-.944 1.924c0 1.183.669 2.598 1.84 3.896c.809 2.223 2.063 4.176 3.556 5.543c-.403 1.632-1.55 2.867-3.414 3.676c-.241.105-.721.22-1.277.352c-2.541.604-7.269 1.729-8.453 6.147a.5.5 0 0 0 .354.612"
                    />
                  </svg>
                </div>
              </div>
              <div></div>
            </div> */}
          </div>

          <div className="flex items-center text-center gap-2 px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <path
                fill="#cd2e2e"
                d="M15.9 5.5C15.3 4.5 14.2 4 13 4H7c-1.2 0-2.3.5-2.9 1.5c-2.3 3.5-2.8 8.8-1.2 9.9s5.2-3.7 7.1-3.7s5.4 4.8 7.1 3.7c1.6-1.1 1.1-6.4-1.2-9.9M8 9H7v1H6V9H5V8h1V7h1v1h1zm5.4.5c0 .5-.4.9-.9.9s-.9-.4-.9-.9s.4-.9.9-.9s.9.4.9.9m1.9-2c0 .5-.4.9-.9.9s-.9-.4-.9-.9s.4-.9.9-.9s.9.4.9.9"
              />
            </svg>
            99 <div className="opacity-40">TOTAL MATCHES </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-grid *:[grid-area:1/1]">
              <div className="status status-success animate-ping"></div>
              <div className="status status-success"></div>
            </div>
            139 <div className="opacity-40">PLAYERS ONLINE </div>
          </div>
        </div>

        {/* header2  */}
        <div
          className={` ${oswald.className} flex flex-row h-18 w-full  bg-[#121111] items-center`}
        >
          <div
            className={`w-auto flex gap-2 pr-12 text-2xl px-3 ${metalMania.className} relative`}
          >
            Code <p className="text-red-600">Red </p>
            <div className="absolute -bottom-7 left-1 w-25 h-3 bg-red-800 rounded-full blur-xl"></div>
          </div>

          {/* home  */}
          <div
            className="px-3 cursor-pointer  flex items-center  gap-1 "
            onClick={() => setNav("home")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill={`${nav === "home" ? "red" : "currentcolor"}`}
                d="M5 19v-8.692q0-.384.172-.727t.474-.565l5.385-4.078q.423-.323.966-.323t.972.323l5.385 4.077q.303.222.474.566q.172.343.172.727V19q0 .402-.299.701T18 20h-3.384q-.344 0-.576-.232q-.232-.233-.232-.576v-4.769q0-.343-.232-.575q-.233-.233-.576-.233h-2q-.343 0-.575.233q-.233.232-.233.575v4.77q0 .343-.232.575T9.385 20H6q-.402 0-.701-.299T5 19"
              />
            </svg>
            <div className="hover:scale-101 ">Home</div>
          </div>

          {/* hackathon  */}
          <div
            className="px-3 cursor-pointer flex gap-1 items-center "
            onClick={() => setNav("hackathon")}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill={`${nav === "hackathon" ? "red" : "currentcolor"}`}
                d="M22 8.162v.073c0 .86 0 1.291-.207 1.643s-.584.561-1.336.98l-.793.44c.546-1.848.729-3.834.796-5.532l.01-.221l.002-.052c.651.226 1.017.395 1.245.711c.283.393.283.915.283 1.958m-20 0v.073c0 .86 0 1.291.207 1.643s.584.561 1.336.98l.794.44c-.547-1.848-.73-3.834-.797-5.532l-.01-.221l-.001-.052c-.652.226-1.018.395-1.246.711C2 6.597 2 7.12 2 8.162"
              />
              <path
                fill={`${nav === "hackathon" ? "red" : "currentcolor"}`}
                fillRule="evenodd"
                d="M16.377 2.347A26.4 26.4 0 0 0 12 2c-1.783 0-3.253.157-4.377.347c-1.139.192-1.708.288-2.184.874c-.475.586-.45 1.219-.4 2.485c.173 4.348 1.111 9.78 6.211 10.26V19.5H9.82a1 1 0 0 0-.98.804l-.19.946H6a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5h-2.65l-.19-.946a1 1 0 0 0-.98-.804h-1.43v-3.534c5.1-.48 6.039-5.911 6.211-10.26c.05-1.266.076-1.9-.4-2.485c-.476-.586-1.045-.682-2.184-.874"
                clipRule="evenodd"
              />
            </svg>
            <div className="hover:scale-101">Tournaments</div>
          </div>

          {/* Bonus  */}
          <div
            className="px-3 cursor-pointer flex gap-1 items-center "
            onClick={() => setNav("bonus")}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
            >
              <path
                fill={`${nav === "bonus" ? "red" : "currentcolor"}`}
                d="M23.005 12.003v2c0 3.314-4.925 6-11 6c-5.967 0-10.824-2.591-10.995-5.823l-.005-.177v-2c0 3.313 4.925 6 11 6s11-2.687 11-6m-11-8c6.075 0 11 2.686 11 6s-4.925 6-11 6s-11-2.687-11-6s4.925-6 11-6"
              />
            </svg>
            <div className="hover:scale-101">Bonus</div>
          </div>

          <div className="flex-1"></div>

          {/* right  */}
          <div className="gap-5 px-3 flex items-center">
            {/* Points  */}
            <div className="stats shadow ">
              <div className="stat flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="red"
                    d="m12 2.6l-3 9.8l-7 7.5l10-2.3L22 20l-7-7.5z"
                  />
                </svg>
                <div className="stat-value cursor-pointer" onClick={showstat}>
                  {user.current_rating}
                </div>
                <div className="">PTS</div>
              </div>
            </div>

            {/* Custom card  */}
            <div className="flex gap-1 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M15.58 16.8L12 14.5l-3.58 2.3l1.08-4.12L6.21 10l4.25-.26L12 5.8l1.54 3.94l4.25.26l-3.29 2.68M20 12a2 2 0 0 1 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2a2 2 0 0 1-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 1-2-2"
                />
              </svg>
              <div>12</div>
            </div>

            {/* level  */}
            <div className="flex gap-1">
              <div className="font-bold">LVL</div>
              <div className="">45</div>
            </div>

            {/* Profile  */}
            <div className="flex gap-3 items-center p-3">
              <div className="rounded-full bg-zinc-900 border border-zinc-500 flex items-center gap-3">
                <div className="avatar pl-3 py-2">
                  <div className="w-8 rounded-xl">
                    <img src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" />
                  </div>
                </div>

                <div className="pr-3">{user.username}</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="cursor-pointer hover:scale-105"
                >
                  <path fill="currentColor" d="m7 10l5 5l5-5z" />
                </svg>
              </div>
            </div>

            {/* anouncement  */}
            <div className="relative inline-block" onClick={shownotification}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 1024 1024"
                className="cursor-pointer hover:scale-105 "
              >
                <path
                  fill="white"
                  d="M880 112c-3.8 0-7.7.7-11.6 2.3L292 345.9H128c-8.8 0-16 7.4-16 16.6v299c0 9.2 7.2 16.6 16 16.6h101.6c-3.7 11.6-5.6 23.9-5.6 36.4c0 65.9 53.8 119.5 120 119.5c55.4 0 102.1-37.6 115.9-88.4l408.6 164.2c3.9 1.5 7.8 2.3 11.6 2.3c16.9 0 32-14.2 32-33.2V145.2C912 126.2 897 112 880 112M344 762.3c-26.5 0-48-21.4-48-47.8c0-11.2 3.9-21.9 11-30.4l84.9 34.1c-2 24.6-22.7 44.1-47.9 44.1"
                />
              </svg>
              <div className="absolute -top-4 -right-3 bg-red-700 text-white text-sm  p-[3px] rounded-full w-6 h-6 items-center justify-center flex ">
                3
              </div>
            </div>

            {/* settings  */}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="cursor-pointer hover:scale-103"
              >
                <path
                  fill="white"
                  d="m12 1l9.5 5.5v11L12 23l-9.5-5.5v-11zm0 14a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* main  */}
        <div className="flex-1 relative overflow-hidden p-2">
          <div className="relative flex  h-full gap-3">
            {/* LEFT SIDEBAR */}
            <div className="h-full flex flex-col gap-3 text-lg">
              {/* options  */}
              <div className="rounded-lg bg-[#121111] p-4 gap-5 flex flex-col ">
                {/* Friends  */}
                <div
                  className="w-full h-full cursor-pointer hover:bg-zinc-800 relative"
                  onClick={() => showfriend(false)}
                >
                  <div className="absolute top-0 left-0 w-12 h-12 bg-red-800 rounded-full blur-2xl"></div>
                  <div className="flex gap-3 mr-10 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M64 128a112 112 0 1 1 224 0a112 112 0 1 1-224 0M0 464c0-97.2 78.8-176 176-176s176 78.8 176 176v6c0 23.2-18.8 42-42 42H42c-23.2 0-42-18.8-42-42zM432 64a96 96 0 1 1 0 192a96 96 0 1 1 0-192m0 240c79.5 0 144 64.5 144 144v22.4c0 23-18.6 41.6-41.6 41.6H389.6c6.6-12.5 10.4-26.8 10.4-42v-6c0-51.5-17.4-98.9-46.5-136.7c22.6-14.7 49.6-23.3 78.5-23.3"
                      />
                    </svg>
                    Friends
                  </div>
                </div>

                {/* Empire */}
                <div
                  className="w-full h-full cursor-pointer hover:bg-zinc-800 "
                  onClick={() => {
                    setCommunity(true);
                  }}
                >
                  <div className="flex gap-3 mr-10 cursor-pointer items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 9V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6m0 0v-6.172a2 2 0 0 0-.586-1.414l-3-3a2 2 0 0 0-2.828 0l-3 3A2 2 0 0 0 3 13.828V18a2 2 0 0 0 2 2h3m5 0H8m0-4v4m9.001-12H17m.002 4H17m.001 4H17"
                      />
                    </svg>
                    Empire
                  </div>
                </div>

                {/* Store */}
                <div
                  className="w-full h-full cursor-pointer hover:bg-zinc-800 "
                  onClick={() => {
                    router.push("/community");
                  }}
                >
                  <div className="flex gap-3 mr-10 cursor-pointer items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M20 4H4v2h16zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6zm-9 4H6v-4h6z"
                      />
                    </svg>
                    Store
                  </div>
                </div>

                {/* help  */}
                <div className="w-full h-full cursor-pointer hover:bg-zinc-800 ">
                  <div
                    className="flex gap-3 mr-10 cursor-pointer items-center"
                    onClick={() => {
                      router.push("/help");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M11.95 18q.525 0 .888-.363t.362-.887t-.362-.888t-.888-.362t-.887.363t-.363.887t.363.888t.887.362m-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.312.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825M12 22q-2.075 0-3.9-.787t-3.175-2.138T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                      />
                    </svg>
                    Help
                  </div>
                </div>

                {/* settings  */}
                <div
                  className="w-full h-full cursor-pointer hover:bg-zinc-800 "
                  onClick={showsettings}
                >
                  <div className="flex gap-3 mr-10 cursor-pointer items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2 2 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.62 1.62 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.03 2.03 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361s-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a2 2 0 0 0-.399 1.479c.053.394.287.798.757 1.605s.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2 2 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a2 2 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361s.306-1.064.782-1.36c.324-.203.533-.364.682-.556a2 2 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605s-.704-1.21-1.022-1.453a2.03 2.03 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.62 1.62 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2 2 0 0 0-1.09-1.083M12.5 15c1.67 0 3.023-1.343 3.023-3S14.169 9 12.5 9s-3.023 1.343-3.023 3s1.354 3 3.023 3"
                        clipRule="evenodd"
                      />
                    </svg>
                    Settings
                  </div>
                </div>

                {/* daily quest  */}
                <div className="gap-2 flex flex-col">
                  <div className="border-t pt-4 text-xl font-bold">
                    DAILY QUESTS
                  </div>

                  <div className="w-full h-full cursor-pointer hover:bg-zinc-800 ">
                    <div className="flex gap-3 cursor-pointer items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                          <path
                            fill="currentColor"
                            d="M7.67 5.5A5 5 0 0 1 12 3a5 5 0 0 1 4.33 2.5L17.2 7H6.8zm-4.117.606a1 1 0 0 1 1.341.447c.147.293.5.674.973.99C6.353 7.867 6.781 8 7 8h10c.219 0 .647-.133 1.133-.457c.474-.316.826-.697.973-.99a1 1 0 1 1 1.788.894c-.353.707-1 1.326-1.652 1.76a5.5 5.5 0 0 1-.966.516A9.8 9.8 0 0 1 18.892 12H21a1 1 0 1 1 0 2h-2.012a10 10 0 0 1-.74 3.327c.572.33.963.86 1.209 1.35A5.5 5.5 0 0 1 20 21a1 1 0 1 1-2 0c0-.374-.101-.966-.332-1.428c-.13-.26-.26-.409-.385-.49c-1.056 1.486-2.539 2.54-4.283 2.835V13a1 1 0 1 0-2 0v8.917c-1.744-.295-3.227-1.35-4.283-2.834c-.126.08-.255.23-.385.49A3.5 3.5 0 0 0 6 21a1 1 0 1 1-2 0a5.5 5.5 0 0 1 .543-2.322c.246-.492.637-1.02 1.209-1.35A10 10 0 0 1 5.012 14H3a1 1 0 1 1 0-2h2.108a9.8 9.8 0 0 1 .616-2.277a5.5 5.5 0 0 1-.966-.516c-.651-.434-1.3-1.053-1.652-1.76a1 1 0 0 1 .447-1.341"
                          />
                        </g>
                      </svg>
                      <div className="whitespace-nowrap">Solve A Quick Bug</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex w-full">
              {nav === "home" && (
                <main
                  ref={mainRef}
                  className=" backdrop-blur-sm overflow-y-auto relative rounded-lg bg-[#121111] p-3 gap-5 flex-1 "
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <style jsx>{`
                    main::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>

                  {/* Hero Carousel */}
                  <div className="relative h-60 overflow-hidden rounded-t-lg">
                    <div
                      className="flex transition-transform duration-700 ease-in-out h-full"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                      }}
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
                        <p className="text-gray-400 font-sans">
                          Select your Category
                        </p>
                      </div>

                      {/* ranked and classic button  */}
                      <div className="flex rounded-lg  px-2 py-2 justify-between ">
                        <div
                          onClick={() => isrank(true)}
                          className={` w-full h-full text-xl text-center cursor-pointer font-bold rounded-lg px-2 ${
                            isranked ? "bg-red-500" : ""
                          }`}
                        >
                          RANKED
                        </div>
                        <div
                          onClick={() => isrank(false)}
                          className={`w-full h-full text-xl text-center cursor-pointer font-bold rounded-lg px-2 ${
                            isranked ? "" : "bg-red-500"
                          }`}
                        >
                          CLASSIC
                        </div>
                      </div>
                    </div>

                    {/* ranked games  */}
                    {isranked && (
                      <div className="grid grid-cols-3 gap-6">
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
                                  src="/image2.jpg"
                                  alt={tournament.title}
                                  className={`w-full h-full object-cover transition-all duration-700 ${
                                    hoveredCard === idx
                                      ? "scale-110 brightness-75 opacity-100"
                                      : "scale-100 brightness-60 opacity-90"
                                  }`}
                                />

                                {/* Luxury dark overlay with subtle gold tint */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40"></div>
                              </div>

                              {/* Content overlay */}
                              <div className="card-body relative z-10 p-6 h-full flex flex-col justify-between">
                                {/* Top section - Title and Badge */}
                                <div className="flex gap-3 h-full items-center justify-between">
                                  <div className="flex items-start justify-between w-full">
                                    <h3 className="text-2xl font-bold text-white drop-shadow-2xl leading-tight tracking-wide justify-center  w-full flex">
                                      {tournament.title}
                                    </h3>
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
                                    <div
                                      onClick={() => {
                                        router.push("/matchmaking");
                                      }}
                                    >
                                      START MATCH
                                    </div>
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
                    )}

                    {/* classic games  */}
                    {!isranked && (
                      <div className="grid grid-cols-3 gap-6">
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
                                  src="/image3.jpg"
                                  alt={tournament.title}
                                  className={`w-full h-full object-cover transition-all duration-700  ${
                                    hoveredCard === idx
                                      ? "scale-110 brightness-75 opacity-100"
                                      : "scale-100 brightness-60 opacity-90"
                                  }`}
                                />

                                {/* Luxury dark overlay with subtle gold tint */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40"></div>
                              </div>

                              {/* Content overlay */}
                              <div className="card-body relative z-10 p-6 h-full flex flex-col justify-between">
                                {/* Top section - Title and Badge */}
                                <div className="flex gap-3 h-full items-center justify-between">
                                  <div className="flex items-start justify-center w-full">
                                    <h3 className="text-2xl font-bold text-white rounded-lg drop-shadow-2xl leading-tight tracking-wide justify-center flex">
                                      {tournament.title}
                                    </h3>
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
                                    <div
                                      onClick={() => {
                                        router.push("/matchmaking");
                                      }}
                                    >
                                      START MATCH
                                    </div>
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
                    )}
                  </div>
                </main>
              )}

              {nav === "hackathon" && <Hackathon />}
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className=" rounded-2xl  gap-3 flex flex-col">
              <div className="flex flex-col flex-1 bg-[#121111] rounded-xl shadow-lg w-50 text-white">
                {/* Header with Invite Button */}
                <div className="flex justify-between items-center p-2  border-gray-700">
                  <h1 className="text-lg">Friends</h1>
                  <div
                    onClick={() => showfriend(true)}
                    className="cursor-pointer text-lg font-bold text-gray-400 hover:text-white hover:bg-gray-700 rounded-full w-7 h-7 flex items-center justify-center transition-colors"
                  >
                    +
                  </div>
                </div>

                {/* Friends List Container */}
                <div className="flex-grow p-2 overflow-y-auto">
                  {/* Friend Item 1 (Online) */}
                  <div className="flex items-center p-2 hover:bg-zinc-800 rounded-lg cursor-pointer ">
                    <div className="relative">
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        alt="Avatar"
                      />
                      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-gray-800"></span>
                    </div>
                    <div className="ml-3">
                      <p className="text-lg">Alice</p>
                    </div>
                    <div
                      className="flex-1 flex justify-end text-3xl mr-3"
                      onClick={() => {
                        setAddedFriends((prev) => [...prev, "Alice"]);
                      }}
                    >
                      +
                    </div>
                  </div>

                  {/* Friend Item 2 (Online) */}
                  <div className="flex items-center p-2 mt-1 hover:bg-zinc-800 rounded-lg cursor-pointer">
                    <div className="relative">
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704a"
                        alt="Avatar"
                      />
                      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-gray-800"></span>
                    </div>
                    <div className="ml-3">
                      <p className="text-lg">Bob</p>
                    </div>
                    <div
                      className="flex-1 flex justify-end text-3xl mr-3"
                      onClick={() => {
                        setAddedFriends((prev) => [...prev, "Bob"]);
                      }}
                    >
                      +
                    </div>
                  </div>

                  {/* Friend Item 3 (Offline) */}
                  <div className="flex items-center p-2 mt-1 hover:bg-zinc-800 rounded-lg cursor-pointer opacity-70">
                    <div className="relative">
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704b"
                        alt="Avatar"
                      />
                      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-gray-500 ring-2 ring-gray-800"></span>
                    </div>
                    <div className="ml-3">
                      <p className="text-lg">Charlie</p>
                    </div>
                  </div>

                  {/* Friend Item 4 (Offline) */}
                  <div className="flex items-center p-2 mt-1 hover:bg-zinc-800 rounded-lg cursor-pointer opacity-70">
                    <div className="relative">
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704c"
                        alt="Avatar"
                      />
                      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-gray-500 ring-2 ring-gray-800"></span>
                    </div>
                    <div className="ml-3">
                      <p className="text-lg">David</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      {notification && (
        <div className="w-full absolute top-0 z-10 flex justify-center items-center  h-full">
          <div
            onClick={dontshownotification}
            className="w-full h-full bg-black opacity-50 "
          ></div>
          <div className="overflow-auto  absolute z-20 flex  items-center scrollbar-hide w-1/2 rounded-lg">
            <Notification />
          </div>
        </div>
      )}

      {/* stats  */}
      {stat && (
        <div className="w-full absolute top-0 z-10 flex justify-center items-center h-full">
          <div
            onClick={dontshowstat}
            className="w-full h-full bg-black opacity-50 "
          ></div>
          <div className="overflow-auto scrollbar-hide absolute z-20 flex h-full  items-center rounded-lg py-6">
            <Stats user={user} />
          </div>
        </div>
      )}

      {/* Friends  */}
      {showFriends && (
        <div className="w-full absolute top-0 z-10 flex justify-center items-center  h-screen">
          <div
            onClick={dontshowfriend}
            className="w-full h-full bg-black opacity-50 "
          ></div>
          <div className="overflow-auto scrollbar-hide absolute z-20 flex h-full  items-center rounded-lg py-6 w-2/3">
            <Friends addfriend={addfriends} />
          </div>
        </div>
      )}

      {/* Settings  */}
      {showSettings && (
        <div className="w-full absolute top-0 z-10 flex justify-center items-center  h-screen  ">
          <div
            onClick={dontshowsettings}
            className="w-full h-full bg-black/20 backdrop-blur-sm"
          ></div>
          <div className="overflow-auto scrollbar-hide absolute z-20 flex h-full  items-center rounded-lg py-6 w-2/3 ">
            <Settings user={user} />
          </div>
        </div>
      )}

      {/* Community  */}
      {community && (
        <div className="w-full absolute top-0 z-10 flex justify-center items-center  h-screen  ">
          <div
            onClick={() => {
              setCommunity(false);
            }}
            className="w-full h-full"
          ></div>
          <div className=" absolute z-20 flex h-full justify-center items-center rounded-lg p-12 w-full ">
            <Community />
          </div>
        </div>
      )}
    </>
  );
}
