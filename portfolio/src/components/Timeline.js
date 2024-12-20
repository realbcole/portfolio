import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import LiIcon from './LiIcon';

// Event component for timeline
const Event = ({ type, time, place, info, significance }) => {
  // Ref for the LiIcon element
  const ref = useRef(null);

  // ScrollYProgress for the LiIcon element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]"
    >
      <LiIcon reference={ref} scrollYProgress={scrollYProgress} />
      {/* Animation spring when appears on screen */}
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <h1
          className="text-left mr-auto font-bold text-4xl md:text-3xl sm:text-2xl
                    text-primary dark:text-primaryDark "
        >
          {significance}
        </h1>
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {type}
        </h3>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {place}
        </span>
        <p className="font-medium w-full md:text-sm">{info}</p>
      </motion.div>
    </li>
  );
};

// Experience component
const Timeline = () => {
  // Ref for the div element
  const ref = useRef(null);

  // ScrollYProgress for the div element (used to animate the line)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        Career
      </h2>
      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light
                    md:w-[2px] md:left-[30px] xs:left-[20px]"
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Event
            type="Bachelor of Science - Game Design and Development"
            time="2020-2024"
            significance="2020 - Started at RIT"
            place="Rochester Institute of Technology (RIT)"
            info="Related Courses: Data Structures and Algorithms I & II (C++), Rich Media Web App Development I 
                        (JavaScript), Interactive Media Development (C#), Computer Science I (Python)"
          />

          <Event
            type="Brother - Sigma Chi"
            time="April 2, 2021"
            significance="2021 - Joined Sigma Chi"
            place="Rochester Institute of Technology (RIT)"
            info="Iniated into the Lambda Kappa Chapter of Sigma Chi at RIT. Relevant positions include
                        Public Relations Chair, Historian, Diversity and Inclusion Chair, Judicial Board Juror, and 
                        IFC Delegate."
          />

          <Event
            type="Member - Gamma Sigma Alpha"
            time="2023"
            significance="2023 - Joined GSA"
            place="Rochester Institute of Technology (RIT)"
            info="Initiated into the Eta Chapter of Gamma Sigma Alpha at RIT. GSA is a National Greek
                        Academic Honor Society that recognizes the academic accomplishments of fraternity and sorority
                        members."

          />

          <Event
            type="Full Stack Co-op - Sandbox Union"
            time="July - December 2023"
            significance="2023 - Co-op at Sandbox Union"
            place="Sandbox Union"
            info="Six-month co-op at Sandbox Union where I contributed to both frontend and 
            backend facets of web application development. Collaborated with a diverse team to design, develop, 
            and deploy web solutions for multiple clients. Used cutting-edge frameworks and technologies, streamlined 
            version control with Git and GitFlow, and employed CI/CD pipelines for efficient project deliveries. Engaged 
            actively in sprint planning and daily stand-ups, and effectively utilized Jira for project management and task 
            tracking."

          />

          <Event
            type="Ideal Food Basket Custom Internal Ordering System"
            time="October - December 2023"
            significance="2023 - Project for Ideal Food Basket"
            place="Freelance"
            info="Collaborated with Justin Ferreira to develop a custom internal ordering system for Ideal Food Basket, a 70-location grocery store chain. This full-stack project leveraged Angular for a responsive frontend and Express for robust backend functionality. We implemented a PostgreSQL database on AWS RDS, managed through Prisma ORM, to efficiently handle complex data. The system's deployment utilized Docker for consistency and Heroku with CI/CD pipelines for scalable updates. We integrated multi-level user authentication for enhanced security and role-specific access, ensuring a seamless and secure user experience for both store and administrative personnel. This project showcases my skills in web application development and project management."
          />

          <Event
            type="Ideal Software LLC"
            time="May 2024 - Present"
            significance="2024 - Co-founded Ideal Software LLC"
            place="Ideal Software LLC"
            info="Co-founded Ideal Software LLC with Justin Ferreira in May 2024. Through our collaborative work on the Ideal Food Basket project, we recognized the potential to leverage our full-stack development expertise to create custom, professional-quality applications for clients in various industries. Ideal Software LLC was founded on this vision to deliver innovative software solutions that address specific business needs and drive growth."
          />
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
