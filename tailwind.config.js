/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#5f6368',
        secondaryColor: '#f1f3f4',
        blueColor: '#4285f4',
        blackColor: '#202124',
        borderColor: '#dadce0',
        documentBg: '#f9fbfd',
      },
      boxShadow: {
        boxShadowInput: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        boxShadowTaskBar:
          'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px',
        boxShadowLoginBox: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
        boxShadowLogout: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      },
    },
  },
  plugins: [],
}
