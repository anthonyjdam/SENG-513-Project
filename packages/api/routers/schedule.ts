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
    // console.log("HIT");

    return { result: schedule };
  }),

  getSchedules: publicProcedure.query(async (opts) => {
    // DEMO: Change the ScrapeDataSchemaArray
    type ScheduleArrayType = z.infer<typeof ScrapeDataSchemaArray>;
    
    const schedules: ScheduleArrayType = await GymScheduleModel.find();
    
    return schedules;
  }),
});

// getSchedules: validateScheduleOutput.query(async (opts) => {
// const result = await GymScheduleModel.deleteMany({});