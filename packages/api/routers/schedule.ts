import { publicProcedure, router } from "../index"
import { GymScheduleModel } from "../models/GymSchedule";
import { validateSchedule } from "../procedures"
import mongoose from "mongoose";


export const scheduleRouter = router({

    createSchedule: validateSchedule.mutation(async (req) => {
        const schedule = new GymScheduleModel(req);
        await schedule.save();
        return "Success creating schedule"
    })



})