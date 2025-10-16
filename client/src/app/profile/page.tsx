"use client";

import { useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [username, setUsername] = useState("Zenitsu_1");
  const [firstName, setFirstName] = useState("Zenitsu");
  const [lastName, setLastName] = useState("Agatsuma");
  const [dateOfBirth, setDateOfBirth] = useState("2000-01-01");
  const [bio, setBio] = useState("I will kill you!");
  const [preferredLanguage, setPreferredLanguage] = useState("Cpp");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const graphqlUrl = "https://9198840bf6b6.ngrok-free.app/graphql";

  const HARDCODED_TOKEN =
    "header eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxM…QyMn0.lgSbjvmMTHd4JLCDt_rBYBBNzzBF3bPHHoh48AY3jrk";

  const clean = (obj: Record<string, any>) =>
    Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined && v !== "")
    );

  const sanitizeHeaderValue = (v: string) => {
    if (!v) return v;

    let replaced = v.replace(/\u2026/g, "...");

    replaced = replaced.replace(/[\u2018\u2019\u201A\u201B\u2032]/g, "'");
    replaced = replaced.replace(/[\u201C\u201D\u201E\u201F\u2033]/g, '"');

    const offending: number[] = [];
    for (let i = 0; i < replaced.length; i++) {
      const code = replaced.charCodeAt(i);
      if (code > 0xff) offending.push(code);
    }
    if (offending.length > 0) {
      console.warn(
        "sanitizeHeaderValue: token contains non-Latin1 code points (will be stripped):",
        offending
      );
    }

    const cleaned = replaced.replace(/[^\x00-\xFF]/g, "");
    return cleaned;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    const input = clean({
      username,
      firstName: firstName, // ✅ camelCase keys
      lastName: lastName, // ✅ camelCase keys
      dateOfBirth: dateOfBirth, // ✅ camelCase keys
      bio,
      preferredLanguage: preferredLanguage, // ✅ camelCase keys
    });

    // <-- Updated mutation: no token variable, returns userId & profileComplete
    const mutation = `
      mutation CompleteProfile($input: CompleteProfileInput!) {
        completeProfile(input: $input) {
          success
          message
          userId
          profileComplete
        }
      }
    `;

    // doRequest now either includes Authorization header (useHeader = true)
    // or sends no Authorization header (useHeader = false).
    const doRequest = async (useHeader: boolean) => {
      const body = {
        query: mutation,
        variables: { input },
      };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (useHeader && HARDCODED_TOKEN) {
        const safeToken = sanitizeHeaderValue(HARDCODED_TOKEN);
        headers["Authorization"] = `Bearer ${safeToken}`;
      }

      return axios.post(graphqlUrl, body, { headers });
    };

    try {
      console.log("Sending GraphQL variables (input):", input);

      let response;
      if (HARDCODED_TOKEN) {
        try {
          // first try with Authorization header
          response = await doRequest(true);
        } catch (err: any) {
          const msg = String(err?.message || "");
          const isHeaderEncodingError =
            msg.includes("String contains non ISO-8859-1") ||
            msg.includes("setRequestHeader");

          if (isHeaderEncodingError) {
            console.warn(
              "Header value caused XHR encoding error. Retrying WITHOUT Authorization header (mutation does not accept token variable)."
            );

            // retry without sending header (mutation no longer expects token variable)
            response = await doRequest(false);
          } else {
            throw err;
          }
        }
      } else {
        // no token available — just send the request without Authorization
        response = await doRequest(false);
      }

      if (!response) {
        throw new Error("No response returned from server.");
      }

      if (response.data?.errors && response.data.errors.length > 0) {
        console.error("GraphQL errors:", response.data.errors);
        setError(response.data.errors[0].message || "GraphQL error occurred.");
      } else {
        const result = response.data?.data?.completeProfile;
        console.log(" Server response:", result);

        if (result?.success) {
          // result contains success, message, userId, profileComplete
          setSuccess(result.message || "Profile sent successfully!");
        } else {
          setError(result?.message || "Failed to complete profile.");
        }
      }
    } catch (err: any) {
      console.error(" Network/Error:", err);
      const webErr =
        err?.response?.data?.errors?.[0]?.message ||
        err?.response?.data?.message ||
        err?.message ||
        String(err);
      setError(webErr);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-800 border border-red-100 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-800 border border-green-100 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full input input-bordered"
              placeholder="username"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full input input-bordered"
                placeholder="First name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full input input-bordered"
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="mt-1 block w-full input input-bordered"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 block w-full textarea textarea-bordered"
              rows={3}
              placeholder="Tell something about yourself"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred language
            </label>
            <input
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              className="mt-1 block w-full input input-bordered"
              placeholder="Preferred language (e.g., Cpp, Python)"
            />
          </div>

          <div className="flex items-center space-x-3 mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn bg-black text-white px-4 py-2 rounded disabled:opacity-60"
            >
              {isLoading ? "Sending..." : "Send Profile"}
            </button>

            <button
              type="button"
              onClick={() => {
                setUsername("Zenitsu_1");
                setFirstName("Zenitsu");
                setLastName("Agatsuma");
                setDateOfBirth("2000-01-01");
                setBio("I will kill you!");
                setPreferredLanguage("Cpp");
                setError(null);
                setSuccess(null);
              }}
              className="btn btn-ghost px-4 py-2"
            >
              Reset Example
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
