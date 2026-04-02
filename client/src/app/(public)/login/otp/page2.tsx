
"use client";
import { useRouter } from "next/navigation";


export default function trying() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-items-center w-screen h-screen bg-white">
        <div className="w-24 p-12 cursor-pointer" onClick={()=>{router.push("/app/profile")}}> Click me</div>
        </div>
    </>
  );
}