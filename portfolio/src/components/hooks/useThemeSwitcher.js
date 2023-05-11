import React, { useEffect, useState } from 'react'

// useThemeSwitcher hook
const useThemeSwitcher = () => {
    // preferDarkQuery variable
    const preferDarkQuery = '(prefers-color-scheme: dark)';

    // useState hook
    const [mode, setMode] = useState("dark");

    // useEffect hook
    useEffect(() => {
        // mediaQuery variable
        const mediaQuery = window.matchMedia(preferDarkQuery);

        // userPref variable
        const userPref = window.localStorage.getItem("theme");

        // handlePrefChange function
        const handlePrefChange = () => {
            // If user preference exists, set mode to user preference
            if (userPref) {
                let check = userPref === "dark" ? "dark" : "light";
                setMode(check);
                if (check === "dark") {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            }
            // If user preference doesn't exist, set mode to match media query 
            else {
                let check = mediaQuery.matches ? "dark" : "light";
                setMode(check);
                if (check === "dark") {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            }
        }
        // Call handlePrefChange function
        handlePrefChange();

        // Add event listener
        mediaQuery.addEventListener("change", handlePrefChange);

        // Return function to remove event listener
        return () => mediaQuery.removeEventListener("change", handlePrefChange);
    }, []);

    // useEffect hook
    useEffect(() => {
        // If mode is dark, set theme to dark
        if (mode === "dark") {
            window.localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        }
        // If mode is light, set theme to light
        if (mode === "light") {
            window.localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        }
    }, [mode]);

    // Return mode and setMode
    return [mode, setMode];
}

export default useThemeSwitcher