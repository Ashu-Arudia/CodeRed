"use client";
import Editor from "@monaco-editor/react";
import { Metal_Mania } from "next/font/google";
import { useState, useEffect, useRef } from "react";
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
  const [result, setResult] = useState<string>("");

  // Layout states (percent / px)
  const [leftWidth, setLeftWidth] = useState<number>(33); // percent
  const [editorHeight, setEditorHeight] = useState<number>(60); // percent of available panel height
  const [isLeftDragging, setIsLeftDragging] = useState<boolean>(false);
  const [isVertDragging, setIsVertDragging] = useState<boolean>(false);
  const [isEditorMaximized, setIsEditorMaximized] = useState<boolean>(false);

  // Testcase collapse state
  const [isTestcaseCollapsed, setIsTestcaseCollapsed] =
    useState<boolean>(false);
  const prevEditorHeight = useRef<number>(editorHeight);

  const containerRef = useRef<HTMLDivElement | null>(null);

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
          source_code: code,
          language_id: 7,
          stdin: null,
          problem_id: null,
          match_id: null,
        };
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

        setResult(response.data.stdout);
      } catch (err) {
        setMessage(" Failed to save locally.");
      }
    };
    fun();
  };

  // Mouse/touch handlers for horizontal splitter (left panel)
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!isLeftDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left; // px inside container
      const pct = Math.max(10, Math.min(70, (x / rect.width) * 100));
      setLeftWidth(pct);
    }
    function onMouseUp() {
      setIsLeftDragging(false);
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isLeftDragging]);

  // Mouse/touch handlers for vertical splitter (editor vs output)
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!isVertDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top; // px from top of container
      const pct = Math.max(10, Math.min(90, (y / rect.height) * 100));
      setEditorHeight(pct);
    }
    function onMouseUp() {
      setIsVertDragging(false);
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isVertDragging]);

  const resetLayout = () => {
    setLeftWidth(33);
    setEditorHeight(60);
    setIsEditorMaximized(false);
    setIsTestcaseCollapsed(false);
  };

  const toggleTestcase = () => {
    // collapse/expand bottom testcases area
    if (!isTestcaseCollapsed) {
      prevEditorHeight.current = editorHeight; // save current
      setEditorHeight(100); // make editor full height (hide testcases)
      setIsTestcaseCollapsed(true);
    } else {
      setEditorHeight(prevEditorHeight.current || 60);
      setIsTestcaseCollapsed(false);
    }
  };

  // Keyboard accessibility: press `t` to toggle testcases quickly
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        (e.target as HTMLElement)?.tagName === "INPUT" ||
        (e.target as HTMLElement)?.tagName === "TEXTAREA"
      )
        return;
      if (e.key.toLowerCase() === "t") toggleTestcase();
      if (e.key === "Escape") {
        setIsLeftDragging(false);
        setIsVertDragging(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isTestcaseCollapsed, editorHeight]);

  return (
    <div className="h-screen flex flex-col bg-zinc-950" ref={containerRef}>
      {/* header */}
      <div className="w-full bg-zinc-950 h-10 my-2 items-center flex justify-between px-2">
        <div
          className={` flex gap-2 pr-12 text-2xl p-3 h-full w-24 ${metalMania.className} relative items-center`}
        >
          <div className="flex gap-2">
            {" "}
            Code <p className="text-red-600">Red </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditorMaximized((v) => !v)}
            className="px-3 py-1 bg-zinc-800 rounded hover:bg-zinc-700 text-sm"
            title="Toggle editor maximize"
          >
            {isEditorMaximized ? "Restore" : "Maximize"}
          </button>

          <button
            onClick={resetLayout}
            className="px-3 py-1 bg-zinc-800 rounded hover:bg-zinc-700 text-sm"
            title="Reset layout"
          >
            Reset
          </button>

          <div
            className="items-center bg-zinc-800 cursor-pointer hover:scale-105 ml-2 p-2 rounded"
            onClick={runCode}
            title="Run code"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className=" m-1"
            >
              <path
                fill="white"
                d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* main area */}
      <div className="flex-1 min-h-0 w-full flex px-2 pb-2 gap-2">
        {/* Left panel: problem description */}
        {!isEditorMaximized && (
          <div
            className="flex flex-col bg-zinc-800 text-gray-300 font-sans p-6 overflow-y-auto rounded-lg min-w-[200px]"
            style={{ width: `${leftWidth}%`, maxWidth: "70%", minWidth: "10%" }}
          >
            <div className="overflow-y-scroll scrollbar-hide">
              {/* Problem Title etc... (omitted for brevity) */}
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

              <div className="border-t border-zinc-700 pt-4">
                <p className="text-base leading-relaxed">
                  Given an array of integers `nums` and an integer `target`,
                  your task is to find the indices of the two numbers in the
                  array that add up to the `target`.
                </p>
                <p className="mt-3 text-base leading-relaxed">
                  You may assume that each input will have **exactly one
                  solution**, and you may not use the same element twice. You
                  can return the answer in any order.
                </p>
              </div>

              {/* Examples and rest omitted for brevity (keeps file readable) */}
            </div>
          </div>
        )}

        {/* draggable vertical splitter between left and center */}
        {!isEditorMaximized && (
          <div
            onMouseDown={() => setIsLeftDragging(true)}
            onDoubleClick={() => setLeftWidth(33)}
            className="cursor-col-resize w-1 bg-zinc-700 hover:bg-zinc-600 rounded"
            style={{ cursor: "col-resize" }}
            aria-hidden
          />
        )}

        {/* Center: editor + testcases */}
        <div className="flex-1 flex flex-col rounded-lg min-w-0 bg-transparent">
          <div className="bg-zinc-800 rounded-t-lg p-3 flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between py-2">
              <div className="text-white">Code</div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-400">
                  Editor height: {editorHeight}%
                </div>
                <button
                  onClick={() => setEditorHeight((h) => Math.min(90, h + 5))}
                  className="px-2 py-1 bg-zinc-700 rounded hover:bg-zinc-600 text-sm"
                >
                  +
                </button>
                <button
                  onClick={() => setEditorHeight((h) => Math.max(20, h - 5))}
                  className="px-2 py-1 bg-zinc-700 rounded hover:bg-zinc-600 text-sm"
                >
                  -
                </button>
                <button
                  onClick={toggleTestcase}
                  className="px-2 py-1 bg-zinc-700 rounded hover:bg-zinc-600 text-sm"
                  title="Toggle testcases (t)"
                >
                  {isTestcaseCollapsed ? "Show Tests" : "Hide Tests"}
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 flex flex-col">
              <div
                className="min-h-0 transition-all duration-150 flex flex-col"
                style={
                  isTestcaseCollapsed
                    ? { height: "100%" }
                    : { height: `calc(${editorHeight}% )` }
                }
              >
                <div className="min-h-0 h-full">
                  <Editor
                    language="cpp"
                    theme="vs-dark"
                    defaultValue={cppDefaultCode}
                    value={code}
                    onChange={handleEditorChange}
                    options={{
                      automaticLayout: true,
                      minimap: { enabled: false },
                    }}
                    height="100%"
                  />
                </div>
              </div>

              {/* horizontal draggable splitter for editor / output */}
              {/* Only show the splitter when tests are visible */}
              {!isTestcaseCollapsed && (
                <div
                  onMouseDown={() => setIsVertDragging(true)}
                  onDoubleClick={() => setEditorHeight(60)}
                  className="h-1 bg-zinc-700 hover:bg-zinc-600 cursor-row-resize"
                  aria-hidden
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
