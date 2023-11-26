import { TRPCError } from "@trpc/server"; // error handler
import { publicProcedure } from "./index"; // trpc instance
import { z } from "zod"; // input validator

export const validateUsername = publicProcedure
    .input(
        z.object({
            // validate that the username is a string
            username: z.string(),
        })
    )
    .use((opts) => {
        if (typeof opts.input.username !== "string") {
            // throw error if not of type string
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Not of string type",
            });
        }

        // Allow procedure to continue execution
        return opts.next();
    });

const ScrapeDataSchema = z.object({
    activity: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    date: z.string(),
    location: z.string(),
});

export const ScrapeDataSchemaArray = z.array(
    z.object({
        activity: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        date: z.string(),
        location: z.string(),
    })
);

export const validateSchedule = publicProcedure
    .input(ScrapeDataSchema)
    .use((opts) => {
        //input validation
        return opts.next();
    });

export const validateScheduleOutput = publicProcedure
    .output(ScrapeDataSchemaArray)
    .use((opts) => {
        //input validation
        return opts.next();
    });