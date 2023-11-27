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

export const ToggleContext = createContext({
  activityToggles: {},
  setActivityToggles: () => {},
});

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

  //option states
  const [scheduleView, setScheduleView] = useState("d");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activityToggles, setActivityToggles] = useState({
    Badminton: false,
    Basketball: false,
    "Ball Hockey": false,
    Volleyball: false,
    Soccer: false,
    "Open Gym": true,
  });

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
        <ToggleContext.Provider
          value={{
            activityToggles,
            setActivityToggles,
          }}
        >
          <main className="flex flex-row min-h-screen">
            <div className="relative">
              <Sidebar />
            </div>

            <div className="flex flex-grow flex-col">
              <Topbar
                date={date}
                setDate={setDate}
                scheduleView={scheduleView}
                setScheduleView={setScheduleView}
              />

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
                      <Schedule date={date} scheduleView={scheduleView} />
                    </div>
                  </div>
                </div>
                {/* 
              <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                <NewTest />
              </div>
              */}
              </div>
            </div>
          </main>
        </ToggleContext.Provider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
