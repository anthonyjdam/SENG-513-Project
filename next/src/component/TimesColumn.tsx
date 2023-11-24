import React from 'react'

interface timeProp {
    time: string
}

function TimesColumn({time}: timeProp) {
    return (
        <div className='h-[75px] flex flex-row items-start justify-center text-xs font-bold'>
            {time}
        </div>
    )
}

export default TimesColumn