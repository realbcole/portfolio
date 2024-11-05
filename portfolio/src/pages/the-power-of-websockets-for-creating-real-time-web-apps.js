import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/light";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const Post = () => {

    return (<>
        <Head>
            <title>The Power of WebSockets for Creating Real-Time Web Apps | Brandon Cole</title>
            <meta
                name="description"
                content=""
            />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="The Power of WebSockets for Creating Real-Time Web Apps | Brandon Cole" />
            <meta
                property="og:description"
                content=""
            />
            <meta name="keywords" content="node.js, typescript, api, scalability, web development, programming, tech, brandon cole" />
        </Head>
        <TransitionEffect />
        <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
            <Layout className="pt-16 flex flex-col items-center">
                <AnimatedText
                    text="The Power of WebSockets for Creating Real-Time Web Apps"
                />
                <Image
                    src="/images/blog/websockets2.png"
                    alt="The Power of WebSockets for Creating Real-Time Web Apps"
                    width={1000}
                    height={900}
                    className="rounded-xl"
                />

                <p className="font-medium text-lg mt-4 text-primary dark:text-primaryDark sm:text-sm xs:text-xs sm:w-[90%]">This post was originally written by me for the <Link className="hover:bg-primary dark:hover:bg-primaryDark hover:text-light dark:hover:text-dark underline underline-offset-2" href="https://sandboxunion.com/blog" target="_blank">Sandbox Union blog</Link></p>

                <p className="font-medium text-lg mt-4 dark:text-light/80 sm:text-sm xs:text-xs sm:w-[90%]">
                    Remember the days of repeatedly refreshing web pages, hoping for new content to appear? Whether you were looking for a new email or waiting for a product release, staying updated in real time was hard. We’ve all been there. In the world of web development, creating responsive, real-time applications has always been a challenge. Traditional HTTP requests, while functional, often fall short when it comes to instant updates and live data. This is where WebSockets come into play, transforming how we build interactive web experiences.
                    <br />
                    <br />
                    In this post, we’ll explore what WebSockets are, why they matter, and how you can start using them in your projects.
                    <br />
                    <br />
                    <span className="font-bold dark:text-light">What are WebSockets?</span>
                    <br />
                    At its core, WebSocket is a protocol that enables full-duplex, bidirectional communication between a client (usually a web browser) and a server over a single connection. Unlike the traditional HTTP model, where each interaction must be initiated by the client, WebSockets allow both the client and server to send messages to each other at any time, once the initial connection is established.
                    <br />
                    <br />
                    A good way of thinking about it is switching from sending letters to making a phone call. With HTTP, you’re constantly mailing messages and waiting for replies. With WebSockets, you dial in once, and both sides can communicate freely without hanging up.
                    <br />
                    <br />
                    This persistent connection opens up a world of possibilities for creating interactive, real-time web applications. From live chat systems to financial trading platforms, WebSockets are powering some of the most engaging experiences on the web today.
                    <br />
                    <br />
                    <span className="font-bold dark:text-light">Why WebSockets Matter</span>
                    <br />
                    One of the most significant advantages of WebSockets is their ability to push data to clients instantly. This capability can solve real-world problems that developers face when building modern web applications.
                    <br />
                    <br />
                    For instance, while working on Case Compass, an innovative legal case management system, we encountered an issue where multiple attorneys could accidentally approve the same case around the same time due to the UI not being updated. This would create duplicate cases and lead to confusion. By implementing WebSockets, we ensured that all connected clients received immediate updates when a case status changed, preventing duplicate approvals and improving overall workflow efficiency.
                    <br />
                    <br />
                    Efficiency is another key reason WebSockets matter. Unlike traditional polling methods, where servers are constantly hit with requests for updates, WebSockets only transmit data when needed. This translates to reduced server load, lower bandwidth usage, and cost savings, especially for high-traffic applications.
                    <br />
                    <br />
                    WebSockets also support true bidirectional communication, meaning the server and client can both initiate messages. This opens up possibilities for more interactive features, such as collaborative tools or multiplayer games, where real-time, two-way data exchange is essential.
                    <br />
                    <br />
                    Finally, WebSockets scale efficiently. While it might seem resource-intensive to maintain open connections, modern servers and frameworks are well-equipped to handle thousands of simultaneous WebSocket connections, making it a reliable option even at scale.
                    <br />
                    <br />
                    <span className="font-bold dark:text-light">Implementing WebSockets</span>
                    <br />
                    Let’s see WebSockets in action by creating a simple real-time counter using Node.js and the Socket.IO library:
                    <br />
                    <br />
                    <SyntaxHighlighter language="javascript" style={a11yDark} className="mr-auto">
                        {`// Using ES6+ module syntaximport express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

let count = 0;

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.emit('countUpdate', count);

  // When a client increments the count
  socket.on('increment', () => {    // Increment the count on the server
    count++;
    // Emit the new count to all clients
    io.emit('countUpdate', count);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(3000, () => {
  console.log('Listening on port 3000');
});`}
                    </SyntaxHighlighter>
                    <br />
                    And here’s the client-side HTML:
                    <br />
                    <br />
                    <SyntaxHighlighter language="html" style={a11yDark} className="mr-auto">
                        {`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebSocket Counter</title>
</head>
<body>
  <h1>Count: <span id="count">0</span></h1>
  <button id="incrementBtn">Increment</button>

  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io();
    const countElement = document.getElementById('count');
    const incrementBtn = document.getElementById('incrementBtn');

    // When the server sends a new count, update the UI
    socket.on('countUpdate', (newCount) => {
      countElement.textContent = newCount;
    });

    // When the user increments the count, tell the server
    incrementBtn.addEventListener('click', () => {
      socket.emit('increment');
    });
  </script>
</body>
</html>`}
                    </SyntaxHighlighter>
                    <br />
                    This simple example demonstrates the power of WebSockets. Every connected client sees real-time updates whenever anyone clicks the increment button. No refreshing, no polling – just instant updates.
                    <br />
                    <br />
                    While this is a bare-bones implementation, modern frameworks like React or Angular work seamlessly with WebSockets. You can easily integrate similar logic within these frameworks, making it scalable for large applications.
                    <br />
                    <br />
                    <span className="font-bold dark:text-light">Best Practices and Considerations</span>
                    <br />
                    While WebSockets offer powerful capabilities, it’s important to use them properly and follow best practices:
                    <br />
                    <br />
                    <ol className="list-decimal list-inside dark:text-light pl-4">
                        <li><b>Use WebSockets for Real-time Features Only:</b> Not everything needs to be real-time, and overuse can lead to unnecessary complexity.</li>
                        <br />
                        <li><b>Implement Proper Error Handling:</b> WebSocket connections can fail or be interrupted. Always include reconnection logic to ensure a smooth user experience.</li>
                        <br />
                        <li><b>Consider Security:</b> While WebSockets are generally secure, especially when used with WSS (WebSocket Secure), make sure to implement proper authentication and authorization. </li>
                        <br />
                        <li><b>Scale Carefully:</b> While WebSockets are efficient, maintaining many open connections can still be resource-intensive. Plan your infrastructure accordingly if you expect to handle a large number of simultaneous connections.</li>
                        <br />
                        <li><b>Provide Fallbacks:</b> Not all clients support WebSockets. Consider providing fallback mechanisms (like long-polling) for these cases. Socket.IO, for instance, automatically falls back to other techniques if WebSockets aren’t available.</li>
                    </ol>
                    <br />
                    <span className="font-bold dark:text-light">Impact</span>
                    <br />
                    WebSockets truly shine when it comes to creating seamless, real-time user experiences. A great example of this is a check-in system we developed for RochesterWorks, a non-profit organization that assists with job placement and career development.
                    <br />
                    <br />
                    The system needed to handle walk-ins efficiently, allowing receptionists to update visitor statuses in real-time. Before implementing WebSockets, receptionists had to manually refresh their pages to see updated statuses, leading to delays and inefficiencies. By integrating WebSockets, we enabled live updates across all connected clients. As soon as a visitor’s status changed – whether they were filling out papers or ready to be seen – all receptionists instantly saw the update without needing to refresh their browsers.
                    <br />
                    <br />
                    This real-time functionality not only improved the efficiency of the RochesterWorks staff but also enhanced the experience for visitors, reducing wait times and streamlining the check-in process.
                    <br />
                    <br />
                    As you explore WebSockets in your own projects, you’ll likely find plenty of creative ways to apply this technology. Remember though, like any technology, WebSockets aren’t a silver bullet. They’re a powerful tool that, when used appropriately, can significantly enhance your web applications. So give WebSockets a try in your next project – your users will thank you for the enhanced, responsive experience.
                </p>

            </Layout>
        </main>
    </>);
}

export default Post;