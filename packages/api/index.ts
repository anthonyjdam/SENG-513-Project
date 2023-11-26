import { z } from "zod";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./db";
import { UserModel } from "./models/User";
// import { UserPersonalSchedModel } from "./models/UserPersonalSchedule";
import { GymScheduleModel } from "./models/GymSchedule";
import { scrapeSchedule } from "./scrape";

const PORT = process.env.port || 5001;

/*Initialize tRPC API*/

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  // TODO: CREATE context for each request where we provide the auth session and the db connection
}); // no context

type Context = inferAsyncReturnType<typeof createContext>; // infer the return type of the create context function
export const t = initTRPC.context<Context>().create(); // create an instance of the tRPC server
export const publicProcedure = t.procedure; // export alias of t.procedure as publicProcedure
export const router = t.router; // define router based on tRPC instance

//PUT PROCEDURE IMPORTS HERE
// export const appRouter = t.router({
// 	//   getUser: t.procedure.input(z.string()).query((opts) => {
// 	//     opts.input; // string
// 	//     return { id: opts.input, name: 'Bilbo' };
// 	//   }),
// 	//   createUser: t.procedure
// 	//     .input(z.object({ name: z.string().min(5) }))
// 	//     .mutation(async (opts) => {
// 	//       // use your ORM of choice
// 	//       return await UserModel.create({
// 	//         data: opts.input,
// 	//       });
// 	//     }),
// 	getHello: t.procedure.query(() => {
// 		return [1, 2, 4, 5, 6];
// 	}),

// 	changeName: t.procedure
// 		.input(z.object({ username: z.string() }))
// 		.mutation(({ ctx, input }) => {
// 			console.log(input.username);
// 		}),

// 	createActivity: t.procedure
// 		.input(z.object({
// 			activity: z.string(),
// 			startTime: z.string(),
// 			endTime: z.string(),
// 			date: z.string(),
// 			location: z.string(),
// 		}))
// 		.mutation(({ ctx, input }) => {
// 			console.log(`client says: ${input.startTime}`)
// 		}),

// 	// TODO: Make procedures, ideally in another file for organization
// });

// Export type definition of API
import { appRouter } from "./routers/app";
export type AppRouter = typeof appRouter;

/*Initialize Express server*/

const app = express();
app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

/** Connect to mongoDB database */
/*
mongoose.connect(process.env.MONGO_URI || "http://localhost:5000/trpc"); // default to localhost
const db = mongoose.connection;

db.on("error", (error) => console.error(error)); // log error when failing to connect to databse
db.once("open", () => console.log("Connected to Databse"));
db.on("disconnected", () => console.log("Disconnected from MongoDB."));
*/
app.use(express.json());

// try {
// 	connectDB();

// 	// Example: Creating a new user
// 	const newUser = new UserModel({
// 		username: "john_doe",
// 		password: "secure_password",
// 	});

//   newUser.save()
//   .then(savedUser => {
//     console.log('User saved successfully:', savedUser);
//   })
//   .catch(error => {
//     console.error('Error saving user:', error);
//   });

// } catch (err) {
// 	console.log(err);
//}

