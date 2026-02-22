"use client";

import React, { useState } from "react";
import { Camera, Calendar } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CompleteProfilePage() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [primaryLanguage, setPrimaryLanguage] = useState("");
  const [goals, setGoals] = useState(""); 
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(
    null
  );

  const [programmingLanguages, setProgrammingLanguages] = useState<string[]>(
    []
  );
  const [platformExperience, setPlatformExperience] = useState<string[]>([]);
  const [participated, setParticipated] = useState<string | null>(null);
  const [preferredDuration, setPreferredDuration] = useState("");

  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePhoto(file);
      // Create a preview URL
      setProfilePhotoPreview(URL.createObjectURL(file));
    }
  };
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log("Tokennn: ", token);
    const userProfileData = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dob,
      bio: goals,
      preferred_language: primaryLanguage,
      profile_photo: profilePhoto ? profilePhoto.name : null,
      experienceLevel: experienceLevel,
      participated: participated
    };
    console.log("User data - ", userProfileData, "\n and token - ",token)

    try {

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${backendUrl}/api/v1/auth/complete-profile`,
        userProfileData,
        config
      );

      console.log("res from backend ", response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.access_token);
      }
      alert(response.data.message);
      router.replace("/home");

    } catch (err) {
      console.log("Error: ",err)
    }

    console.log(userProfileData);

    const alertBox = document.getElementById("alert-box");
    const alertMessage = document.getElementById("alert-message");
    if (alertBox && alertMessage) {
      alertMessage.textContent = "Profile data submitted! Check the console.";
      alertBox.classList.remove("hidden");
      setTimeout(() => {
        alertBox.classList.add("hidden");
      }, 3000);
    } else {
      console.log("Profile data submitted! Check the console.");
    }
  };

  const Checkbox = ({
    id,
    label,
    value,
    onChange,
  }: {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div className="flex items-center">
      <input
        id={id}
        name={id}
        type="checkbox"
        value={value}
        onChange={onChange}
        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-white">
        {label}
      </label>
    </div>
  );

  return (
    <>
      {/* Custom Alert Box */}
      <div
        id="alert-box"
        className="hidden fixed top-5 right-5 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg z-50"
        role="alert"
      >
        <strong className="font-bold">Success!</strong>
        <span id="alert-message" className="block sm:inline ml-2"></span>
        <span
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          onClick={() =>
            document.getElementById("alert-box")?.classList.add("hidden")
          }
        >
          <svg
            className="fill-current h-6 w-6 text-green-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.818l-2.651 2.651a1.2 1.2 0 1 1-1.697-1.697L8.303 10 5.651 7.349a1.2 1.2 0 1 1 1.697-1.697L10 8.182l2.651-2.651a1.2 1.2 0 1 1 1.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>

      <div className="items-center justify-center ">

      </div>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full bg-zinc-900 p-8 md:p-12 shadow-xl rounded-lg">
          <div>
            {/* Corrected: Text color changed to white for high contrast */}
            <h2 className="text-3xl font-extrabold text-white">
              Complete Your Profile
            </h2>
            {/* Corrected: Text color changed to light gray */}
            <p className="mt-2 text-sm text-gray-400">
              Help us personalize your competitive coding experience.
            </p>
          </div>

          {/* Profile Picture Section */}
          <div className="mt-8 flex flex-col items-center">
            <div className="relative">
              <img
                className="h-24 w-24 rounded-full object-cover ring-4 ring-gray-700" // Corrected: Ring color made visible
                src={
                  profilePhotoPreview ||
                  "https://placehold.co/100x100/E2E8F0/A0AEC0?text=User"
                }
                alt="Profile"
              />
              <label
                htmlFor="profile-photo-input"
                className="absolute bottom-0 right-0 flex h-7 w-7 rounded-full bg-red-600 text-white items-center justify-center ring-2 ring-white cursor-pointer" // Corrected: Added 'flex' to center icon
              >
                <Camera size={16} />
                <input
                  id="profile-photo-input"
                  name="profile-photo-input"
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </label>
            </div>
            <label
              htmlFor="profile-photo-input"
              className="mt-3 text-sm font-medium text-red-600 hover:text-red-500 cursor-pointer"
            >
              Change Profile Picture
            </label>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-300"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="mt-1 block w-full px-4 py-3 bg-zinc-800 text-white border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-300" // Corrected: Label color
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  // Corrected: Added dark bg, light text, dark border, and dark placeholder
                  className="mt-1 block w-full px-4 py-3 bg-zinc-800 text-white border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300" // Corrected: Label color
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a unique username"
                  className="mt-1 block w-full px-4 py-3 bg-zinc-800 text-white border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-300" // Corrected: Label color
                >
                  Date of Birth
                </label>
                <input
                  type="date" // This automatically provides a calendar picker
                  name="dob"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="mm/dd/yyyy"
                  className="mt-1 block w-full px-4 py-3 bg-zinc-800 text-white border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm "
                />
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8">
              <h3 className="text-lg font-medium leading-6 text-white">
                {" "}
                {/* Corrected: Text color */}
                Coding Background
              </h3>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="experience-level"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Experience Level
                  </label>
                  <select
                    id="experience-level"
                    name="experience-level"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}

                    className="mt-1 block w-full pl-3 pr-10 py-3 text-base bg-zinc-800 text-white border-gray-700 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                  >
                    <option value="" disabled>
                      Select your level
                    </option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="primary-language"
                    className="block text-sm font-medium text-gray-300" // Corrected: Label color
                  >
                    Primary Language
                  </label>
                  <select
                    id="primary-language"
                    name="primary-language"
                    value={primaryLanguage}
                    onChange={(e) => setPrimaryLanguage(e.target.value)}
                    // Corrected: Removed 'bg-zinc-00', added dark bg, light text, dark border
                    className="mt-1 block w-full pl-3 pr-10 py-3 text-base bg-zinc-800 text-white border-gray-700 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                  >
                    <option value="" disabled>
                      Select primary language
                    </option>
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Java">Java</option>
                    <option value="Cpp">C++</option>
                    <option value="C">C</option>
                    <option value="Go">Go</option>
                    <option value="Rust">Rust</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-white">
                  Other Programming Languages
                </label>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300">
                  <Checkbox
                    id="lang-python"
                    label="Python"
                    value="python"
                    onChange={() => {}}
                  />
                  <Checkbox
                    id="lang-java"
                    label="Java"
                    value="java"
                    onChange={() => {}}
                  />
                  <Checkbox
                    id="lang-cpp"
                    label="C++"
                    value="cpp"
                    onChange={() => {}}
                  />
                  <Checkbox
                    id="lang-js"
                    label="JavaScript"
                    value="javascript"
                    onChange={() => {}}
                  />
                  <Checkbox
                    id="lang-c"
                    label="C"
                    value="c"
                    onChange={() => {}}
                  />
                  <Checkbox
                    id="lang-go"
                    label="Go"
                    value="go"
                    onChange={() => {}}
                  />
                  <Checkbox
                    id="lang-rust"
                    label="Rust"
                    value="rust"
                    onChange={() => {}}
                  />
                  <Checkbox
                    id="lang-other"
                    label="Other"
                    value="other"
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>

            {/* Competitive Programming */}
            {/* Corrected: Border color */}
            <div className="border-t border-gray-700 pt-8">
              <h3 className="text-lg font-medium leading-6 text-white">
                {" "}
                {/* Corrected: Text color */}
                Competitive Programming
              </h3>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    {" "}
                    {/* Corrected: Label color */}
                    Have you participated in competitive programming before?
                  </label>
                  <fieldset className="mt-4">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <input
                          id="participated-yes"
                          name="participated"
                          type="radio"
                          value="yes"
                          onChange={(e) => setParticipated(e.target.value)}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600" // Corrected: Border color
                        />
                        <label
                          htmlFor="participated-yes"
                          className="ml-2 block text-sm text-gray-300" // Corrected: Label color
                        >
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="participated-no"
                          name="participated"
                          type="radio"
                          value="no"
                          onChange={(e) => setParticipated(e.target.value)}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600" // Corrected: Border color
                        />
                        <label
                          htmlFor="participated-no"
                          className="ml-2 block text-sm text-gray-300" // Corrected: Label color
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div>
                  <label
                    htmlFor="contest-duration"
                    className="block text-sm font-medium text-gray-300" // Corrected: Label color
                  >
                    Preferred Contest Duration
                  </label>
                  <select
                    id="contest-duration"
                    name="contest-duration"
                    value={preferredDuration}
                    onChange={(e) => setPreferredDuration(e.target.value)}
                    // Corrected: Added dark bg, light text, dark border
                    className="mt-1 block w-full pl-3 pr-10 py-3 text-base bg-zinc-800 text-white border-gray-700 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                  >
                    <option value="" disabled>
                      Select duration
                    </option>
                    <option value="short">Short (1-2 hours)</option>
                    <option value="medium">Medium (2-3 hours)</option>
                    <option value="long">Long (3+ hours)</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300">
                  {" "}
                  {/* Corrected: Label color */}
                  Platform Experience
                </label>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Assuming <Checkbox> component is styled for dark mode or inherits text color */}
                  <Checkbox
                    id="platform-leetcode"
                    label="LeetCode"
                    value="leetcode"
                    onChange={() => {}}
                  />
                  <Checkbox
                    id="platform-codeforces"
                    label="Codeforces"
                    value="codeforces"
                    onChange={() => {}}
                  />
                  <Checkbox
                    id="platform-hackerrank"
                    label="HackerRank"
                    value="hackerrank"
                    onChange={() => {}}
                  />
                  <Checkbox
                    id="platform-codechef"
                    label="CodeChef"
                    value="codechef"
                    onChange={() => {}}
                  />
                  <Checkbox
                    id="platform-atcoder"
                    label="AtCoder"
                    value="atcoder"
                    onChange={() => {}}
                  />
                  <Checkbox
                    id="platform-topcoder"
                    label="TopCoder"
                    value="topcoder"
                    onChange={() => {}}
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="goals"
                  className="block text-sm font-medium text-gray-300" // Corrected: Label color
                >
                  Tell us about yourself (Bio)
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  rows={4}
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="I'm a CodeRed Champion"
                  // Corrected: Added dark bg, light text, dark border, and dark placeholder
                  className="mt-1 block w-full px-4 py-3 bg-zinc-800 text-white border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                ></textarea>
              </div>
            </div>

            {/* Form Actions */}
            {/* Corrected: Border color */}
            <div className="flex justify-center pt-8 border-t border-gray-700">
              <button
                type="submit"
                className="w-1/2 py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Create Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
