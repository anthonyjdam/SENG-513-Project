import { ActivityButton } from "./ActivityButton";
import Image from "next/image";
import { generateDaysOfWeek } from "./Schedule";

interface SidebarProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

function Sidebar({ date, setDate }: SidebarProps) {

  const monthName = date ? date.toLocaleString('en-US', { month: 'long' }) : '';

  return (
    <aside className="bg-zinc-900 text-white top-0 h-screen overflow-y-auto sticky px-5 md:flex md:justify-between flex-col justify-center gap-10 hidden">
      <div className="flex flex-col mt-4 space-y-3">
        <div className="flex flex-row pb-2">
          <h1 className="text-2xl text-white pr-1">{monthName}</h1>
          <h1 className="text-2xl font-light text-red-500">2023</h1>
        </div>
        <p className="text-blue-400">Choose Activity</p>
        <ActivityButton activity="Badminton" />
        <ActivityButton activity="Basketball" />
        <ActivityButton activity="Ball Hockey" />
        <ActivityButton activity="Volleyball" />
        <ActivityButton activity="Soccer" />
        <ActivityButton activity="Open Gym" />
        <div>
          <p className="text-blue-400">Set Availability</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>

        </div>
      </div>
      <div className="flex gap-x-2 pb-2">
        <Image src="/active-living-logo.png" width={50} height={50} alt="" />
        <p className="flex items-end text-xl font-semibold">Active Living</p>
      </div>
    </aside>
  );
}

export default Sidebar;
