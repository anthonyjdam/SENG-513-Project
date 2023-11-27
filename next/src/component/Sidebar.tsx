import { ActivityButton } from "./ActivityButton";
import Image from "next/image";

function Sidebar() {
  return (
    <aside className="bg-zinc-900 text-white top-0 h-screen overflow-y-auto sticky px-5 md:flex flex-col justify-center gap-10 hidden">
      <div className="flex flex-col mt-4 space-y-3">
        <p className="text-blue-400">Choose Activity</p>
        <ActivityButton activity="Badminton" />
        <ActivityButton activity="Basketball" />
        <ActivityButton activity="Ball Hockey" />
        <ActivityButton activity="Volleyball" />
        <ActivityButton activity="Soccer" />
        <ActivityButton activity="Open Gym" />
      </div>
      <div className="flex space-x-2">
        <Image src="/active-living-logo.png" width={75} height={75} alt="" />
        <p className="text-xl mt-10">Active Living</p>
      </div>
    </aside>
  );
}

export default Sidebar;
