/*
 * Creates an array of times corresponding to each cell in that daysOfTheWeek column
 */
export function generateTimesArray(): string[] {
  const startHour: number = 6;
  const endHour: number = 23;
  const interval: number = 15;
  let times: string[] = [];

  // Calculate the total number of minutes
  const totalMinutes: number = (endHour - startHour) * 60;

  for (let i: number = 0; i <= totalMinutes; i += interval) {
    let hour: number = startHour + Math.floor(i / 60);
    let minute: number | string = i % 60 === 0 ? "00" : i % 60;
    let amPM: string = hour >= 12 ? "PM" : "AM";

    // Convert hour to 12-hour format
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour === 0 ? 12 : hour;

    times.push(`${hour}:${minute} ${amPM}`);
  }
  return times;
}

/**
 * Creates the daysOfTheWeek component attributes
 */
export const generateDaysOfWeek = ({ date }: { date: Date | undefined }) => {
  if (!date) {
    // Handle the case where date is undefined
    return [];
  }

  let listOfMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  let currentDayOfMonth = date.getDate(); // get the current day of the month
  let offset = date.getDay(); // get the current day of the week starting w/ sunday at 0
  let startDayIndex = dayOfTheWeek.indexOf("SUN"); // index of sunday is the start of the week
  const newDateArr = [];

  for (let i = 0; i < 7; i++) {
    startDayIndex = startDayIndex % 7; // iterate through days of the week

    // Calculate dayNumber by considering the offset and ensuring it's within the current month
    let dayNumber = currentDayOfMonth - offset + i;
    let newMonth = currentMonth;

    if (dayNumber <= 0) {
      // Adjust if the dayNumber is less than or equal to zero
      newMonth = (currentMonth - 1 + 12) % 12;
      dayNumber += new Date(currentYear, newMonth + 1, 0).getDate();
    } else if (dayNumber > daysInMonth) {
      // Adjust if the dayNumber exceeds the number of days in the month
      newMonth = (currentMonth + 1) % 12;
      dayNumber -= daysInMonth;
    }

    newDateArr.push({
      currentMonth: listOfMonths[newMonth],
      dayOfTheWeek: dayOfTheWeek[startDayIndex],
      dayNumber,
    });

    startDayIndex++;
  }

  // console.log(newDateArr);

  return newDateArr;
};

/**
 * TODO have time range param
 *
 * @returns timeArr: the array of times
 */
export function generateTimes() {
  let timesArr = [];

  for (let i = 6; i < 24; i++) {
    let time;

    if (i > 11) {
      time = i % 12; // for times PM
      time = time === 0 ? 12 : time; // fro 12 PM
      time = time.toString() + " PM";
    } else {
      time = i; // for times AM
      time = time === 0 ? 12 : time; // for 12 AM
      time = time.toString() + " AM";
    }

    timesArr.push(time);
  }

  return timesArr;
}
