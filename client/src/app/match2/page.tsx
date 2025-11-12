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

  //flower
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        <div className="flex-1 flex flex-col rounded-lg min-w-0 bg-transparent">
          <div className="bg-zinc-800 rounded-t-lg p-3 flex-1 flex flex-col min-h-0">
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

            {/* Editor  */}
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="h-full transition-all duration-150 flex flex-col">
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
                  />
                </div>
              </div>
            </div>

            <div ref={ref} className="fixed bottom-15 right-20 z-50">
              <div className="relative w-10 h-16">
                {buttons.map((btn, i) => {
                  // if only one button, avoid division by zero
                  const t =
                    buttons.length === 1 ? 0.5 : i / (buttons.length - 1);
                  const angleDeg =
                    startAngleDeg + t * (endAngleDeg - startAngleDeg);
                  const angle = (angleDeg * Math.PI) / 180;
                  const x = -Math.cos(angle) * radius; // positive -> right, negative -> left
                  const y = -Math.sin(angle) * radius; // positive -> down, negative -> up

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
    </div>
  );
}
