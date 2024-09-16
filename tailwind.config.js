/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                dark: "#232A3C",
                medium: "#293245",
                contentDarkBG: "#2B2C37",
                contentLight: "#F4F7FD",
                "custom-border": "rgba(130, 143, 163, 0.25)",
                "new-subtask-light": "rgba(99, 95, 199, 0.10)",
                "focus-border": "#5A5E70",
            },
            boxShadow: {
                boardShadow: "0px 4px 6px 0px rgba(54, 78, 126, 0.10)",
            },
        },
    },
    plugins: [],
};
