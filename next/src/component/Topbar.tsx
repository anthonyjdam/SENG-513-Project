import { Dispatch, SetStateAction, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "./HamburgerMenu";

interface TopbarProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>> | undefined;
  scheduleView: string;
  setScheduleView: Dispatch<SetStateAction<string>>;
}

export const Topbar = ({
  date,
  setDate,
  scheduleView,
  setScheduleView,
}: TopbarProps) => {
  const { isSignedIn } = useAuth();

  const handlePrevDay = () => {
    if (date && setDate) {
      const newDate = new Date(date);
      scheduleView === "d"
        ? newDate.setDate(newDate.getDate() - 1)
        : newDate.setDate(newDate.getDate() - 7);
      setDate(newDate);
    }
  };

  const handleNextDay = () => {
    if (date && setDate) {
      const newDate = new Date(date);
      scheduleView === "d"
        ? newDate.setDate(newDate.getDate() + 1)
        : newDate.setDate(newDate.getDate() + 7);
      setDate(newDate);
    }
  };

  return (
    <div className="flex justify-between mx-3 py-4">
      <div className="flex gap-5">
        <HamburgerMenu />

        <Popover>
          <PopoverTrigger asChild>
            <button
              // variant="outline"
              className="bg-red-500 hover:bg-zinc-300 shadow-red-200 shadow-md hover:shadow-none text-white rounded-lg p-1 hover:text-zinc-600 transition-all duration-300"
            >
              <CalendarIcon />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 mt-5">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>

        <div className="flex space-x-2 items-center">
          <button
            className="rounded-lg bg-zinc-100 py-0.5 px-0.5 hover:bg-zinc-200 hover:text-white transition-all duration-300"
            onClick={() => {
              handlePrevDay();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-zinc-500 hover:text-zinc-400 active:text-zinc-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            className="rounded-lg bg-zinc-100 py-0.5 px-0.5 hover:bg-zinc-200 hover:text-white transition-all duration-300"
            onClick={() => {
              handleNextDay();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-zinc-500 hover:text-zinc-400 active:text-zinc-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="hidden md:flex space-x-0.5 text-zinc-600">
        <button
          className={`py-0.5 px-2 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-all duration-300 ${scheduleView === "d" ? "bg-red-500 text-white shadow-red-200 shadow-md" : "bg-zinc-100"
            }`}
          onClick={() => {
            setScheduleView("d");
          }}
        >
          Day
        </button>

        <button
          className={`py-0.5 px-2 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-all duration-300 ${scheduleView === "w" ? "bg-red-500 text-white shadow-red-200 shadow-md" : "bg-zinc-100"
            }`}
          onClick={() => {
            setScheduleView("w");
          }}
        >
          Week
        </button>
      </div>

      {isSignedIn ? (
        <div className="flex space-x-2 items-center">
          <Image src="/setting.svg" width={30} height={30} alt="" />
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <button className="py-0.5 px-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-zinc-200 hover:text-zinc-500 active:text-zinc-700 shadow-red-200 shadow-md hover:shadow-none">
          <SignInButton mode="modal" />
        </button>
      )}
    </div>
  );
};
