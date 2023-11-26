import { publicProcedure, router } from "../index";
import { GymScheduleModel } from "../models/GymSchedule";
import { validateSchedule, validateScheduleOutput } from "../procedures";
import mongoose from "mongoose";
import { ScrapeDataSchemaArray } from "../procedures";
import { z } from "zod"; // input validator

export const scheduleRouter = router({
	createSchedule: validateSchedule.mutation(async ({ ctx, input }) => {
		const schedule = new GymScheduleModel(input);
		await schedule.save();
		console.log("HIT");

		return { resString: "Success creating schedule" };
	}),

	getSchedules: validateScheduleOutput.query(async (opts) => {
		type ScheduleArrayType = z.infer<typeof ScrapeDataSchemaArray>;
		// const result = await GymScheduleModel.deleteMany({});
		
		const schedules: ScheduleArrayType = await GymScheduleModel.find();

		return schedules;
	}),
});
