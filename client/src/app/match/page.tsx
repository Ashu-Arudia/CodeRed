'use client'
import Editor from "@monaco-editor/react";
import { Divide } from "lucide-react";

export default function CodeEditor() {
  const cppDefaultCode = `#include <iostream>

int main() {
    std::cout << "Hello, C++ World!";
    return 0;
}`;

  return (
    <div className="h-screen flex flex-col">

      <div className="w-full bg-zinc-700"> Header </div>
      
      <div className="flex-1 w-full">
        <div className="flex h-full gap-3">
          <div className="w-12 bg-red-400"> rfvrfvr</div>
          <div className="flex-1 flex">
            <Editor
              language="cpp"
              theme="vs-dark"
              defaultValue={cppDefaultCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
