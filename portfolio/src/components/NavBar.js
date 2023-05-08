import React, { useState } from 'react'
import Link from 'next/link'
import Logo from './Logo'
import { useRouter } from 'next/router'
import { TwitterIcon, DribbbleIcon, GithubIcon, LinkedInIcon, SunIcon, MoonIcon } from './Icons'
import { motion } from 'framer-motion'
import useThemeSwitcher from './hooks/useThemeSwitcher'

// CustomLink component
const CustomLink = ({ href, title, className = "" }) => {
    // useRouter hook
    const router = useRouter();
    return (
        <Link href={href} className={`${className} relative group`}>
            {title}
            <span className={`h-[1px] inline-block w-0 bg-dark absolute left-0 -bottom-0.5
            group-hover:w-full transition-[width] ease duration-300 dark:bg-light 
            ${router.asPath === href ? 'w-full' : 'w-0'}`}
            >&nbsp;</span>
        </Link>
    )
}

// CustomMobileLink component
const CustomMobileLink = ({ href, title, className = "", toggle }) => {
    // useRouter hook
    const router = useRouter();

    // handleClick function
    const handleClick = () => {
        toggle();
        router.push(href);
    }

    return (
        <button href={href} className={`${className} relative group text-light dark:text-dark my-2`} onClick={handleClick}>
            {title}
            <span className={`h-[1px] inline-block w-0 bg-light absolute left-0 -bottom-0.5
            group-hover:w-full transition-[width] ease duration-300 dark:bg-dark 
            ${router.asPath === href ? 'w-full' : 'w-0'}`}
            >&nbsp;</span>
        </button>
    )
}

// NavBar component
const NavBar = () => {
    // useThemeSwitcher hook
    const [mode, setMode] = useThemeSwitcher();

    // useState hook
    const [isOpen, setIsOpen] = useState(false);

    // handleClick function
    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <header
            className='w-full px-32 py-8 font-medium flex items-center justify-between dark:text-light
            relative z-10 lg:px-16 md:px-12 sm:px-8'>
            {/* Hamburger menu */}
            <button className='flex-col justify-center items-center hidden lg:flex' onClick={handleClick}>
                <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm -translate-y-0.5 
                ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 
                ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm translate-y-0.5
                ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </button>
            {/* Desktop Navbar */}
            <div className='w-full flex justify-between items-center lg:hidden'>
                <nav>
                    <CustomLink href="/" title="Home" className='mr-4' />
                    <CustomLink href="/about" title="About" className='mx-4' />
                    <CustomLink href="/projects" title="Projects" className='mx-4' />
                    <CustomLink href="/contact" title="Contact" className='ml-4' />
                </nav>
                <nav className='flex items-center justify-center flex-wrap'>
                    <motion.a href="https://github.com/realbcole" target="_blank"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className='w-6 mx-3 bg-light rounded-full dark:bg-dark'
                    ><GithubIcon /></motion.a>
                    <motion.a href="https://www.linkedin.com/in/brandon-cole7/" target="_blank"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className='w-6 mx-3'
                    ><LinkedInIcon /></motion.a>

                    <button
                        onClick={() => setMode(mode === "light" ? "dark" : "light")}
                        className={`w-6 ml-3 flex items-center justify-center rounded-full p-1
                        bg-dark text-light dark:bg-light dark:text-dark
                                    `}>
                        <motion.a
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.9 }}>
                            {
                                mode === "dark" ?
                                    <SunIcon className={"fill-dark"} /> : <MoonIcon className={"fill-dark"} />
                            }
                        </motion.a>
                    </button>
                </nav>
            </div>

            { // Mobile Navbar
                isOpen ?
                    <motion.div
                        initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
                        animate={{ scale: 1, opacity: .9 }}
                        className='min-w-[70vw] flex flex-col justify-between items-center fixed top-1/2 left-1/2 
                                    -translate-x-1/2 -translate-y-1/2 z-30 bg-dark/90 dark:bg-light/90 rounded-lg backdrop-blur-lg
                                    py-32'>
                        <nav className='flex items-center flex-col justify-center'>
                            <CustomMobileLink href="/" title="Home" className='' toggle={handleClick} />
                            <CustomMobileLink href="/about" title="About" className='' toggle={handleClick} />
                            <CustomMobileLink href="/projects" title="Projects" className='' toggle={handleClick} />
                            <CustomMobileLink href="/contact" title="Contact" className='' toggle={handleClick} />
                        </nav>
                        <nav className='flex items-center justify-center flex-wrap mt-2'>
                            <motion.a href="https://github.com/realbcole" target="_blank"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                className='w-6 mx-3 bg-light rounded-full dark:bg-dark sm:mx-1'
                            ><GithubIcon /></motion.a>
                            <motion.a href="https://www.linkedin.com/in/brandon-cole7/" target="_blank"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                className='w-6 mx-3 sm:mx-1'
                            ><LinkedInIcon /></motion.a>

                            <button
                                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                                className={`w-6 ml-3 flex items-center justify-center rounded-full p-1 sm:ml-1
                                    bg-dark text-light dark:bg-light dark:text-dark
                                    `}>
                                <motion.a
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.9 }}>
                                    {
                                        mode === "dark" ?
                                            <SunIcon className={"fill-dark"} /> : <MoonIcon className={"fill-dark"} />
                                    }
                                </motion.a>
                            </button>
                        </nav>
                    </motion.div>
                    : null
            }

            {/* Logo */}
            <div className='absolute left-[50%] top-2 translate-x-[-50%]'>
                <Logo />
            </div>
        </header>
    )
}

export default NavBar