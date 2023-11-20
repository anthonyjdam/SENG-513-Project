import { publicProcedure, router } from "../server"

export const activitiesRouter = router({
    getActivities: publicProcedure.query(() => {
        return { activity: "volleyball"}
    }),

    getStartTime: publicProcedure.query(() => {
        return { time: "16:00"}
    }),
    
    getEndTime: publicProcedure.query(() => {
        return { time: "16:00"}
    }),
    
    getLocation: publicProcedure.query(() => {
        return { location: "red-gym"}
    }),
    
});
