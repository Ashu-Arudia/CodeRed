'use client'
import Editor from "@monaco-editor/react";
import { Divide } from "lucide-react";
import { Metal_Mania, Oswald, Smooch_Sans } from "next/font/google";
import { useState, useEffect } from "react";
import axios from "axios";


const metalMania = Metal_Mania({
  subsets: ["latin"],
  weight: "400",
});

const backendUrl = process.env.NEXT_PUBLIC_API_URL;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNSIsImV4cCI6MTc2MjQzODA3N30.JyluIZT3TbwqupeXqSrfSzckD7YJKaSExnfjHwKgUmU";

export default function CodeEditor() {
  const cppDefaultCode = `#include <iostream>

int main() {
    std::cout << "Hello, C++ World!";
    return 0;
}`;

  const [code, setCode] = useState<string>(cppDefaultCode);
  const [message, setMessage] = useState<string | null>(null);
  const [result, setResult] = useState<String>("");


  useEffect(() => {
    const saved = localStorage.getItem("userCode");
    if (saved) setCode(saved);
  }, []);

  function handleEditorChange(value?: string) {
    setCode(value ?? "");
  }

  const runCode = () => {
    const fun = async () => {
      try {
        localStorage.setItem("userCode", code);
        const data = {
          "source_code": code,
          "language_id": 7,
          "stdin": null,
          "problem_id": null,
          "match_id": null
        }
        console.log(data);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        };
        const response = await axios.post(
          `${backendUrl}/api/v1/submission/submit`,
          data,
          config
        );

        console.log("response from backend: ", response);
        setResult(response.data.stdout);
      } catch (err) {
        setMessage(" Failed to save locally.");
      }
    }
    fun();
  }

  return (
    <div className="h-screen flex flex-col bg-zinc-950 ">
      {/* header  */}
      <div className="w-full bg-zinc-950 h-10 my-2 items-center flex justify-between">
        {/* logo  */}
        <div
          className={` flex gap-2 pr-12 text-2xl p-3 h-full w-24 ${metalMania.className} relative items-center`}
        >
          <div className="flex gap-2">
            {" "}
            Code <p className="text-red-600">Red </p>
          </div>
        </div>

        {/* Code start  */}
        <div className="items-center bg-zinc-800 cursor-pointer hover:scale-105" onClick={runCode}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className=" m-1"
          >
            <path
              fill="white"
              d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z"
            />
          </svg>
        </div>

        <div className="w-24"></div>
      </div>

      {/* main  */}
      <div className="flex-1 min-h-0 w-full flex px-2 pb-2 gap-2">
        <div className="w-1/3 flex flex-col bg-zinc-800 text-gray-300 font-sans p-6  overflow-y-auto rounded-lg">
          <div className="overflow-y-scroll scrollbar-hide">
            {/* Problem Title */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-white">
                1. Two Sum Challenge
              </h1>
              <div className="flex items-center mt-2 space-x-4">
                <span className="text-sm font-medium px-3 py-1 bg-green-900 text-green-300 rounded-full">
                  Easy
                </span>
                <span className="text-sm text-gray-400">
                  Topic: Array, Hash Table
                </span>
              </div>
            </div>

            {/* Problem Description */}
            <div className="border-t border-zinc-700 pt-4">
              <p className="text-base leading-relaxed">
                Given an array of integers `nums` and an integer `target`, your
                task is to find the indices of the two numbers in the array that
                add up to the `target`.
              </p>
              <p className="mt-3 text-base leading-relaxed">
                You may assume that each input will have **exactly one
                solution**, and you may not use the same element twice. You can
                return the answer in any order.
              </p>
            </div>

            {/* Examples Section */}
            <div className="mt-6">
              {/* Example 1 */}
              <div className="bg-zinc-900 p-4 rounded-lg">
                <p className="font-semibold text-white mb-2">Example 1:</p>
                <div className="font-mono text-sm bg-black p-3 rounded">
                  <p>
                    <span className="text-gray-400">Input:</span>{" "}
                    <span className="text-blue-400">nums = [2, 7, 11, 15]</span>
                    , <span className="text-blue-400">target = 9</span>
                  </p>
                  <p className="mt-1">
                    <span className="text-gray-400">Output:</span>{" "}
                    <span className="text-green-400">[0, 1]</span>
                  </p>
                  <p className="mt-2 text-gray-500">
                    // Explanation: Because nums[0] + nums[1] == 9, we return
                    [0, 1].
                  </p>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-zinc-900 p-4 rounded-lg mt-4">
                <p className="font-semibold text-white mb-2">Example 2:</p>
                <div className="font-mono text-sm bg-black p-3 rounded">
                  <p>
                    <span className="text-gray-400">Input:</span>{" "}
                    <span className="text-blue-400">nums = [3, 2, 4]</span>,{" "}
                    <span className="text-blue-400">target = 6</span>
                  </p>
                  <p className="mt-1">
                    <span className="text-gray-400">Output:</span>{" "}
                    <span className="text-green-400">[1, 2]</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Constraints Section */}
            <div className="mt-6 border-t border-zinc-700 pt-4">
              <h2 className="text-lg font-semibold text-white mb-3">
                Constraints
              </h2>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>
                  <code>
                    2 &lt;= nums.length &lt;= 10<sup>4</sup>
                  </code>
                </li>
                <li>
                  <code>
                    -10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup>
                  </code>
                </li>
                <li>
                  <code>
                    -10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup>
                  </code>
                </li>
                <li>
                  <strong className="text-yellow-500">
                    Only one valid answer exists.
                  </strong>
                </li>
              </ul>
            </div>

            {/* Follow-up Section */}
            <div className="mt-6 border-t border-zinc-700 pt-4">
              <p className="text-base">
                <strong className="text-white">Follow-up:</strong> Can you come
                up with an algorithm that is less than{" "}
                <code>
                  O(n<sup>2</sup>)
                </code>{" "}
                time complexity?
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col rounded-lg">
          <div className="bg-zinc-800 rounded-t-lg p-3 flex-1 flex flex-col">
            <div className="py-2">Code</div>

            <div className="flex-1">
              <Editor
                language="cpp"
                theme="vs-dark"
                defaultValue={cppDefaultCode}
                value={code}
                onChange={handleEditorChange}
              />
            </div>
            <div className="flex flex-col w-full h-fit bg-zinc-800 text-gray-300 font-sans rounded-lg">
              {/* Tab Headers */}
              <div className="flex items-center border-b border-zinc-700">
                <button className="px-4 py-2 text-sm font-medium text-white bg-zinc-900 rounded-tl-lg">
                  Case 1
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:bg-zinc-700">
                  Case 2
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:bg-zinc-700">
                  Case 3
                </button>
              </div>

              {/* Test Case Content */}
              <div className="p-4 space-y-3">
                {/* Input: nums */}
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">
                    Stdout
                  </p>
                  <div className="w-full bg-zinc-900 p-2 rounded font-mono text-sm">
                    {result || " "}
                  </div>
                </div>

              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
