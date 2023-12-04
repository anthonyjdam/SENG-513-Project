import { ToggleContext } from "@/app/page";
import { trpc } from "@/lib/trpc";

import { useState, useEffect, useRef } from "react";
import React, { Dispatch, SetStateAction, useContext } from "react";

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
    case newActivityName.includes("badminton"):
      return {
        bg: "bg-purple-500/10",
        border: "border-purple-400",
        text: "text-purple-600",
        emoji: "🏸 ",
        dot: "bg-purple-500",
      };

    case newActivityName.includes("basketball"):
      return {
        bg: "bg-orange-500/10",
        border: "border-orange-400",
        text: "text-orange-600",
        emoji: "🏀 ",
        dot: "bg-orange-500",
      };

    case newActivityName.includes("ball hockey"):
      return {
        bg: "bg-yellow-500/10",
        border: "border-yellow-400",
        text: "text-yellow-600",
        emoji: "🏑 ",
        dot: "bg-yellow-500",
      };

    case newActivityName.includes("volleyball"):
      return {
        bg: "bg-red-500/10",
        border: "border-red-400",
        text: "text-red-600",
        emoji: "🏐 ",
        dot: "bg-red-500",
      };

    case newActivityName.includes("soccer"):
      return {
        bg: "bg-green-500/10",
        border: "border-green-400",
        text: "text-green-600",
        emoji: "⚽ ",
        dot: "bg-green-500",
      };

    default:
      return {
        bg: "bg-blue-500/10",
        border: "border-blue-400",
        text: "text-blue-600",
        emoji: "🏃 ",
        dot: "bg-blue-500",
      };
  }
};


type eventData = {
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  _id: string;
  __v: number;
  activityName: string;
  duration: string;
};


const EventModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  eventDataList: eventData;
}> = ({ isOpen, onClose, eventDataList }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      {/* Modal content */}
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Event Details</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Location: {eventDataList.location}</p>
            <p className="text-sm text-gray-500">Time: {eventDataList.startTime} - {eventDataList.endTime}</p>
          </div>
          <button onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


function mountCalendarEvent(
  schedulesList: eventData[] | undefined,
  currentDayOfTheWeek: string,
  currentStartTime: string,
  onEventClick: (eventData: eventData) => void // Callback function for handling event clicks
) {
  let activityDate, activityStartTime, activityEndTime, activityID, activityName, activityDuration, activityLocation;

  let eventElements = [];
  let filteredList = schedulesList?.filter((activity) => {
    let [dayOfWeek, month, day] = activity.date.split(" ");
    return day === currentDayOfTheWeek;
  });

  if (filteredList) {
    for (let i = 0; i < filteredList.length; i++) {
      activityDate = filteredList[i].date.toUpperCase();
      activityStartTime = filteredList[i].startTime;
      activityEndTime = filteredList[i].endTime;
      activityID = filteredList[i]._id;
      activityName = filteredList[i].activityName;
      activityLocation = filteredList[i].location;
      activityDuration = filteredList[i].duration;

      if (activityDate.includes(currentDayOfTheWeek) && activityStartTime.includes(currentStartTime)) {
        const formattedActivityName = activityName.replace(/^Drop In\s*/, "").replace(/\s*Time$/, "");
        const scheduleHeight = (20 * parseInt(activityDuration, 10)) / 15;

        eventElements.push(
          <div
            key={activityID}
            className={`border-l-4 rounded-md p-1 pt-2 flex-1 z-10 ${activityTheme(formattedActivityName).bg} ${activityTheme(formattedActivityName).border}`}
            style={{ height: scheduleHeight }}
            onClick={() => onEventClick(filteredList[i])}
          >
            <div className={`absolute -z-10 w-4 h-4 p-1 rounded-full ${activityTheme(formattedActivityName).dot}`}></div>
            <p className={`font-medium break-all leading-4 text-xs ${activityTheme(formattedActivityName).text}`}>
              {activityTheme(formattedActivityName).emoji + formattedActivityName + " • " +
                activityStartTime.replace(/^0?(\d+):(\d+)\s*(AM|PM)/i, "$1:$2$3") + "-" +
                activityEndTime.replace(/^0?(\d+):(\d+)\s*(AM|PM)/i, "$1:$2$3") + " • " +
                activityLocation}
            </p>
          </div>
        );
      }
    }
  }

  return eventElements;
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

interface DayWeekViewProps {
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

const DayView = ({ date, schedulesList }: DayWeekViewProps) => {
  // Make function call to server side procedure to get the schedules from the database
  let times: string[] = generateTimesArray();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentEventData, setCurrentEventData] = useState<eventData | null>(null);

  // Handler for when an event is clicked
  const onEventClick = (eventDataList: eventData) => {
    setCurrentEventData(eventDataList);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentEventData(null);
  };

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
              {mountCalendarEvent(
                schedulesList,
                date!.getDate().toString(),
                time,
                onEventClick
              )}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && currentEventData && (
        <EventModal
          isOpen={isModalOpen}
          onClose={closeModal}
          eventDataList={currentEventData}
        />
      )}
    </div>
  );
};

const WeekView = ({ date, schedulesList }: DayWeekViewProps) => {
  let days: MyDate[] = generateDaysOfWeek({ date });
  let times: string[] = generateTimesArray();
  // console.log("Times: ", times, "Days ", days);

  const [dragging, setDragging] = useState(false); // tracks if the user is currently dragging or not
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
  function handleTouchStart(
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
  function handleTouchMove(
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
  function handleTouchEnd() {
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
  }

  function clearItemSelection() {
    setSelectedItems([]);
  }

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentEventData, setCurrentEventData] = useState<eventData | null>(null);

  // Handler for when an event is clicked
  const onEventClick = (eventDataList: eventData) => {
    setCurrentEventData(eventDataList);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentEventData(null);
  };

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
                  ${index % 4 === 0
                    ? "border-neutral-200"
                    : "border-neutral-100"
                  }
                  ${selectedItems.includes(`${day.dayOfTheWeek}-${time}`)
                    ? "bg-red-500/75"
                    : ""
                  }
                `}
                /**Event handlers */
                onMouseDown={(e) => handleTouchStart(e, day.dayOfTheWeek, time)}
                onMouseEnter={(e) => handleTouchMove(e, day.dayOfTheWeek, time)}
                onMouseUp={handleTouchEnd}
              >
                <div className="absolute w-full flex">
                  {mountCalendarEvent(
                    schedulesList,
                    day.dayNumber.toString(),
                    time,
                    onEventClick
                  )}
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
    viewComponent = <WeekView date={date} schedulesList={schedulesList} />;
  }

  return (
    <div className={`view-transition ${viewStatusClass}`}>{viewComponent}</div>
  );
};
