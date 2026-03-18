"use client";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const handleBeforeUnload = (event : any) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      <h1>My Page</h1>
      <p>If you try to exit, a confirmation will appear.</p>
    </div>
  );
}
