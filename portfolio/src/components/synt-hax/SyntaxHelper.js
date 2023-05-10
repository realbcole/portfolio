import React from 'react';
import axios from 'axios';
import ResponseText from './ResponseText';
import { SearchIcon } from './Icons';

// Footer component
const Footer = () => {
    return (
        <footer className='w-full h-[6vh] p-2  bg-dark
        font-medium text-md flex flex-col'>
            <span
                className='mx-auto text-light/50'>{new Date().getFullYear()} &copy; All Rights Reserved
            </span>
        </footer>
    )
}


export default function SyntaxHelper({ apiKey }) {
    // State variables
    const [input, setInput] = React.useState('');
    const [output, setOutput] = React.useState('');
    const [language, setLanguage] = React.useState('');
    const [explanation, setExplanation] = React.useState('None');
    const [loading, setLoading] = React.useState(false);

    // Renders the response from the API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`http://localhost:4000/gpt`, { apiKey: apiKey, prompt: input, language: language, explanation: explanation })
            .then((response) => {
                setLoading(false);
                const formattedResponse = (
                    <ResponseText responseText={response.data} />
                )
                setOutput(
                    <span className=' bg-light/10 text-light/90 mt-4 rounded-xl p-10 
                    text-left w-full overflow-x-auto'>{formattedResponse}</span>
                )
            }).catch((error) => {
                setLoading(false);
                console.log(error);
                setOutput(
                    <span className=' bg-light/10 text-light/90 mt-4 rounded-xl p-10 
                    text-left w-full overflow-x-auto'>Invalid API Key</span>
                )
            });
    }

    return (
        <div className="text-center mt-10">
            <h2 className='text-8xl font-bold'>SYNT-HACKS</h2>
            <h3 className='text-primaryDark text-4xl font-semibold'>AI Syntax Helper</h3>
            <p className='text-primary mt-5 mb-1'>
                {apiKey ? '' : 'Please provide OpenAI API Key in Settings.'}
            </p>
            <form onSubmit={handleSubmit} className='w-3/4 flex flex-col justify-center mx-auto'>
                <div className='flex items-center justify-center'>
                    <input
                        className='p-2 border border-light/75 rounded-3xl w-[50%] bg-dark'
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        className='w-10 h-10 ml-1'
                        type='submit'
                    >
                        <SearchIcon className='fill-light overflow-visible w-4 h-auto relative bottom-2' />
                    </button>
                </div>

                <div className='flex items-center justify-center flex-col'>
                    <div>
                        <label className='text-left mr-2'>Language: </label>
                        <input
                            className='p-2 border border-light/75 rounded-xl bg-dark mt-4 w-20'
                            type='text'
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='mr-2 ml-4'>Explanation: </label>
                        <select
                            className='p-2 border border-light/75 rounded-xl mt-4 mr-2 bg-dark'
                            value={explanation}
                            onChange={(e) => setExplanation(e.target.value)}
                        >
                            <option value='None'>None</option>
                            <option value='Concise'>Concise</option>
                            <option value='Detailed'>Detailed</option>
                        </select>
                    </div>

                </div>
                <div className='mt-2 flex justify-center'>
                    { // Loading spinner
                        loading ? (
                            <div
                                className='mt-10 border border-primaryDark w-[100px] h-[100px] rounded-full 
                            animate-spin-slow'
                            />
                        ) : (
                            output
                        )
                    }
                </div>
            </form>
            <Footer />
        </div>
    )
}