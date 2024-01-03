import React from 'react';

interface CalendarCellProps {
    cellKey: number;
}

function CalendarCell({ cellKey }: CalendarCellProps) {
    const keyString = cellKey.toString(); // convert the key from number to string to use as id

    return (
        <div
            className={`h-[75px] max-h-[75px] w-full grid grid-rows-4 border-t border-b border-r border-neutral-200 ${cellKey % 7 === 0 ? 'bg-zinc-50' : 'bg-white'}`} //make the first column a different color 
            id={keyString}
        >   
            {/* Cell row */}
            <div className="h-[25%] max-h-[25%] border-t border-neutral-100"></div>
            <div className="h-[25%] max-h-[25%] border-t border-neutral-100"></div>
            <div className="h-[25%] max-h-[25%] border-t border-neutral-100"></div>
            <div className="h-[25%] max-h-[25%] border-t border-neutral-100"></div>

            {/* {cellKey === 54 ? (
                //TODO FIND WAY TO PLACE ELEMENTS RELATIVE TO PARENT BUT ABSOLUTE AS A CHILD
                <div className="bg-red-600 border-2 border-red-300 rounded-md bg-opacity-30 w-[160px] h-[75px] z-10 absolute">
                    <p className=''>
                        🏐 Volleyball
                    </p>
                </div>
            ) : null} */}
        </div>
    );
}

export default CalendarCell;
