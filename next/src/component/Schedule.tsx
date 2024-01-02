import { ToggleContext } from "@/app/page";
import { trpc } from "@/lib/trpc";
import { useDateStore, useScheduleViewStore } from "@/store";

import { useState, useEffect, useRef } from "react";
import React, { Dispatch, SetStateAction, useContext } from "react";

/*
 * Creates an array of times corresponding to each cell in that daysOfTheWeek column
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

type Schedule = {
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  _id: string;
  __v: number;
  activityName: string;
  duration: string;
};

const activityTheme = (simplifiedActivityName: string) => {
  const newActivityName = simplifiedActivityName.toLowerCase();

  switch (true) {
    case newActivityName.includes("badminton"):
      return {
        bg: "bg-purple-200/[60%]",
        hover: "bg-purple-300/75",
        border: "border-purple-400",
        text: "text-purple-600",
        emoji: "🏸 ",
        dot: "bg-purple-400",
      };

    case newActivityName.includes("basketball"):
      return {
        bg: "bg-amber-100/[60%]",
        hover: "bg-amber-300/75",
        border: "border-amber-400",
        text: "text-amber-600",
        emoji: "🏀 ",
        dot: "bg-amber-400",
      };

    case newActivityName.includes("ball hockey"):
      return {
        bg: "bg-blue-100/[60%]",
        hover: "bg-blue-300/75",
        border: "border-blue-400",
        text: "text-blue-600",
        emoji: "🏑 ",
        dot: "bg-blue-400",
      };

    case newActivityName.includes("volleyball"):
      return {
        bg: "bg-red-200/[60%]",
        hover: "bg-red-300/75",
        border: "border-red-400",
        text: "text-red-600",
        emoji: "🏐 ",
        dot: "bg-red-400",
      };

    case newActivityName.includes("soccer"):
      return {
        bg: "bg-emerald-100/[60%]",
        hover: "bg-emerald-300/75",
        border: "border-emerald-400",
        text: "text-emerald-600",
        emoji: "⚽ ",
        dot: "bg-emerald-400",
      };

    default:
      return {
        bg: "bg-sky-100/[60%]",
        hover: "bg-sky-300/75",
        border: "border-sky-400",
        text: "text-sky-600",
        emoji: "🏃 ",
        dot: "bg-sky-400",
      };
  }
};

// Define the props type
type MountCalendarEventProps = {
  schedulesList:
    | {
        date: string;
        startTime: string;
        endTime: string;
        location: string;
        _id: string;
        __v: number;
        activityName: string;
        duration: string;
      }[]
    | undefined;
  currentDayOfTheWeek: string;
  currentMonth: string | undefined;
  currentStartTime: string;
};

const MountCalendarEvent = ({
  schedulesList,
  currentDayOfTheWeek,
  currentMonth,
  currentStartTime,
}: MountCalendarEventProps) => {
  let activityDate;
  let activityStartTime;
  let activityEndTime;
  let activityID;
  let activityName;
  let activityDuration;
  let activityLocation;

  let filteredList = schedulesList?.filter((activity) => {
    let [dayOfWeek, month, day] = activity.date.split(" ");
    return day === currentDayOfTheWeek && month === currentMonth; //filter the events that are in the current day and month
  });

  const [isHovered, setIsHovered] = useState(false);
  let renderedEvents = []; // stores the events in this array if they have a start time for this mapping

  if (filteredList) {
    for (let i = 0; i < filteredList.length; i++) {
      activityDate = filteredList[i].date.toUpperCase();
      activityStartTime = filteredList[i].startTime;
      activityEndTime = filteredList[i].endTime;
      activityID = filteredList[i]._id;
      activityName = filteredList[i].activityName;
      activityLocation = filteredList[i].location;
      activityDuration = filteredList[i].duration;

      // removes the leading zero from the times
      const formatActivityStartTime = activityStartTime.replace(/^0/, "");
      const formatCurrentStartTime = currentStartTime.replace(/^0/, "");

      // conditionally render if the database data "start time" is the same as the current start time for the mapping
      if (
        activityDate.includes(currentDayOfTheWeek) &&
        formatActivityStartTime === formatCurrentStartTime
      ) {
        // console.log("Adding ", activityName, " | Location: ", activityLocation, " | Date and Time: ", activityDate, " ", activityStartTime, "Database Time ", currentStartTime);

        const formattedActivityName = activityName
          .replace(/^Drop In\s*/, "")
          .replace(/\s*Time$/, ""); // Remove "Drop In" from the beginning and "Time" from the end
        // const formattedTime = activityStartTime.replace(/^0(\d+):(\d+) (\w{2})/, '$1:$2 $3');
        const scheduleHeight = (20 * parseInt(activityDuration, 10)) / 15; // parse the duration as an int

        renderedEvents.push(
          <div
            key={activityName + "-" + activityID}
            className={`w-full border-l-4 rounded-md p-1 pt-1 flex-1 z-10 transition ease-in-out delay-75 duration-300 hover:duration-150 shadow-sm
              hover:z-20 hover:-translate-x-1 hover:scale-105 hover:absolute hover:min-w-fit hover:backdrop-blur-md hover:shadow-md 
              active:z-20 active:-translate-x-1 active:scale-105 active:absolute active:min-w-fit active:backdrop-blur-md active:shadow-md
              ${activityTheme(formattedActivityName).bg} 
              ${activityTheme(formattedActivityName).border}
              `}
            style={{ height: scheduleHeight }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            <div
              className={`absolute -z-10 w-4 h-4 p-1 rounded-full hover:hidden
                ${activityTheme(formattedActivityName).dot}
              `}
            ></div>
            <div
              className={`font-medium h-full w-full break-all leading-4 text-xs rounded-md overflow-hidden
                hover:whitespace-nowrap hover:relative hover:min-w-fit
                active:whitespace-nowrap active:relative active:min-w-fit
                ${activityTheme(formattedActivityName).text}
              `}
            >
              <p>
                {activityTheme(formattedActivityName).emoji +
                  formattedActivityName}
                {activityLocation === "Red Gym" ? (
                  <a className="text-red-400"> ♦ </a>
                ) : activityLocation === "Gold Gym" ? (
                  <a className="text-yellow-400"> ★ </a>
                ) : (
                  " • "
                )}
                {activityLocation}
              </p>
              <p className="transition-all duration-0">
                {isHovered
                  ? `Time: ${activityStartTime.replace(
                      /^0?(\d+):(\d+)\s*(AM|PM)/i,
                      "$1:$2$3"
                    )}
                    -${activityEndTime.replace(
                      /^0?(\d+):(\d+)\s*(AM|PM)/i,
                      "$1:$2$3"
                    )}`
                  : ""}
              </p>
            </div>
          </div>
        );
      }
    }
  }

  return renderedEvents.length > 0 ? renderedEvents : null; // return the array of events is the length of renderedEvents is > 0; else nothing
};

