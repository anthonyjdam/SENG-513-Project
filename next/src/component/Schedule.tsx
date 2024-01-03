import { trpc } from "@/lib/trpc";
import {
  ActivityTogglesState,
  useActivityToggleStore,
  useDateStore,
  useDragStore,
  useScheduleStore,
  useScheduleViewStore,
} from "@/store";

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

  const schedules = trpc.schedule.getSchedules.useQuery();
  const { scheduleList, setScheduleList } = useScheduleStore();

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
    }
  }, [
    scheduleView,
    activeView,
    date,
    schedules.data,
    Toggles,
    scheduleList,
    setScheduleList,
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
    viewComponent = <DayView />;
  } else {
    viewComponent = <WeekView />;
  }

  return (
    <div className={`view-transition ${viewStatusClass}`}>{viewComponent}</div>
  );
};
