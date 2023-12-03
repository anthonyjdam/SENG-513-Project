import { trpc } from "@/lib/trpc";
import React, { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from 'react';

/**
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
    case newActivityName.includes('badminton'):
      return {
        bg: 'bg-purple-500/10',
        border: 'border-purple-400',
        text: 'text-purple-600',
        emoji: '🏸 ',
        dot: 'bg-purple-500'
      };

    case newActivityName.includes('basketball'):
      return {
        bg: 'bg-orange-500/10',
        border: 'border-orange-400',
        text: 'text-orange-600',
        emoji: '🏀 ',
        dot: 'bg-orange-500'
      };

    case newActivityName.includes('ball hockey'):
      return {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-400',
        text: 'text-yellow-600',
        emoji: '🏑 ',
        dot: 'bg-yellow-500'
      };

    case newActivityName.includes('volleyball'):
      return {
        bg: 'bg-red-500/10',
        border: 'border-red-400',
        text: 'text-red-600',
        emoji: '🏐 ',
        dot: 'bg-red-500'
      };

    case newActivityName.includes('soccer'):
      return {
        bg: 'bg-green-500/10',
        border: 'border-green-400',
        text: 'text-green-600',
        emoji: '⚽ ',
        dot: 'bg-green-500'
      };

    default:
      return {
        bg: 'bg-blue-500/10',
        border: 'border-blue-400',
        text: 'text-blue-600',
        emoji: '🏃 ',
        dot: 'bg-blue-500'
      };
  }
};

function mountCalendarEvent(schedulesList: Schedule[] | undefined, currentDayOfTheWeek: string, currentStartTime: string) {
  // console.log("Day of week", currentDayOfTheWeek, "Start time", currentStartTime);
  let activityDate;
  let activityStartTime;
  let activityEndTime;
  let activityID;
  let activityName;
  let activityDuration;
  let activityLocation;

  if (schedulesList) {
    // console.log(schedulesList);

    for (let i = 0; i < schedulesList.length; i++) {

      activityDate = schedulesList[i].date.toUpperCase();
      activityStartTime = schedulesList[i].startTime;
      activityEndTime = schedulesList[i].endTime;
      activityID = schedulesList[i]._id;
      activityName = schedulesList[i].activityName;
      activityLocation = schedulesList[i].location;
      activityDuration = schedulesList[i].duration;

      if (activityDate.includes(currentDayOfTheWeek) && activityStartTime.includes(currentStartTime)) {
        const formattedActivityName = activityName.replace(/^Drop In\s*/, '').replace(/\s*Time$/, ''); // Remove "Drop In" from the beginning and "Time" from the end   
        // const formattedTime = activityStartTime.replace(/^0(\d+):(\d+) (\w{2})/, '$1:$2 $3');
        const scheduleHeight = 20 * parseInt(activityDuration, 10) / 15;// parse the duration as an int
        console.log(scheduleHeight)

        return (
          <div
            key={activityName + "-" + activityID}
            className={`border-l-4 rounded-md p-1 pt-2 flex-1 z-10 ${activityTheme(formattedActivityName).bg} ${activityTheme(formattedActivityName).border}`}
            style={{ height: scheduleHeight }}
          >
            <div className={`absolute -z-10 w-4 h-4 p-1 rounded-full ${activityTheme(formattedActivityName).dot}`}></div>
            <p className={`font-medium break-all leading-4 text-xs ${activityTheme(formattedActivityName).text}`}>
              {
                activityTheme(formattedActivityName).emoji
                + formattedActivityName
                + " • " + activityStartTime.replace(/^0?(\d+):(\d+)\s*(AM|PM)/i, '$1:$2$3')
                + "-" + activityEndTime.replace(/^0?(\d+):(\d+)\s*(AM|PM)/i, '$1:$2$3')
                + " • " + activityLocation
              }
            </p>
          </div>
        );
      }
    }
  }

  return null; //return nothing if there is no activity at that time of the day of the week 
}

// Interface for a date in the days of the week
interface MyDate {
  dayOfTheWeek: string;
  dayNumber: number;
}

/**
 * Creates the daysOfTheWeek component attributes
 */
