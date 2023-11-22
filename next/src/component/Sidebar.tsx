import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

function Sidebar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    // <aside className='bg-blue-400 overflow-y-auto min-w-[250px] fixed top-0 bottom-0'>
    <aside className="bg-blue-400 overflow-y-auto min-w-[250px]">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </aside>
  );
}

export default Sidebar;