// Interface for a date in the days of the week
interface MyDate {
  currentMonth: string;
  dayOfTheWeek: string;
  dayNumber: number;
}

/**
 * Creates the daysOfTheWeek component attributes
 */
export const generateDaysOfWeek = ({ date }: { date: Date | undefined }) => {
  if (!date) {
    // Handle the case where date is undefined
    return [];
  }

  let listOfMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  let currentDayOfMonth = date.getDate(); // get the current day of the month
  let offset = date.getDay(); // get the current day of the week starting w/ sunday at 0
  let startDayIndex = dayOfTheWeek.indexOf("SUN"); // index of sunday is the start of the week
  const newDateArr = [];

  let isNewMonth = false;
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

      if (!isNewMonth) {
        currentMonth = (currentMonth + 1) % 13;
        isNewMonth = true;
      }
    }

    newDateArr.push({
      currentMonth: listOfMonths[currentMonth - 1],
      dayOfTheWeek: dayOfTheWeek[startDayIndex],
      dayNumber,
    });

    startDayIndex++;
  }

  return newDateArr;
};

interface DayViewProps {
  date: Date | undefined;
  schedulesList:
    | {
        date: string;
        startTime: string;
        endTime: string;
        location: string;
        _id: string;
        __v: number;
        activityName: string;
        duration: string;
      }[]
    | undefined;
}

