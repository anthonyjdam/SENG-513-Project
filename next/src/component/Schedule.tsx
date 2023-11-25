function generateTimesArray(): string[] {
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

let days: string[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let times: string[] = generateTimesArray();

console.log(times);

export const Schedule = () => {
  return (
    <div className="flex gap-6">
      {days.map((day) => (
        //this day card goes here!!!
        <div key={day}>
          <div className="flex flex-col">
            {times.map((time) => (
              <div
                key={`${day}-${time}`}
                className="h-5 w-36 border border-red-500"
              >
                {time === "8:00 AM" ? (
                  <div className={`bg-red-500 h-20 z-10 opacity-50`}>
                    <p>volleyball</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
