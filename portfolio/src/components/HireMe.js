import React from 'react'
import { CirclularText } from './Icons'
import Link from 'next/link'

// HireMe component (spinning circle with Hire Me text)
const HireMe = () => {
    return (
        <div className='left-4 bottom-4 flex items-center justify-center
            overflow-hidden md:right-8 md:left-auto md:top-0 md:bottom-auto absolute
            sm:right-0 z-10'>
            <div className='w-48 h-auto flex items-center justify-center relative md:w-24'>
                <CirclularText className={"fil-dark animate-spin-slow dark:fill-light"} />
                <Link href="/contact" className="flex items-center justify-center
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark
                text-light shadow-md border border-solid border-dark w-20 h-20 rounded-full
                font-semibold hover:bg-light hover:text-dark dark:bg-light dark:text-dark
                hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:w-12 md:h-12 md:text-[10px]"
                >Hire Me</Link>
            </div>
        </div>
    )
}

export default HireMe