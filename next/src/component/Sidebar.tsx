import { useState, useContext } from "react";
import { ActivityButton } from "./ActivityButton";
import Image from "next/image";
import { ToggleContext } from "@/app/page"; // Adjust the path accordingly

interface SidebarProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  isDragDisabled: boolean
  setIsDragDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({ date, setDate, isDragDisabled, setIsDragDisabled }: SidebarProps) {

  const [selectTimeStyle, setSelectTimeStyle] = useState('bg-zinc-800 w-full rounded-lg');
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [selectTimeText, setSelectTimeText] = useState("Select Time");
  const monthName = date ? date.toLocaleString('en-US', { month: 'long' }) : '';
  const { activityToggles, setActivityToggles } = useContext(ToggleContext);

  const resetAllTogglesToFalse = () => {
    setActivityToggles(prevState => {
      // Create a new object with all toggles set to false
      const updatedToggles = {
        Badminton: false,
        Basketball: false,
        "Ball Hockey": false,
        Volleyball: false,
        Soccer: false,
        "Open Gym": false,
      };
      // Return the updated object to set the state
      return updatedToggles;
    });
  };


  function handleSelectTime() {
    setIsDragDisabled(false);
    resetAllTogglesToFalse();
    setSelectTimeText("");
    setShowAdditionalButtons(true);
    setSelectTimeStyle('bg-zinc-800 rounded-lg rounded-r-none');
  };

  function handleCancelSelectTime() {
    setIsDragDisabled(true);
    setSelectTimeText('Select Time');
    setShowAdditionalButtons(!showAdditionalButtons);
    setSelectTimeStyle('bg-zinc-800 rounded-lg');
  }

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
          <div className="flex flex-row">
            <p className="text-blue-400 pr-1">Set Availability</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" className="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </div>
          <div className="flex flex-row">
            {/* selectTimeButton */}
            <button className={`relative flex flex-row w-full ${selectTimeStyle} transition-all duration-150 p-2 mt-3 hover:bg-zinc-700 group`}
              onClick={handleSelectTime}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-white w-5 h-5 z-10 hover:animate-pulse">
                <path fill-rule="evenodd" d="M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 1zM5.05 3.05a.75.75 0 011.06 0l1.062 1.06A.75.75 0 116.11 5.173L5.05 4.11a.75.75 0 010-1.06zm9.9 0a.75.75 0 010 1.06l-1.06 1.062a.75.75 0 01-1.062-1.061l1.061-1.06a.75.75 0 011.06 0zM3 8a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 013 8zm11 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0114 8zm-6.828 2.828a.75.75 0 010 1.061L6.11 12.95a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm3.594-3.317a.75.75 0 00-1.37.364l-.492 6.861a.75.75 0 001.204.65l1.043-.799.985 3.678a.75.75 0 001.45-.388l-.978-3.646 1.292.204a.75.75 0 00.74-1.16l-3.874-5.764z" clip-rule="evenodd" />
              </svg>
              {showAdditionalButtons && (
                <span className="absolute inset-0 bg-gradient-to-br from-red-400 to-indigo-200 transition-opacity rounded-lg rounded-r-none"></span>
              )}
              <div className="ml-4 text-sm z-10">
                {selectTimeText}
              </div>
            </button>

            {showAdditionalButtons && (
              <>
                {/* cancel button */}
                <button className="text-sm bg-zinc-800 p-2 mt-3 border-r-2 border-l-2 border-zinc-900"
                  onClick={handleCancelSelectTime}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w- h-5 text-white hover:text-red-400">
                    <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                  </svg>
                </button>
                {/* finish button */}
                <button className="text-sm bg-zinc-800 p-2 mt-3 rounded-r-lg"
                  onClick={handleCancelSelectTime}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white hover:text-green-400">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                  </svg>
                </button>
              </>
            )}
          </div>
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
