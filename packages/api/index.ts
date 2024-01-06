import cors from "cors";
import { connectDB } from "./db";
import { GymScheduleModel } from "./models/GymSchedule";
import { scrapeSchedule } from "./scrape";
import express from "express";
import bodyParser from "body-parser";

const PORT = process.env.port || 5001;

/*Initialize Express server*/
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/schedule", async (req, res) => {
  try {
    connectDB();
    const schedules = await GymScheduleModel.find();
    res.send(schedules);
  } catch (error) {
    console.error("Error getting schedules:", error);
    res.status(500).send("Error retrieving schedules");
  }
});

const server = app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

process.on("SIGINT", () => {
  server.close();
  console.log("Server closed");
  process.exit(0);
});

app.use(express.json());

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
