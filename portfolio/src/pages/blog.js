import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";


const BlogCard = (props) => {
    const { title, description, img, link, date } = props;
    console.log(title, description, img, link, date);
    return (
        <div className="w-full p-4 bg-light border border-solid border-dark rounded-2xl relative dark:bg-dark dark:border-light">
            <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark
            rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]" />
            <div className="flex items-center xs:flex-col">
                <Link href={link} className="w-[25%] cursor-pointer overflow-hidden rounded-lg xs:w-full md:w-[50%] sm:w-[60%]">
                    <Image src={img} alt={title} width={400} height={250} className="w-full h-auto" />
                </Link>
                <div className="w-full pl-8 xs:pl-0 xs:mt-4">
                    <Link href={link} className="hover:underline underline-offset-2 font-bold">
                        {title}
                    </Link>
                    <p className="text-dark/75 mt-2 dark:text-light/75 line-clamp-4">{description}</p>
                    <p className="text-primary font-medium text-sm dark:text-primaryDark mt-2">
                        {date}
                    </p>
                </div>
            </div>
        </div>
    )
}

const Blog = () => {
    const blogPosts = [
        { title: "Leveraging Prisma ORM for Seamless Database Interaction", img: '/images/blog/prisma.webp', link: '/leveraging-prisma-orm-for-seamless-database-interaction', date: 'September 20, 2024', description: 'As developers, one of the biggest hurdles we face is managing databases efficiently. Whether it’s fine-tuning queries or structuring complex relationships, things inevitably get more complicated as your data grows. Before you know it, you’re caught up writing complex SQL queries and troubleshooting performance issues, all while trying to keep your schema clean and maintainable. That’s where Prisma ORM comes in: a tool designed to simplify your database interactions without sacrificing performance. Imagine having a clean, type safe interface for your database that’s intuitive and fast. Prisma’s approach to schema design, query building, and migrations can save you from the headaches of traditional ORMs while providing a modern, developer-friendly experience.' },
        { title: "The Power of WebSockets for Creating Real-Time Web Apps", img: '/images/blog/websockets.webp', link: '/the-power-of-websockets-for-creating-real-time-web-apps', date: 'October 31, 2024', description: 'Remember the days of repeatedly refreshing web pages, hoping for new content to appear? Whether you were looking for a new email or waiting for a product release, staying updated in real time was hard. We’ve all been there. In the world of web development, creating responsive, real-time applications has always been a challenge. Traditional HTTP requests, while functional, often fall short when it comes to instant updates and live data. This is where WebSockets come into play, transforming how we build interactive web experiences. In this post, we’ll explore what WebSockets are, why they matter, and how you can start using them in your projects.' },
    ];

    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <>
            <Head>
                <title>Brandon Cole | Blog</title>
                <meta
                    name="description"
                    content="Stay up-to-date with the latest trends and best practices in web development, software engineering, and technology. Follow Brandon Cole's blog for insightful articles, tutorials, and guides."
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Brandon Cole | Blog" />
                <meta
                    property="og:description"
                    content="Stay up-to-date with the latest trends and best practices in web development, software engineering, and technology. Follow Brandon Cole's blog for insightful articles, tutorials, and guides."
                />
                <meta name="keywords" content="web development, software engineering, technology, programming, tech, brandon cole, technology, coding, tutorials, guides, articles, blog, engineering, innovation, full stack" />
            </Head>
            <TransitionEffect />
            <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
                <Layout className="pt-16 flex flex-col items-center">
                    <AnimatedText
                        text="Blog">
                    </AnimatedText>
                    <p className="font-medium text-lg mt-4 dark:text-light ">
                        Welcome to my blog! I write about web development, programming, and other tech-related topics.
                    </p>
                    {/* Blog list */}
                    <div className="mt-8 flex flex-col gap-10">
                        {blogPosts.map((post, index) => (
                            <BlogCard
                                key={index}
                                title={post.title}
                                img={post.img}
                                link={post.link}
                                date={post.date}
                                description={post.description}
                            >
                            </BlogCard>
                        ))}
                    </div>
                </Layout>
            </main>
        </>
    )
}

export default Blog;