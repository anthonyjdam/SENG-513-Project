import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export const Topbar = () => {
  const [count, setCount] = useState(0);
  const [view, setView] = useState("w");
  const { isSignedIn } = useAuth();

  return (
    <div className="flex justify-between mx-3 py-4">
      <div className="flex space-x-0.5 items-center">
        <button
          className="rounded-md bg-zinc-300 py-0.5 px-2 hover:bg-zinc-700 hover:text-white transition-all duration-300"
          onClick={() => {
            setCount(count - 1);
          }}
        >
          &lt;
        </button>
        <p className="rounded-md bg-zinc-300 py-1 px-2 text-sm">
          Month {count}
        </p>
        <button
          className="rounded-md bg-zinc-300 py-0.5 px-2 hover:bg-zinc-700 hover:text-white transition-all duration-300"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          &gt;
        </button>
      </div>

      <div className="flex space-x-0.5 text-zinc-700">
        <button
          className={`py-0.5 px-2 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300 ${
            view === "d" ? "bg-red-500 text-white" : "bg-zinc-300"
          }`}
          onClick={() => {
            setView("d");
          }}
        >
          Day
        </button>

        <button
          className={`py-0.5 px-2 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300 ${
            view === "w" ? "bg-red-500 text-white" : "bg-zinc-300"
          }`}
          onClick={() => {
            setView("w");
          }}
        >
          Week
        </button>
      </div>

      {isSignedIn ? (
        <div className="flex space-x-2">
          <Image src="/setting.svg" width={30} height={30} alt="" />
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <button className="py-0.5 px-2 rounded-md text-white bg-red-500">
          <SignInButton mode="modal" />
        </button>
      )}
    </div>
  );
};
