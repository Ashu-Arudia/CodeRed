"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  Github,
  Twitter,
  Linkedin,
  Book, // For Problem Library
  CheckCircle, // For Test Cases
  Target, // For Problem Tracking
  Users, // For Discussion Forums
  Code, // For Code Editor
  Trophy, // For Achievements
  Zap, // For "The Idea" icons
  Heart, // For "The Idea" icons
  Award, // For "The Idea" icons
  Check, // For Why CodeRed list
  ArrowRight,
  ChevronRight,
  UserCircle, // <-- RE-ADDED for avatars
  // Calendar, <-- REMOVED
} from "lucide-react";
import { Metal_Mania } from "next/font/google";
import { useRouter } from "next/navigation";

const metalMania = Metal_Mania({
  subsets: ["latin"],
  weight: "400",
});

// Main App Component (Page Component for Next.js)
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navbar items from the new design
  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Support", href: "#support" },
    { name: "Blog", href: "#blog" },
  ];

  // Data for the new Leaderboard Card
  const topChampions = [
    {
      avatar: UserCircle,
      name: "@codeMaster",
      points: "2450 pts",
      rank: "Grandmaster",
      rankColor: "text-red-700 bg-red-100",
    },
    {
      avatar: UserCircle,
      name: "@logicQueen",
      points: "2412 pts",
      rank: "Master",
      rankColor: "text-yellow-700 bg-yellow-100",
    },
    {
      avatar: UserCircle,
      name: "@pyDev",
      points: "2398 pts",
      rank: "Master",
      rankColor: "text-yellow-700 bg-yellow-100",
    },
  ];

  // "The Idea" section items (*** UPDATED ***)
  const ideaItems = [
    {
      icon: Zap,
      title: "Challenge",
      description:
        "Put your skills to the test in real-time coding tournaments and head-to-head battles against other developers.",
    },
    {
      icon: Heart,
      title: "Community",
      description:
        "Join a passionate community. Discuss problems, share solutions, and grow together with peers from around the world.",
    },
    {
      icon: Award,
      title: "Mastery",
      description:
        "Go from novice to grandmaster. Master data structures and algorithms, track your progress, and earn achievements.",
    },
  ];

  // "Key Features" section items (*** UPDATED ***)
  const keyFeatures = [
    {
      icon: Book,
      title: "Problem Library",
      description:
        "Access 1000s of manually curated problems with solutions and test cases.",
    },
    {
      icon: CheckCircle, // Re-purposing this icon
      title: "Live Contests", // Changed title
      description: "Participate in weekly contests and challenge your skills.", // This description now fits the title
    },
    {
      icon: Target,
      title: "Problem Tracking",
      description:
        "View your implemented code and track your progress to improve.",
    },
    {
      icon: Users,
      title: "Discussion Forums",
      description:
        "Access detailed editorials, alt solutions, and ask questions.",
    },
    {
      icon: Code,
      title: "Code Editor",
      description:
        "State-of-the-art code editor with syntax highlighting, and auto-complete.",
    },
    {
      icon: Trophy,
      title: "Achievements",
      description:
        "Earn points and badges, show off your skills, and get on the leaderboard.",
    },
  ];

  // "Why CodeRed" list items (*** UPDATED ***)
  const whyItems = [
    {
      icon: Check,
      text: "A learning platform for a new generation of software programming experts.",
    },
    {
      icon: Check,
      text: "Built for competition. Our platform provides real-time judging and accurate leaderboards.",
    },
    {
      icon: Check,
      text: "From practice to performance. Access a vast problem library, join weekly contests, and discuss solutions.",
    },
  ];

  // Footer links
  const footerLinks = {
    company: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Blog", href: "#" },
    ],
    product: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Docs", href: "#" },
      { name: "Support", href: "#" },
    ],
    community: [
      { name: "Discord", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "GitHub", href: "#" },
      { name: "Events", href: "#" },
    ],
    support: [
      { name: "Contact", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Status", href: "#" },
      { name: "Security", href: "#" },
    ],
  };
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased font-sans">
      {/* Header */}
      <header className="relative z-50 bg-white border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="text-xl font-bold flex items-center space-x-2">
            <div
              className={`flex gap-1 text-2xl px-1 ${metalMania.className} relative`}
            >
              Code <p className="text-red-600">Red </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              onClick={() => {
                router.push("/login");
              }}
              className="text-red-600 font-medium hover:text-red-700 transition-colors cursor-pointer"
            >
              Login
            </a>
            <a
              href="#"
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-md transition-colors duration-300 shadow-sm"
            >
              Join
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-red-600"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <div className="flex flex-col space-y-4 p-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-red-600 text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <hr className="border-gray-200" />
              <a href="#" className="text-red-600 font-medium text-lg">
                Login
              </a>
              <a
                href="#"
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-3 rounded-md transition-colors duration-300 text-center"
              >
                Join
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="overflow-hidden">
     
        <section className="container mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Hero Text Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
                <div className="text-red-600">The Arena for</div> Every <div></div>
                Developer
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Join the ultimate coding arena. Compete with developers
                worldwide, climb the ranks, and become the CodeRed Champion
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <button className="bg-white text-red-600 font-medium px-6 py-3 rounded-md border border-red-600 hover:bg-red-50 transition-colors">
                  Our languages
                </button>
                <button className="bg-white text-gray-700 font-medium px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors">
                  Core Products
                </button>
              </div>
              <div className="flex space-x-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900">100k+</div>
                  <div className="text-gray-500">Developers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-gray-500">Problems</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">80+</div>
                  <div className="text-gray-500">Contests</div>
                </div>
              </div>
            </div>

            {/*
             *
             * START OF REPLACEMENT (Leaderboard Card)
             *
             */}
            <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 transition-all duration-300 ease-in-out transform rotate-3 hover:rotate-0 hover:scale-105">
              <div className="font-semibold flex gap-2 text-lg mb-4 text-gray-900">
                Top <div className="text-red-600">CodeRed</div> Champions
              </div>
              <ul className="space-y-4">
                {topChampions.map((user, index) => (
                  <li
                    key={user.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <user.avatar size={28} className="text-gray-400" />
                      <div>
                        <span className="font-semibold text-gray-800 block">
                          {user.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {user.points}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${user.rankColor}`}
                    >
                      {user.rank}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-4 text-sm font-medium text-red-600 hover:text-red-700 flex items-center justify-center">
                View full leaderboard{" "}
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
            {/*
             *
             * END OF REPLACEMENT
             *
             */}
          </div>
        </section>
        {/* "The Idea" Section */}
        <section id="idea" className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                The Idea
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Competitive programming isn't just about code, it's about
                solving complex problems efficiently. We built a platform that
                streamlines this process, from learning to competition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ideaItems.map((item) => (
                <div key={item.title} className="text-center p-6">
                  <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* "Key Features" Section */}
        <section id="features" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Key Features {" "}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to excel in competitive programming, all in
                one platform.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {keyFeatures.map((feature) => (
                <div key={feature.title} className="flex space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mt-1">
                    <feature.icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* "Why CodeRed?" Section */}
        <section id="why" className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                  Why CodeRed?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our platform is more than just a code editor. It's a
                  comprehensive ecosystem designed to build the next generation
                  of programming experts.
                </p>
                <ul className="space-y-6">
                  {whyItems.map((item, index) => (
                    <li key={index} className="flex space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center">
                        <item.icon size={16} />
                      </div>
                      <span className="text-gray-700">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right CTA Card */}
              <div className="bg-red-600 text-white p-8 md:p-12 rounded-xl shadow-lg">
                <h3 className="text-3xl font-bold mb-4">Ready to Start?</h3>
                <p className="text-red-100 mb-8">
                  Create your account today and access the best tools for
                  competitive programming.
                </p>
                <div className="flex items-center space-x-8 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold">500+</div>
                    <div className="text-red-200">Problems Solved Daily</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">24/7</div>
                    <div className="text-red-200">Support</div>
                  </div>
                </div>
                <button className="w-full bg-white text-red-600 font-bold px-8 py-4 rounded-lg text-lg transition-colors duration-300 hover:bg-gray-100 shadow-sm">
                  Create free account
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Simple CTA Icons Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex justify-center space-x-12 md:space-x-20">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-200 transition-colors">
                <Github size={32} />
              </div>
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-200 transition-colors">
                <Twitter size={32} />
              </div>
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-200 transition-colors">
                <Heart size={32} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Logo & Info */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <a
                href="#"
                className="text-xl font-bold flex items-center space-x-2 mb-4"
              >
                <span className="w-6 h-6 bg-red-600 rounded-md text-white flex items-center justify-center font-bold text-sm">
                  CR
                </span>
                <span className="text-white">CodeRed</span>
              </a>
              <p className="text-sm">
                The best platform to master competitive coding.
              </p>
            </div>

            {/* Footer Link Columns */}
            <div>
              <h5 className="font-semibold text-white mb-4">Company</h5>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Product</h5>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Community</h5>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Support</h5>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="my-10 border-gray-700" />

          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} CodeRed, Inc. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}