try {
  connectDB();
  const createUser = async () => {
    try {
      const newUser = new UserModel({
        username: "john_doe",
        password: "hashed_password",
        email: "john.doe@example.com",
      });

      const savedUser = await newUser.save();
      console.log("User created:", savedUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  createUser();

  const createGymSchedule = async () => {
    try {
      const newGymSchedule = new GymScheduleModel({
        date: "wed, Nov 22",
        startTime: "06:00 AM",
        endTime: "07:15 AM",
        location: "Gold Gym",
        activityName: "Drop In Open Gym Time",
      });

      const savedGymSchedule = await newGymSchedule.save();
      console.log("Gym schedule created:", savedGymSchedule);
    } catch (error) {
      console.error("Error creating gym schedule:", error);
    }
  };

  createGymSchedule();

  const createPersonalSchedule = async () => {
    try {
      // Find the user by username
      const user = await UserModel.findOne({ username: "john_doe" });

      if (user) {
        if (!user.personalSchedules) {
          user.personalSchedules = [];
        }

        // Create a new personal schedule for the user (array)
        const newPersonalSchedule = {
          day: "Monday",
          startTime: "05:00 PM",
          endTime: "07:00 PM",
        };

        // Add the personal schedule to the user's array of personalSchedules
        user.personalSchedules.push(newPersonalSchedule);

        // Save the updated user
        const savedUser = await user.save();
        console.log("User with personal schedule:", savedUser);
      } else {
        console.error("User not found.");
      }
    } catch (error) {
      console.error("Error creating personal schedule:", error);
    }
  };

  createPersonalSchedule();

  //   const createPersonalSchedule = async () => {
  // 	try {
  // 	  const newPersonalSchedule = new UserPersonalSchedModel({
  // 		week: [
  // 		  { day: 'Monday', startTime: '09:00 AM', endTime: '05:00 PM' },
  // 		  { day: 'Wednesday', startTime: '10:00 AM', endTime: '06:00 PM' },
  // 		],
  // 	  });

  // 	  const savedPersonalSchedule = await newPersonalSchedule.save();
  // 	  console.log('Personal schedule created:', savedPersonalSchedule);

  // 	  // Associate the personal schedule with a user
  // 	  const user = await UserModel.findOne({ username: "john_doe" });

  // 	  if (user) {
  // 		// Check if personalSchedules is defined
  // 		if (user.personalSchedules) {
  // 		  user.personalSchedules.push(savedPersonalSchedule._id);
  // 		} else {
  // 		  // If personalSchedules is undefined, initialize it as an array
  // 		  user.personalSchedules = [savedPersonalSchedule._id];
  // 		}

  // 		await user.save();
  // 		console.log('Personal schedule associated with user:', user);
  // 	  } else {
  // 		console.error('User not found.');
  // 	  }
  // 	} catch (error) {
  // 	  console.error('Error creating personal schedule:', error);
  // 	}
  //   };

  //   createPersonalSchedule();

  // 	  const createPersonalSchedule = async () => {
  // 		try {
  // 		  const newPersonalSchedule = new UserPersonalSchedModel({
  // 			date: new Date(),
  // 			startTime: '010:00 AM',
  // 			endTime: '11:00 AM',
  // 		  });

  // 		  const savedPersonalSchedule = await newPersonalSchedule.save();
  // 		  console.log('Personal schedule created:', savedPersonalSchedule);

  // 		  // Associate the personal schedule with a user
  // 		  const user = await UserModel.findOne({ username: "john_doe" });

  // 	  const createPersonalSchedule = async () => {
  // 		try {
  // 		  const newPersonalSchedule = new UserPersonalSchedModel({
  // 			date: new Date(),
  // 			startTime: '010:00 AM',
  // 			endTime: '11:00 AM',
  // 		  });

  // 		  const savedPersonalSchedule = await newPersonalSchedule.save();
  // 		  console.log('Personal schedule created:', savedPersonalSchedule);

  // 		  // Associate the personal schedule with a user
  // 		  const user = await UserModel.findOne({ username: "john_doe" });

  // 		  if (user) {
  // 			// Check if personalSchedules is defined
  // 			if (user.personalSchedules) {
  // 			  user.personalSchedules.push(savedPersonalSchedule._id);
  // 			} else {
  // 			  // If personalSchedules is undefined, initialize it as an array
  // 			  user.personalSchedules = [savedPersonalSchedule._id];
  // 			}

  // 			await user.save();
  // 			console.log('Personal schedule associated with user:', user);
  // 		  } else {
  // 			console.error('User not found.');
  // 		  }
  // 		} catch (error) {
  // 		  console.error('Error creating personal schedule:', error);
  // 		}
  // 	  };

  // 	  createPersonalSchedule();
} catch (err) {
  console.log(err);
}

// import cron from 'node-cron';
// cron.schedule("*/10 * * * *", () => {
// 	console.log("running a task every 10 minutes");

// 	scrapeSchedule().then(async (schedules) => {
// 		try {
// 			connectDB();
// 			const result = await GymScheduleModel.deleteMany({});

// 			for (let i = 0; i < schedules.length; i++) {
// 				const newGymEvent = new GymScheduleModel(schedules[i]);
// 				const savedGymSchedule = await newGymEvent.save();
// 				console.log(savedGymSchedule);
// 			}
// 		} catch (error) {
// 			console.error("Error creating gym schedule:", error);
// 		}
// 	});
// });
