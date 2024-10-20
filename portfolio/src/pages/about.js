import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import profilePic from '../../public/images/profile/profile.jpg';
import Image from 'next/image';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import TransitionEffect from '@/components/TransitionEffect';
import Timeline from '@/components/Timeline';
import Skills from '@/components/Skills';

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
    springValue.on('change', (latest) => {
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.innerHTML = latest.toFixed(0);
      }
    });
  }, [springValue, value]);

  // Render the animated numbers
  return (
    <div className="flex flex-col items-end justify-center xl:items-center">
      <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
        <span ref={ref}></span>+
      </span>
      <h2
        className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base
                         xs:text-sm"
      >
        {text}
      </h2>
    </div>
  );
};

const about = () => {
  return (
    <>
      <Head>
        <title>Brandon Cole | About</title>
        <meta
          name="description"
          content="Discover the story behind Brandon Cole, a passionate 
                developer with a unique blend of creativity and technical expertise. With a background 
                in game design and development, Brandon brings a commitment to design excellence and 
                user-centered thinking to every project. Learn more about his skills and passion for 
                creating digital experiences that leave a lasting impression on users."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Brandon Cole | About" />
        <meta
          property="og:description"
          content="Discover the story behind Brandon Cole, a passionate 
                developer with a unique blend of creativity and technical expertise. With a background 
                in game design and development, Brandon brings a commitment to design excellence and 
                user-centered thinking to every project. Learn more about his skills and passion for 
                creating digital experiences that leave a lasting impression on users."
        />
      </Head>
      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="About me"
            className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />
          <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
            {/* Biography */}
            <div className="col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
                Biography
              </h2>
              <p className="font-medium text-xl lg:text-sm">
                Hi, I&apos;m Brandon Cole, a student at Rochester Institute of
                Technology pursuing a Bachelor of Science in Game Design and Development.
                As a passionate full-stack developer and co-founder of Ideal Software LLC,
                I bring a unique blend of creativity, technical expertise, and entrepreneurial
                spirit to every project I undertake.
              </p>
              <p className="font-medium my-4 text-xl lg:text-sm">
                My journey in tech has taken me from game development to web applications and
                custom software solutions. Whether I&apos;m developing an interactive web app, designing
                a captivating game, or creating tailored business systems, my goal remains consistent:
                to craft digital experiences that are both innovative and user-centric.
              </p>
              <p className="font-medium text-xl lg:text-sm">
                My background in game design and development has instilled in me a deep
                appreciation for the intersection of creativity and technology. From programming in C++
                and JavaScript to designing in Unity and Angular, I&apos;ve honed my skills across a variety
                of tools and platforms. This diverse skill set allows me to approach problems from multiple
                angles and deliver comprehensive solutions.
              </p>
              <p className="font-medium my-4 text-xl lg:text-sm">
                In my recent roles, including a co-op at Sandbox Union and co-founding Ideal Software LLC,
                I&apos;ve had the opportunity to work on real-world projects that have further refined my abilities
                in full-stack development, project management, and client relations. These experiences have
                reinforced my commitment to creating software that not only meets technical requirements but
                also drives business growth and enhances user experiences.
              </p>
              <p className="font-medium text-xl lg:text-sm">
                I&apos;m excited about the future of technology and the opportunity to contribute to innovative projects.
                Whether it&apos;s a website, a game, or a custom software solution, I bring my passion for excellence,
                user-centered thinking, and collaborative spirit to every endeavor. I look forward to the opportunity
                to bring my skills and enthusiasm to your next project.
              </p>
            </div>
            {/* Image */}
            <div
              className="col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark
                        bg-light p-8 dark:bg-dark dark:border-light xl:col-span-4 md:order-1 md:col-span-8"
            >
              <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
              <Image
                src={profilePic}
                alt="BCOLE"
                className="w-full h-auto rounded-2xl"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            {/* Animated Numbers */}
            <div className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3">
              <AnimatedNumbers value={5} text="years coding" />
              <AnimatedNumbers value={10} text="projects completed" />
              <AnimatedNumbers value={500} text="LinkedIn Connections" />
            </div>
          </div>
          <Skills />
          <Timeline />
        </Layout>
      </main>
    </>
  );
};

export default about;
