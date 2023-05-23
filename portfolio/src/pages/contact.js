import ContactForm from "@/components/ContactForm";
import React from "react";
import Head from "next/head";
import TransitionEffect from "@/components/TransitionEffect";
import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";
import { LinkArrow } from "@/components/Icons";
import { motion } from "framer-motion";

const contact = () => {
  const lat = 43.08460241176458;
  const lng = -77.6744314550942;

  return (
    <>
      <Head>
        <title>Brandon Cole | Contact</title>
        <meta
          name="description"
          content="Connect with Brandon Cole, a creative developer 
                specializing in game design and development. Reach out for inquiries, collaborations,
                 or just a friendly chat. Visit the Contact page to access the contact form and view
                  his location on an interactive map"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Brandon Cole | Contact" />
        <meta
          property="og:description"
          content="Connect with Brandon Cole, a creative developer 
                specializing in game design and development. Reach out for inquiries, collaborations,
                 or just a friendly chat. Visit the Contact page to access the contact form and view
                  his location on an interactive map"
        />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="flex flex-col justify-between items-center w-full pt-16">
          <AnimatedText
            text="Let's Connect!"
            className="!text-6xl 
                    xl:!text-5xl lg:!text-6xl md:!text-5xl sm:!text-3xl"
          />
          <p className="my-4 text-base font-medium md:text-sm sm:text-xs w-8/12 text-center">
            Thanks for checking out my portfolio! I&apos;m always excited to
            meet new people in the industry and explore potential
            collaborations. If you&apos;re interested in learning more about my
            work, have a project in mind, or just want to chat, feel free to
            reach out. You can find my resume below or drop me a message using
            the contact form.
          </p>
          <p className="mb-4 text-base font-medium md:text-sm sm:text-xs w-8/12 text-center">
            I&apos;m currently located in Rochester, NY, but I&apos;m open to
            remote work as well as relocation!
          </p>
          <div className="flex items-center">
            <Link
              href="/resume.pdf"
              target="_blank"
              className="flex items-center bg-dark text-light p-2.5 px-6
                        rounded-lg text-lg font-semibold hover:bg-light hover:text-dark
                        border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark
                        hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base"
            >
              Resume <LinkArrow />
            </Link>
          </div>
          <div
            className="flex items-center justify-between w-full lg:flex-col h-[80vh] lg:h-[800px] 
                        md:h-[700px] sm:h-[600px] xs:[h-500px] border border-dark dark:border-light mt-16"
          >
            <div className="flex flex-col items-center justify-between w-full">
              <h1 className="font-bold text-center mt-5 xl:text-5xl text-6xl md:text-5xl">
                Reach Out!
              </h1>
              {/* Contact me box */}
              <motion.div
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full"
              >
                <article
                  className="w-full flex flex-col items-center justify-between 
                             px-12 relative  dark:bg-dark
                         lg:flex-col lg:p-8  xs:p-4"
                >
                  <ContactForm />
                </article>
              </motion.div>
            </div>

            <Map
              mapboxAccessToken="pk.eyJ1IjoicmVhbGJjb2xlIiwiYSI6ImNsaGRybTR0MDBwc3UzYnB4bWkzZGcxNGcifQ.HLpv5-836Z-WEVEIzw_2PQ"
              initialViewState={{
                longitude: lng,
                latitude: lat,
                zoom: 6,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/dark-v11"
            >
              <Marker latitude={lat} longitude={lng} />
            </Map>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default contact;
