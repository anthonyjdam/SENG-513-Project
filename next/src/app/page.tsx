"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/lib/trpc";
import Sidebar from "@/component/Sidebar";
import TimesColumn from "@/component/TimesColumn";
import { Topbar } from "@/component/Topbar";
import { Schedule } from "@/component/Schedule";
import { createContext } from "react";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:5001/trpc",
        }),
      ],
    });
  });

  const [dragging, setDragging] = useState(false);
  const [isDragDisabled, setIsDragDisabled] = useState(true);

  const handleStartDragging = () => {
    setDragging(true);
  };

  const handleStopDragging = () => {
    setDragging(false);
  };

  /**
   * TODO have time range param
   *
   * @returns timeArr: the array of times
   */
  function generateTimes() {
    let timesArr = [];

    for (let i = 6; i < 24; i++) {
      let time;

      if (i > 11) {
        time = i % 12; // for times PM
        time = time === 0 ? 12 : time; // fro 12 PM
        time = time.toString() + " PM";
      } else {
        time = i; // for times AM
        time = time === 0 ? 12 : time; // for 12 AM
        time = time.toString() + " AM";
      }

      timesArr.push(time);
    }

    return timesArr;
  }

  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <main className="flex flex-row min-h-screen">
          <div className="relative">
            <Sidebar
              isDragDisabled={isDragDisabled}
              setIsDragDisabled={setIsDragDisabled}
            />
          </div>

          <div className="flex flex-grow flex-col">
            <Topbar />

            <div className="flex flex-row h-full">
              <div className="flex flex-col w-full">
                <div className="flex flex-row h-full">
                  <div className="bg-white text-zinc-500 w-[60px]">
                    <div className="bg-white h-[75px] min-h-[75px]"></div>

                    {generateTimes().map((time) => (
                      <TimesColumn key={time} time={time} />
                    ))}
                  </div>

                  <div className="w-full h-full flex flex-col">
                    <Schedule
                      dragging={dragging}
                      setDragging={setDragging}
                      isDragDisabled={isDragDisabled}
                      setIsDragDisabled={setIsDragDisabled}
                      // onStopDragging={handleStopDragging}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
