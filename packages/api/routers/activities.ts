import { publicProcedure, router } from "../../api/trpc"

export const activitiesRouter = router({
    activities: publicProcedure.query(() => {
        return { activity: "volleyball"}
    }),

    startTime: publicProcedure.query(() => {
        return { time: "16:00"}
    }),
    
    endTime: publicProcedure.query(() => {
        return { time: "16:00"}
    }),
    
    location: publicProcedure.query(() => {
        return { location: "red-gym"}
    }),
    
});
