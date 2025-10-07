"use client";
import { useRef } from "react";
import Logo from "./logo";
export default function profile() {
  const inputRef = useRef<HTMLInputElement>(null);

  const inputclick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="min-h-screen absolute w-full z-10 bg-black/60 flex flex-col">
      {/* login card  */}
      <div className="flex-1 flex w-full items-center justify-center p-4">
        <div className="w-1/3  justify-center z-20 ml-20 bg-white/20 backdrop-blur-xl opacity-90 shadow-2xl  rounded-2xl">
          <div className="!p-10  !h-auto rounded-2xl gap-5 flex flex-col z-20">
            <div className="text-white text-2xl text-bold text-center">
              CREATE YOUR ACCOUNT
            </div>

            <div className="w-full justify-center flex">
              <div onClick={inputclick} className="w-30 h-30 cursor-pointer">
                <Logo />{" "}
              </div>

              <input
                type="file"
                accept="image/"
                ref={inputRef}
                className="hidden"
              />
            </div>

            {/* name  */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-white text-md">
                  Username
                </legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Type here"
                />
              </fieldset>
            </div>

            {/* Bio  */}
            <div>
              <legend className="fieldset-legend text-white !text-sm">
                Bio
              </legend>
              <textarea
                className="textarea w-full"
                placeholder="Bio"
              ></textarea>
            </div>

            {/* DOB  */}
            <div>
              <legend className="fieldset-legend text-white text-sm">
                DOB
              </legend>
              <input
                type="date"
                className="input validator"
                required
                placeholder="Pick a date in 2025"
                min="1970-01-01"
                max="2020-12-31"
                title="Must be valid URL"
              />
              <p className="validator-hint">Must be 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
