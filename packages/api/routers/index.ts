import { publicProcedure, router } from "../server"
import { activitiesRouter } from "./activities";
import { usersRouter } from "./users";
import { validateScrape } from "../middleware";
import { resolve } from "path";

export const appRouter = router({
  getHello: publicProcedure.query(() => {
    return [1, 2, 4, 5, 6];
  }),

  //   getBruh: publicProcedure.query(() => {
  //     return { ucid: "30121212"}
  // }),

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



// Add a new mutation procedure in appRouter
// export const appRouter = t.router({
//   // ...other procedures...

//   addScrapedData: t.procedure
//     .input(ScrapeDataSchema)
//     .mutation(async ({ input }) => {
//       // Here you can handle the input data, save it to the database, etc.
//       const { startTime, endTime } = input;

//       // Placeholder: replace with actual logic to handle the scraped data
//       console.log(Scraped data received: start at ${startTime}, end at ${endTime});

//       // For example, saving to a database might look like this:
//       // const newData = await DatabaseModel.create({
//       //   data: {
//       //     startTime: input.startTime,
//       //     endTime: input.endTime
//       //   }
//       // });

//       // Return a response, could be the newly created database entry or a success message
//       return { success: true, message: 'Data added successfully', data: input };
//     }),
// });


// // In your frontend code
// const { mutate } = trpc.useMutation(['addScrapedData']);

// const dataSet = {
//   startTime: '5:00PM',
//   endTime: '6:00PM'
// };

// mutate(dataSet, {
//   onSuccess: (response) => {
//     console.log(response.message); // 'Data added successfully'
//   },
//   onError: (error) => {
//     console.error(error.message);
//   },
// });

