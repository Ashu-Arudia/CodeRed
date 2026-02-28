"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Github,
  Award,
  Zap,
  Users,
} from "lucide-react";
import { useSignUp, useLogin } from "@/features/auth/mutations";

import { Metal_Mania } from "next/font/google";

const metalMania = Metal_Mania({
  subsets: ["latin"],
  weight: "400",
});

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

const GoogleIcon = () => (
  <svg
    className="w-5 h-5 mr-3"
    viewBox="0 0 533.5 544.3"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M533.5 272.5c0-18-1.5-37-4.7-54.7H272.1V328h146.4c-6.7 34.6-26.4 64.3-55.7 83.3v70.2h86.2c50.3-46.7 79.4-116.7 79.4-200.5z"
      fill="#4285F4"
    />
    <path
      d="M272.1 544.3c73.6 0 135-24.1 179.6-65.7l-86.2-70.2c-23.7 15.7-54.2 25-93.4 25-71.9 0-133.4-48.5-155.6-113.8H27.5v72.3c44 86 133.5 147.5 244.6 147.5z"
      fill="#34A853"
    />
    <path
      d="M116.5 328c-5.1-15.7-8-32.3-8-49.8s2.9-34.1 8-49.8V156H27.5c-15.6 31.7-24.1 67.5-24.1 106.3 0 38.8 8.5 74.6 24.1 106.3L116.5 328z"
      fill="#FBBC04"
    />
    <path
      d="M272.1 106.3c39.1 0 74.4 13.4 101.9 39.5L401.8 7.3C356 2.4 309.1 0 272.1 0 161 0 71.5 61.5 27.5 147.5l89 72.3c22.3-65.3 83.8-113.8 155.6-113.8z"
      fill="#EA4335"
    />
  </svg>
);

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const signupMutation = useSignUp();
  const loginMutation = useLogin();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLogin) {
      signupMutation.mutate({ email, password }, {
        onSuccess: () => {
          router.replace("/app/profile");
        }
      })
    }
    else {
      loginMutation.mutate(
        { email, password },
        {
          onSuccess: () => {
            router.replace("/app/home");
          },
        }
      );
    }

  };

  const googleAuth = async() => {
    window.location.href = `${backendUrl}/api/v1/auth/google/login`
  }

  return (
    <div className="min-h-screen bg-white text-gray-100 flex items-center justify-center p-4">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 bg-gray-900/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden max-w-6xl w-full">

        {/* Left Section - Marketing Content */}
        <div className="bg-red-800/10 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full mix-blend-multiply filter blur-xl animate-blob opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 opacity-50"></div>

          <div>
            <div className="flex items-center  text-2xl font-bold mb-6">
              <div
                className={`flex gap-2 text-4xl px-1 ${metalMania.className} relative`}
              >
                Code <p className="text-red-600">Red </p>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              The ultimate competitive coding platform where developers sharpen
              their skills and compete globally.
            </h1>
            <ul className="space-y-4 text-gray-300 text-lg mt-8">
              <li className="flex items-center">
                <Award size={24} className="text-red-500 mr-3 flex-shrink-0" />
                Global leaderboards and rankings
              </li>
              <li className="flex items-center">
                <Zap size={24} className="text-red-500 mr-3 flex-shrink-0" />
                Real-time coding challenges
              </li>
              <li className="flex items-center">
                <Users size={24} className="text-red-500 mr-3 flex-shrink-0" />
                Community-driven contests
              </li>
            </ul>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 text-center text-gray-400">
            <div>
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-sm">Active Coders</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">1M+</div>
              <div className="text-sm">Problems Solved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm">Competitions</div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="p-8 md:p-12 lg:p-16 bg-zinc-800 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-400 mb-8">
            {isLogin
              ? "Sign in to continue your coding journey"
              : "Sign up for a new account"}
          </p>

          {error && (
            <div className="mb-6 p-4 rounded-md bg-red-900/50 border border-red-700 text-red-200">
              <p className="font-medium text-sm">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handlesubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-gray-400">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="font-medium text-red-500 hover:text-red-400"
                >
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md transition-colors duration-300 shadow-lg shadow-red-600/30 flex items-center justify-center disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {isLogin ? "Signing In..." : "Signing Up..."}
                </>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-gray-800 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <button

              className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-md transition-colors duration-300 border border-gray-600 shadow-sm"
              onClick={googleAuth}
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* You can add a GitHub button here if you have a separate auth flow for it */}
            <button
              type="button"
              className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-md transition-colors duration-300 border border-gray-600 shadow-sm opacity-60 cursor-not-allowed"
            >
              <Github size={20} className="mr-2" />
              GitHub (Not Implemented)
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="font-medium text-red-500 hover:text-red-400"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>

          <div className="mt-12 text-center text-xs text-gray-500 space-x-4">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
