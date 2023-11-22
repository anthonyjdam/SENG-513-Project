import { z } from "zod";
import { publicProcedure } from "./index";

export const validateScrape = publicProcedure
	.input(
		z.object({
			activity: z.string(),
			startTime: z.string(),
			endTime: z.string(),
			date: z.string(),
			location: z.string(),
		})
	)
	.use((opts) => {
		//input validation
		return opts.next();
	});
