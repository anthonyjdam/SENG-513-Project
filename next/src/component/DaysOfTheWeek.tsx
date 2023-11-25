import React from 'react'

// Used to destructure the incoming props to their respective types for type safety
interface DaysOfTheWeekProps {
    dayOfTheWeek: string;
    dayNumber: number;
}

//TODO: add keys to each cell basd on 15 min intervals

/**
 * 
 * @prop DaysOfTheWeek of type string as defined by the interface DaysOfTheWeekProps
 * @prop dayNumber of type number as defined by the interface DaysOfTheWeekProps
 */
function DaysOfTheWeek({ dayOfTheWeek, dayNumber }: DaysOfTheWeekProps) {

    return (
        <>

            <div className="flex-grow h-full bg-zinc-50 border-r border-neutral-200 p-2">
                <p className="text-zinc-500 text-xs font-semibold">
                    {dayOfTheWeek.toUpperCase()}
                </p>
                <h1 className="text-gray-900 text-xl font-semibold">
                    {dayNumber}
                </h1>
            </div>

        </>
    )
}

export default DaysOfTheWeek