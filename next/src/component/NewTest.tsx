import { trpc } from "@/lib/trpc";
import React from "react";

function NewTest() {
	type schedule = {
		activity: string;
		startTime: string;
		endTime: string;
		date: string;
		location: string;
	};

	const newSchedule: schedule = {
		activity: "SomeActivity",
		startTime: "08:00 AM",
		endTime: "10:00 AM",
		date: "2023-11-25",
		location: "SomeLocation",
	};

	const createSched = trpc.schedule.createSchedule.useMutation();

	return (
		<div>
			<button
				onClick={() => {
                    createSched.mutate(newSchedule)
					console.log(createSched.data);
				}}
			>
				NEW TEST
			</button>
		</div>
	);
}

export default NewTest;
