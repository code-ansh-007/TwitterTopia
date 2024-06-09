/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playball: ["Playball", "cursive"],
        mont: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
