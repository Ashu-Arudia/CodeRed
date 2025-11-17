"use client";
import ElectricBorder from "../../components/ElectricBorder";

export default function example() {
  return (
    <>
      <div className="w-2xl h-10xl">
        <ElectricBorder
          color="#00E5FF"
          speed={1.2}
          chaos={1.5}
          thickness={3}
          className="rounded-lg"
          style
        >
          <div
            className="w-2xl h-2xl"
          >
            <h1 style={{ color: "white" }}>Hello — Electric Border</h1>
          </div>
        </ElectricBorder>
      </div>
    </>
  );
}