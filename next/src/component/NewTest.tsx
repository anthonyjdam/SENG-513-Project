import { trpc } from "@/lib/trpc";
import React from "react";

function NewTest() {

  type schedule = {
    activity: string;
    startTime: string;
    endTime: string;
    date: string;
    location: string;
  };
  // DEMO: Change location type to number

  const newSchedule: schedule = {
    activity: "SomeActivity",
    startTime: "08:00 AM",
    endTime: "10:00 AM",
    date: "2023-11-25",
    location: "SomeLocation",
  };
  // DEMO: Change location to a number

  // DEMO: Hover on schedules to show type we get on client
  // DEMO: Rename getSchedules to getSchedules2
  const schedules = trpc.schedule.getSchedules.useQuery();

  const createSched = trpc.schedule.createSchedule.useMutation()

  return (
    <div>
      <button
        onClick={() => {
          console.log(createSched.mutate(newSchedule));
          
          console.log(schedules.data);
        }}
      >
        NEW TEST
      </button>
    </div>
  );
}

export default NewTest;
