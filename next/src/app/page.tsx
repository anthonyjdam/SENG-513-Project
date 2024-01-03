"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/lib/trpc";
import Sidebar from "@/component/Sidebar";
import TimesColumn from "@/component/TimesColumn";
import { Topbar } from "@/component/Topbar";
import { Schedule } from "@/component/Schedule";
import { generateTimes } from "@/lib/utilityFunctions";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:5001/trpc",
        }),
      ],
    });
  });

  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <main className="flex flex-row min-h-screen">
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
      </QueryClientProvider>
    </trpc.Provider>
  );
}
