"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = () => {
    window.location.href = "https://quizzer-jqif.onrender.com/api/auth/google";
  };

  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const url = "https://quizzer-jqif.onrender.com/api/auth/login";
    const payload = { username, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in state instead of localStorage for artifact compatibility
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      } else {
        setError(data.msg || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Container */}
      <div className="flex w-full max-w-6xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/20 relative z-10 overflow-hidden min-h-[700px]">
        {/* Left Image Panel */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 items-center justify-center">
          <Image
            src="/assets/image3.jpg" // Image from public folder
            alt="A cool image"
            fill
            className="object-cover"
            priority // optional (preloads image)
          />
        </div>

        {/* Right Login Panel */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="avatar placeholder mb-4">
                <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold">Q</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-black bg-clip-text ">
                Welcome Back
              </h1>
              <p className="text-gray-600 mt-2 font-medium">
                Sign in to your account
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="alert alert-error mb-6 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Login Form */}
            <div className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Username
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input input-bordered w-full pl-12 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-black bg-transparent"
                    placeholder="Enter your username"
                    required
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered pl-12 pr-12 bg-transparent border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-black"
                    placeholder="Enter your password"
                    required
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        className="h-6 w-6 "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.275 4.057-5.065 7-9.543 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.973
         9.973 0 012.553-4.217m3.298-2.126A9.956 9.956 0 0112 5c4.478 0
         8.268 2.943 9.543 7a9.973 9.973 0 01-4.357 5.092M15
         12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3l18 18"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                onClick={handleSubmit}
                className="btn btn-primary w-full bg-black text-white font-semibold py-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 border-0"
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Logging In...
                  </>
                ) : (
                  <>Sign In</>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="divider my-6 text-gray-400">or continue with</div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="w-5 h-5 mr-3"
              />
              Continue with Google
            </button>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={toggleMode}
                  className="link link-primary font-semibold hover:link-hover"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400 rounded-full opacity-60 animate-bounce lg:hidden"></div>
      <div className="absolute bottom-32 right-32 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-bounce animation-delay-1000 lg:hidden"></div>
      <div className="absolute top-1/3 right-20 w-2 h-2 bg-pink-400 rounded-full opacity-60 animate-bounce animation-delay-2000 lg:hidden"></div>
    </div>
  );
}
