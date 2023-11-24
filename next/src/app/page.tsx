"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/lib/trpc";
import Sidebar from "@/component/Sidebar";
import RowTime from "@/component/RowTime";
import DaysOfTheWeek from "@/component/DaysOfTheWeek";
import CalendarCell from "@/component/CalendarCell";
import TimesColumn from "@/component/TimesColumn";

import { Topbar } from "@/component/Topbar";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:5000/trpc",
        }),
      ],
    });
  });

  interface MyDate {
    dayOfTheWeek: string;
    dayNumber: number;
  }

  const [dateArr, setDateArr] = useState<MyDate[]>([]);
  // const startTime = 6
  // const endTime = 9

  useEffect(() => {
    handleGetDaysOfWeek();
  }, []);

  /**
   * creates the daysOfTheWeek component attributes
   */
  function handleGetDaysOfWeek() {
    const dayOfTheWeek = ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"];
    const currentDate = new Date();

    let currentDayOfMonth = currentDate.getDate(); // get the current day of the month
    let offset = currentDate.getDay(); // get the current day of week starting w/ sunday at 0
    let startDayIndex = dayOfTheWeek.indexOf("SUN"); //index of sunday is the start of the week

    const newDateArr: MyDate[] = [];
    console.log(startDayIndex);

    for (let i = 0; i < 7; i++) {
      startDayIndex = startDayIndex % 7; // itterate through days of the week

      newDateArr.push({
        //start on sunday
        dayOfTheWeek: dayOfTheWeek[startDayIndex],
        // calculate the currentDayOfMonth by subtracting the offset that is the currentDayOfWeek
        dayNumber: (currentDayOfMonth - offset) % 31, // mod with 31 to loop to start of month
      });

      startDayIndex++;
      currentDayOfMonth++; // increment the current day to get the next day
    }

    setDateArr(newDateArr);
  }

  /**
   * creates the cells in the calendar
   *
   * @param count: the number of cells to generate
   * @returns calendarCells: the cells as a component
   */
  function generateCalendarCells(count: number) {
    const calendarCells = [];

    for (let index = 0; index < count; index++) {
      //TODO: MAKE KEY MEANINGFUL SO YOU CAN ENTER EVENTS EASILY
      calendarCells.push(<CalendarCell cellKey={index} />);
    }
    return calendarCells;
  }

  const calendarCells = generateCalendarCells(7 * 16);

  /**
   * TODO have time range param
   *
   * @returns timeArr: the array of times
   */
  function generateTimes() {
    let timesArr = [];

    for (let i = 6; i < 22; i++) {
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
            <Sidebar />
          </div>

          <div className="flex flex-grow flex-col">
            <Topbar />

            <div className="flex flex-row h-full">
              <div className="flex flex-col w-full">
                <div className="flex flex-row h-full">
                  <div className="bg-white text-zinc-500 w-[60px]">
                    <div className="bg-white h-[75px] min-h-[75px]"></div>

                    {generateTimes().map((time) => (
                      <TimesColumn time={time} />
                    ))}
                  </div>

                  {/* <RowTime/> */}

                  <div className="w-full h-full flex flex-col">
                    <div className="w-full h-[75px] min-h-[75px]">
                      <div className="h-full grid grid-cols-7">
                        {dateArr.map((date) => (
                          <DaysOfTheWeek
                            dayOfTheWeek={date.dayOfTheWeek}
                            dayNumber={date.dayNumber}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="w-full bg-white grid grid-cols-7">
                      {calendarCells}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
						<Array />
					</div> */}
            </div>
          </div>
        </main>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
