import { generateDaysOfWeek, generateTimesArray } from "@/lib/utilityFunctions";
import { useDateStore, useDragStore } from "@/store";
import { useEffect, useState } from "react";
import { MountCalendarEvent } from "./MountCalendarEvent";

// Interface for a date in the days of the week
interface MyDate {
  currentMonth: string;
  dayOfTheWeek: string;
  dayNumber: number;
}

export const WeekView = () => {
  const { date } = useDateStore();
  const { dragging, setDragging, isDragDisabled } = useDragStore();
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
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.ctrlKey && e.key === "z") {
  //       clearItemSelection();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [clearItemSelection]);

  /**
   * handles when the user presses the mouse down
   */
  function handleClickStart(
    e: React.MouseEvent<HTMLDivElement>,
    dayOfTheWeek: string,
    time: string
  ) {
    e.preventDefault();
    setDragging(); //when they click set drag to true
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
    setDragging();
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
    //console.log(selectedItems);
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
