"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/lib/trpc";
import Sidebar from "@/component/Sidebar";
import RowTime from "@/component/RowTime";
import DaysOfTheWeek from "@/component/DaysOfTheWeek";
import CalendarCell from "@/component/CalendarCell";


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


	interface MyDate {
		dayOfTheWeek: string;
		dayNumber: number;
	};

	const [dateArr, setDateArr] = useState<MyDate[]>([]);

	useEffect(() => {
		handleGetDaysOfWeek();
	}, [])

	function handleGetDaysOfWeek() {
		const dayOfTheWeek = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'];
		const currentDate = new Date();

		let currentDayOfMonth = currentDate.getDate(); // get the current day of the month
		let offset = currentDate.getDay(); // get the current day of week starting w/ sunday at 0
		let startDayIndex = dayOfTheWeek.indexOf('SUN'); //index of sunday is the start of the week

		const newDateArr: MyDate[] = [];
		console.log(startDayIndex)

		for (let i = 0; i < 7; i++) {
			startDayIndex = startDayIndex % 7; // itterate through days of the week

			newDateArr.push({
				//start on sunday
				dayOfTheWeek: dayOfTheWeek[startDayIndex],
				 // calculate the currentDayOfMonth by subtracting the offset that is the currentDayOfWeek
				dayNumber: ((currentDayOfMonth - offset) % 31), // mod with 31 to loop to start of month
			});

			startDayIndex++;
			currentDayOfMonth++; // increment the current day to get the next day
		}

		setDateArr(newDateArr);
	}

	function generateCalendarCells(count: number) {
		const calendarCells = [];

		for (let index = 0; index < count; index++) {
			//TODO: MAKE KEY MEANINGFUL SO YOU CAN ENTER EVENTS EASILY
			calendarCells.push(<CalendarCell cellKey={index} />);
		}
		return calendarCells;
	}

	const calendarCells = generateCalendarCells(105);


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

								<div className="w-full h-[75px] min-h-[75px]">
									<div className="h-full grid grid-cols-7">
										{dateArr.map((date) => (
											<DaysOfTheWeek
												dayOfTheWeek={date.dayOfTheWeek}
												dayNumber={date.dayNumber}
											/>
										))}
									</div>
								</div>

								<div className="w-full h-full bg-white grid grid-cols-7 grid-rows-15">
									{calendarCells}
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