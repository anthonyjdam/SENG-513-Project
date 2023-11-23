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
            <div className="h-[25%] max-h-[25%] border-t border-neutral-100"></div>
            <div className="h-[25%] max-h-[25%] border-t border-neutral-100"></div>
            <div className="h-[25%] max-h-[25%] border-t border-neutral-100"></div>
            <div className="h-[25%] max-h-[25%] border-t border-neutral-100"></div>
        </div>
    );
}

export default CalendarCell;
