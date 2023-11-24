import { z } from "zod";
import axios from "axios";
import * as cheerio from "cheerio";

const ActivitySchema = z.object({
	activityName: z.string(),
	startTime: z.string(),
	endTime: z.string(),
	date: z.string(),
	location: z.string(),
});

type Activity = z.infer<typeof ActivitySchema>;

export const scrapeSchedule = async () => {
	const { data: html } = await axios.get(
		"https://schedules.oval.ucalgary.ca/MobileOpenGymTimes.aspx"
	);

	const $ = cheerio.load(html);

	let activities: Activity[] = [];

	$("#ctl00_MainContent_ASPxGridViewDetails_DXMainTable > tbody")
		.children()
		.each((i, elem) => {
			if (i !== 0) {  // Skip the first row in the table, its the table headers
				const activity: Activity = {
					date: $($(elem).children().get(0)).text().trimEnd(),
					startTime: $($(elem).children().get(1)).text(),
					endTime: $($(elem).children().get(2)).text(),
					location: $($(elem).children().get(3)).text(),
					activityName: $($(elem).children().get(4)).text(),
				};

				activities.push(activity);
			}
		});
    
    return activities;
};