const generateDaysOfWeek = ({ date }: { date: Date | undefined }) => {
  if (!date) {
    // Handle the case where date is undefined
    return [];
  }

  const dayOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
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
  // Make function call to server side procedure to get the schedules from the database
  const schedules = trpc.schedule.getSchedules.useQuery();
  const schedulesList = schedules.data;
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
            className={`h-5 w-full border-t relative ${index % 4 === 0 ? "border-neutral-200" : "border-neutral-100"
              }`}
          >
            <div className="absolute w-full flex">
              {mountCalendarEvent(schedulesList, date!.getDate().toString(), time)}
              {/* {time === "8:00 AM" && day.dayOfTheWeek === "TUE" ? (
                    <div
                      className={`bg-rose-500/10 border-l-4 border-rose-500 h-20 rounded-l-md p-1 flex-1 z-10`}
                    >
                      <p className="break-all leading-4">volleyball</p>
                    </div>
                  ) : null} */}
            </div>
            {/* <div className="absolute w-full flex">
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
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};


const WeekView = ({ date }: { date: Date | undefined }) => {
  // Make function call to server side procedure to get the schedules from the database
  const schedules = trpc.schedule.getSchedules.useQuery();
  const schedulesList = schedules.data;

  let days: MyDate[] = generateDaysOfWeek({ date });
  let times: string[] = generateTimesArray();
  // console.log("Times: ", times, "Days ", days);

  const [dragging, setDragging] = useState(false); // tracks if the user is currently dragging or not
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // items that have been selected during the drag; of type array of strings

  // remove selected items on ctrl + z
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        clearItemSelection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [clearItemSelection]);

  /**
   * handles when the user presses the mouse down
   */
  function handleTouchStart(e: React.MouseEvent<HTMLDivElement>, dayOfTheWeek: string, time: string) {
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
  function handleTouchMove(e: React.MouseEvent<HTMLDivElement>, dayOfTheWeek: string, time: string) {
    e.preventDefault();
    if (dragging) {
      handleItemSelection(dayOfTheWeek, time);
    }
  }

  /**
   * handles when the user finishes clicking on the screen
   */
  function handleTouchEnd() {
    setDragging(false);
  }

  function handleItemSelection(DaysOfTheWeek: string, time: string) {
    const currentItem = `${DaysOfTheWeek}-${time}`;
    if (!selectedItems.includes(currentItem)) { // if the item currently being dragged over isnt in the list of selected items
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, currentItem]); //then add it to the list
      console.log(selectedItems);

    }
    else { //if the item is already selected
      setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((item) => item !== currentItem)) //remove the item if it is already in the selectedItems list 
    }

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
          <div className="h-[75px] bg-zinc-50 border-r border-neutral-200 p-2">
            <p className="text-zinc-500 text-xs font-semibold">
              {day.dayOfTheWeek.toUpperCase()}
            </p>
            <h1 className="text-gray-900 text-xl font-semibold">
              {day.dayNumber}
            </h1>
          </div>
          <div className="flex flex-col border-r border-neutral-200">

            {/* For each time during that day of the week */}
            {times.map((time, index) => (
              <div
                key={`${day.dayOfTheWeek}-${day.dayNumber}-${time}`}
                data-dayOfWeek={day.dayOfTheWeek}
                data-dayNumber={day.dayNumber}
                data-time={time}
                className={`h-5 w-full border-t relative hover:bg-zinc-200
                  ${index % 4 === 0 ? "border-neutral-200" : "border-neutral-100"}
                  ${selectedItems.includes(`${day.dayOfTheWeek}-${time}`) ? 'bg-red-500/75' : ''}
                `}
                /**Event handlers */
                onMouseDown={(e) => handleTouchStart(e, day.dayOfTheWeek, time)}
                onMouseEnter={(e) => handleTouchMove(e, day.dayOfTheWeek, time)}
                onMouseUp={handleTouchEnd}
              >
                <div className="absolute w-full flex">
                  {mountCalendarEvent(schedulesList, day.dayOfTheWeek, time)}
                  {/* {time === "8:00 AM" && day.dayOfTheWeek === "TUE" ? (
                    <div
                      className={`bg-rose-500/10 border-l-4 border-rose-500 h-20 rounded-l-md p-1 flex-1 z-10`}
                    >
                      <p className="break-all leading-4">volleyball</p>
                    </div>
                  ) : null} */}
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
  const [activeView, setActiveView] = useState(scheduleView);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (scheduleView !== activeView) {
      setIsTransitioning(true);
      // This timeout duration should match the CSS transition time
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setActiveView(scheduleView);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [scheduleView, activeView]);


  let viewComponent = null;
  const viewStatusClass = isTransitioning ? 'view-exit-active' : 'view-enter-active';

  if (activeView === 'd') {
    viewComponent = <DayView date={date} />;
  } else {
    viewComponent = <WeekView date={date} />;
  }

  return (
    <div className={`view-transition ${viewStatusClass}`}>
      {viewComponent}
    </div>
  );
};

