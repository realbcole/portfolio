import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import html from '../../public/images/skills/html.png'
import css from '../../public/images/skills/css.png'
import js from '../../public/images/skills/javascript.png'
import ts from '../../public/images/skills/typescript.png'
import react from '../../public/images/skills/react.png'
import node from '../../public/images/skills/node.png'
import nextLight from '../../public/images/skills/nextLight.png'
import nextDark from '../../public/images/skills/nextDark.png'
import tailwind from '../../public/images/skills/tailwind.png'
import dart from '../../public/images/skills/dart.png'
import flutter from '../../public/images/skills/flutter.png'
import cpp from '../../public/images/skills/cpp.png'
import python from '../../public/images/skills/python.png'
import csharp from '../../public/images/skills/csharp.png'
import unityLight from '../../public/images/skills/unityLight.png'
import unityDark from '../../public/images/skills/unityDark.png'
import visualstudio from '../../public/images/skills/visualstudio.png'
import vscode from '../../public/images/skills/vscode.png'
import git from '../../public/images/skills/git.png'
import photoshop from '../../public/images/skills/photoshop.png'
import express from '../../public/images/skills/expressjs.png'


// Skill component
const Skill = ({ img, name, className = "" }) => {
    return (
        <motion.div
            className={`${className} flex flex-col items-center justify-between border border-dark w-[10vw]
            dark:border-light p-5 rounded-xl m-2 lg:w-[15vw] md:w-[20vw] sm:w-[25vw] h-[14vw] lg:h-[20vw] md:h-[30vw] sm:h-[35vw]`}
            whileHover={{ scale: 1.05 }}>
            <Image src={img} alt={name} className='w-full' />
            <p className='font-bold text-primary/75 dark:text-primaryDark/75 text-center'>{name}</p>
        </motion.div>
    )
}

// Skills component
const Skills = () => {
    return (
        <>
            <h2 className='font-bold text-8xl mt-64 w-full mb-10 text-center md:text-6xl md:mt-32'>Skills</h2>

            <div className='flex items-center justify-center flex-wrap'>
                <Skill img={html} name='HTML' />
                <Skill img={css} name='CSS' />
                <Skill img={js} name='JavaScript' />
                <Skill img={ts} name='TypeScript' />
                <Skill img={dart} name='Dart' />
                <Skill img={cpp} name='C++' />
                <Skill img={python} name='Python' />
                <Skill img={csharp} name='C#' />
                <Skill img={react} name='ReactJS' />
                <Skill img={node} name='NodeJS' />
                <Skill img={nextDark} name='NextJS' className='hidden dark:flex' />
                <Skill img={nextLight} name='NextJS' className='dark:hidden' />
                <Skill img={express} name='ExpressJS' />
                <Skill img={tailwind} name='Tailwind CSS' />
                <Skill img={flutter} name='Flutter' />
                <Skill img={unityDark} name='Unity' className='hidden dark:flex' />
                <Skill img={unityLight} name='Unity' className='dark:hidden' />
                <Skill img={visualstudio} name='Visual Studio' />
                <Skill img={vscode} name='VSCode' />
                <Skill img={git} name='Git' />
                <Skill img={photoshop} name='Photoshop' />
            </div>
        </>

    )
}

export default Skills