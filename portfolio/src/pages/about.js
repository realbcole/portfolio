import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import profilePic from '../../public/images/profile/profile.png'
import Image from 'next/image'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import TransitionEffect from '@/components/TransitionEffect'
import Timeline from '@/components/Timeline'
import Skills from '@/components/Skills'

// Animated numbers, value increases when in view until at max value
const AnimatedNumbers = ({ value, text }) => {
    // Ref for the span element
    const ref = useRef(null);

    // Motion value and spring value
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 });
    const isInView = useInView(ref, { once: true });

    // Set the motion value to the value prop when in view
    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    // Update the span element with the latest value
    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current && latest.toFixed(0) <= value) {
                ref.current.innerHTML = latest.toFixed(0);
            }

        })
    }, [springValue, value]);

    // Render the animated numbers
    return (
        <div className='flex flex-col items-end justify-center xl:items-center'>
            <span className='inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl'>
                <span ref={ref}></span>+
            </span>
            <h2 className='text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base
                         xs:text-sm'>{text}</h2>
        </div>
    )
}

const about = () => {
    return (
        <>
            <Head>
                <title>Brandon Cole | About Page</title>
                <meta name="description" content="any description" />
            </Head>
            <TransitionEffect />
            <main className='flex w-full flex-col items-center justify-center dark:text-light'>
                <Layout className='pt-16'>
                    <AnimatedText text="Passion Meets Purpose" className='mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8' />
                    <div className='grid w-full grid-cols-8 gap-16 sm:gap-8'>
                        {/* Biography */}
                        <div className='col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8'>
                            <h2 className='mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75'>
                                Biography
                            </h2>
                            <p className='font-medium text-xl lg:text-sm'>
                                Hi, I&apos;m Brandon Cole, a fourth year RIT student majoring in Game Design and Development. As a passionate
                                developer, I bring a unique blend of creativity and technical expertise to every project I work on.
                                Whether I&apos;m developing an interactive web app or designing a captivating game my goal
                                is always the same: to create digital experiences that leave a lasting impression on users.

                            </p>
                            <p className='font-medium my-4 text-xl lg:text-sm'>
                                With a background in game design and development, I&apos;ve always been drawn to the intersection of creativity and technology.
                                From programming in C++ to designing in Unity, I&apos;ve honed my skills in a variety of tools and platforms. But
                                more than anything, I&apos;m driven by the desire to create compelling experiences that engage and delight users.
                            </p>
                            <p className='font-medium text-xl lg:text-sm'>
                                Whether I&apos;m working on a website, game, or another digital experience, I bring my commitment to design excellence and
                                user-centered thinking to every project I work on. I look forward to the opportunity to bring my skills and
                                passion to your next project.
                            </p>
                        </div>
                        {/* Image */}
                        <div className='col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark
                        bg-light p-8 dark:bg-dark dark:border-light xl:col-span-4 md:order-1 md:col-span-8'>
                            <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light' />
                            <Image src={profilePic} alt="BCOLE" className='w-full h-auto rounded-2xl' priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        </div>
                        {/* Animated Numbers */}
                        <div className='col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3'>
                            <AnimatedNumbers value={5} text="years coding" />
                            <AnimatedNumbers value={10} text="projects completed" />
                            <AnimatedNumbers value={200} text="LinkedIn Connections" />
                        </div>
                    </div>
                    <Skills />
                    <Timeline />
                </Layout>
            </main>
        </>
    )
}

export default about