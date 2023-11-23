import React from 'react'

function DaysOfTheWeek() {
    return (
        <>
            <div className="w-full h-[75px] min-h-[75px]">
                <div className="h-full grid grid-cols-7">
                    <div className="h-full bg-zinc-50 p-2">
                        <p className="text-zinc-500 text-xs font-semibold">
                            SUN
                        </p>
                        <h1 className="text-gray-900 text-xl font-semibold">
                            21
                        </h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DaysOfTheWeek