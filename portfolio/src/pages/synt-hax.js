import SyntaxHelper from '../components/synt-hax/SyntaxHelper';
import React from 'react';
import { SettingsIcon } from '../components/synt-hax/Icons';

// Sidebar component
const Sidebar = ({ apiKey, setApiKey }) => {
    return (
        <div className="fixed top-0 left-0 h-[100vh] w-full max-w-[20rem] 
      p-8 shadow-xl shadow-primaryDark/50 z-10 bg-dark">
            <div className="mt-10">
                <h1 className="text-xl font-semibold text-left">
                    Settings
                </h1>
            </div>
            <p className="mt-5">
                OpenAI API Key
            </p>
            <input
                className="mt-5 bg-light/75 text-dark font-semibold p-2 rounded-xl w-full"
                type='text'
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="mt-5 text-light/50">
                Don&apos;t know where to find your OpenAI API Key?
                <a href="https://platform.openai.com/account/api-keys"
                    target="_blank"
                    rel="noreferrer"
                    className='text-primaryDark/75 hover:text-light/90'
                > Click here
                </a>
            </p>
        </div>
    );
}

// Main App component
function App() {
    // State variables
    const [showSideBar, setShowSideBar] = React.useState(false);
    const [apiKey, setApiKey] = React.useState('');

    return (
        <main className='bg-dark w-full h-screen text-light overflow-auto'>
            <button
                onClick={() => setShowSideBar(!showSideBar)}
                className='z-20 absolute top-7 left-7 w-8 h-8'
            >
                <SettingsIcon
                    className='w-4 h-auto fill-light overflow-visible relative bottom-2'
                />
            </button>
            {
                showSideBar ? <Sidebar apiKey={apiKey} setApiKey={setApiKey} /> : null
            }
            <SyntaxHelper apiKey={apiKey} />
        </main>
    );
}

export default App;
