import React from 'react'
import Head from 'next/head'
import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { GithubIcon } from '@/components/Icons'
import audioVisualizer from '../../public/images/projects/audiovisualizer.png'
import mealFinder from '../../public/images/projects/mealfinder.png'
import nysParks from '../../public/images/projects/nystateparks.png'
import survive from '../../public/images/projects/survive.png'
import truth from '../../public/images/projects/truth.png'
import oldPortfolio from '../../public/images/projects/oldportfolio.png'
import TransitionEffect from '@/components/TransitionEffect'

// FeaturedProject component (Shows more details about a project)
const FeaturedProject = ({ type, title, techStack, summary, img, link, github }) => {
    return (
        <div className='col-span-12'>
            <article className='w-full flex items-center justify-between rounded-3xl
                border border-solid border-dark bg-light shadow-2xl p-12 relative rounded-br-2xl dark:bg-dark
                dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4'>
                <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark
                     rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]' />

                <Link href={link} target='_blank' className='w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full'>
                    <Image src={img} alt={title} className="w-full h-auto" priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw" />
                </Link>

                <div className='w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6'>
                    <span className='text-primary font-medium text-xl dark:text-primaryDark xs:text-base'>{type}</span>
                    <Link href={link} className='hover:underline underline-offset-2'>
                        <h2 className='my-2 w-full text-left text-4xl font-bold dark:text-light lg:text-3xl'>{title}</h2>
                    </Link>
                    <p className='font-semibold text-dark/90 dark:text-light/90 sm:text-sm'>
                        <span className='font-bold text-dark dark:text-light sm:text-sm'>Tech Stack: </span>
                        {techStack}</p>
                    <p className='my-2 font-medium text-dark dark:text-light sm:text-sm'>{summary}</p>
                    <div className='mt-2 flex items-center'>
                        <Link href={github} target='_blank' className='w-10'> <GithubIcon /> </Link>
                        <Link href={link}
                            className='ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold
                        dark:bg-light dark:text-dark sm:px-4 sm:text-base'
                        >Visit Project</Link>
                    </div>
                </div>
            </article>
        </div>
    )
}

// Project component (Shows a project)
const Project = ({ type, title, techStack, img, link, github }) => {
    return (
        <div className='col-span-6 sm:col-span-12'>
            <article className='w-full flex flex-col items-center justify-center rounded-2xl border
        border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light
        xs:p-4'>
                <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark
            rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]' />

                <Link href={link} target='_blank' className='w-full cursor-pointer overflow-hidden rounded-lg'>
                    <Image src={img} alt={title} className="w-full h-auto" />
                </Link>

                <div className='w-full flex flex-col items-start justify-between mt-4'>
                    <span className='text-primary font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base'>{type}</span>
                    <Link href={link} target='_blank' className='hover:underline underline-offset-2'>
                        <h2 className='my-2 w-full text-left text-3xl font-bold lg:text-2xl'>{title}</h2>
                    </Link>
                    <p className='font-semibold text-dark/90 dark:text-light/90 sm:text-sm'>
                        <span className='font-bold text-dark dark:text-light sm:text-sm'>Tech Stack: </span>
                        {techStack}</p>
                    <div className='w-full mt-2 flex items-center justify-between'>
                        <Link href={link}
                            className='text-lg font-semibold underline underline-offset-2 md:text-base'
                        >Visit</Link>
                        <Link href={github} target='_blank' className='w-8 md:w-6'> <GithubIcon /> </Link>

                    </div>
                </div>
            </article>
        </div>
    )
}
const projects = () => {
    return (
        <>
            <Head>
                <title>Brandon Cole | Projects</title>
                <meta name="description" content="any description" />
            </Head>
            <TransitionEffect />
            <main className='w-full mb-16 flex flex-col items-center justify-center dark:text-light'>
                <Layout className='pt-16'>
                    <AnimatedText text="View My Work!"
                        className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl'
                    />
                    {/* Projects List */}
                    <div className='grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0'>
                        <FeaturedProject
                            title="Audio Visualizer"
                            techStack="HTML, CSS, JavaScript, AJAX, Web Audio, Canvas"
                            img={audioVisualizer}
                            summary="Audio Visualizer was originally a homework assignment for my class Rich 
                            Media and Web Applications I. It has been greatly improved upon since. The audio 
                            visualizer utilizes the Web Audio API as well as the Canvas API to retrieve audio 
                            data from an MP3 file and draw meaningful visualizations of it on the screen. It 
                            is also very aesthetically pleasing and I'm extremely happy with how it turned out."
                            link="/audiovisualizer"
                            type="Featured Project"
                            github="https://github.com/realbcole/portfolio/tree/main/portfolio/public/projects/audiovisualizer"
                        />

                        <Project
                            title="Meal Finder"
                            techStack="HTML, CSS, JavaScript, AJAX, TheMealDB"
                            img={mealFinder}
                            link="/mealfinder"
                            type="Project"
                            github="https://github.com/realbcole/portfolio/tree/main/portfolio/public/projects/mealfinder"
                        />

                        <Project
                            title="Synt-Hax | AI Syntax Helper"
                            techStack="React, ExpressJS, NodeJS, OpenAI API, TailwindCSS"
                            img={nysParks}
                            link="/synt-hax"
                            type="Project"
                            github="https://github.com/realbcole/portfolio/tree/main/portfolio/public/projects/synt-hax"
                        />

                        <FeaturedProject
                            title="Truth"
                            techStack="Unity, C#"
                            img={truth}
                            summary="Truth is a game I made along with a team of four for the 2022 Brackey's 
                            game jam. My contributions to the project include all of the programming, the main
                             menu, and some level design. The theme for the game jam was 'It is not real.' 
                             With this theme I thought of the concept of a platformer where there are platforms
                              you see that are not real and there are platforms that you can't see that are 
                              real. You play as a red headed man who collects mushrooms that allow him to see 
                              the truth and rocks to slingshot at the mushroom enemies. There are also wall 
                              mushrooms that shoot projectiles at the player."
                            link="/truth"
                            type="Featured Project"
                            github="https://github.com/realbcole/portfolio/tree/main/portfolio/public/projects/truth"
                        />
                        <Project
                            title="Old Portfolio"
                            techStack="HTML, CSS"
                            img={oldPortfolio}
                            link="/oldportfolio"
                            type="Project"
                            github="https://github.com/realbcole/portfolio/tree/main/portfolio/public/projects/oldportfolio"
                        />

                        <Project
                            title="Survive"
                            techStack="Unity, C#"
                            img={survive}
                            link="/survive"
                            type="Project"
                            github="https://github.com/realbcole/portfolio/tree/main/portfolio/public/projects/survive"
                        />

                        <Project
                            title="NYS Park Buddy"
                            techStack="HTML, CSS, JavaScript, AJAX"
                            img={nysParks}
                            link="/nysparkbuddy"
                            type="Project"
                            github="https://github.com/realbcole/portfolio/tree/main/portfolio/public/projects/nysparkbuddy"
                        />
                    </div>
                </Layout>
            </main>
        </>
    )
}

export default projects