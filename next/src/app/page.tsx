"use client";
import Image from "next/image";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/lib/trpc";
import Array from "@/component/Array";
import Sidebar from "@/component/Sidebar";
import RowTime from "@/component/RowTime";
import { Topbar } from "@/component/Topbar";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:5000/trpc",
        }),
      ],
    });
  });

  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <main className="flex flex-row min-h-screen">
          <Sidebar />

          <div className="flex flex-grow flex-col">
            <Topbar />

            <div className="bg-violet-400 w-full h-[75px]">DaysOfTheWeek</div>

            <div className="flex flex-row h-full">
              <div className="bg-red-400 w-[60px]">
                <div className="bg-amber-500 h-[50px] flex flex-row text-xs font-bold">
                  7:00AM
                </div>
                <div className="bg-amber-500 h-[50px] flex flex-row text-xs font-bold">
                  8:00AM
                </div>
                <div className="bg-amber-500 h-[50px] flex flex-row text-xs font-bold">
                  9:00AM
                </div>
              </div>

              <div className="w-full flex- bg-green-400">Calendar</div>
            </div>
          </div>
        </main>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
