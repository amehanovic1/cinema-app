/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#1A1A1A',
        'neutral-800': '#1D2939',
        'neutral-500': '#667085',
        'neutral-25': '#FCFCFD',
        'dark-red': '#B22222',
        'neutral-50': '#F9FAFB',
        'neutral-400': '#98A2B3',
        'neutral-200': '#E4E7EC',
        'light-shadow': '#34405414',
        'neutral-0': '#FFFFFF',
        'light-rose': '#fef2f2',
        'neutral-700': '#344054',
        'neutral-600': '#475467',
        'neutral-300': '#D0D5DD'
      },
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"]
      },
      boxShadow: {
        'card': '0px 2px 4px -2px #34405414, 0px 4px 6px -1px #34405414',
        'text': '0px 25px 50px -16px #34405429',
        'input': '0px 1px 2px -2px #344054, 0px 1px 3px -1px #344054'
      }
    },
    
  },
  plugins: [],
}

