import { useState } from "react";

interface TestCase {
  id: number;
  input: string; // stdin representation
  expected: string; // expected output
}

interface TestResult extends TestCase {
  output: string; // actual output/stdout
  passed: boolean;
}

export default function TestCasesPanel() {
  const [results, setResults] = useState<TestResult[] | null>(null);

  const testCases: TestCase[] = [
    { id: 1, input: "nums = [2,7,11,15], target = 9", expected: "[0,1]" },
    { id: 2, input: "nums = [3,2,4], target = 6", expected: "[1,2]" },
    { id: 3, input: "nums = [3,3], target = 6", expected: "[0,1]" },
  ];

  const handleRun = () => {
    const simulatedResults: TestResult[] = testCases.map((tc, i) => {
      const simulatedOutput = i === 1 ? "[1,2]" : "[0,1]";
      return {
        ...tc,
        output: simulatedOutput,
        passed: tc.expected === simulatedOutput,
      };
    });
    setResults(simulatedResults);
  };

  const handleClear = () => setResults(null);

  const dataToRender: (TestCase | TestResult)[] = results ?? testCases;
  const passedCount = results ? results.filter((r) => r.passed).length : 0;

  return (
    <div className="h-full flex flex-col bg-black text-gray-200 overflow-hidden rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0f1620] border-b border-gray-800">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-sm">Test Cases</h2>
          {results && (
            <div className="text-xs text-gray-400">
              {passedCount}/{results.length} passed
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            className="text-xs px-2 py-1 rounded border border-gray-700 hover:bg-gray-800"
            aria-label="Clear results"
          >
            Clear
          </button>
          <button
            onClick={handleRun}
            className="text-xs bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded"
            aria-label="Run tests"
          >
            Run
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {dataToRender.map((tc) => {
          const isResult = (tc as TestResult).output !== undefined;
          const result = isResult ? (tc as TestResult) : undefined;

          return (
            <div
              key={tc.id}
              className="bg-[#0b1117] border border-gray-800 rounded-lg p-3"
            >
              {/* top row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-xs text-gray-400">Case #{tc.id}</div>
                  <div className="text-xs text-gray-400">•</div>
                  <div className="text-xs text-gray-400">Input preview</div>
                </div>

                {isResult ? (
                  <div
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      result!.passed
                        ? "text-emerald-300 bg-emerald-900/30"
                        : "text-rose-300 bg-rose-900/20"
                    }`}
                  >
                    {result!.passed ? "✔ Passed" : "✘ Failed"}
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">Not run</div>
                )}
              </div>

              {/* grid: STDIN | STDOUT | EXPECTED */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* STDIN */}
                <div className="flex flex-col">
                  <div className="text-[11px] text-gray-400 mb-1 font-medium">
                    STDIN
                  </div>
                  <div className="border border-gray-800 rounded-md bg-[#071017] p-2 min-h-[56px]">
                    <pre className="whitespace-pre-wrap break-words text-xs font-mono text-gray-200">
                      {tc.input}
                    </pre>
                  </div>
                </div>

                {/* STDOUT / Actual */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] text-gray-400 mb-1 font-medium">
                      STDOUT
                    </div>
                    {isResult && (
                      <div className="text-[11px] text-gray-400">
                        {result!.passed ? "Matched" : "Mismatch"}
                      </div>
                    )}
                  </div>
                  <div
                    className={`border rounded-md p-2 min-h-[56px] ${
                      isResult && !result!.passed
                        ? "border-rose-600/60 bg-rose-900/10"
                        : "border-gray-800 bg-[#071017]"
                    }`}
                  >
                    <pre className="whitespace-pre-wrap break-words text-xs font-mono text-gray-200">
                      {isResult ? result!.output : "-"}
                    </pre>
                  </div>
                </div>

                {/* EXPECTED */}
                <div className="flex flex-col">
                  <div className="text-[11px] text-gray-400 mb-1 font-medium">
                    EXPECTED
                  </div>
                  <div className="border border-gray-800 rounded-md bg-[#071017] p-2 min-h-[56px]">
                    <pre className="whitespace-pre-wrap break-words text-xs font-mono text-gray-200">
                      {tc.expected}
                    </pre>
                  </div>
                </div>
              </div>

              {/* details row */}
              <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                <div>
                  Time: <span className="text-gray-300">0 ms</span>
                </div>
                <div>
                  Memory: <span className="text-gray-300">0 MB</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
