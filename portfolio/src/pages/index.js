import Head from 'next/head'
import Layout from '@/components/Layout'
import Image from 'next/image'
import mainImage from '../../public/images/profile/snowbird.png'
import AnimatedText from '@/components/AnimatedText'
import Link from 'next/link'
import { LinkArrow } from '@/components/Icons'
import HireMe from '@/components/HireMe'
import lightBulb from '../../public/images/profile/lightbulb.png'
import TransitionEffect from '@/components/TransitionEffect'

// Home page
export default function Home() {
  return (
    <>
      <Head>
        <title>Brandon Cole | Home</title>
        <meta name="description" content="Explore the intersection of design and development 
        with Brandon Cole's portfolio website. Combining code and creativity, Brandon creates 
        engaging interactive experiences with a focus on user-centered design. Browse his 
        portfolio to see his unique approach to digital experiences." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Brandon Cole | Contact" />
        <meta property="og:description" content="Explore the intersection of design and development 
        with Brandon Cole's portfolio website. Combining code and creativity, Brandon creates 
        engaging interactive experiences with a focus on user-centered design. Browse his 
        portfolio to see his unique approach to digital experiences." />
      </Head>
      <TransitionEffect />
      <main className="text-dark w-full min-h-screen dark:text-light">
        <Layout className='pt-16'>
          <div className='flex items-center justify-between w-full lg:flex-col'>
            {/* Main image */}
            <div className='w-1/2 lg:w-3/4 md:w-full pr-10 lg:pr-0 pb-10'>
              <Image src={mainImage} alt="BCOLE" className='w-full h-auto lg:hidden md:inline-block md:w-full' priority
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw" />
            </div>
            {/* Text */}
            <div className='w-1/2 flex flex-col item-center self-center lg:w-full lg:text-center'>
              <AnimatedText text="Code and Creativity Combined." className='!text-6xl !text-left 
              xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl' />
              <p className='my-4 text-base font-medium md:text-sm sm:text-xs'>
                Exploring the intersection of design and development to create engaging interactive experiences.
                With a focus on user-centered design, I strive to create digital experiences that are not only
                aesthetically pleasing but also highly functional and intuitive. Browse my portfolio to see how I
                bring my unique approach to life.
              </p>
              {/* Resume & Contact buttons */}
              <div className='flex items-center self-start mt-2 lg:self-center'>
                <Link href="/resume.pdf" target="_blank"
                  className='flex items-center bg-dark text-light p-2.5 px-6
                rounded-lg text-lg font-semibold hover:bg-light hover:text-dark
                border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark
                hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'
                >Resume <LinkArrow className={"ml-1"} />
                </Link>
                <Link href="/contact"
                  className='ml-4 text-lg font-medium capitalize text-dark underline dark:text-light
                  md:text-base'>Contact</Link>
              </div>
            </div>
          </div>
        </Layout>
        <HireMe />
        {/* Lightbulb image */}
        <div className='absolute right-4 bottom-0 inline-block w-64 md:hidden'>
          <Image src={lightBulb} alt="Lightbulb" className='w-full h-auto' />
        </div>

      </main>
    </>
  )
}
