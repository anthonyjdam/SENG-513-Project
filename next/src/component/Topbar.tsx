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
    <div className="flex justify-between mx-3 py-4 ">
      <div className="flex gap-5">
        <HamburgerMenu />

        <Popover>
          <PopoverTrigger asChild>
            <button
              // variant="outline"
              // className="bg-red-500 hover:bg-zinc-100 shadow-red-200 shadow-md hover:shadow-none active:bg-zinc-200 hover:text-zinc-500 rounded-lg p-1 text-white transition-all duration-300 border border-zinc-200/50"
              className="hover:bg-rose-600 active:bg-rose-600 hover:shadow-red-200 active:shadow-red-200 hover:shadow-md active:shadow-md rounded-lg p-0.5 text-zinc-600 hover:text-white active:text-white transition-all duration-300 border border-white hover:border-zinc-200/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>
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
            // className="rounded-lg bg-zinc-100 py-0.5 px-0.5 hover:bg-zinc-200 hover:text-white transition-all duration-300 border border-zinc-200/50"
            className="rounded-lg p-0.5 hover:bg-zinc-100 hover:text-white transition-all duration-300 border border-white hover:border-zinc-200/50"
            onClick={() => {
              handlePrevDay();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor" className="w-6 h-6 text-zinc-600 hover:text-zinc-500 active:text-zinc-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            className="rounded-lg p-0.5 hover:bg-zinc-100 hover:text-white transition-all duration-300 border border-white hover:border-zinc-200/50"
            // className="rounded-lg bg-zinc-100 py-0.5 px-0.5 hover:bg-zinc-200 hover:text-white transition-all duration-300 border border-zinc-200/50"
            onClick={() => {
              handleNextDay();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor" className="w-6 h-6 text-zinc-600 hover:text-zinc-500 active:text-zinc-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="hidden md:flex space-x-0.5 text-zinc-600">
        <button
          className={`py-0.5 px-3 rounded-lg font-medium hover:bg-rose-600 hover:text-white transition-all duration-700 hover:duration-300 ${scheduleView === "d" ? "bg-rose-600 text-white shadow-red-200 shadow-md border border-zinc-200/50" : "bg-zinc-100 border border-zinc-200/50"
            }`}
          onClick={() => {
            setScheduleView("d");
          }}
        >
          Day
        </button>

        <button
          className={`py-0.5 px-3 rounded-lg font-medium hover:bg-rose-600 hover:text-white transition-all duration-700 hover:duration-300 ${scheduleView === "w" ? "bg-rose-600 text-white shadow-red-200 shadow-md border border-zinc-200/50" : "bg-zinc-100 border border-zinc-200/50"
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
        <button className="py-0.5 px-2 rounded-lg font-medium text-zinc-600 bg-zinc-100  border border-zinc-200/50
        hover:bg-rose-600 hover:text-white active:bg-rose-600/[90%] hover:shadow-red-200 hover:shadow-md transition-all duration-300
        ">
          <SignInButton mode="modal" />
        </button>
      )}
    </div>
  );
};
