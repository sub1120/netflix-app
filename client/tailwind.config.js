/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "netflix-home": "url('/src/assets/netflix-bg.png')",
      },
      backgroundColor: {
        "netflix-blue": "#00081D",
      },
    },
  },
  plugins: [],
};
