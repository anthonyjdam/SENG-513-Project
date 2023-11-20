import { TRPCError } from '@trpc/server'; // error handler
import { publicProcedure } from "./server"; // trpc instance
import { z } from 'zod'; // input validator

export const validateUsername = publicProcedure
    .input(z.object({ // validate that the username is a string
        username: z.string(),
    }))
    .use((opts) => {
        if (typeof opts.input.username !== 'string') { // throw error if not of type string
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: "Not of string type",
            });
        }

        // Allow procedure to continue execution
        return opts.next();
    });