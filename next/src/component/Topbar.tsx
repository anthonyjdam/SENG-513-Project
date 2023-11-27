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

        <div className="flex space-x-3 items-center">
          <button
            className="rounded-md bg-zinc-300 py-0.5 px-2 hover:bg-zinc-700 hover:text-white transition-all duration-300"
            onClick={() => {
              handlePrevDay();
            }}
          >
            &lt;
          </button>
          <button
            className="rounded-md bg-zinc-300 py-0.5 px-2 hover:bg-zinc-700 hover:text-white transition-all duration-300"
            onClick={() => {
              handleNextDay();
            }}
          >
            &gt;
          </button>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-red-500 hover:bg-zinc-300 text-white hover:text-zinc-900 transition-all duration-300"
            >
              <CalendarIcon />
            </Button>
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
      </div>

      <div className="hidden md:flex space-x-0.5 text-zinc-700">
        <button
          className={`py-0.5 px-2 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300 ${
            scheduleView === "d" ? "bg-red-500 text-white" : "bg-zinc-300"
          }`}
          onClick={() => {
            setScheduleView("d");
          }}
        >
          Day
        </button>

        <button
          className={`py-0.5 px-2 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300 ${
            scheduleView === "w" ? "bg-red-500 text-white" : "bg-zinc-300"
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
        <button className="py-0.5 px-2 rounded-md text-white bg-red-500">
          <SignInButton mode="modal" />
        </button>
      )}
    </div>
  );
};
