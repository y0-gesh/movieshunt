/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#232E3F",
        secondary: "#CF9421",
        light: {
          100: "#F0EDE5",
          200: "#E4E1D2",
          300: "#DAD5C6",
        },
        dark: {
          100: "#232E3F",
          200: "#CF9421",
          300: "#CF9421",
        },
        accent: "#DAD5C6",
        background: "#232E3F",
        text: "#CF9421",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
}