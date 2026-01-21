"use client";
import { useEffect } from "react";
export default function test() {

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");
    ws.onopen = () => console.log("connected");

    return () => ws.close();
  },[])
  return (
    <>
    </>
  );
}