import { trpc } from "@/lib/trpc";
import { useState } from "react";

interface newSchedules {
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    _id: string;
    __v: number;
    activityName: string;
    duration: string;
  }


export const getSchedules = (() => {

    const newSchedules = trpc.schedule.getSchedules.useQuery();
    const [cachedSchedules, setCachedSchedules] = useState<newSchedules[]>([]);

    if (cachedSchedules) { // if data has already been fetched, return the current data
        return cachedSchedules;
    }
    
    const schedulesData = newSchedules.data || [];
    setCachedSchedules(schedulesData);
    return newSchedules;
});