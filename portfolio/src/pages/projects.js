import React from 'react';
import Head from 'next/head';
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { GithubIcon } from '@/components/Icons';
import audioVisualizer from '../../public/images/projects/audiovisualizer.png';
import mealFinder from '../../public/images/projects/mealfinder.png';
import nysParks from '../../public/images/projects/nystateparks.png';
import survive from '../../public/images/projects/survive.png';
import truth from '../../public/images/projects/truth.png';
import oldPortfolio from '../../public/images/projects/oldportfolio.png';
import synthax from '../../public/images/projects/synt-hax.png';
import ecommerceFront from '../../public/images/projects/ecommercefront.png';
import ecommerceAdmin from '../../public/images/projects/ecommerceadmin.png';
import TransitionEffect from '@/components/TransitionEffect';
import ideal from '../../public/images/projects/ideal.png';
import caseCompass from '../../public/images/projects/casecompass.png';

// FeaturedProject component (Shows more details about a project)
const FeaturedProject = ({
  type,
  title,
  techStack,
  summary,
  img,
  link,
  github,
}) => {
  return (
    <div className="col-span-12">
      <article
        className="w-full flex items-center justify-between rounded-3xl
                border border-solid border-dark bg-light shadow-2xl p-12 relative rounded-br-2xl dark:bg-dark
                dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
      >
        <div
          className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark
                    rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]"
        />

        <Link
          href={link}
          target="_blank"
          className="w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full"
        >
          <Image
            src={img}
            alt={title}
            className="w-full h-auto"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </Link>

        <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
          <span className="text-primary font-medium text-xl dark:text-primaryDark xs:text-base">
            {type}
          </span>
          <Link href={link} className="hover:underline underline-offset-2">
            <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light lg:text-3xl">
              {title}
            </h2>
          </Link>
          <p className="font-semibold text-dark/90 dark:text-light/90 sm:text-sm">
            <span className="font-bold text-dark dark:text-light sm:text-sm">
              Tech Stack:{' '}
            </span>
            {techStack}
          </p>
          <p className="my-2 font-medium text-dark dark:text-light sm:text-sm">
            {summary}
          </p>
          <div className="mt-2 flex items-center">
            <Link href={github} target="_blank" className="w-10">
              {' '}
              <GithubIcon />{' '}
            </Link>
            <Link
              href={link}
              target="_blank"
              className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold
                        dark:bg-light dark:text-dark sm:px-4 sm:text-base"
            >
              Visit Project
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

const FeaturedProjectNoLink = ({
  type,
  title,
  techStack,
  summary,
  img,
}) => {
  return (
    <div className="col-span-12">
      <article
        className="w-full flex items-center justify-between rounded-3xl
                border border-solid border-dark bg-light shadow-2xl p-12 relative rounded-br-2xl dark:bg-dark
                dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
      >
        <div
          className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark
                    rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]"
        />


        <div
          className="w-1/2 overflow-hidden rounded-lg lg:w-full"
        >
          <Image
            src={img}
            alt={title}
            className="w-full h-auto"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </div>

        <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
          <span className="text-primary font-medium text-xl dark:text-primaryDark xs:text-base">
            {type}
          </span>
          <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light lg:text-3xl">
            {title}
          </h2>

          <p className="font-semibold text-dark/90 dark:text-light/90 sm:text-sm">
            <span className="font-bold text-dark dark:text-light sm:text-sm">
              Tech Stack:{' '}
            </span>
            {techStack}
          </p>
          <p className="my-2 font-medium text-dark dark:text-light sm:text-sm">
            {summary}
          </p>
        </div>
      </article>
    </div>
  );
};


// Project component (Shows a project)
const Project = ({ type, title, techStack, img, link, github }) => {
  return (
    <div className="col-span-6 sm:col-span-12">
      <article
        className="w-full flex flex-col items-center justify-center rounded-2xl border
        border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light
        xs:p-4"
      >
        <div
          className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark
            rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]"
        />

        <Link
          href={link}
          target="_blank"
          className="w-full cursor-pointer overflow-hidden rounded-lg"
        >
          <Image src={img} alt={title} className="w-full h-auto max" />
        </Link>

        <div className="w-full flex flex-col items-start justify-between mt-4">
          <span className="text-primary font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base">
            {type}
          </span>
          <Link
            href={link}
            target="_blank"
            className="hover:underline underline-offset-2"
          >
            <h2 className="my-2 w-full text-left text-3xl font-bold lg:text-2xl">
              {title}
            </h2>
          </Link>
          <p className="font-semibold text-dark/90 dark:text-light/90 sm:text-sm">
            <span className="font-bold text-dark dark:text-light sm:text-sm">
              Tech Stack:{' '}
            </span>
            {techStack}
          </p>
          <div className="w-full mt-2 flex items-center justify-between">
            <Link
              href={link}
              target="_blank"
              className="text-lg font-semibold underline underline-offset-2 md:text-base"
            >
              Visit
            </Link>
            <Link href={github} target="_blank" className="w-8 md:w-6">
              <GithubIcon />{' '}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};
