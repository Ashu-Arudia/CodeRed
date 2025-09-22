"use client";
import React, { useEffect, useState } from "react";

interface FormDataType {
  username: string;
  password: string;
  confirmPassword: string;
  bio: string;
  preferredLanguage: string;
  dateOfBirth: string;
  profileImage: File | null;
}

export default function UserDetailsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bio, setBio] = useState("");
  const maxLength = 200;
  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    password: "",
    confirmPassword: "",
    bio: "",
    preferredLanguage: "python",
    dateOfBirth: "",
    profileImage: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Date picker state
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");

  const codingLanguages = [
    { value: "python", label: "Python", icon: "" },
    { value: "cpp", label: "C/C++", icon: "" },
    { value: "java", label: "Java", icon: "" },
  ];

  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const generatedYears = Array.from(
      { length: currentYear - 1949 },
      (_, i) => currentYear - 13 - i
    );
    setYears(generatedYears);
  }, []);

  // Generate months
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Generate days based on selected month and year
  const getDaysInMonth = (year: string, month: string) => {
    if (!year || !month) return 31;
    return new Date(parseInt(year), parseInt(month), 0).getDate();
  };

  const days = Array.from(
    { length: getDaysInMonth(selectedYear, selectedMonth) },
    (_, i) => i + 1
  );

  // Update dateOfBirth when date components change
  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      const dateString = `${selectedYear}-${selectedMonth}-${selectedDay.padStart(
        2,
        "0"
      )}`;
      setFormData((prev) => ({
        ...prev,
        dateOfBirth: dateString,
      }));
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  const handleInputChange = (field: keyof FormDataType, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          setPreviewImage(event.target.result as string);
          setFormData((prev) => ({
            ...prev,
            profileImage: file,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({
      ...prev,
      profileImage: null,
    }));
  };

  const validateStep1 = (): boolean => {
    const { username, password, confirmPassword } = formData;

    if (!username.trim()) {
      setError("Username is required");
      return false;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      return false;
    }
    if (username.length > 12) {
      setError("Username must be no longer than 12 characters long");
      return false;
    }

    if (!password) {
      setError("Password is required");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const validateStep2 = (): boolean => {
    const { dateOfBirth, preferredLanguage } = formData;

    if (!dateOfBirth) {
      setError("Date of birth is required");
      return false;
    }

    if (!preferredLanguage) {
      setError("Please select a preferred coding language");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    setError("");
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevious = () => {
    setError("");
    setCurrentStep(1);
  };

  const handleSubmit = async () => {
    setError("");

    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("username", formData.username);
      submitData.append("password", formData.password);
      submitData.append("bio", formData.bio);
      submitData.append("preferredLanguage", formData.preferredLanguage);
      submitData.append("dateOfBirth", formData.dateOfBirth);

      if (formData.profileImage) {
        submitData.append("profileImage", formData.profileImage);
      }

      const response = await fetch(
        "http://localhost:8000/api/user/user-details",
        {
          method: "POST",
          body: submitData,
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to save user details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center align-middle p-10">
      {/* Main Container */}
      <div className="w-2xl mx-13  backdrop-blur-lg shadow-2xl rounded-3xl border border-white/20  z-10 overflow-hidden">
        <div className="p-8 lg:p-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black mb-8">
              {currentStep === 1
                ? "Create Your Account"
                : "Complete Your Profile"}
            </h1>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-red-600 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium text-red-800">{error}</span>
              </div>
            </div>
          )}

          {/* Step 1: Account Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-black bg-white"
                    placeholder="Choose a unique username"
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-black bg-white"
                    placeholder="Create a secure password"
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
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
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
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.973 9.973 0 012.553-4.217m3.298-2.126A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.973 9.973 0 01-4.357 5.092M15 12a3 3 0 11-6 0 3 3 0 016 0z"
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-black bg-white"
                    placeholder="Confirm your password"
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="h-5 w-5"
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
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.973 9.973 0 012.553-4.217m3.298-2.126A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.973 9.973 0 01-4.357 5.092M15 12a3 3 0 11-6 0 3 3 0 016 0z"
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

              {/* Next Button */}
              <div className="absolute bottom-12 inline-flex right-12 left-12">
                <button
                  onClick={handleNext}
                  className="text-red-700 font-bold w-full bg-black p-3 rounded-xl transform hover:scale-101 transition-all duration-200 shadow-lg"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Profile Image Upload */}
              <div className="">
                <div className="flex items-center space-x-6 flex-col">
                  <div className="flex-shrink-0">
                    {previewImage ? (
                      <div className="relative">
                        <img
                          src={previewImage}
                          alt="Profile preview"
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="">
                          <input
                            type="file"
                            id="profile-upload"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="profile-upload"
                            className="w-6 h-6 absolute flex items-center justify-center -right-2 -top-2 px-1 py-1 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700  hover:bg-gray-50 cursor-pointer"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          </label>
                        </div>
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                          <svg
                            className="w-8 h-8 text-gray-400"
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
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="w-full max-w-md">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  maxLength={maxLength}
                  placeholder="Write something about yourself..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none  focus:border-black text-gray-700 resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {bio.length}/{maxLength} characters
                </p>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full py-2 px-2 border border-gray-200 rounded-lg focus:border-black  bg-white text-black"
                    >
                      <option value="">Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full py-2 px-2 border border-gray-200 rounded-lg  focus:border-black bg-white text-black"
                    >
                      <option value="">Month</option>
                      {months.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(e.target.value)}
                      className="w-full py-2 px-2 border border-gray-200 rounded-lg focus:border-black  bg-white text-black"
                    >
                      <option value="">Day</option>
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Preferred Coding Language */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Coding Language *
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {codingLanguages.map((language) => (
                    <button
                      key={language.value}
                      type="button"
                      onClick={() =>
                        handleInputChange("preferredLanguage", language.value)
                      }
                      className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                        formData.preferredLanguage === language.value
                          ? "border-black bg-gray-200 text-black"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {/* <div className="text-2xl mb-2">{language.icon}</div> */}
                      <div className="font-semibold">{language.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex space-x-4 pt-6">
                <button
                  onClick={handlePrevious}
                  className="flex-1 bg-gray-200 transform hover:scale-102 text-gray-700 py-2 px-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-black text-red-700 py-3 px-6 rounded-lg font-semibold  transform hover:scale-102 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:transform-none"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
