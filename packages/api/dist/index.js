"use strict";
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
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const GymSchedule_1 = require("./models/GymSchedule");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = process.env.port || 5001;
/*Initialize Express server*/
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello");
});
app.get("/schedule", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, db_1.connectDB)();
        const schedules = yield GymSchedule_1.GymScheduleModel.find();
        res.send(schedules);
    }
    catch (error) {
        console.error("Error getting schedules:", error);
        res.status(500).send("Error retrieving schedules");
    }
}));
const server = app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
process.on("SIGINT", () => {
    server.close();
    console.log("Server closed");
    process.exit(0);
});
app.use(express_1.default.json());
// import cron from 'node-cron';
// cron.schedule("*/10 * * * *", () => {
// 	console.log("running a task every 10 minutes");
// 	scrapeSchedule().then(async (schedules) => {
// 		try {
// 			connectDB();
// 			const result = await GymScheduleModel.deleteMany({}); // delete the current activities in the database
// 			for (let i = 0; i < schedules.length; i++) {
// 				const newGymEvent = new GymScheduleModel(schedules[i]);
// 				const savedGymSchedule = await newGymEvent.save(); // save the GymSchedule Document to the database
// 				console.log(savedGymSchedule);
// 			}
// 		} catch (error) {
// 			console.error("Error creating gym schedule:", error);
// 		}
// 	});
// });
