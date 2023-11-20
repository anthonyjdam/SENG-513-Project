import { publicProcedure, router } from "../server"
import { activitiesRouter } from "./activities";
import { usersRouter } from "./users";

export const appRouter = router({
    getHello: publicProcedure.query(() => {
      return [1, 2, 4, 5, 6];
    }),

    getBruh: publicProcedure.query(() => {
      return { ucid: "30121212"}
  }),

    users: usersRouter, // nest users router inside appRouter

    activities: activitiesRouter // nest activities router inside appRouter
});
