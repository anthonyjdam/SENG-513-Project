"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/component/Sidebar";
import TimesColumn from "@/component/TimesColumn";
import { Topbar } from "@/component/Topbar";
import { Schedule } from "@/component/Schedule";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { generateTimes } from "@/lib/utilityFunctions";
require("dotenv").config();

export default function Home() {
  const { toast } = useToast();
  const [isPopupVisible, setPopupVisible] = useState(true);

  const dismissPopupForever = () => {
    // set a flag in local storage to remember that the user dismissed the popup
    localStorage.setItem("popupDismissed", "true");
    setPopupVisible(false);
  };

  useEffect(() => {
    const dismissed = localStorage.getItem("popupDismissed");

    if (dismissed) {
      setPopupVisible(false);
    } else {
      //display popup if local storage isnt false
      toast({
        title: "👋 Welcome",
        description:
          "Please be aware that this website is experimental and may not present information accurately or as intended. Thank you for your understanding as we work to improve it.",
        action: (
          <ToastAction onClick={dismissPopupForever} altText="Dismiss forever">
            Dismiss Forever
          </ToastAction>
        ),
      });
    }
  }, [toast]);

  return (
    <main className="flex flex-row min-h-screen">
      <Toaster></Toaster>
      <div className="relative">
        <Sidebar />
      </div>

      <div className="flex flex-grow flex-col">
        <Topbar />

        <div className="flex flex-row h-full">
          <div className="flex flex-col w-full">
            <div className="flex flex-row h-full">
              <div className="bg-white text-zinc-500 w-[60px]">
                <div className="bg-white h-[75px] min-h-[75px]"></div>

                {generateTimes().map((time) => (
                  <TimesColumn key={time} time={time} />
                ))}
              </div>

              <div className="w-full h-full flex flex-col">
                <Schedule />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
