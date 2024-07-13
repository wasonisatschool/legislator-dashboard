/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#3b82f6',
        'light-purple': '#9333ea',
        'light-green': '#10b981',
      },
    },
  },
  plugins: [],
};