const projects = () => {
  return (
    <>
      <Head>
        <title>Brandon Cole | Projects</title>
        <meta
          name="description"
          content="Explore Brandon Cole's portfolio of projects, 
                including a diverse range of web applications, Unity games, and AI-powered tools. 
                Discover the tech stack and details behind each project and visit their live demos."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Brandon Cole | Contact" />
        <meta
          property="og:description"
          content="Explore Brandon Cole's portfolio of projects, 
                including a diverse range of web applications, Unity games, and AI-powered tools. 
                Discover the tech stack and details behind each project and visit their live demos."
        />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="View My Work!"
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          {/* Projects List */}
          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">


            <FeaturedProjectNoLink
              title="Ideal Food Basket Custom Internal Ordering System"
              techStack="Angular, Express, JWT, Prisma, PostgreSQL, AWS, Docker, Heroku"
              img={ideal}
              summary="
              Full-stack web application aimed to modernize purchase ordering  
              for a 70-location grocery chain. Built using Angular and Express, it features a PostgreSQL database 
              on AWS RDS, managed via Prisma ORM for efficient data handling. Deployed with Docker on Heroku, it 
              ensures scalability and consistency, while integrating advanced security and role management for 
              secure, role-specific access. This is my largest project to date, and I am very proud of this accomplishment.
              As this is an internal system, I am unable to provide code or screenshots, but feel free to ask me about it!"
              type="Featured Project"
            />

            <Project
              title="Full Stack Ecommerce Front"
              techStack="React, NextJS, TypeScript, TailwindCSS, Next-Auth, Stripe, NodeJS, Axios, Mongoose, MongoDB, Vercel"
              img={ecommerceFront}
              link="https://ecommerce-front-eosin.vercel.app/"
              type="Project"
              github="https://github.com/realbcole/ecommerce-front"
            />

            <Project
              title="Full Stack Ecommerce Admin"
              techStack="React, NextJS, TypeScript, TailwindCSS, Next-Auth, Stripe, AWS, NodeJS, Axios, Mongoose, MongoDB, Vercel"
              img={ecommerceAdmin}
              link="https://github.com/realbcole/ecommerce-admin"
              type="Project"
              github="https://github.com/realbcole/ecommerce-admin"
            />

            <FeaturedProjectNoLink
              title="Case Compass"
              techStack="Angular, Express, MySQL, Sequelize, AWS, Redis, DocxTemplater, RXJS, Socket.io, Beequeue, Doc2Pdf, JWT"
              img={caseCompass}
              summary="At Sandbox Union, I made significant contributions to Case Compass, a web-based platform initially for managing 
              landlord-tenant law cases, now adaptable for various legal practices. It offers case tracking, document management, and automated 
              communication for lawyers and clients, with AWS hosting for security and scalability. This platform streamlines legal operations, 
              emphasizing customization and client-focused solutions."
              type="Featured Project"
            />

            <Project
              title="Synt-Hax - AI Syntax Helper"
              techStack="React, ExpressJS, NodeJS, OpenAI API, TailwindCSS"
              img={synthax}
              link="https://synt-hax.vercel.app/"
              github="https://github.com/realbcole/Synt-hax"
              type="Project"
            />


            <Project
              title="Audio Visualizer"
              techStack="HTML, CSS, JavaScript, AJAX, Web Audio, Canvas"
              img={audioVisualizer}
              link="/audiovisualizer"
              type="Project"
              github="https://github.com/realbcole/portfolio/tree/main/portfolio/public/projects/audiovisualizer"
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
                            real. The player collects mushrooms in order to see the truth and rocks to 
                            slingshot at the mushroom enemies."
              link="/truth"
              type="Featured Project"
              github="https://github.com/realbcole/portfolio/tree/main/portfolio/public/projects/truth"
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
              title="NYS Park Buddy"
              techStack="HTML, CSS, JavaScript, AJAX"
              img={nysParks}
              link="/nysparkbuddy"
              type="Project"
              github="https://github.com/realbcole/portfolio/tree/main/portfolio/public/projects/nysparkbuddy"
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
              title="Old Portfolio"
              techStack="HTML, CSS"
              img={oldPortfolio}
              link="/oldportfolio"
              type="Project"
              github="https://github.com/realbcole/portfolio/tree/main/portfolio/public/projects/oldportfolio"
            />
          </div>
        </Layout>
      </main>
    </>
  );
};

export default projects;
