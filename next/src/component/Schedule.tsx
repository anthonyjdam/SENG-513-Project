import {
  ActivityTogglesState,
  useActivityToggleStore,
  useDateStore,
  useDragStore,
  useScheduleStore,
  useScheduleViewStore,
} from "@/store";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { DayView } from "./DayView";
import { WeekView } from "./WeekView";

export const Schedule = () => {
  const { date } = useDateStore();
  const { scheduleView } = useScheduleViewStore();
  const { Toggles } = useActivityToggleStore();
  const [activeView, setActiveView] = useState(scheduleView);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { scheduleList, setScheduleList, initialList, setInitialList } =
    useScheduleStore();

  const prevDateRef = useRef(date);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_HTTP_SERVER_LINK as string
        );
        setInitialList(response.data);
        setScheduleList(response.data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    }

    fetchData();
  }, [setInitialList, setScheduleList]);

  useEffect(() => {
    let filteredSchedule = initialList!.filter((activity) => {
      return Toggles[
        activity.activityName
          .replace("Drop In ", "")
          .replace(" Time", "")
          .replace(" ", "") as keyof ActivityTogglesState["Toggles"]
      ];
    });

    // Check if the filtered schedule has changed before updating state
    if (!arraysEqual(filteredSchedule, scheduleList)) {
      setScheduleList(filteredSchedule);
    }
  }, [Toggles, initialList, scheduleList, setScheduleList]);

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
  }, [scheduleView, activeView, date]);

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
    viewComponent = <DayView />;
  } else {
    viewComponent = <WeekView />;
  }

  return (
    <div className={`view-transition ${viewStatusClass}`}>{viewComponent}</div>
  );
};
