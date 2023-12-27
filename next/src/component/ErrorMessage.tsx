import React from 'react'

function ErrorMessage({ errorMessage }: { errorMessage: string }) {
    return (
        <div className='flex flex-row justify-center m-auto px-2 py-0.5 border border-y-0 border-r-0 border-l-4 border-red-600 bg-red-100 rounded-l-sm rounded-lg transition-all duration-50 animate-wiggle'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-red-600 transition-all duration-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <p className='text-sm text-red-600 pl-2'>{errorMessage}</p>
        </div>
    )
}

export default ErrorMessage