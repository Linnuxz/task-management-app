/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: '#232A3C',
                medium: '#293245',
                contentDarkBG: '#2B2C37',
                contentLight: '#F4F7FD',
            },
            boxShadow: {
                boardShadow: '0px 4px 6px 0px rgba(54, 78, 126, 0.10)',
            },
        },
    },
    plugins: [],
};
