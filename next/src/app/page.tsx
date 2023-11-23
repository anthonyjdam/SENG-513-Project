"use client"
import Image from "next/image";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/lib/trpc";
import Array from "@/component/Array";
import Sidebar from "@/component/Sidebar";
import RowTime from "@/component/RowTime";
import DaysOfTheWeek from "@/component/DaysOfTheWeek";


interface Date {
	month: Date;
	day: Date;
}

function handleGetDaysOfWeek () {
	interface Date {
		dayOfTheWeek: Date;
		dayNumber: Date;
	}; 
	let dateArr: Date[];
	let dayOfTheWeek;
	let dayNumber;

	const currentDate = new Date();

	for(let i = 0; i < 7; i++) {
		
	}
}


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

					{/* <Sidebar /> */}

					<div className="flex flex-col w-full">

						<div className="bg-indigo-600 w-full h-[50px]">
							Top
						</div>

						<div className="flex flex-row h-full">

							<div className='bg-white text-zinc-500 w-[60px]'>
								{/* <div className="bg-white flex flex-row w-[50px]"></div> */}
								<div className="bg-white h-[75px] min-h-[75px]"></div>

								<div className='h-[75px] flex flex-row items-start justify-center text-xs font-bold'>
									7 AM
								</div>
								<div className='h-[75px] flex flex-row items-start justify-center text-xs font-bold'>
									8 AM
								</div>
								<div className='h-[75px] flex flex-row items-start justify-center text-xs font-bold'>
									9 AM
								</div>

							</div>

							{/* <RowTime/> */}

							<div className="w-full h-full flex flex-col">

								<DaysOfTheWeek/>

								<div className="w-full h-full bg-green-400 grid grid-cols-7">
									<div className="h-[75px] max-h-[75px] w-full grid grid-rows-4 bg-zinc-50 border-t-2 border-b-2 border-neutral-200">
										<div className="h-[25%] max-h-[25%] border-t border-neutral-200"></div>
										<div className="h-[25%] max-h-[25%] border-t border-neutral-200"></div>
										<div className="h-[25%] max-h-[25%] border-t border-neutral-200"></div>
										<div className="h-[25%] max-h-[25%] border-t border-neutral-200"></div>
									</div>
								</div>

							</div>

						</div>

					</div>





					{/* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
						<Array />
					</div> */}
				</main>
			</QueryClientProvider>
		</trpc.Provider>
	);
}