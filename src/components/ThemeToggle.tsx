import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState<boolean>(true);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") setDarkMode(true);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div
            className="relative flex h-8 w-16 cursor-pointer items-center rounded-full bg-white p-1 dark:bg-gray-900"
            onClick={() => setDarkMode(!darkMode)}
        >
            <div
                className="absolute h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 dark:bg-medium"
                style={darkMode ? { left: "2px" } : { right: "2px" }}
            ></div>
        </div>
    );
};

export default ThemeToggle;