const DayView = ({ date, schedulesList }: DayViewProps) => {
  // Make function call to server side procedure to get the schedules from the database
  let times: string[] = generateTimesArray();
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
                schedulesList={schedulesList}
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

interface WeekViewProps {
  date: Date | undefined;
  schedulesList:
    | {
        date: string;
        startTime: string;
        endTime: string;
        location: string;
        _id: string;
        __v: number;
        activityName: string;
        duration: string;
      }[]
    | undefined;
  dragging: boolean;
  setDragging: React.Dispatch<React.SetStateAction<boolean>>;
  isDragDisabled: boolean;
  setIsDragDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeekView = ({
  date,
  schedulesList,
  dragging,
  setDragging,
  isDragDisabled,
  setIsDragDisabled,
}: WeekViewProps) => {
  let days: MyDate[] = generateDaysOfWeek({ date });
  let times: string[] = generateTimesArray();
  let todaysDay = new Date();
  const currentMonthShort = todaysDay.toLocaleString("default", {
    month: "short",
  });
  // const currentMonth = date?.toLocaleString('en-us', { month: 'short' });

  // console.log(days);

  // const [dragging, setDragging] = useState(false); // tracks if the user is currently dragging or not
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // items that have been selected during the drag; of type array of strings

  // remove selected items on ctrl + z
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        clearItemSelection();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [clearItemSelection]);

  /**
   * handles when the user presses the mouse down
   */
  function handleClickStart(
    e: React.MouseEvent<HTMLDivElement>,
    dayOfTheWeek: string,
    time: string
  ) {
    e.preventDefault();
    setDragging(true); //when they click set drag to true
    handleItemSelection(dayOfTheWeek, time);
  }

  /**
   * handles when the user moves the mouse over another element after initiating the start of a drag event
   * @param e
   * @param dayOfTheWeek
   * @param time
   */
  function handleClickMove(
    e: React.MouseEvent<HTMLDivElement>,
    dayOfTheWeek: string,
    time: string
  ) {
    e.preventDefault();
    if (dragging) {
      handleItemSelection(dayOfTheWeek, time);
    }
  }

  /**
   * handles when the user finishes clicking on the screen
   */
  function handleClickEnd() {
    setDragging(false);
  }

  function handleItemSelection(DaysOfTheWeek: string, time: string) {
    const currentItem = `${DaysOfTheWeek}-${time}`;
    if (!selectedItems.includes(currentItem)) {
      // if the item currently being dragged over isnt in the list of selected items
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        currentItem,
      ]); //then add it to the list
    } else {
      //if the item is already selected
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== currentItem)
      ); //remove the item if it is already in the selectedItems list
    }
    console.log(selectedItems);
  }

  function clearItemSelection() {
    setSelectedItems([]);
  }

  return (
    <div className="md:flex">
      {/* For each day of the weeek */}
      {days.map((day) => (
        //this day card goes here!!!
        <div key={day.dayOfTheWeek} className="flex-grow">
          <div
            className={`h-[75px] bg-zinc-50 border-r border-neutral-200 p-2 ${
              todaysDay.getDate() === day.dayNumber &&
              currentMonthShort === day.currentMonth
                ? "border-[3px] border-l-0 border-t-0 border-b-red-500 "
                : ""
            }`}
          >
            {/* <div className={`h-[75px] bg-zinc-50 border-r border-neutral-200 p-2`}> */}
            <p
              className={` text-xs font-semibold ${
                todaysDay.getDate() === day.dayNumber &&
                currentMonthShort === day.currentMonth
                  ? "text-red-600"
                  : "text-zinc-500"
              }`}
            >
              {day.dayOfTheWeek.toUpperCase()}
            </p>
            {/* <h1 className={`text-gray-900 text-xl relative ${todaysDay.getDate() === day.dayNumber ? 'font-medium' : 'font-semibold'}`}> */}
            <h1 className="text-gray-900 font-semibold text-xl relative">
              {todaysDay.getDate() === day.dayNumber &&
              currentMonthShort === day.currentMonth ? (
                <>
                  {/* <p className="z-10 absolute text-white"> */}
                  <p className="z-10 text-red-600">{day.dayNumber}</p>
                  {/* <div className="absolute w-8 h-8 bg-red-500 shadow-red-300/75 shadow-md rounded-full -left-1 -top-0.5"></div> */}
                </>
              ) : (
                <p className="">{day.dayNumber}</p>
              )}
            </h1>
          </div>
          <div className="flex flex-col border-r border-neutral-200">
            {/* For each time during that day of the week */}
            {times.map((time, index) => (
              <div
                key={`${day.dayOfTheWeek}-${day.dayNumber}-${time}`}
                data-day-of-week={day.dayOfTheWeek}
                data-day-number={day.dayNumber}
                data-time={time}
                className={`h-5 w-full border-t relative ${
                  isDragDisabled ? "" : "hover:bg-zinc-200"
                }
                  ${
                    index % 4 === 0
                      ? "border-neutral-200"
                      : "border-neutral-100"
                  }
                  ${
                    selectedItems.includes(`${day.dayOfTheWeek}-${time}`)
                      ? "transition duration-300 hover:duration-0 bg-red-600 opacity-50"
                      : ""
                  }
                `}
                /**Event handlers */
                onMouseDown={
                  !isDragDisabled
                    ? (e) => handleClickStart(e, day.dayOfTheWeek, time)
                    : undefined
                }
                onMouseEnter={
                  !isDragDisabled
                    ? (e) => handleClickMove(e, day.dayOfTheWeek, time)
                    : undefined
                }
                onMouseUp={!isDragDisabled ? handleClickEnd : undefined}
              >
                <div className="absolute w-full flex">
                  <MountCalendarEvent
                    schedulesList={schedulesList}
                    currentDayOfTheWeek={day.dayNumber.toString()}
                    currentMonth={day.currentMonth}
                    currentStartTime={time}
                  />
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
  dragging: boolean;
  setDragging: React.Dispatch<React.SetStateAction<boolean>>;
  isDragDisabled: boolean;
  setIsDragDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Schedule = ({
  dragging,
  setDragging,
  isDragDisabled,
  setIsDragDisabled,
}: ScheduleProps) => {
  const { date } = useDateStore();
  const { scheduleView } = useScheduleViewStore();
  const [activeView, setActiveView] = useState(scheduleView);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { activityToggles } = useContext(ToggleContext);

  const schedules = trpc.schedule.getSchedules.useQuery();
  const [schedulesList, setSchedulesList] = useState(schedules.data);

  const prevDateRef = useRef(date);

  useEffect(() => {
    if (scheduleView !== activeView || date !== prevDateRef.current) {
      setIsTransitioning(true);
      // This timeout duration should match the CSS transition time
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setActiveView(scheduleView);
        prevDateRef.current = date; // Update the ref to the new date
      }, 300);

      return () => clearTimeout(timer);
    }

    if (schedules.data) {
      let filteredSchedule = schedules.data.filter((activity) => {
        return activityToggles[
          activity.activityName.replace("Drop In ", "").replace(" Time", "")
        ];
      });

      // Check if the filtered schedule has changed before updating state
      if (!arraysEqual(filteredSchedule, schedulesList)) {
        setSchedulesList(filteredSchedule);
      }
    }
  }, [
    scheduleView,
    activeView,
    date,
    schedules.data,
    activityToggles,
    schedulesList,
  ]);

  // Function to compare arrays for equality
  function arraysEqual(arr1: string | any[], arr2: string | any[] | undefined) {
    if (arr1.length !== arr2?.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  let viewComponent = null;
  const viewStatusClass = isTransitioning
    ? "view-exit-active"
    : "view-enter-active";

  if (activeView === "d") {
    viewComponent = <DayView date={date} schedulesList={schedulesList} />;
  } else {
    viewComponent = (
      <WeekView
        date={date}
        schedulesList={schedulesList}
        dragging={dragging}
        setDragging={setDragging}
        isDragDisabled={isDragDisabled}
        setIsDragDisabled={setIsDragDisabled}
      />
    );
  }

  return (
    <div className={`view-transition ${viewStatusClass}`}>{viewComponent}</div>
  );
};
