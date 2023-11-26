"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.publicProcedure = exports.t = void 0;
const server_1 = require("@trpc/server");
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./db");
// import { UserPersonalSchedModel } from "./models/UserPersonalSchedule";
const GymSchedule_1 = require("./models/GymSchedule");
const scrape_1 = require("./scrape");
const PORT = process.env.port || 5000;
/*Initialize tRPC API*/
const createContext = ({ req, res, }) => ({
// TODO: CREATE context for each request where we provide the auth session and the db connection
}); // no context
exports.t = server_1.initTRPC.context().create(); // create an instance of the tRPC server
exports.publicProcedure = exports.t.procedure; // export alias of t.procedure as publicProcedure
exports.router = exports.t.router; // define router based on tRPC instance 
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
const app_1 = require("./routers/app");
/*Initialize Express server*/
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/trpc", trpcExpress.createExpressMiddleware({
    router: app_1.appRouter,
    createContext,
}));
app.get("/", (req, res) => {
    res.send("Hello");
});
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
/** Connect to mongoDB database */
mongoose_1.default.connect(process.env.MONGO_URI || "http://localhost:5000/trpc"); // default to localhost
const db = mongoose_1.default.connection;
db.on('error', (error) => console.error(error)); // log error when failing to connect to databse
db.once('open', () => console.log("Connected to Databse"));
db.on('disconnected', () => console.log('Disconnected from MongoDB.'));
app.use(express_1.default.json());
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
/*
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
                date: 'wed, Nov 22',
                startTime: '06:00 AM',
                endTime: '07:15 AM',
                location: 'Gold Gym',
                activityName: 'Drop In Open Gym Time',
            });

            const savedGymSchedule = await newGymSchedule.save();
            console.log('Gym schedule created:', savedGymSchedule);
        } catch (error) {
            console.error('Error creating gym schedule:', error);
        }
    };

    createGymSchedule();




    const createPersonalSchedule = async () => {
        try {
            // Find the user by username
            const user = await UserModel.findOne({ username: 'john_doe' });

            if (user) {

                if (!user.personalSchedules) {
                    user.personalSchedules = [];
                }

                // Create a new personal schedule for the user (array)
                const newPersonalSchedule = {
                    day: 'Monday',
                    startTime: '05:00 PM',
                    endTime: '07:00 PM',
                };

                // Add the personal schedule to the user's array of personalSchedules
                user.personalSchedules.push(newPersonalSchedule);

                // Save the updated user
                const savedUser = await user.save();
                console.log('User with personal schedule:', savedUser);
            } else {
                console.error('User not found.');
            }
        } catch (error) {
            console.error('Error creating personal schedule:', error);
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
*/
const node_cron_1 = __importDefault(require("node-cron"));
node_cron_1.default.schedule("*/10 * * * *", () => {
    console.log("running a task every 10 minutes");
});
(0, scrape_1.scrapeSchedule)().then((schedules) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, db_1.connectDB)();
        const result = yield GymSchedule_1.GymScheduleModel.deleteMany({});
        for (let i = 0; i < schedules.length; i++) {
            const newGymEvent = new GymSchedule_1.GymScheduleModel(schedules[i]);
            const savedGymSchedule = yield newGymEvent.save();
            console.log(savedGymSchedule);
        }
    }
    catch (error) {
        console.error("Error creating gym schedule:", error);
    }
}));
