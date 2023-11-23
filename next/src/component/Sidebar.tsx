import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ActivityButton } from "./ActivityButton";
import Image from "next/image";

function Sidebar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <aside className="overflow-y-auto bg-zinc-900 text-white">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border mx-6 px-4 mt-4"
      />
      <div className="flex flex-col justify-start mx-5 mt-4 space-y-3">
        <p className="text-blue-400">Choose Activity</p>
        <ActivityButton activity="Badminton" />
        <ActivityButton activity="Basketball" />
        <ActivityButton activity="Ball Hockey" />
        <ActivityButton activity="Volleyball" />
        <ActivityButton activity="Soccer" />
        <ActivityButton activity="Open Gym" />
      </div>
      <div className="flex space-x-2 ml-4 mt-4">
        <Image src="/active-living-logo.png" width={75} height={75} alt="" />
        <p className="text-xl mt-10">Active Living</p>
      </div>
    </aside>
  );
}

export default Sidebar;
