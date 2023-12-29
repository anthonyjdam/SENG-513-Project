"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ActivityButton } from "./ActivityButton";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  //Handles the opening and closing of our nav
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex justify-end md:hidden">
      <button
        onClick={handleClick}
        className="z-40 flex flex-col items-center justify-center"
      >
        <span
          className={`block h-1 w-6 rounded-sm bg-red-600 
                    transition-all duration-300 ease-out ${
                      isOpen ? "translate-y-2 rotate-45" : "-translate-y-0.5"
                    }`}
        ></span>
        <span
          className={`my-0.5 block h-1 w-6 rounded-sm 
                    bg-red-600 transition-all duration-300 ease-out ${
                      isOpen ? "opacity-0" : "opacity-100"
                    }`}
        ></span>
        <span
          className={`block h-1 w-6 rounded-sm bg-red-600 
                    transition-all duration-300 ease-out ${
                      isOpen ? "-translate-y-1 -rotate-45" : "translate-y-0.5"
                    }`}
        ></span>
      </button>

      {isOpen && (
        <div className="fixed left-0 top-0 flex h-screen w-screen items-center flex-col justify-center bg-zinc-900 z-30">
          <div className="flex space-x-2">
            <Image
              src="/active-living-logo.png"
              width={75}
              height={75}
              alt=""
            />
            <p className="text-xl font-semibold mt-10 text-white">Active Living</p>
          </div>

          <div className="flex flex-col mt-4 space-y-3 w-2/3 text-white">
            <p className="text-blue-400">Choose Activity</p>
            <ActivityButton activity="Badminton" />
            <ActivityButton activity="Basketball" />
            <ActivityButton activity="Ball Hockey" />
            <ActivityButton activity="Volleyball" />
            <ActivityButton activity="Soccer" />
            <ActivityButton activity="Open Gym" />
          </div>
        </div>
      )}
    </div>
  );
}
