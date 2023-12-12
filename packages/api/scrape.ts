import { z } from "zod";
import axios from "axios";
import * as cheerio from "cheerio";

const ActivitySchema = z.object({
	activityName: z.string(),
	startTime: z.string(),
	endTime: z.string(),
	date: z.string(),
	location: z.string(),
	duration: z.number(),
});

type Activity = z.infer<typeof ActivitySchema>;

// Function to calculate duration in minutes
const calculateDuration = (start: String, end: String) => {
	// Split start and end times into hours, minutes, and AM/PM
	const [startHour, startMinute, startPeriod] = start.split(/:| /);
	const [endHour, endMinute, endPeriod] = end.split(/:| /);
  
	// Convert hours and minutes to numbers
	const startHourNum = parseInt(startHour, 10);
	const startMinuteNum = parseInt(startMinute, 10);
	const endHourNum = parseInt(endHour, 10);
	const endMinuteNum = parseInt(endMinute, 10);
  
	// Calculate total minutes for start and end times
	let startTimeInMinutes = startHourNum * 60 + startMinuteNum;
	let endTimeInMinutes = endHourNum * 60 + endMinuteNum;
  
	// Adjust time for PM period
	if (startPeriod === 'PM' && startHourNum !== 12) {
	  startTimeInMinutes += 12 * 60;
	}
	if (endPeriod === 'PM' && endHourNum !== 12) {
	  endTimeInMinutes += 12 * 60;
	}
  
	// Calculate duration in minutes
	let duration = endTimeInMinutes - startTimeInMinutes;
	if (duration < 0) {
	  duration += 24 * 60; // If end time is before start time, add a day (24 hours) to the duration
	}
  
	return duration;
  };


export const scrapeSchedule = async () => {
	const { data: html } = await axios.get(
		"https://schedules.oval.ucalgary.ca/MobileOpenGymTimes.aspx"
	);

	const $ = cheerio.load(html);

	let activities: Activity[] = [];

	// Targets an html element on the open gym website that encapsulates the children elements that are rows
	$("#ctl00_MainContent_ASPxGridViewDetails_DXMainTable > tbody")
		.children()
		.each((i, elem) => {
			if (i !== 0) {  // Skip the first row in the table, its the table headers

				// Targets the corresponding start and end time columns in the table
				const start = $($(elem).children().get(1)).text()
				const end = $($(elem).children().get(2)).text()

				// Create activity object for each row (child element) of the table
				const activity: Activity = {
					date: $($(elem).children().get(0)).text().trimEnd(),
					startTime: start,
					endTime: end,
					location: $($(elem).children().get(3)).text(),
					activityName: $($(elem).children().get(4)).text(),
					duration: calculateDuration(start, end),
				};

				// Accumulate the scraped objects in an array
				activities.push(activity);
			}
		});

    
    return activities;
};
