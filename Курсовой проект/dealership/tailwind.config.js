/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#4F46E5",
      },
      fontFamily: {
        sans: ['"Inter"'],
      },
    },
    plugins: [],
  },
};
