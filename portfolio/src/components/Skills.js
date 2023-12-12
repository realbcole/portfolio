import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import html from '../../public/images/skills/html.png';
import css from '../../public/images/skills/css.png';
import js from '../../public/images/skills/javascript.png';
import ts from '../../public/images/skills/typescript.png';
import react from '../../public/images/skills/react.png';
import node from '../../public/images/skills/node.png';
import nextLight from '../../public/images/skills/nextLight.png';
import nextDark from '../../public/images/skills/nextDark.png';
import nextAuth from '../../public/images/skills/nextauth.png';
import tailwind from '../../public/images/skills/tailwind.png';
import cpp from '../../public/images/skills/cpp.png';
import python from '../../public/images/skills/python.png';
import csharp from '../../public/images/skills/csharp.png';
import unityLight from '../../public/images/skills/unityLight.png';
import unityDark from '../../public/images/skills/unityDark.png';
import visualstudio from '../../public/images/skills/visualstudio.png';
import vscode from '../../public/images/skills/vscode.png';
import git from '../../public/images/skills/git.png';
import express from '../../public/images/skills/expressjs.png';
import axios from '../../public/images/skills/axios.png';
import mongoose from '../../public/images/skills/mongoose.png';
import mongoDb from '../../public/images/skills/mongodb.png';
import vercel from '../../public/images/skills/vercel.png';
import angular from '../../public/images/skills/angular.png';
import mysql from '../../public/images/skills/mysql.png';
import postgresql from '../../public/images/skills/postgresql.png';
import prisma from '../../public/images/skills/prisma.png';
import aws from '../../public/images/skills/aws.png';
import docker from '../../public/images/skills/docker.png';
import heroku from '../../public/images/skills/heroku.png';
import jwt from '../../public/images/skills/jwt.png';
import jira from '../../public/images/skills/jira.png';
import rxjs from '../../public/images/skills/rxjs.png';
import socket from '../../public/images/skills/socket.png'

// Skill component
const Skill = ({ img, name, className = '' }) => {
  return (
    <motion.div
      className={`${className} flex flex-col items-center justify-between border border-dark w-[10vw]
            dark:border-light p-5 rounded-xl m-2 lg:w-[15vw] md:w-[20vw] sm:w-[25vw] h-[14vw] lg:h-[20vw] md:h-[30vw] sm:h-[35vw]`}
      whileHover={{ scale: 1.05 }}
    >
      <Image src={img} alt={name} className="w-full" />
      <p className="font-bold text-primary/75 dark:text-primaryDark/75 text-center text-sm md:text-md">
        {name}
      </p>
    </motion.div>
  );
};

// Skills component
const Skills = () => {
  return (
    <>
      <h2 className="font-bold text-8xl mt-64 w-full mb-10 text-center md:text-6xl md:mt-32">
        Skills
      </h2>

      <div className="flex items-center justify-center flex-wrap">
        <Skill img={html} name="HTML" />
        <Skill img={css} name="CSS" />
        <Skill img={js} name="JavaScript" />
        <Skill img={ts} name="TypeScript" />
        <Skill img={cpp} name="C++" />
        <Skill img={python} name="Python" />
        <Skill img={csharp} name="C#" />
        <Skill img={react} name="React" />
        <Skill img={angular} name="Angular" />
        <Skill img={node} name="Node" />
        <Skill img={nextDark} name="NextJS" className="hidden dark:flex" />
        <Skill img={nextLight} name="NextJS" className="dark:hidden" />
        <Skill img={nextAuth} name="NextAuth" />
        <Skill img={jwt} name="JSON Web Token" />
        <Skill img={rxjs} name="RXJS" />
        <Skill img={axios} name="Axios" />
        <Skill img={express} name="Express" />
        <Skill img={prisma} name="Prisma ORM" />
        <Skill img={mysql} name="MySQL" />
        <Skill img={postgresql} name="PostgreSQL" />
        <Skill img={mongoose} name="Mongoose" />
        <Skill img={mongoDb} name="MongoDB" />
        <Skill img={socket} name="Socket.io" />
        <Skill img={aws} name="Amazon Web Services" />
        <Skill img={docker} name="Docker" />
        <Skill img={tailwind} name="Tailwind CSS" />
        <Skill img={vercel} name="Vercel" />
        <Skill img={heroku} name="Heroku" />
        <Skill img={unityDark} name="Unity" className="hidden dark:flex" />
        <Skill img={unityLight} name="Unity" className="dark:hidden" />
        <Skill img={visualstudio} name="Visual Studio" />
        <Skill img={vscode} name="VSCode" />
        <Skill img={git} name="Git" />
        <Skill img={jira} name="JIRA" />
      </div>
    </>
  );
};

export default Skills;
