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
exports.appRouter = exports.router = exports.t = void 0;
const server_1 = require("@trpc/server");
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const User_1 = require("./models/User");
const UserPersonalSchedule_1 = require("./models/UserPersonalSchedule");
const GymSchedule_1 = require("./models/GymSchedule");
const PORT = process.env.port || 5000;
// created for each request
const createContext = ({ req, res, }) => ({
// TODO: CREATE context for each request where we provide the auth session and the db connection
}); // no context
exports.t = server_1.initTRPC.context().create();
exports.router = exports.t.router;
exports.appRouter = exports.t.router({
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
    getHello: exports.t.procedure.query(() => {
        return [1, 2, 4, 5, 6];
    }),
    // TODO: Make procedures, ideally in another file for organization
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/trpc", trpcExpress.createExpressMiddleware({
    router: exports.appRouter,
    createContext,
}));
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
    (0, db_1.connectDB)();
    const createUser = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = new User_1.UserModel({
                username: 'john_doe',
                password: 'hashed_password',
                email: 'john.doe@example.com',
            });
            const savedUser = yield newUser.save();
            console.log('User created:', savedUser);
        }
        catch (error) {
            console.error('Error creating user:', error);
        }
    });
    createUser();
    const createGymSchedule = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newGymSchedule = new GymSchedule_1.GymScheduleModel({
                date: new Date(),
                startTime: '08:00 AM',
                endTime: '10:00 AM',
                location: 'Fitness Center',
                activityName: 'Cardio',
            });
            const savedGymSchedule = yield newGymSchedule.save();
            console.log('Gym schedule created:', savedGymSchedule);
        }
        catch (error) {
            console.error('Error creating gym schedule:', error);
        }
    });
    createGymSchedule();
    const createPersonalSchedule = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newPersonalSchedule = new UserPersonalSchedule_1.UserPersonalSchedModel({
                week: [
                    { day: 'Monday', startTime: '09:00 AM', endTime: '05:00 PM' },
                    { day: 'Wednesday', startTime: '10:00 AM', endTime: '06:00 PM' },
                ],
            });
            const savedPersonalSchedule = yield newPersonalSchedule.save();
            console.log('Personal schedule created:', savedPersonalSchedule);
            // Associate the personal schedule with a user (replace 'user_id' with the actual user ID)
            const user = yield User_1.UserModel.findOne({ username: "john_doe" });
            if (user) {
                user.personalSchedules.push(savedPersonalSchedule._id);
                yield user.save();
                console.log('Personal schedule associated with user:', user);
            }
            else {
                console.error('User not found.');
            }
        }
        catch (error) {
            console.error('Error creating personal schedule:', error);
        }
    });
    createPersonalSchedule();
}
catch (err) {
    console.log(err);
}
