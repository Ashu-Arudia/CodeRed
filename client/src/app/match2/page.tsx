"use client";
import Editor from "@monaco-editor/react";
import { Metal_Mania } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { div } from "framer-motion/client";
import Test from "./testcase";

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

  const [isOpen, setIsOpen] = useState(false);

  //flower
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isShiftHeld, setIsShiftHeld] = useState(false);
  const editorRef = useRef<any>(null);
  const monacoDisposableRef = useRef<any[]>([]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const buttons = [
    { id: 1, icon: "📷", title: "Camera" },
    { id: 2, icon: "📝", title: "Edit" },
    { id: 3, icon: "🖼️", title: "Gallery" },
    { id: 4, icon: "🎤", title: "Mic" },
  ];

  const radius = 100;
  const startAngleDeg = 170;
  const endAngleDeg = 270;

  // shift
  useEffect(() => {
    let shiftHeld = false;

    function onKeyDown(e: KeyboardEvent) {
      // ignore if typing in input/textarea
      const tg = (e.target as HTMLElement) || null;
      if (
        tg &&
        (tg.tagName === "INPUT" ||
          tg.tagName === "TEXTAREA" ||
          tg.isContentEditable)
      ) {
        return;
      }

      if (e.shiftKey) {
        setIsShiftHeld(true);
        setOpen(true);
      }

      if (e.key.toLowerCase() === "a" && e.shiftKey) {
        setIsOpen((prev) => !prev);
      }

    }

    function onKeyUp(e: KeyboardEvent) {
      if (e.key === "Shift") {
        shiftHeld = false;
        setOpen(false);
      }
    }

    function onWindowBlur() {
      shiftHeld = false;
      setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);


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

  function handleEditorMount(editor: any, monaco: any) {
    editorRef.current = editor;

    // a) Monaco command for Shift + A — ONLY toggles the panel
    const cmd = editor.addCommand(
      monaco.KeyMod.Shift | monaco.KeyCode.KeyA,
      () => {
        setIsOpen((prev) => !prev); // toggle problem panel
      }
    );
    monacoDisposableRef.current.push({
      dispose: () => editor._standaloneKeybindingService?.removeCommand(cmd),
    });

    // b) Listen to keydown/up events on the editor itself to catch Shift presses
    // editor.onKeyDown / onKeyUp receive Monaco keyboard events
    const d1 = editor.onKeyDown((ev: any) => {
      // Monaco event has browserEvent property for the real DOM KeyboardEvent
      const browserEvent = ev.browserEvent as KeyboardEvent;
      if (!browserEvent) return;
      if (browserEvent.key === "Shift") {
        setOpen(true); // open flower on Shift down while editor focused
      }
    });

    const d2 = editor.onKeyUp((ev: any) => {
      const browserEvent = ev.browserEvent as KeyboardEvent;
      if (!browserEvent) return;
      if (browserEvent.key === "Shift") {
        setOpen(false); // close flower on Shift release
      }
    });

    monacoDisposableRef.current.push(d1, d2);
  }


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
      </div>

      {/* main area */}
      <div className="flex-1 h-full w-full flex px-2 pb-2 gap-2">
        {/* Center: editor */}
        <div className="flex-1 flex flex-col rounded-lg min-w-0 bg-transparent h-full">
          <div className="bg-zinc-800 rounded-t-lg p-3 flex-1 flex flex-col h-full">
            {/* Editor  */}
            <div className="flex-1 h-full flex">

              {/* Code  */}
              <div className="flex flex-col">
                {/* header  */}
                <div className="flex items-center justify-between py-2">
                  <div className="text-white">Code</div>

                  {/* Submit  */}
                  <div
                    className="items-center bg-zinc-700 cursor-pointer hover:scale-102 mr-5 p-1 rounded"
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

                <div className="h-full w-[70vw] transition-all duration-150 flex flex-col">
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
                      onMount={handleEditorMount}
                    />
                  </div>
                </div>
              </div>

              {/* test cases  */}
              <div className="flex-1 h-full"> <Test /></div>
            </div>

            {/* flower dial  */}
            <div
              ref={ref}
              className="fixed bottom-15 right-20 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-10 h-16">
                {buttons.map((btn, i) => {
                  const t =
                    buttons.length === 1 ? 0.5 : i / (buttons.length - 1);
                  const angleDeg =
                    startAngleDeg + t * (endAngleDeg - startAngleDeg);
                  const angle = (angleDeg * Math.PI) / 180;
                  const x = -Math.cos(angle) * radius;
                  const y = -Math.sin(angle) * radius;

                  return (
                    <button
                      key={btn.id}
                      title={btn.title}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Clicked ${btn.title}`);
                        setOpen(false); // optional: close after click
                      }}
                      tabIndex={open ? 0 : -1}
                      aria-hidden={!open}
                      className="absolute flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800 text-white shadow-lg"
                      style={{
                        transform: open
                          ? `translate(${-x}px, ${-y}px) scale(1)`
                          : `translate(0px, 0px) scale(0.9)`,
                        opacity: open ? 1 : 0,
                        transition:
                          "transform 220ms cubic-bezier(.2,.9,.2,1), opacity 180ms",
                        pointerEvents: open ? "auto" : "none", // IMPORTANT: prevent clicks when closed
                        zIndex: open ? 20 : 5,
                        // position them centered relative to main button
                        right: 0,
                        bottom: 0,
                      }}
                    >
                      <span style={{ transform: "translateY(-1px)" }}>
                        {btn.icon}
                      </span>
                    </button>
                  );
                })}

                {/* main FAB button */}
                <button
                  aria-label="Open"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((v) => !v);
                  }}
                  className="absolute right-0 bottom-0 w-12 h-12 rounded-full bg-indigo-600 text-white shadow-2xl flex items-center justify-center"
                  style={{
                    transform: open ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 180ms ease",
                    zIndex: 30,
                  }}
                >
                  <span style={{ fontSize: 22, lineHeight: 1 }}>+</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {isOpen && (
        <div className="min-h-[100vh] w-full p-4 absolute z-10 flex justify-center items-center">
          <div className=" w-[90vw] h-[90vh] rounded-lg z-20">
            <div className="w-full h-full bg-zinc-900 text-gray-200 p-8 rounded-lg overflow-y-auto font-sans">
              {/* Problem Title */}
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-white">1. Two Sum</h1>
                <span className="px-3 py-1 text-sm rounded-full bg-green-900 text-green-300 font-medium">
                  Easy
                </span>
              </div>

              {/* Problem Description */}
              <p className="text-base leading-relaxed mb-4">
                Given an array of integers <code>nums</code> and an integer{" "}
                <code>target</code>, return{" "}
                <strong>indices of the two numbers</strong> such that they add
                up to the target.
              </p>

              <p className="text-base leading-relaxed mb-4">
                You may assume that each input would have{" "}
                <strong>exactly one solution</strong>, and you may not use the
                same element twice. You can return the answer in any order.
              </p>

              {/* Example Section */}
              <div className="bg-zinc-800 rounded-lg p-4 mb-4">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Example 1:
                </h2>
                <pre className="bg-zinc-900 p-3 rounded text-sm text-gray-300 whitespace-pre-wrap">
                  {`Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`}
                </pre>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 mb-4">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Example 2:
                </h2>
                <pre className="bg-zinc-900 p-3 rounded text-sm text-gray-300 whitespace-pre-wrap">
                  {`Input: nums = [3,2,4], target = 6
Output: [1,2]`}
                </pre>
              </div>

              {/* Constraints */}
              <div className="bg-zinc-800 rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Constraints:
                </h2>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                  <li>2 ≤ nums.length ≤ 10⁴</li>
                  <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
                  <li>-10⁹ ≤ target ≤ 10⁹</li>
                  <li>Only one valid answer exists.</li>
                </ul>
              </div>

              {/* Complexity Analysis */}
              <div className="bg-zinc-800 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Complexity Analysis:
                </h2>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                  <li>
                    <strong>Time Complexity:</strong> O(n) — Each element is
                    visited at most once.
                  </li>
                  <li>
                    <strong>Space Complexity:</strong> O(n) — Hash map stores at
                    most n elements.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
