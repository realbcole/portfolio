import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// LiIcon component
const LiIcon = ({ ref: reference, scrollYProgress }) => {
    // Reversing the animation

    const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 2.5]);

    return (
        <figure className='absolute left-0 stroke-dark dark:stroke-light'>
            <svg className='-rotate-90 md:w-[60px] md:h-[60px]
            xs:w-[40px] xs:h-[40px]' width="75" height="75" viewBox='0 0 100 100'>
                <circle cx="75" cy="50" r="20" className='stroke-primary dark:stroke-primaryDark stroke-1 fill-none' />
                {/* Animated circle */}
                <motion.circle cx="75" cy="50" r="20" className='stroke-[5px] fill-light dark:fill-dark'
                    style={{ pathLength: pathLength }}
                />
                <circle cx="75" cy="50" r="10" className='animate-pulse stroke-1 fill-primary dark:fill-primaryDark' />
            </svg>
        </figure>
    )
}

export default LiIcon