/*
import { publicProcedure, router } from "../index";
import { GymScheduleModel } from "../models/GymSchedule";
import { validateSchedule, validateScheduleOutput } from "../procedures";
import mongoose from "mongoose";
import { GetScheduleArraySchema as GetScheduleSchema } from "../procedures";
import { z } from "zod"; // input validator

export const scheduleRouter = router({
  createSchedule: validateSchedule.mutation(async ({ ctx, input }) => {
    const schedule = new GymScheduleModel(input);
    await schedule.save();
    return { resString: "Success creating schedule" };
  }),

  getSchedules: publicProcedure.query(async (opts) => {
    // getSchedules: validateScheduleOutput.query(async (opts) => {
    type ScheduleArrayType = z.infer<typeof GetScheduleSchema>;
    // const result = await GymScheduleModel.deleteMany({});
    console.log("Getting schedules");
    
    const schedules: ScheduleArrayType = await GymScheduleModel.find();

    console.log(schedules);
    return schedules;
  }),
});
*/
