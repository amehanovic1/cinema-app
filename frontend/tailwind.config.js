/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-grey': '#1A1A1A',
        'neutral-800': '#1D2939',
        'neutral-500': '#667085',
        'background': '#FCFCFD',
        'neutral-25': '#FCFCFD',
        'red-dark': '#B22222',
        'neutral-50': '#F9FAFB',
        'neutral-400': '#98A2B3',
        'neutral-200': '#E4E7EC',
        'shadow-light': '#34405414',
        'neutral-0': '#FFFFFF'
      },
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"]
      },
      boxShadow: {
        'card': '0px 2px 4px -2px #34405414, 0px 4px 6px -1px #34405414'
      }
    },
    
  },
  plugins: [],
}

