import { generateTimesArray } from "@/lib/utilityFunctions";
import { useDateStore } from "@/store";
import { MountCalendarEvent } from "./MountCalendarEvent";

export const DayView = () => {
  // Make function call to server side procedure to get the schedules from the database
  let times: string[] = generateTimesArray();
  const { date } = useDateStore();
  const currentMonth = date?.toLocaleString("en-us", { month: "short" });

  return (
    <div className="flex-grow">
      <div className="h-[75px] bg-zinc-50 border-r border-neutral-200 p-2">
        <p className="text-zinc-500 text-xs font-semibold">
          {date?.toLocaleString("en-US", { weekday: "short" }).toUpperCase()}
        </p>
        <h1 className="text-gray-900 text-xl font-semibold">
          {date?.getDate()}
        </h1>
      </div>
      <div className="flex flex-col border-r border-neutral-200">
        {times.map((time, index) => (
          <div
            key={time}
            className={`h-5 w-full border-t relative ${
              index % 4 === 0 ? "border-neutral-200" : "border-neutral-100"
            }`}
          >
            <div className="absolute w-full flex">
              <MountCalendarEvent
                currentDayOfTheWeek={date?.getDate().toString() || ""}
                currentMonth={currentMonth}
                currentStartTime={time}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
