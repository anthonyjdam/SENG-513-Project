import { trpc } from "@/lib/trpc";
import { Dispatch, SetStateAction } from "react";

/**
 * 
 */
function generateTimesArray(): string[] {
  const startHour: number = 6;
  const endHour: number = 23;
  const interval: number = 15;
  let times: string[] = [];

  // Calculate the total number of minutes
  const totalMinutes: number = (endHour - startHour) * 60;

  for (let i: number = 0; i <= totalMinutes; i += interval) {
    let hour: number = startHour + Math.floor(i / 60);
    let minute: number | string = i % 60 === 0 ? "00" : i % 60;
    let amPM: string = hour >= 12 ? "PM" : "AM";

    // Convert hour to 12-hour format
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour === 0 ? 12 : hour;

    times.push(`${hour}:${minute} ${amPM}`);
  }
  return times;
}

// Interface for a date in the days of the week
interface MyDate {
  dayOfTheWeek: string;
  dayNumber: number;
}

/**
 * creates the daysOfTheWeek component attributes
 */
const generateDaysOfWeek = ({ date }: { date: Date | undefined }) => {
  if (!date) {
    // Handle the case where date is undefined
    return [];
  }

  const dayOfTheWeek = ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"];
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  let currentDayOfMonth = date.getDate(); // get the current day of the month
  let offset = date.getDay(); // get the current day of the week starting w/ sunday at 0
  let startDayIndex = dayOfTheWeek.indexOf("SUN"); // index of sunday is the start of the week

  const newDateArr = [];

  for (let i = 0; i < 7; i++) {
    startDayIndex = startDayIndex % 7; // iterate through days of the week

    // Calculate dayNumber by considering the offset and ensuring it's within the current month
    let dayNumber = currentDayOfMonth - offset + i;
    if (dayNumber <= 0) {
      // Adjust if the dayNumber is less than or equal to zero
      dayNumber += daysInMonth;
    } else if (dayNumber > daysInMonth) {
      // Adjust if the dayNumber exceeds the number of days in the month
      dayNumber -= daysInMonth;
    }

    newDateArr.push({
      // start on sunday
      dayOfTheWeek: dayOfTheWeek[startDayIndex],
      dayNumber,
    });

    startDayIndex++;
  }

  return newDateArr;
};

const DayView = ({ date }: { date: Date | undefined }) => {
  let times: string[] = generateTimesArray();

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
              {time === "8:00 AM" && "SUN" === "SUN" ? (
                <div
                  className={`bg-rose-500/10 border-l-4 border-rose-500 h-20 rounded-l-md p-1 flex-1 z-10`}
                >
                  <p className="break-all leading-4">volleyball</p>
                </div>
              ) : null}
              {time === "8:30 AM" && "SUN" === "SUN" ? (
                <div
                  className={`bg-blue-500/10 border-l-4 border-blue-500 h-20 rounded-l-md p-1 flex-1 z-10`}
                >
                  <p className="break-all leading-4">volleyball</p>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WeekView = ({ date }: { date: Date | undefined }) => {
  let days: MyDate[] = generateDaysOfWeek({ date });
  let times: string[] = generateTimesArray();
  console.log("Times: ", times, "Days ", days);
  

  return (
    <div className="md:flex">
      {days.map((day) => (
        //this day card goes here!!!
        <div key={day.dayOfTheWeek} className="flex-grow">
          <div className="h-[75px] bg-zinc-50 border-r border-neutral-200 p-2">
            <p className="text-zinc-500 text-xs font-semibold">
              {day.dayOfTheWeek.toUpperCase()}
            </p>
            <h1 className="text-gray-900 text-xl font-semibold">
              {day.dayNumber}
            </h1>
          </div>
          <div className="flex flex-col border-r border-neutral-200">
            {times.map((time, index) => (
              <div
                key={`${day}-${time}`}
                className={`h-5 w-full border-t relative ${
                  index % 4 === 0 ? "border-neutral-200" : "border-neutral-100"
                }`}
              >
                <div className="absolute w-full flex">
                  {time === "8:00 AM" && day.dayOfTheWeek === "SUN" ? (
                    <div
                      className={`bg-rose-500/10 border-l-4 border-rose-500 h-20 rounded-l-md p-1 flex-1 z-10`}
                    >
                      <p className="break-all leading-4">volleyball</p>
                    </div>
                  ) : null}
                  {time === "8:30 AM" && day.dayOfTheWeek === "SUN" ? (
                    <div
                      className={`bg-blue-500/10 border-l-4 border-blue-500 h-20 rounded-l-md p-1 flex-1 z-10`}
                    >
                      <p className="break-all leading-4">volleyball</p>
                    </div>
                  ) : null}
                  {time === "8:00 AM" && day.dayOfTheWeek === "MON" ? (
                    <div
                      className={`bg-blue-500/10 border-l-4 border-blue-500 h-20 rounded-l-md p-1 flex-1 z-10`}
                    >
                      <p className="break-all leading-4">volleyball</p>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

interface ScheduleProps {
  date: Date | undefined;
  scheduleView: string;
}

export const Schedule = ({ date, scheduleView }: ScheduleProps) => {
  //const schedules = trpc.schedule.getSchedules.useQuery();
  //const activities = schedules.data;

  //console.log(schedules.data);

  //const filteredActivities = activities?.filter((activity) =>
  //activity.activityName.toLowerCase().includes("basketball")
  //);

  //console.log(filteredActivities);

  return scheduleView === "d" ? (
    <DayView date={date} />
  ) : (
    <WeekView date={date} />
  );
};
