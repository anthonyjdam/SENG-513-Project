import { publicProcedure, router } from "../index";
import { GymScheduleModel } from "../models/GymSchedule";
import { validateSchedule } from "../procedures";
import mongoose from "mongoose";

export const scheduleRouter = router({
	createSchedule: validateSchedule.mutation(async ({ ctx, input }) => {
		const schedule = new GymScheduleModel(input);
		await schedule.save();
		console.log("HIT");

		return { resString: "Success creating schedule" };
	}),
});
