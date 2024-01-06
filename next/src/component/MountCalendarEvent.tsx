import { useScheduleStore } from "@/store";
import { useState } from "react";

const activityTheme = (simplifiedActivityName: string) => {
  const newActivityName = simplifiedActivityName.toLowerCase().replace(" ", "");

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

    case newActivityName.includes("ballhockey"):
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
  currentDayOfTheWeek: string;
  currentMonth: string | undefined;
  currentStartTime: string;
};

export const MountCalendarEvent = ({
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

  const { scheduleList } = useScheduleStore();

  let filteredList = scheduleList?.filter((activity) => {
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
            hover:z-20 hover:-translate-x-1 hover:scale-[102%] hover:absolute hover:min-w-fit hover:backdrop-blur-md hover:shadow-md
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
