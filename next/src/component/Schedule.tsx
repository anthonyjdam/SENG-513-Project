function generateTimesArray(): string[] {
	const startHour: number = 6;
	const endHour: number = 23;
	const interval: number = 15;
	let times: string[] = [];

	// Calculate the total number of minutes
	const totalMinutes: number = (endHour - startHour) * 60;

	for (let i: number = 0; i <= totalMinutes; i += interval) {
		let hour: number = startHour + Math.floor(i / 60);
		let minute: number | string = i % 60 === 0 ? "00" : i % 60;
		let amPM: string = hour >= 12 ? "PM" : "AM";

		// Convert hour to 12-hour format
		hour = hour > 12 ? hour - 12 : hour;
		hour = hour === 0 ? 12 : hour;

		times.push(`${hour}:${minute} ${amPM}`);
	}
	return times;
}
interface MyDate {
	dayOfTheWeek: string;
	dayNumber: number;
}

// const startTime = 6
// const endTime = 9

/**
 * creates the daysOfTheWeek component attributes
 */
function generateDaysOfWeek() {
	const dayOfTheWeek = ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"];
	const currentDate = new Date();

	let currentDayOfMonth = currentDate.getDate(); // get the current day of the month
	let offset = currentDate.getDay(); // get the current day of week starting w/ sunday at 0
	let startDayIndex = dayOfTheWeek.indexOf("SUN"); //index of sunday is the start of the week

	const newDateArr: MyDate[] = [];
	console.log(startDayIndex);

	for (let i = 0; i < 7; i++) {
		startDayIndex = startDayIndex % 7; // itterate through days of the week

		newDateArr.push({
			//start on sunday
			dayOfTheWeek: dayOfTheWeek[startDayIndex],
			// calculate the currentDayOfMonth by subtracting the offset that is the currentDayOfWeek
			dayNumber: (currentDayOfMonth - offset) % 31, // mod with 31 to loop to start of month
		});

		startDayIndex++;
		currentDayOfMonth++; // increment the current day to get the next day
	}

	return newDateArr;
}

let days: MyDate[] = generateDaysOfWeek();
let times: string[] = generateTimesArray();

console.log(days);

export const Schedule = () => {
	return (
		<div className="flex">
			{days.map((day) => (
				//this day card goes here!!!
				<div key={day.dayOfTheWeek} className="flex-grow">
					<div className="h-[75px] bg-zinc-50 border-r border-neutral-200 p-2">
						<p className="text-zinc-500 text-xs font-semibold">
							{day.dayOfTheWeek.toUpperCase()}
						</p>
						<h1 className="text-gray-900 text-xl font-semibold">
							{day.dayNumber}
						</h1>
					</div>
					<div className="flex flex-col border-r border-neutral-200">
						{times.map((time, index) => (
							<div
								key={`${day}-${time}`}
								className={`h-5 w-full border-t relative ${
									index % 4 === 0 ? "border-neutral-200" : "border-neutral-100"
								}`}
							>
								<div className="absolute w-full flex">
									{time === "8:00 AM" && day.dayOfTheWeek === "MON" ? (
										<div
											className={`bg-rose-500/10 border-l-4 border-rose-500 h-20 rounded-l-md p-1 flex-1 z-10`}
										>
											<p className="break-all leading-4">volleyball</p>
										</div>
									) : null}
									{time === "8:30 AM" && day.dayOfTheWeek === "MON" ? (
										<div
											className={`bg-blue-500/10 border-l-4 border-blue-500 h-20 rounded-l-md p-1 flex-1 z-10`}
										>
											<p className="break-all leading-4">volleyball</p>
										</div>
									) : null}
									{time === "8:00 AM" && day.dayOfTheWeek === "MON" ? (
										<div
											className={`bg-blue-500/10 border-l-4 border-blue-500 h-20 rounded-l-md p-1 flex-1 z-10`}
										>
											<p className="break-all leading-4">volleyball</p>
										</div>
									) : null}
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};
