"use client";
import userDetails from "../../store/UserDetails"
export default function example() {
  const user = userDetails((state) => state.user );

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center text-black">
        {user?.username}
      </div>
    </>
  );
}