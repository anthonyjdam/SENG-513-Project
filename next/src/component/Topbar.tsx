import { useEffect, useState } from "react";
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
import HamburgerMenu from "./HamburgerMenu";
//import ICAL from "ical.js";
const ICAL = require("ical.js");
import ErrorMessage from "./ErrorMessage";
import { useDateStore, useScheduleStore, useScheduleViewStore } from "@/store";
import { generateDaysOfWeek } from "@/lib/utilityFunctions";

export const Topbar = () => {
  //const { isSignedIn } = useAuth();
  const { date, setDate } = useDateStore();
  const { scheduleView, setScheduleView } = useScheduleViewStore();
  const { scheduleList } = useScheduleStore();
  const [selectedDateRange, setSelectedDateRange] = useState("today");
  const [selectedActivity, setSelectedActivity] = useState<string[]>([]);
  const activityList = [
    "Basketball",
    "Volleyball",
    "Badminton",
    "Ball Hockey",
    "Soccer",
    "Open Gym",
  ];
  const [selectedError, setSelectedError] = useState(false);
  const [noScheduleError, setNoScheduleError] = useState(false);

  const currentDate = new Date();
  const currentDayObject = {
    date: currentDate,
  };

  interface MyDate {
    currentMonth: string;
    dayOfTheWeek: string;
    dayNumber: number;
  }

  let weekSchedule: MyDate[] = generateDaysOfWeek(currentDayObject);
  // let weekSchedule: MyDate[] = generateDaysOfWeek( {date} );

  //useEffect(() => {
  // if (schedulesList.length > 0) {
  // fetchData();
  //console.log("Schedule list", scheduleList);
  // }
  //}, [scheduleList]);

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

  const activityTheme = (activityElement: string) => {
    switch (true) {
      case activityElement.includes("Basketball"):
        return {
          bg: "bg-amber-500/10",
          emoji: "🏀",
          dot: "bg-amber-400",
          text: "text-amber-600",
        };
      case activityElement.includes("Volleyball"):
        return {
          bg: "bg-red-500/10",
          emoji: "🏐",
          dot: "bg-red-400",
          text: "text-red-600",
        };
      case activityElement.includes("Badminton"):
        return {
          bg: "bg-purple-500/10",
          emoji: "🏸",
          dot: "bg-purple-400",
          text: "text-purple-600",
        };
      case activityElement.includes("Ball Hockey"):
        return {
          bg: "bg-blue-500/10",
          emoji: "🏑",
          dot: "bg-blue-400",
          text: "text-blue-600",
        };
      case activityElement.includes("Soccer"):
        return {
          bg: "bg-emerald-500/10",
          emoji: "⚽",
          dot: "bg-emerald-400",
          text: "text-emerald-600",
        };
      default:
        return {
          bg: "bg-sky-500/10",
          emoji: "🏃‍♂️",
          dot: "bg-sky-400",
          text: "text-sky-600",
        };
    }
  };

  function parseDateString(
    year: string | undefined,
    dateString: string,
    timeString: string
  ): Date {
    // Try to match the date string with the regular expression
    const match = dateString.match(/(\w{3}) (\d{1,2})/);

    // Check if the match was successful
    if (match) {
      const [, month, day] = match;

      // Convert month abbreviation to month number
      const monthNames = [
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
      const monthNumber = monthNames.indexOf(month) + 1;

      // Construct a standard date string
      const standardDateString = `${year}-${monthNumber
        .toString()
        .padStart(2, "0")}-${day.padStart(2, "0")} ${timeString}`;

      return new Date(standardDateString);
    } else {
      // If the match was not successful, log an error and return null
      console.error("Invalid date string:", dateString);
      return new Date();
    }
  }

  /**
   * checks if the activity exists in the list, if it does, remove it, else add it to the list
   * @param context the activity pressed by the user
   */
  function toggleSelectedActivity(context: string) {
    if (selectedActivity.includes(context)) {
      //remove the activity if it already exists
      setSelectedActivity((prev: string[]) =>
        prev.filter((element) => element !== context)
      );
    } else {
      //add the activity if it doesnt exist
      setSelectedActivity((prev: string[]) => [...prev, context]);
    }
  }

  function createICalEvent() {
    const currentMonth = currentDate.toLocaleString("default", {
      month: "short",
    });
    const formattedSchedulesList = scheduleList?.map((schedule) => {
      return {
        ...schedule,
        activityName: schedule.activityName
          .replace("Drop In ", "")
          .replace(" Time", ""),
      };
    });

    // console.log(formattedSchedulesList);

    // const offset = currentDate.getDate() - 21;
    // console.log("Selected", selectedActivity);

    const filteredSchedules = formattedSchedulesList?.filter((schedule) => {
      let [dayOfWeek, month, day] = schedule.date.split(" ");

      if (selectedDateRange === "today") {
        console.log("today");

        //checks that it belongs to same day, month and contains the same activity name
        return (
          day === currentDate.getDate().toString() &&
          month === currentMonth.toString() &&
          selectedActivity.some((activity) =>
            schedule.activityName.includes(activity)
          )
        );
      } else if (selectedDateRange === "week") {
        console.log(weekSchedule);
        //checks that it belongs to same week on the basis of the weekSchedule object and same activity name
        return (
          weekSchedule.some(
            (activity) =>
              day === activity.dayNumber.toString() &&
              month === activity.currentMonth
          ) &&
          selectedActivity.some((activity) =>
            schedule.activityName.includes(activity)
          )
        );
      } else {
        console.log("month");
        //checks that it belongs to same month and contains the same activity name
        return (
          month === currentMonth.toString() &&
          selectedActivity.some((activity) =>
            schedule.activityName.includes(activity)
          )
        );
      }
    });

    if (selectedActivity.length > 0) {
      setSelectedError(false);

      if (filteredSchedules!.length > 0) {
        setNoScheduleError(false);

        const vcalendar = new ICAL.Component("vcalendar"); // create a calendar component
        vcalendar.updatePropertyWithValue("prodid", "-//UofC Open Gym//");

        filteredSchedules?.forEach((schedule) => {
          // boilerplate event component
          const vevent = new ICAL.Component("vevent");
          const event = new ICAL.Event(vevent);
          const eventData = {
            summary: schedule.activityName,
            start: parseDateString(
              date?.getFullYear().toString(),
              schedule.date,
              schedule.startTime
            ),
            end: parseDateString(
              date?.getFullYear().toString(),
              schedule.date,
              schedule.endTime
            ),
          };

          console.log(eventData.end);
          //TODO
          event.location =
            (schedule.location == "Red Gym"
              ? " ♦️ "
              : schedule.location == "Gold Gym"
              ? " ⭐ "
              : " ⚪ ") + schedule.location;
          event.summary =
            activityTheme(schedule.activityName).emoji +
            schedule.activityName +
            " " +
            schedule.location;
          event.startDate = new ICAL.Time({
            year: eventData.start.getFullYear(),
            month: eventData.start.getMonth() + 1,
            day: eventData.start.getDate(),
            hour: eventData.start.getHours(),
            minute: eventData.start.getMinutes(),
          });
          event.endDate = new ICAL.Time({
            year: eventData.end.getFullYear(),
            month: eventData.end.getMonth() + 1,
            day: eventData.end.getDate(),
            hour: eventData.end.getHours(),
            minute: eventData.end.getMinutes(),
          });
          // console.log(event.endDate);

          vcalendar.addSubcomponent(vevent); // add event component to calendar component
        });

        //  the resulting iCalendar string
        const icalString = vcalendar.toString();
        console.log(icalString);

        // create a blob and download the file
        const blob = new Blob([icalString], {
          type: "text/calendar;charset=utf-8",
        });
        const dataURI = URL.createObjectURL(blob);

        // create a link element and trigger the download
        const a = document.createElement("a");
        a.href = dataURI;
        a.download = "event.ics";

        document.body.appendChild(a); // append the link to the body
        a.click(); // trigger a click on the link

        document.body.removeChild(a); // remove the link from the DOM
        URL.revokeObjectURL(dataURI); // release the object URL
      } else {
        setSelectedError(false); // remove the previous error message
        setNoScheduleError(true); // show new error message
      }
    } else {
      setNoScheduleError(false);
      setSelectedError(true);
    }
  }

  // useEffect(() => {
  //   console.log(selectedActivity);
  // }, [selectedActivity])

  return (
    <div className="flex justify-between mx-3 py-4 ">
      <div className="flex gap-5 sm:pl-10">
        <div className="flex space-x-2 items-center">
          {/* Sidebar for mobile view */}
          <HamburgerMenu />

          {/* Calendar Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="hover:bg-red-600 active:bg-red-500 hover:shadow-red-200 active:shadow-red-200 hover:shadow-md active:shadow-md rounded-lg p-0.5 text-zinc-600 hover:text-white active:text-white border border-white hover:border-zinc-200/50 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.7"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 mt-5">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </PopoverContent>
          </Popover>

          {/* Download popover */}
          {
            // schedulesList.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="hover:bg-red-600 active:bg-red-500 hover:shadow-red-200 active:shadow-red-200 hover:shadow-md active:shadow-md rounded-lg p-0.5 text-zinc-600 hover:text-white active:text-white border border-white hover:border-zinc-200/50 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.7"
                    stroke="currentColor"
                    data-slot="icon"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </button>
              </PopoverTrigger>
              {/* <PopoverContent className="w-80 bg-white/[80%] backdrop-blur-2xl rounded-xl"> */}
              <PopoverContent className="w-96 rounded-md">
                <>
                  <div className="flex justify-center w-full flex-col">
                    {selectedError == true && (
                      <ErrorMessage errorMessage="Please select at least one activity" />
                    )}
                    {noScheduleError == true && (
                      <ErrorMessage errorMessage="Activity has no scheduled times" />
                    )}
                    {/* Select Date */}
                    <div className="flex justify-evenly bg-zinc-100 rounded-full m-auto mt-4 w-[290px] min-w-fit h-fit">
                      <button
                        className={`m-1 mx-1 w-fit text-xs font-medium py-2 px-6 transition-all duration-300 ${
                          selectedDateRange == "today"
                            ? "bg-white rounded-full shadow-md text-red-600"
                            : "text-zinc-700 bg-none hover:text-black"
                        }`}
                        onClick={() => {
                          setSelectedDateRange("today");
                        }}
                      >
                        TODAY
                      </button>
                      <button
                        className={`m-1 mx-1 w-fit text-xs font-medium py-2 px-6 transition-all duration-300 ${
                          selectedDateRange == "week"
                            ? "bg-white rounded-full shadow-md text-red-600"
                            : "text-zinc-700 bg-none hover:text-black"
                        }`}
                        onClick={() => {
                          setSelectedDateRange("week");
                        }}
                      >
                        WEEK
                      </button>
                      <button
                        className={`m-1 mx-1 w-fit text-xs font-medium py-2 px-6 transition-all duration-300 ${
                          selectedDateRange == "month"
                            ? "bg-white rounded-full shadow-md text-red-600"
                            : "text-zinc-700 bg-none hover:text-black"
                        }`}
                        onClick={() => {
                          setSelectedDateRange("month");
                        }}
                      >
                        MONTH
                      </button>
                    </div>

                    {/* Select Activity */}
                    <div className="grid grid-cols-3 grid-rows-2 rounded-lg m-auto my-5 w-[280px] h-fit text-xs font-medium">
                      {activityList.map((activityElement) => (
                        <button
                          key={activityElement}
                          className={`border border-zinc-200 rounded-md m-0.5 p-4 flex flex-col items-center transition duration-300
                          ${
                            selectedActivity.includes(activityElement)
                              ? `${
                                  activityTheme(activityElement).bg
                                } shadow-md filter-none`
                              : "bg-none filter grayscale"
                          }`}
                          onClick={() => {
                            toggleSelectedActivity(activityElement);
                          }}
                        >
                          <span
                            className={`${
                              activityTheme(activityElement).dot
                            } border-zinc-200 rounded-full text-lg p-0.5 px-1 ${
                              activityElement !== "Open Gym" ? "px-1" : "px-1.5"
                            }`}
                          >
                            {activityTheme(activityElement).emoji}
                          </span>
                          <span
                            className={`text-xs ${
                              activityTheme(activityElement).text
                            } font-medium mt-0.5`}
                          >
                            {activityElement}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-center w-[290px] m-auto mb-4">
                      <button
                        className="bg-zinc-50 px-2 font-medium text-zinc-600 hover:text-white hover:bg-red-600 active:bg-red-600/90 active:text-white border hover:shadow-red-200 hover:shadow-md border-zinc-200 p-1 rounded-lg transition duration-300"
                        onClick={() => {
                          createICalEvent();
                        }}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </>
              </PopoverContent>
            </Popover>
            // )
          }

          {/* Old Button Position*/}
        </div>
      </div>

      <div className="md:hidden">
        <Image
          src="/active-living-logo.png"
          alt="Active Living Logo"
          width={40} // equivalent to w-10 in TailwindCSS (assuming 1rem = 16px)
          height={40} // equivalent to h-10 in TailwindCSS
        />
      </div>

      <div className="hidden md:flex space-x-0.5 text-zinc-600">
        <button
          className={`py-0.5 px-3 rounded-lg font-medium hover:shadow-md transition-all duration-700 hover:duration-300 ${
            scheduleView === "d"
              ? "bg-red-600 text-white shadow-red-200 shadow-md border border-zinc-200/50"
              : "text-zinc-500 bg-zinc-50 border border-zinc-200/50"
          }`}
          onClick={() => {
            setScheduleView();
          }}
        >
          Day
        </button>

        <button
          className={`py-0.5 px-4 rounded-lg font-medium hover:shadow-md transition-all duration-700 hover:duration-300 ${
            scheduleView === "w"
              ? "bg-red-600 text-white shadow-red-200 shadow-md border border-zinc-200/50"
              : "text-zinc-500 bg-zinc-50 border border-zinc-200/50"
          }`}
          onClick={() => {
            setScheduleView();
          }}
        >
          Week
        </button>
      </div>

      <div className="flex flex-row rounded-md hover:bg-zinc-50 hover:shadow-sm">
        <button
          // className="rounded-lg bg-zinc-100 py-0.5 px-0.5 hover:bg-zinc-200 hover:text-white transition-all duration-300 border border-zinc-200/50"
          // className="rounded-lg p-0.5 hover:bg-zinc-50 text-zinc-600 hover:text-red-600 border border-white hover:border-zinc-200/50 transition-all duration-300"
          className="rounded-md rounded-r-none p-0.5 hover:bg-zinc-50 text-zinc-600 hover:text-red-600 border border-white hover:border-zinc-50 transition-all duration-300"
          onClick={() => {
            handlePrevDay();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.7"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          className="p-0.5 px-1 hover:bg-zinc-50 text-zinc-600 hover:text-red-600 border border-white hover:border-zinc-50 transition-all duration-300"
          onClick={() => {
            if (date && setDate) {
              const today = new Date();
              setDate(today); // set the date to todays date
            }
          }}
        >
          Today
        </button>
        <button
          className="rounded-md rounded-l-none p-0.5 hover:bg-zinc-50 text-zinc-600 hover:text-red-600 border border-white hover:border-zinc-50 transition-all duration-300"
          // className="rounded-lg bg-zinc-100 py-0.5 px-0.5 hover:bg-zinc-200 hover:text-white transition-all duration-300 border border-zinc-200/50"
          onClick={() => {
            handleNextDay();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.7"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      {/* {
        isSignedIn ? (
          <div className="flex space-x-2 items-center">
            <Image src="/setting.svg" width={30} height={30} alt="" />
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <button className="py-0.5 px-2 rounded-lg font-medium text-zinc-600 bg-zinc-100  border border-zinc-200/50
        hover:bg-red-600 hover:text-white active:bg-red-500 hover:shadow-red-200 hover:shadow-md transition-all duration-300
        ">
            <SignInButton mode="modal" />
          </button>
        )
      } */}
    </div>
  );
};
