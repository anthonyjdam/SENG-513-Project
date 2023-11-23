import { z } from "zod";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import { UserModel } from "./models/User";
import { UserPersonalSchedModel } from "./models/UserPersonalSchedule";
import { GymScheduleModel } from "./models/GymSchedule";

const PORT = process.env.port || 5000;

// created for each request
const createContext = ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => ({
	// TODO: CREATE context for each request where we provide the auth session and the db connection
}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

export const router = t.router;

export const appRouter = t.router({
	//   getUser: t.procedure.input(z.string()).query((opts) => {
	//     opts.input; // string
	//     return { id: opts.input, name: 'Bilbo' };
	//   }),
	//   createUser: t.procedure
	//     .input(z.object({ name: z.string().min(5) }))
	//     .mutation(async (opts) => {
	//       // use your ORM of choice
	//       return await UserModel.create({
	//         data: opts.input,
	//       });
	//     }),
	getHello: t.procedure.query(() => {
		return [1, 2, 4, 5, 6];
	}),

	// TODO: Make procedures, ideally in another file for organization
});

// export type definition of API
export type AppRouter = typeof appRouter;

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
			username: 'john_doe',
			password: 'hashed_password',
			email: 'john.doe@example.com',
		  });
	  
		  const savedUser = await newUser.save();
		  console.log('User created:', savedUser);
		} catch (error) {
		  console.error('Error creating user:', error);
		}
	  };
	  
	  createUser();


	  const createGymSchedule = async () => {
		try {
		  const newGymSchedule = new GymScheduleModel({
			date: new Date(),
			startTime: '08:00 AM',
			endTime: '10:00 AM',
			location: 'Fitness Center',
			activityName: 'Cardio',
		  });
	  
		  const savedGymSchedule = await newGymSchedule.save();
		  console.log('Gym schedule created:', savedGymSchedule);
		} catch (error) {
		  console.error('Error creating gym schedule:', error);
		}
	  };
	  
	  createGymSchedule();


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




	  const createPersonalSchedule = async () => {
		try {
		  const newPersonalSchedule = new UserPersonalSchedModel({
			date: new Date(),
			startTime: '010:00 AM',
			endTime: '11:00 AM',
		  });
	  
		  const savedPersonalSchedule = await newPersonalSchedule.save();
		  console.log('Personal schedule created:', savedPersonalSchedule);
	  
		  // Associate the personal schedule with a user 
		  const user = await UserModel.findOne({ username: "john_doe" });

		  if (user) {
			// Check if personalSchedules is defined
			if (user.personalSchedules) {
			  user.personalSchedules.push(savedPersonalSchedule._id);
			} else {
			  // If personalSchedules is undefined, initialize it as an array
			  user.personalSchedules = [savedPersonalSchedule._id];
			}
		  
			await user.save();
			console.log('Personal schedule associated with user:', user);
		  } else {
			console.error('User not found.');
		  }
		} catch (error) {
		  console.error('Error creating personal schedule:', error);
		}
	  };
	  
	  createPersonalSchedule();

	
}
catch (err) {
	 	console.log(err);
	}
