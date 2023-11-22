import { publicProcedure, router } from "../server"
import { activitiesRouter } from "./activities";
import { usersRouter } from "./users";
import { validateScrape } from "../middleware";
import { resolve } from "path";

export const appRouter = router({
  getHello: publicProcedure.query(() => {
    return [1, 2, 4, 5, 6];
  }),

  createActivity: validateScrape.mutation(( {input} ) => {
    // console.log(input);
    // return { username: input }

    //Create query
    //Send data to server
    

    return { success: true, message: 'Data added successfully', data: input };

  }),

  users: usersRouter, // nest users router inside appRouter

  activities: activitiesRouter // nest activities router inside appRouter
});
